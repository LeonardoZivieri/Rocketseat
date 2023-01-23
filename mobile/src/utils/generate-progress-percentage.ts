
export function generateProgressPercentage(
    total: number,
    completed: number
) {
    return Math.round(100 * completed / total)
}