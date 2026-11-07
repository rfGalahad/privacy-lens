import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import type { RiskLevel } from '@/lib/supabase/pia';

import type { PIAReportData } from './reportTypes';

const LEVEL_ORDER: RiskLevel[] = ['low', 'medium', 'high', 'critical'];
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 } as const;
const LEVEL_COLORS: Record<RiskLevel, string> = {
  low: '#1f9d55', medium: '#c67c00', high: '#e0393e', critical: '#9b1c1c',
};

const BREAKDOWN_LABELS = [
  ['base', 'Likelihood × impact'],
  ['sensitivity', 'Data sensitivity'],
  ['exposure', 'Exposure'],
  ['gaps', 'Control gaps'],
  ['mitigation', 'Mitigation credit'],
] as const;

const styles = StyleSheet.create({
  page: { padding: 40, paddingBottom: 56, fontSize: 10, fontFamily: 'Helvetica', color: '#1a1a1a' },
  title: { fontSize: 18, fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  subtitle: { color: '#555', marginBottom: 12 },
  h2: { fontSize: 13, fontFamily: 'Helvetica-Bold', marginTop: 18, marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  box: { border: '0.5pt solid #bbb', padding: 10, marginBottom: 8 },
  item: { marginBottom: 8, paddingBottom: 6, borderBottom: '0.5pt solid #ddd' },
  itemTitle: { fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  muted: { color: '#666' },
  tag: { color: '#555', fontSize: 8 },
  signGrid: { flexDirection: 'row', gap: 12, marginTop: 6 },
  signCell: { flex: 1, borderTop: '0.5pt solid #333', paddingTop: 4 },
  footer: { position: 'absolute', bottom: 24, left: 40, right: 40, fontSize: 8, color: '#777',
    flexDirection: 'row', justifyContent: 'space-between' },
});

const visible = <T extends { decision: string }>(items: T[]) =>
  items.filter((item) => item.decision !== 'rejected');

const tagFor = (item: { source: string; decision: string }) =>
  item.source === 'analyst' ? 'Added by analyst' : item.decision === 'edited' ? 'Edited by analyst' : '';

const Tag = ({ item }: { item: { source: string; decision: string } }) =>
  tagFor(item) ? <Text style={styles.tag}>{tagFor(item)}</Text> : null;

export const PIAReportDocument = ({ data }: { data: PIAReportData }) => {
  const risks = visible(data.review.risks).sort(
    (a, b) => LEVEL_ORDER.indexOf(b.level) - LEVEL_ORDER.indexOf(a.level),
  );
  const gaps = visible(data.review.gaps);
  const recommendations = visible(data.review.recommendations).sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
  );
  const { signOffs } = data;

  return (
    <Document title={`PIA - ${data.projectName}`} author={signOffs.reviewedBy.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Privacy Impact Assessment</Text>
        <Text style={styles.subtitle}>
          {data.projectName} · {data.department} · Assessed {data.dateOfAssessment} · Officer: {data.responsibleOfficerName}
        </Text>

        {/* Final result */}
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={{ fontSize: 13, fontFamily: 'Helvetica-Bold', color: LEVEL_COLORS[data.finalLevel] }}>
              Final risk level: {data.finalLevel.toUpperCase()}
            </Text>
            <Text style={styles.muted}>
              Computed {data.computed.score}/100 ({data.computed.level}) · AI: {data.aiLevel}
            </Text>
          </View>
          {data.levelJustification ? (
            <Text style={[styles.muted, { marginTop: 4 }]}>Analyst justification: {data.levelJustification}</Text>
          ) : null}
        </View>

        <Text style={styles.h2}>Score breakdown (rules-based)</Text>
        {BREAKDOWN_LABELS.map(([key, label]) => (
          <View key={key} style={styles.row}>
            <Text>{label}</Text>
            <Text>{data.computed.breakdown[key] > 0 ? `+${data.computed.breakdown[key]}` : data.computed.breakdown[key]}</Text>
          </View>
        ))}

        <Text style={styles.h2}>Summary</Text>
        <Text>{data.review.summary}</Text>

        <Text style={styles.h2}>Risks ({risks.length})</Text>
        {risks.map((risk) => (
          <View key={risk.id} style={styles.item} wrap={false}>
            <Text style={styles.itemTitle}>
              {risk.risk} <Text style={{ color: LEVEL_COLORS[risk.level] }}>[{risk.level}]</Text>
            </Text>
            <Text style={styles.muted}>{risk.justification}</Text>
            <Text style={styles.tag}>
              {risk.section} · Likelihood: {risk.likelihood} · Impact: {risk.impact}
            </Text>
            <Tag item={risk} />
          </View>
        ))}

        <Text style={styles.h2}>Gaps ({gaps.length})</Text>
        {gaps.map((gap) => (
          <View key={gap.id} style={styles.item} wrap={false}>
            <Text><Text style={styles.itemTitle}>{gap.section}: </Text>{gap.issue}</Text>
            <Tag item={gap} />
          </View>
        ))}

        <Text style={styles.h2}>Recommendations ({recommendations.length})</Text>
        {recommendations.map((rec, index) => (
          <View key={rec.id} style={styles.item} wrap={false}>
            <Text style={styles.itemTitle}>{index + 1}. {rec.action}</Text>
            <Text style={styles.tag}>
              Priority: {rec.priority} · Effort: {rec.effort} · Addresses: {rec.relatedRisk}
            </Text>
            <Tag item={rec} />
          </View>
        ))}

        <Text style={styles.h2}>Approval and sign-off</Text>
        <View style={styles.signGrid} wrap={false}>
          {([
            ['Prepared by', signOffs.preparedBy],
            ['Reviewed by (DPO)', signOffs.reviewedBy],
            ['Approved by', signOffs.approvedBy],
          ] as const).map(([label, person]) => (
            <View key={label} style={styles.signCell}>
              <Text style={styles.muted}>{label}</Text>
              <Text style={styles.itemTitle}>{person.name}</Text>
              <Text>{person.signature}</Text>
              <Text style={styles.muted}>{person.date}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.muted, { marginTop: 16 }]}>
          Drafted with AI assistance. Each finding was reviewed, edited or rejected by an analyst and finalized on {data.finalizedAt}.
        </Text>

        <View style={styles.footer} fixed>
          <Text>PIA · {data.projectName}</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};