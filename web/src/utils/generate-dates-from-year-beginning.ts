import dayjs from "dayjs";
import { generateDatesFromRange } from "./generate-dates-from-range";

export function generateDatesFromYearBeginning() {
    return generateDatesFromRange(
        dayjs().startOf("year").toDate(),
        dayjs().startOf("day").toDate(),
    )
}
