/**
 * Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * 
 * Implement KthLargest class:
 *     KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
 *     int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.
 */
export default class KthLargest {
    private k = 0;
    private arr = [];

    constructor(k: number, nums: number[]) {
        this.k = k;
        for (let i = 0; i < nums.length; i++)
            this.add(nums[i]);
    }

    add(val: number): number {
        const newIndex = this.findIndex(val);
        if (newIndex <= this.k - 1)
            this.arr.splice(newIndex, 0, val);
        if (this.arr.length > this.k)
            this.arr.pop();
        return this.arr[this.k - 1];
    }

    private findIndex(val: number) {
        // if arr is empty, it can be seeded with any value
        if (this.arr.length === 0)
            return 0;
        
        let i = 0;
        let leftIndex = 0;
        let rightIndex = this.arr.length - 1;
        do {
            // binary search for log n time
            i = Math.floor(leftIndex + 0.5 * (rightIndex - leftIndex));

            // bounding index are adjacent, return left, right, or right+
            if (Math.abs(rightIndex - leftIndex) <= 1) {
                if (val > (this.arr[leftIndex] ? this.arr[leftIndex] : 0))
                    return leftIndex;
                if (val > (this.arr[rightIndex] ? this.arr[rightIndex] : 0))
                    return rightIndex
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
        } while(true)
    }
}
