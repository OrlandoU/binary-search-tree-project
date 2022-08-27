//Factory function for Nodes of BST
function Node(val) {
    let data = val
    let left = null
    let right = null

    return { data, left, right }
}

//Factory function for BST
function Tree(arr) {
    //Filters unique numbers and sorts them
    let sortArr = (arr) => {
        return [...new Set(arr)].sort((a, b) => a - b)
    }

    //Build Tree, accepts sorted array as parameter
    let buildTree = (arr) => {
        if (!arr.length) return null

        let node = Node(arr[Math.trunc(arr.length / 2)])

        node.left = buildTree(arr.slice(0, arr.length / 2))
        node.right = buildTree(arr.slice((arr.length / 2) + 1))

        return node
    }

    //Displays formatted tree
    let displayTree = () => {
        prettyPrint(root)
    }

    //Inserts Node at given index
    let insertNode = (value, node = root) => {
        if (value > node.data) {
            if (node.right == null) {
                node.right = Node(value)
            }
            insertNode(value, node.right)
        }
        if (value < node.data) {
            if (node.left == null) {
                node.left = Node(value)
            }
            insertNode(value, node.left)
        }
        array.push(value)
    }

    //Deletes Node that matches given parameter
    let deleteNode = (value) => {
        array.splice(array.findIndex(crr => crr == value), 1)
        _updateRoot()
    }

    //Updates Root with current array values
    let _updateRoot = () => {
        array = sortArr(array)
        root = buildTree(array)
    }

    //Returns Node that matches given parameter
    let find = (value, node = root) => {
        if (!node) return false
        else if (value == node.data) return node
        return find(value, node.right) || find(value, node.left)
    }

    //Invokes CallBack on each node at Level Order Traversal
    let levelOrder = (cb, queue = [root]) => {
        if (!cb) return queue[0]
        if (!queue.length) return
        let dequedNode = queue.shift()
        cb(dequedNode)
        if (dequedNode.left != null) {
            queue.push(dequedNode.left)
        }
        if (dequedNode.right != null) {
            queue.push(dequedNode.right)
        }
        levelOrder(cb, queue)
    }

    //Invokes CallBack on each node in inorder Traversal
    let inorder = (cb, node = root) => {
        if (!cb) return node
        if (!node) return
        inorder(cb, node.left)
        cb(node)
        inorder(cb, node.right)
    }

    //Invokes CallBack on each node in preorder Traversal
    let preorder = (cb, node = root) => {
        if (!cb) return node
        if (!node) return
        cb(node)
        inorder(cb, node.left)
        inorder(cb, node.right)
    }

    //Invokes CallBack on each node in postorder Traversal
    let postorder = (cb, node = root) => {
        if (!cb) return node
        if (!node) return
        inorder(cb, node.left)
        inorder(cb, node.right)
        cb(node)
    }

    //Returns height of given node
    let height = (node) => {
        if (!node) return 0
        return Math.max(height(node.left), height(node.right)) + 1
    }

    //Returns number of edges in path from given node to the tree’s root node.
    let depth = (crrNode, node = root) => {
        if (!node) return false
        if (crrNode.data == node.data) return 0
        let leftSubTree = depth(crrNode, node.left)
        let rightSubTree = depth(crrNode, node.right)
        if (typeof leftSubTree == 'number') {
            return leftSubTree + 1
        }
        else if (typeof rightSubTree == 'number') {
            return rightSubTree + 1
        }
        return false
    }

    //Checks if tree is balanced
    let isBalanced = () => {
        if (height(root.right) === height(root.left)) return true
        if (Math.abs(height(root.right) - height(root.left)) > 1) return false
    }

    //Rebalances tree 
    let rebalanced = () => {
        _updateRoot()
    }

    //Array with unsorted values
    let array = sortArr(arr)
    //Full BST
    let root = buildTree(array)

    return { buildTree, displayTree, insertNode, deleteNode, find, levelOrder, inorder, preorder, postorder, height, depth, root, isBalanced, rebalanced }
}

//Display formatted binary tree
function prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

//Randomly Generates Numbers on given tree
let add = (root) => {
    for(let i = 0; i < 120; i++){
        root.insertNode(Math.trunc(Math.random() * 350))
    }
}

//CallBack function for script
const cb = (item) => {
    console.log(`${item.data},`)
}

//Test
let tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
console.log(`Balanced Tree: ${tree.isBalanced()}`)
console.log('Level Order')
tree.levelOrder(cb)
console.log('Preorder')
tree.preorder(cb)
console.log(' Inorder')
tree.inorder(cb)
console.log('Postorder')
tree.postorder(cb)
add(tree)
tree.displayTree()
console.log(`Balanced Tree: ${tree.isBalanced()}`)
tree.rebalanced()
console.log('Level Order')
tree.levelOrder(cb)
console.log('Preorder')
tree.preorder(cb)
console.log(' Inorder')
tree.inorder(cb)
console.log('Postorder')
tree.postorder(cb)



