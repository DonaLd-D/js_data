//二叉查找树

function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

Node.prototype.show = function show() {
    return this.data;
};
  
function BST() {
    this.root = null;
}
  
BST.prototype.insert = function insert(data) {
    const n = new Node(data, null, null);
    
    if (this.root === null) {
      this.root = n;
    } else {

      let parent;
      let current = this.root;

      while (true) {
        parent = current;
        if (data < current.data) {
          current = current.left;
          if (current === null) {
            parent.left = n;
            break;
          }
        } else {
          current = current.right;
          if (current === null) {
            parent.right = n;
            break;
          }
        }
      }
    }
};

//中序遍历
BST.prototype.inOrder = function inOrder(node, result = []) {
    if (node) {
      inOrder(node.left, result);
      result.push(node.show());
      inOrder(node.right, result);
    }
    return result;
};

const tree = new BST();
tree.insert(23);
tree.insert(45);
tree.insert(16);
tree.insert(37);
tree.insert(3);
tree.insert(99);
tree.insert(22);
console.log(tree.inOrder(tree.root));
  
//前序遍历
function preOrder(node, result = []) {
    if (node) {
      result.push(node.show());
      preOrder(node.left, result);
      preOrder(node.right, result);
    }
    return result;
};
  
//后序遍历
function postOrder(node, result = []) {
    if (node) {
      postOrder(node.left, result);
      postOrder(node.right, result);
      result.push(node.show());
    }
    return result;
};

//查找最小值
BST.prototype.getMin = function getMin() {
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.data;
};

//查找最大值
BST.prototype.getMax = function getMin() {
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.data;
};

//查找给定的值
BST.prototype.find = function find(data) {
    let current = this.root;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.data < data ? current.right : current.left;
    }
    return current;
};

//删除节点
function getSmallest(node) {
    if (node.left == null) {
      return node;
    } 
    return getSmallest(node.left);
  }
  
BST.prototype.removeNode = function removeNode(node, data) {
    if (node === null) {
        return null;
    }
    if (data === node.data) {
        if (node.left === null && node.right === null) {
        return null;
        }
        // 没有左子节点的节点
        if (node.left === null) {
        return node.right;
        }
        // 没有右子节点的节点
        if (node.right === null) {
        return node.left;
        }
        // 有两个子节点的节点
        // 找到右子树的最小节点
        const tempNode = getSmallest(node.right);
        // 用 tempNode 替换待删除的 Node
        node.data = tempNode.data;
        // 把用来替换待删除的节点，在原右节点树中删除
        node.right = removeNode(node.right, tempNode.data);
        return node;
    } else if (data < node.data) {
        node.left = removeNode(node.left, data);
    } else {
        node.right = removeNode(node.right, data);
    }
};
