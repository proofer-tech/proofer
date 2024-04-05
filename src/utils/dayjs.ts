import dayjs from "dayjs";
import "dayjs/locale/ko";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.locale("ko");
dayjs.extend(customParseFormat);
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
