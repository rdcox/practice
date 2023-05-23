"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KthLargest {
    k = 0;
    arr = [];
    constructor(k, nums) {
        this.k = k;
        for (let i = 0; i < nums.length; i++)
            this.add(nums[i]);
    }
    add(val) {
        const newIndex = this.findIndex(val);
        if (newIndex <= this.k - 1)
            this.arr.splice(newIndex, 0, val);
        if (this.arr.length > this.k)
            this.arr.pop();
        return this.arr[this.k - 1];
    }
    findIndex(val) {
        let i = 0;
        let leftIndex = 0;
        let rightIndex = this.arr.length - 1 < 0 ? 0 : this.arr.length - 1;
        do {
            i = Math.floor(leftIndex + 0.5 * (rightIndex - leftIndex));
            // if the array is empty, index is always 0
            if (this.arr.length === 0)
                return 0;
            // bounding index are adjacent, return left, right, or right+
            if (Math.abs(rightIndex - leftIndex) <= 1) {
                if (val > (this.arr[leftIndex] ? this.arr[leftIndex] : 0))
                    return leftIndex;
                if (val > (this.arr[rightIndex] ? this.arr[rightIndex] : 0))
                    return rightIndex;
                else
                    return rightIndex + 1;
            }
            if (this.arr[i] === val) {
                return i;
            }
            if (this.arr[i] > val) {
                leftIndex = i;
                continue;
            }
            if (this.arr[i] < val) {
                rightIndex = i;
                continue;
            }
        } while (true);
    }
}
exports.default = KthLargest;
