import KthLargest from './KthLargestElementInAStream';

describe('Kth Largest Element in a Stream', () => {
    it('Example 1', () => {
        const testClass = new KthLargest(3, [4, 5, 8, 2]);
        expect(testClass['arr'][0]).toEqual(8);
        expect(testClass['arr'][1]).toEqual(5);
        expect(testClass['arr'][2]).toEqual(4);
        expect(testClass['arr'].length).toEqual(3);
    });

    it('Example 2', () => {
        const testClass = new KthLargest(1, []);
        testClass.add(-3);
        expect(testClass['arr'][0]).toEqual(-3);
        expect(testClass['arr'].length).toEqual(1);

        testClass.add(-2);
        expect(testClass['arr'][0]).toEqual(-2);
        expect(testClass['arr'].length).toEqual(1);
    });
});