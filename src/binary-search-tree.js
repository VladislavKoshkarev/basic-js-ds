const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null
  }

  root() {
    return this.rootNode
  }

  add(data) {
    let additionNode = new Node(data)
    if (!this.rootNode) this.rootNode = additionNode
    else {
      let isLeaf = false
      let currentNode = this.rootNode
      while (isLeaf === false) {
        if (additionNode.data < currentNode.data) {
          if (!currentNode.left) {
            currentNode.left = additionNode
            isLeaf = true
          }
          else currentNode = currentNode.left
        }
        if (additionNode.data > currentNode.data) {
          if (!currentNode.right) {
            currentNode.right = additionNode
            isLeaf = true
          }
          else currentNode = currentNode.right
        }
      }
    }
  }

  has(data) {
    if (this.rootNode === null) return false
    else {
      let currentNode = this.rootNode
      while (currentNode) {
        if (data === currentNode.data) return true
        else if (data < currentNode.data) currentNode = currentNode.left
        else if (data > currentNode.data) currentNode = currentNode.right
      }
    }
    return false
  }

  find(data) {
    if (this.rootNode === null) return false
    else {
      let currentNode = this.rootNode
      while (currentNode) {
        if (data < currentNode.data) currentNode = currentNode.left
        else if (data > currentNode.data) currentNode = currentNode.right
        else if (data === currentNode.data) break
      }
      return currentNode
    }
  }

  remove(data) {
    function deleteNode(currentNode, data) {
      if (!currentNode) return currentNode
      else if (currentNode.data > data)  {
        currentNode.left = deleteNode(currentNode.left, data)
        return currentNode
      }
      else if (currentNode.data < data)  {
        currentNode.right = deleteNode(currentNode.right, data)
        return currentNode
      }
      else {
        if (!currentNode.left && !currentNode.right) return null
        else if (!currentNode.right) return currentNode.left
        else if (!currentNode.left) return currentNode.right
        else {
          let maximumNodeFromLSub = currentNode.left
          while (maximumNodeFromLSub.right) {
            maximumNodeFromLSub = maximumNodeFromLSub.right
          }
          currentNode.data = maximumNodeFromLSub.data
          currentNode.left = deleteNode(currentNode.left, maximumNodeFromLSub.data)
          return currentNode
        }
      }
    }
    this.rootNode = deleteNode(this.rootNode, data)
  }

  min() {
    if (this.rootNode === null) return null
    let currentNode = this.rootNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (this.rootNode === null) return null
    let currentNode = this.rootNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};