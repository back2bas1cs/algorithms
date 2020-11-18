"use strict";

/*   
Given an array (arr) of (n) integers where n > 1, return an array (output) 
such that output[i] is equal to the product of all the elements of arr except arr[i]

  EX:
    arr = [1, 2, 3, 4]
    product = [24, 12, 8, 6]
*/

/*
SOLUTION #1: 
n = # of elements in input array
+ RUNTIME Complexity: O(2n) → O(n) [WST]
+ SPACE Complexity: O(n) [BST/WST]
NOTE: Loop through and find the product of all the elements in the array. Then, loop through again and divide
the product by the given element (arr[i]) of the input array, adding the result to the output array (output).
*/


const productExceptSelf = arr => {
  let product = arr.reduce((prod, el) => {
      return prod * el;
    });
  return arr.reduce((output, el) => {
    output.push(product / el);
    return output;
  },[]);
}


/*
SOLUTION #2 (without using division):
n = # of elements in input array
+ RUNTIME Complexity: O(3n) → O(n) [WST]
+ SPACE Complexity: O(3n) [BST/WST]
NOTE: Each element of the output array is just the product of all the elements to the right of the element
  at the given index (in the input array), and all the elements to its left.
*/

const productExceptSelfV2 = arr => {
  let leftProd = arr.reduce(([prod, leftArr], el) => {
    leftArr.push(prod);
    prod *= el;
    return [prod, leftArr];
  }, [1, []]);
  let rightProd = arr.reduceRight(([prod, rightArr], el) => {
    rightArr.unshift(prod);
    prod *= el;
    return [prod, rightArr];
  }, [1, []]);
  return leftProd[1].map((leftEl, i) => leftEl * rightProd[1][i]);
}

/*
SOLUTION #3 (constant SPACE complexity):
n = # of elements in input array
+ RUNTIME Complexity: O(2n) → O(n) [WST]
+ SPACE Complexity: O(1 [)BST/WST]
NOTE: 
*/

const productExceptSelfV3 = arr => {
  let prod = 1;
  let output = arr.reduce((leftArr, el) => {
    leftArr.push(prod);
    prod *= el;
    return leftArr;
  }, []);
 prod = 1;
 for (let i = arr.length - 1; i >= 0; i--) {
   output[i] = output[i] * prod;
   prod *= arr[i];
 }
  return output;
}

console.log(JSON.stringify(productExceptSelfV3([1, 2, 3, 4])));
