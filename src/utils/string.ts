export const getInitials = (name?: string | null): string => {
  if (!name?.trim()) return "?";

  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface NameData {
  firstName?: string;
  first_name?: string;
  middleName?: string | null;
  middle_name?: string | null;
  lastName?: string;
  last_name?: string;
  suffix?: string | null;
}

export const getFullName = (data: NameData): string =>
  [
    data.firstName || data.first_name,
    data.middleName || data.middle_name,
    data.lastName || data.last_name,
    data.suffix,
  ]
    .filter(Boolean)
    .join(" ");