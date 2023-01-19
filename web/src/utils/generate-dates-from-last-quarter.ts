import dayjs from "dayjs";
import { generateDatesFromRange } from "./generate-dates-from-range";

export function generateDatesFromLastQuarter() {
    return generateDatesFromRange(
        dayjs().startOf("week").subtract(17, "weeks").toDate(),
        dayjs().startOf("day").toDate(),
    )
}
