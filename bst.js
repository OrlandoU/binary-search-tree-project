function Node(val){
    let data = val
    let left = null
    let right = null

    return { data, left, right }
}

function Tree(arr){
    let sortArr = (arr) => {
        return [...new Set(arr)].sort((a,b)=>a-b)
    }

    let buildTree = (arr) => {
        if(!arr.length) return null

        let node = Node(arr[Math.trunc(arr.length / 2)])

        node.left = buildTree(arr.slice(0, arr.length / 2))
        node.right = buildTree(arr.slice((arr.length / 2) + 1))

        return node
    }
    let displayTree = () =>{
        prettyPrint(root)
    }

    let insertNode = (value, node = root) => {
        if(value > node.data) {
            if(node.right == null) {
                node.right = Node(value)
            }
            insertNode(value, node.right)
        }
        if(value < node.data) {
            if(node.left == null) {
                node.left = Node(value)
            }
            insertNode(value, node.left)
        }
        array.push(value)
    }

    let deleteNode = (value) => {
        array.splice(array.findIndex(crr => crr == value ),1)
        _updateRoot()
    }

    let _updateRoot = () => {
        array = sortArr(array)
        root = buildTree(array)
    }

    let find = (value ,node = root) => {
        if(!node) return false
        else if(value == node.data) return node
        return find(value, node.right) || find(value, node.left)
    }

    let levelOrder = (cb ,queue = [root]) => {
        if(!cb) return queue[0]
        if(!queue.length) return
        let dequedNode = queue.shift()
        cb(dequedNode)
        if(dequedNode.left != null){
            queue.push(dequedNode.left)
        }
        if(dequedNode.right != null){
            queue.push(dequedNode.right)
        }
        levelOrder(cb, queue)
    }

    let inorder = (cb, node = root) => {
        if(!cb) return node
        if(!node) return
        inorder(cb, node.left)
        cb(node)
        inorder(cb, node.right)
    }
    let preorder = (cb, node = root) => {
        if(!cb) return node
        if(!node) return
        cb(node)
        inorder(cb, node.left)
        inorder(cb, node.right)
    }
    let postorder = (cb, node = root) => {
        if(!cb) return node
        if(!node) return
        inorder(cb, node.left)
        inorder(cb, node.right)
        cb(node)
    }

    let height = (node) => {
        if(!node) return 0
        return Math.max(height(node.left), height(node.right)) + 1
    }

    let depth = (crrNode, node = root) => {
        if(!node) return false
        if(crrNode.data == node.data) return 0
        let leftSubTree = depth(crrNode, node.left)
        let rightSubTree = depth(crrNode, node.right)
        if(typeof leftSubTree == 'number'){
            return leftSubTree + 1
        }
        else if(typeof rightSubTree == 'number'){
            return rightSubTree + 1
        }
        return false
    }

    let isBalanced = () => {
        if(height(root.right) === height(root.left)) return true
        if( Math.abs(height(root.right) - height(root.left)) > 1) return false
    }
    let rebalanced = () => {
        _updateRoot()
    }
    let array = sortArr(arr)
    let root = buildTree(array)
    return {buildTree, displayTree, insertNode, deleteNode, find, levelOrder, inorder, preorder, postorder, height, depth, root, isBalanced, rebalanced}
}

let tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

tree.insertNode(12)
tree.insertNode(13)
tree.insertNode(14)
tree.insertNode(15)
tree.insertNode(16)
tree.insertNode(17)
console.log(tree.depth(tree.find(14)))
tree.displayTree()
tree.rebalanced()
tree.displayTree()



 function prettyPrint(node, prefix = '', isLeft = true){
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }