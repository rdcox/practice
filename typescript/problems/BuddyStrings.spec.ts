import buddyStrings from "./BuddyStrings";

describe('Buddy Strings', () => {
    it('Example 1', () => {
        const res = buddyStrings("ab", "ba");
        expect(res).toEqual(true);
    });

    it('Example 2', () => {
        const res = buddyStrings("ac", "ba");
        expect(res).toEqual(false);
    });

    it('Example 3', () => {
        const res = buddyStrings("aa", "aa");
        expect(res).toEqual(true);
    });

    it('Example 4', () => {
        const res = buddyStrings("aaaaaaabc", "aaaaaaacb");
        expect(res).toEqual(true);
    });
});