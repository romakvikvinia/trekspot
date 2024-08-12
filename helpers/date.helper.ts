import { parseISO } from "date-fns";

export function formatTheDate(date: any) {
  const [year, month, day] = date.substr(0, 10).split("-");
  return new Date(year, month - 1, day);
}

export const parseStringDate = (dateString: string): Date => {
  const ISODate = new Date(dateString).toISOString();
  return parseISO(ISODate);
};
