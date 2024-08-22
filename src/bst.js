function node(data, left = null, right = null) {
  return { data, left, right };
}

function tree(unsortedArray) {
  const processArray = (unsortedArray) => {
    let unique = unsortedArray.filter(
      (item, index) => unsortedArray.indexOf(item) === index
    );
    return unique.sort((a, b) => a - b);
  };

  const buildtree = (array, start = 0, end = array.length - 1) => {
    if (start > end) {
      return null;
    } else {
      let mid = parseInt((start + end) / 2);
      let newNode = node(array[mid]);
      newNode.left = buildtree(array, start, mid - 1);
      newNode.right = buildtree(array, mid + 1, end);
      return newNode;
    }
  };

  let root = buildtree(processArray(unsortedArray));

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insert = (value, currentNode = root) => {
    if (value > currentNode.data) {
      if (currentNode.right === null) {
        currentNode.right = node(value);
      } else {
        insert(value, currentNode.right);
      }
    } else {
      if (currentNode.left === null) {
        currentNode.left = node(value);
      } else {
        insert(value, currentNode.left);
      }
    }
  };

  const deleteItem = (value) => {
    root = deleteItemRecursive(value, root);
  };

  const deleteItemRecursive = (value, currentNode) => {
    if (currentNode === null) {
      return null;
    }

    if (value < currentNode.data) {
      currentNode.left = deleteItemRecursive(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = deleteItemRecursive(value, currentNode.right);
    } else {
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode.left;
      }

      currentNode.data = minValue(currentNode.right);
      currentNode.right = deleteItemRecursive(
        currentNode.data,
        currentNode.right
      );
    }
    return currentNode;
  };

  const minValue = (node) => {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  };

  const find = (value, currentNode = root) => {
    if (currentNode === null) {
      return null;
    }
    if (value === currentNode.data) {
      return currentNode;
    } else if (value > currentNode.data) {
      return find(value, currentNode.right);
    } else {
      return find(value, currentNode.left);
    }
  };

  let traversed = [];

  const clear = () => {
    traversed = [];
  };

  const storeInTraversed = (node) => {
    traversed.push(node.data);
  };

  const levelOrder = (currentNode = root) => {
    let queue = [];
    clear();

    if (currentNode !== null) {
      queue.push(currentNode);
    }

    while (queue.length > 0) {
      let node = queue.shift();

      storeInTraversed(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return traversed;
  };

  const preOrder = (currentNode = root) => {
    clear();
    const traverse = (node) => {
      if (node === null) return;

      storeInTraversed(node);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(currentNode);
  };

  const inOrder = (currentNode = root) => {
    clear();
    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);
      storeInTraversed(node);
      traverse(node.right);
    };
    traverse(currentNode);
  };

  const postOrder = (currentNode = root) => {
    clear();
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      storeInTraversed(node);
    };
    traverse(currentNode);
  };

  const heightOfNode = (node) => {
    if (node === null) {
      return -1;
    }
    let leftHeight = heightOfNode(node.left);
    let rightHeight = heightOfNode(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  };

  const height = (value) => {
    const node = find(value);
    if (node === null) {
      throw new Error("Node not found in the tree.");
    }
    return heightOfNode(node);
  };

  const depthOfNode = (node, currentNode = root, currentDepth = 0) => {
    if (currentNode === null) {
      return -1;
    }

    if (currentNode === node) {
      return currentDepth;
    }

    let leftDepth = depthOfNode(node, currentNode.left, currentDepth + 1);
    if (leftDepth !== -1) {
      return leftDepth;
    }

    let rightDepth = depthOfNode(node, currentNode.right, currentDepth + 1);
    return rightDepth;
  };

  const depth = (value) => {
    const node = find(value);
    if (node === null) {
      throw new Error("Node not found in the tree.");
    }
    return depthOfNode(node);
  };

  const isBalanced = (node = root) => {
    const checkBalance = (currentNode) => {
      if (currentNode === null) {
        return { height: 0, balanced: true };
      }

      let left = checkBalance(currentNode.left);
      if (!left.balanced) {
        return { height: 0, balanced: false };
      }

      let right = checkBalance(currentNode.right);
      if (!right.balanced) {
        return { height: 0, balanced: false };
      }

      let heightDiff = Math.abs(left.height - right.height);
      let balanced = heightDiff <= 1;
      let height = Math.max(left.height, right.height) + 1;

      return { height, balanced };
    };

    return checkBalance(node).balanced;
  };

  const rebalance = () => {
    clear();
    inOrder();
    // unsortedArray = traversed;
    root = buildtree(traversed);
  };

  return {
    buildtree,
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
    get root() {
      return root;
    },
    get traversed() {
      return traversed;
    },
  };
}

export default tree;
