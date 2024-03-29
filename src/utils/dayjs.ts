import dayjs from "dayjs";
import "dayjs/locale/ko";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.locale("ko");
dayjs.extend(customParseFormat);
export default dayjs;
