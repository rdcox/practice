/**
 * Given two strings s and goal, return true if you can swap two letters in s so the result is equal to goal, otherwise, return false.
 * Swapping letters is defined as taking two indices i and j (0-indexed) such that i != j and swapping the characters at s[i] and s[j].
 * 
 * For example, swapping at indices 0 and 2 in "abcd" results in "cbad".
 */
export default function buddyStrings(s: string, goal: string): boolean {
    const sArr = s.split('');
    const goalArr = goal.split('');
    let firstIndex = -1;
    let result = false;
    // words must agree on length, else false
    if (s.length !== goal.length) return false;
    // the same word will always be true if it has any repeated letter
    if (s === goal) {
        const letters: {[key: string]: boolean} = {};
        for (let i = 0; i < sArr.length; i++) {
            if (letters[sArr[i]]) return true;
            letters[sArr[i]] = true;
        }
        return false;
    }
    // different words will be true, if exactly 2 letters can be swapped
    for (let i = 0; i < sArr.length; i++) {
        if (sArr[i] !== goalArr[i]) {
            if (firstIndex === -1) {
                firstIndex = i;
                continue;
            }
            if (firstIndex >= 0 && 
                sArr[firstIndex] === goalArr[i] &&
                sArr[i] === goalArr[firstIndex] &&
                result === false) {
                result = true;
            }
            else {
                result = false;
                break;
            }
        }
    }
    return result;
}