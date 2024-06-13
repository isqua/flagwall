/**
 * Rough fuzzy search that finds "omit" in "jOhn sMITh".
 *
 * @param value value to check, e.g. a page title "jOhn sMITh"
 * @param normalizedSearch string to search in the value, e.g. "omit"
 * @returns boolean if the value matches the search string
 */
export function isTextMatch(value: string, search: string) {
    const normalizedValue = value.toLowerCase();
    const normalizedSearch = search.toLowerCase();

    let valuePointer = 0;
    let searchPointer = 0;

    while (
        valuePointer < normalizedValue.length &&
        searchPointer < normalizedSearch.length
    ) {
        if (normalizedSearch[searchPointer] === " ") {
            searchPointer++;
            continue;
        }

        if (normalizedValue[valuePointer] === normalizedSearch[searchPointer]) {
            searchPointer++;
        }

        valuePointer++;
    }

    return searchPointer === normalizedSearch.length;
}
