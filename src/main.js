import tree from "./bst.js";

const myTree = tree([10, 5, 15, 3, 7, 12, 18]);

// Pretty Print the tree
console.log("Initial Tree:");
myTree.prettyPrint();

// Insert nodes
myTree.insert(20);
myTree.insert(1);
console.log("\nTree after inserting 20 and 1:");
myTree.prettyPrint();

// Delete nodes
myTree.deleteItem(5);
console.log("\nTree after deleting node 5:");
myTree.prettyPrint();

// Find nodes
console.log("\nFinding node 15:", myTree.find(15));
console.log("Finding node 100 (should be null):", myTree.find(100));

// Calculate height of specific nodes
console.log("\nHeight of node 15:", myTree.height(15));
console.log("Height of node 20:", myTree.height(20));

// Calculate depth of specific nodes
console.log("\nDepth of node 15:", myTree.depth(15));
console.log("Depth of node 20:", myTree.depth(20));

// Level Order Traversal
console.log("\nLevel Order Traversal:");
console.log(myTree.levelOrder());

// Pre-Order Traversal
myTree.preOrder();
console.log("\nPre-Order Traversal:");
console.log(myTree.traversed);

// In-Order Traversal
myTree.inOrder();
console.log("\nIn-Order Traversal:");
console.log(myTree.traversed);

// Post-Order Traversal
myTree.postOrder();
console.log("\nPost-Order Traversal:");
console.log(myTree.traversed);

// Check if the tree is balanced
console.log("\nIs the tree balanced?:", myTree.isBalanced());

// Rebalance the tree
myTree.rebalance();
console.log("\nTree after rebalancing:");
myTree.prettyPrint();

// Check if the tree is balanced after rebalancing
console.log("\nIs the tree balanced after rebalancing?:", myTree.isBalanced());