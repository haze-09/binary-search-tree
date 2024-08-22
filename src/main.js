import tree from "./bst.js";

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let newTree = tree(array);

newTree.insert(70);

newTree.insert(22)

newTree.deleteItem(8)

newTree.deleteItem(70)


newTree.prettyPrint()


// console.log(newTree.root.right.right);
