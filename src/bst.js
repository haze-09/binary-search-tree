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

  const buildtree = (
    array = processArray(unsortedArray),
    start = 0,
    end = array.length - 1
  ) => {
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

  let root = buildtree();

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

  const levelOrder = (callback) => {
    
  };

  const inOrder = (callback) => {};

  const preOrder = (callback) => {};

  const postOrder = (callback) => {};

  const height = (node) => {};

  const depth = (node) => {};

  const isBalanced = () => {};

  const rebalance = () => {};

  return {
    buildtree,
    prettyPrint,
    insert,
    deleteItem,
    find,
    get root() {
      return root;
    },
  };
}

export default tree;
