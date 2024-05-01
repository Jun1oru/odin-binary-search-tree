import { Tree, prettyPrint } from './app.mjs';

function createArray() {
  const array = [];
  for (let i = 0; i < 20; i++) {
    const num = Math.floor(Math.random() * 100);
    array.push(num);
  }
  return array;
}

function insertRandomNumbers(count, tree) {
  for (let i = 0; i < count; i++) {
    const num = Math.floor(Math.random() * 1000 + 100);
    tree.insert(tree.root, num);
  }
}

const myTree = new Tree(createArray());
prettyPrint(myTree.root);
console.log(`Is tree balanced? ${myTree.isBalanced()}`);
console.log('Tree levelOrder: ', myTree.levelOrder());
console.log('Tree preOrder: ', myTree.preOrder());
console.log('Tree inOrder: ', myTree.inOrder());
console.log('Tree postOrder: ', myTree.postOrder());
insertRandomNumbers(5, myTree);
console.log(`Is tree balanced? ${myTree.isBalanced()}`);
myTree.rebalance();
console.log(`Is tree balanced? ${myTree.isBalanced()}`);
console.log('Tree levelOrder: ', myTree.levelOrder());
console.log('Tree preOrder: ', myTree.preOrder());
console.log('Tree inOrder: ', myTree.inOrder());
console.log('Tree postOrder: ', myTree.postOrder());
