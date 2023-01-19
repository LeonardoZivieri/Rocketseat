
export function generateDatesFromRange(
    startDate: Date,
    endDate: Date,
    range: number = 24 * 60 * 60 * 1000 // 1 Day by default
) {
    const dates = [];

    let compareDate = startDate;
    do {
        dates.push(compareDate);
        compareDate = new Date(compareDate.getTime() + range);
    } while (compareDate.getTime() <= endDate.getTime());

    return dates;
}
