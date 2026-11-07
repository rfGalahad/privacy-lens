export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
type FormAnswers = Record<string, unknown>;

//-----------------------------------------------------------
// CONFIG: tune the scoring here
//-----------------------------------------------------------

const RATING_TO_NUMBER: Record<string, number> = { low: 1, medium: 2, high: 3 };
const DEFAULT_RATING_NUMBER = 2; // used when the answer is missing or "na"
const MAX_RATING_PRODUCT = 9;    // 3 (high) × 3 (high)

// Words that mark a data category as sensitive (matched against checkbox values)
const SENSITIVE_DATA_KEYWORDS = [
  'health', 
  'medical', 
  'biometric', 
  'genetic', 
  'financial', 
  'government',
  'religion', 
  'politic', 
  'sexual', 
  'criminal', 
  'ethnic', 
  'union',
];

// Storage options that increase exposure
const RISKY_STORAGE_PATTERN = /cloud|overseas|foreign|offshore|third/;

const SCORE_WEIGHTS = {
  likelihoodImpactMax: 30,
  sensitiveCategoryPoints: 5,
  sensitiveCategoriesMax: 15,
  minorsDataPoints: 10,
  thirdPartyTransferPoints: 5,
  sharedWithoutAgreementPoints: 8,
  sharedWithAgreementPoints: 3,
  riskyStoragePoints: 4,
  manyDataSubjectsPoints: 3,
  manyDataSubjectsThreshold: 4,
  missingTechnicalSafeguardsPoints: 8,
  missingOrganizationalSafeguardsPoints: 5,
  missingPhysicalSafeguardsPoints: 3,
  missingRetentionPeriodPoints: 4,
  missingDisposalMethodsPoints: 3,
  purposeNotDocumentedPoints: 2,
  existingControlsCredit: 4,
  residualRiskLowCredit: 10,
  residualRiskMediumCredit: 5,
} as const;

const LEVEL_THRESHOLDS = { critical: 75, high: 55, medium: 30 } as const;

//-----------------------------------------------------------
// HELPERS: read form answers safely
//-----------------------------------------------------------

/** True if the answer has any content (non-empty text or non-empty list). */
function isFilledIn(answer: unknown): boolean {
  if (Array.isArray(answer)) return answer.length > 0;
  if (typeof answer === 'string') return answer.trim().length > 0;
  return answer != null;
}

/** True if the answer is "yes" (or boolean true). */
function isYes(answer: unknown): boolean {
  return answer === true || (typeof answer === 'string' && answer.toLowerCase() === 'yes');
}

/** Converts a checkbox answer into a lowercase string array. */
function toLowercaseList(answer: unknown): string[] {
  const items = Array.isArray(answer) ? answer : answer ? [answer] : [];
  return items.map((item) => String(item).toLowerCase());
}

/** Converts "low" | "medium" | "high" to 1 | 2 | 3. Anything else becomes medium. */
function ratingToNumber(answer: unknown): number {
  return RATING_TO_NUMBER[String(answer).toLowerCase()] ?? DEFAULT_RATING_NUMBER;
}

//-----------------------------------------------------------
// SCORE PARTS: each returns points for one section
//-----------------------------------------------------------

function scoreLikelihoodImpact(answers: FormAnswers): number {
  const likelihood = ratingToNumber(answers.riskLikelihood);
  const impact = ratingToNumber(answers.riskImpact);
  return Math.round((likelihood * impact / MAX_RATING_PRODUCT) * SCORE_WEIGHTS.likelihoodImpactMax);
}

function scoreDataSensitivity(answers: FormAnswers): number {
  const sensitiveCategoryCount = toLowercaseList(answers.dataCategories).filter((category) =>
    SENSITIVE_DATA_KEYWORDS.some((keyword) => category.includes(keyword)),
  ).length;

  const categoryPoints = Math.min(
    SCORE_WEIGHTS.sensitiveCategoriesMax,
    sensitiveCategoryCount * SCORE_WEIGHTS.sensitiveCategoryPoints,
  );
  const minorsPoints = isYes(answers.minorsDataInvolved) ? SCORE_WEIGHTS.minorsDataPoints : 0;

  return categoryPoints + minorsPoints;
}

function scoreExposure(answers: FormAnswers): number {
  let points = 0;

  if (isYes(answers.isTransferredToThirdParties)) {
    points += SCORE_WEIGHTS.thirdPartyTransferPoints;
  }

  if (isYes(answers.isDataShared)) {
    points += isYes(answers.hasSharingAgreement)
      ? SCORE_WEIGHTS.sharedWithAgreementPoints
      : SCORE_WEIGHTS.sharedWithoutAgreementPoints;
  }

  const usesRiskyStorage = toLowercaseList(answers.storageLocations).some((location) =>
    RISKY_STORAGE_PATTERN.test(location),
  );
  if (usesRiskyStorage) points += SCORE_WEIGHTS.riskyStoragePoints;

  if (toLowercaseList(answers.dataSubjects).length >= SCORE_WEIGHTS.manyDataSubjectsThreshold) {
    points += SCORE_WEIGHTS.manyDataSubjectsPoints;
  }

  return points;
}

function scoreControlGaps(answers: FormAnswers): number {
  let points = 0;

  if (!isFilledIn(answers.technicalSafeguards)) points += SCORE_WEIGHTS.missingTechnicalSafeguardsPoints;
  if (!isFilledIn(answers.organizationalSafeguards)) points += SCORE_WEIGHTS.missingOrganizationalSafeguardsPoints;
  if (!isFilledIn(answers.physicalSafeguards)) points += SCORE_WEIGHTS.missingPhysicalSafeguardsPoints;
  if (!isFilledIn(answers.retentionPeriod)) points += SCORE_WEIGHTS.missingRetentionPeriodPoints;
  if (!isFilledIn(answers.disposalMethods)) points += SCORE_WEIGHTS.missingDisposalMethodsPoints;
  if (!isYes(answers.isPurposeDocumented)) points += SCORE_WEIGHTS.purposeNotDocumentedPoints;

  return points;
}

/** Returns a negative number (credit) that lowers the total score. */
function scoreMitigationCredit(answers: FormAnswers): number {
  let credit = 0;

  if (isFilledIn(answers.existingControls)) credit -= SCORE_WEIGHTS.existingControlsCredit;

  const residualRisk = String(answers.residualRiskLevel).toLowerCase();
  if (residualRisk === 'low') credit -= SCORE_WEIGHTS.residualRiskLowCredit;
  else if (residualRisk === 'medium') credit -= SCORE_WEIGHTS.residualRiskMediumCredit;

  return credit;
}

function scoreToLevel(score: number): RiskLevel {
  if (score >= LEVEL_THRESHOLDS.critical) return 'critical';
  if (score >= LEVEL_THRESHOLDS.high) return 'high';
  if (score >= LEVEL_THRESHOLDS.medium) return 'medium';
  return 'low';
}

//-----------------------------------------------------------
// PUBLIC FUNCTION
//-----------------------------------------------------------

export function computeRisk(answers: FormAnswers) {

  const breakdown = {
    base: scoreLikelihoodImpact(answers),
    sensitivity: scoreDataSensitivity(answers),
    exposure: scoreExposure(answers),
    gaps: scoreControlGaps(answers),
    mitigation: scoreMitigationCredit(answers),
  };

  const rawTotal = Object.values(breakdown).reduce((sum, points) => sum + points, 0);
  const score = Math.max(0, Math.min(100, rawTotal));

  return { 
    score, 
    level: scoreToLevel(score), 
    breakdown 
  };
}