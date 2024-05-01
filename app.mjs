function mergeSort(array) {
  if (array.length < 2) return array;
  const half = array.length / 2;

  const leftArr = array.slice(0, half);
  const rightArr = array.slice(half);

  const leftSort = mergeSort(leftArr);
  const rightSort = mergeSort(rightArr);

  return merge(leftSort, rightSort);
}

function merge(left, right) {
  let leftIndex = 0,
    rightIndex = 0;
  let mergedArr = [];
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      mergedArr.push(left[leftIndex]);
      leftIndex++;
    } else {
      mergedArr.push(right[rightIndex]);
      rightIndex++;
    }
  }
  mergedArr = mergedArr
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
  const uniqueSet = [...new Set(mergedArr)];
  return uniqueSet;
}

export class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    this.array = array;
    this.sortedArray = mergeSort(array);
    this.root = this.buildTree(
      this.sortedArray,
      0,
      this.sortedArray.length - 1
    );
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    let middle = Math.floor((start + end) / 2);

    const root = new Node(array[middle]);

    root.left = this.buildTree(array, start, middle - 1);
    root.right = this.buildTree(array, middle + 1, end);

    return root;
  }

  insert(node, value) {
    if (node === null) {
      node = new Node(value);
      return node;
    }

    if (value < node.data) {
      node.left = this.insert(node.left, value);
    } else if (value > node.data) {
      node.right = this.insert(node.right, value);
    }

    return node;
  }

  delete(root, value) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.delete(root.left, value);
    } else if (value > root.data) {
      root.right = this.delete(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
      root.data = this.minValue(root.right);

      root.right = this.delete(root.right, root.data);
    }

    return root;
  }

  minValue(node) {
    let min = node.data;
    while (node.left !== null) {
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  find(node, value) {
    if (node === null) return;

    if (value < node.data) {
      node = this.find(node.left, value);
    } else if (value > node.data) {
      node = this.find(node.right, value);
    }
    return node;
  }

  levelOrder(callback = null) {
    if (this.root === null) return;
    const queue = [];
    const array = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const node = queue.shift();
      if (callback) {
        callback(node.data);
      }

      array.push(node.data);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    if (!callback) {
      return array;
    }
  }

  inOrder(callback = null) {
    const array = [];

    function inOrderRecursive(node) {
      if (node === null) return;
      inOrderRecursive(node.left);

      if (callback) {
        callback(node.data);
      }
      array.push(node.data);

      inOrderRecursive(node.right);
    }
    inOrderRecursive(this.root);
    if (!callback) {
      return array;
    }
  }

  preOrder(callback = null) {
    const array = [];

    function preOrderRecursive(node) {
      if (node === null) return;
      if (callback) {
        callback(node.data);
      }
      array.push(node.data);
      preOrderRecursive(node.left);
      preOrderRecursive(node.right);
    }
    preOrderRecursive(this.root);
    if (!callback) {
      return array;
    }
  }

  postOrder(callback = null) {
    const array = [];

    function postOrderRecursive(node) {
      if (node === null) return;
      postOrderRecursive(node.left);
      postOrderRecursive(node.right);
      if (callback) {
        callback(node.data);
      }
      array.push(node.data);
    }
    postOrderRecursive(this.root);
    if (!callback) {
      return array;
    }
  }

  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null) return;

    function depthUtil(root, value) {
      if (root === null) return -1;
      let depthNumber = -1;
      if (
        root.data === value ||
        (depthNumber = depthUtil(root.left, value)) >= 0 ||
        (depthNumber = depthUtil(root.right, value)) >= 0
      ) {
        return depthNumber + 1;
      }
      return depthNumber;
    }
    return depthUtil(this.root, node.data);
  }

  isBalanced() {
    if (this.root === null) return true;
    let isBalanced = false;
    function isBalancedUtil(node, tree) {
      if (node === null) return true;
      const leftHeight = tree.height(node.left);
      const rightHeight = tree.height(node.right);
      if (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        isBalancedUtil(node.left, tree) === true &&
        isBalancedUtil(node.right, tree) === true
      ) {
        isBalanced = true;
        return isBalanced;
      } else {
        isBalanced = false;
        return isBalanced;
      }
    }
    isBalancedUtil(this.root, this);
    return isBalanced;
  }

  rebalance() {
    if (this.isBalanced() === true) return;
    // const myArray = this.inOrder();
    // const sortArray = [];
    // myArray.forEach((elem) => {
    //   sortArray.push(elem.data);
    // });
    // const myArraySorted = mergeSort(sortArray);
    // this.array = sortArray;
    // this.sortedArray = myArraySorted;
    // this.root = this.buildTree(
    //   this.sortedArray,
    //   0,
    //   this.sortedArray.length - 1
    // );
    const myArray = this.inOrder();
    const myArraySorted = mergeSort(myArray);
    this.array = myArray;
    this.sortedArray = myArraySorted;
    this.root = this.buildTree(
      this.sortedArray,
      0,
      this.sortedArray.length - 1
    );
  }
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(
      node.right,
      `${prefix}${isLeft ? '│   ' : '    '}`,
      false
    );
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(
      node.left,
      `${prefix}${isLeft ? '    ' : '│   '}`,
      true
    );
  }
};
