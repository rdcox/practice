"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KthLargestElementInAStream_1 = require("./KthLargestElementInAStream");
describe('Kth Largest Element in a Stream', () => {
    it('Example 1', () => {
        const testClass = new KthLargestElementInAStream_1.default(3, [4, 5, 8, 2]);
        expect(testClass['arr'][0]).toEqual(8);
        expect(testClass['arr'][1]).toEqual(5);
        expect(testClass['arr'][2]).toEqual(4);
        expect(testClass['arr'].length).toEqual(3);
    });
    it('Example 2', () => {
        const testClass = new KthLargestElementInAStream_1.default(1, []);
        testClass.add(-3);
        expect(testClass['arr'][0]).toEqual(-3);
        expect(testClass['arr'].length).toEqual(1);
        testClass.add(-2);
        expect(testClass['arr'][0]).toEqual(-2);
        expect(testClass['arr'].length).toEqual(1);
    });
});
