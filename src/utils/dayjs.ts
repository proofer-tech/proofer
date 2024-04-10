import dayjs from "dayjs";
import "dayjs/locale/en";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";

dayjs.locale("ko");
dayjs.extend(customParseFormat);
dayjs.extend(duration);
export default dayjs;

export function getDay(date: Date) {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

export function startOfWeek(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - getDay(date),
  );
}

export function endOfWeek(date: Date) {
  return dayjs(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + (6 - getDay(date)),
    ),
  )
    .endOf("date")
    .toDate();
}

export const formatDuration = (milliseconds: number): string => {
  const dayJsDuration = dayjs.duration(milliseconds, "milliseconds");
  const nbDays = dayJsDuration.get("day");
  const nbHours = dayJsDuration.get("hour");
  const nbMinutes = dayJsDuration.get("minute");
  const nbSeconds = dayJsDuration.get("second");

  let formattedDuration = [];
  if (nbDays > 0) {
    formattedDuration.push(`${nbDays} Days`);
  }
  if (nbHours > 0) {
    formattedDuration.push(`${nbHours} Hours`);
  }
  if (nbMinutes > 0) {
    formattedDuration.push(`${nbMinutes} Minutes`);
  }
  if (formattedDuration.length === 0 && nbSeconds > 0) {
    formattedDuration.push(`${nbSeconds} Seconds`);
  }

  if (formattedDuration.length === 0) formattedDuration.push("-");

  return formattedDuration.join(" ");
};
