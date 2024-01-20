import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const LOCALE_JST = "Asia/Tokyo";
const FORMAT_TEMPLATE_DATE_TIME = "yyyy/MM/dd k:mm:ss";
const FORMAT_TEMPLATE_DATE = "yyyy/MM/dd";

export const parseDate = (src: string): Date => {
  return parseISO(new Date(src).toISOString());
};

export const formatAsJSTDateTime = (src: Date) =>
  format(src, LOCALE_JST, FORMAT_TEMPLATE_DATE_TIME);
export const formatAsJSTDate = (src: Date) =>
  format(src, LOCALE_JST, FORMAT_TEMPLATE_DATE);

const format = (src: Date, toLocale: string, format: string): string => {
  return formatInTimeZone(src, toLocale, format);
};
