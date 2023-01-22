import dayjs from "dayjs";
import { generateDatesFromRange } from "./generate-dates-from-range";

export function generateDatesFromLastQuarter() {
    return generateDatesFromRange(
        dayjs().utc().startOf("week").subtract(17, "weeks").toDate(),
        dayjs().utc().startOf("day").toDate(),
    )
}
