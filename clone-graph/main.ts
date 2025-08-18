class _Node {
	val: number
	neighbors: _Node[]
	
	constructor(val?: number, neighbors?: _Node[]) {
		this.val = (val===undefined ? 0 : val)
		this.neighbors = (neighbors===undefined ? [] : neighbors)
	}
}


function cloneGraph(node: _Node | null, nodeMap = new Map<number, _Node>()): _Node | null {
	if (!node)
		return node;
	let newNode = nodeMap.get(node.val);
	if (newNode)
		return newNode;
	newNode = new _Node(node.val);
	nodeMap.set(newNode.val, newNode);
	for (const neighbor of node.neighbors) {
		const newNeighbor = cloneGraph(neighbor, nodeMap);
		if (newNeighbor)
			newNode.neighbors.push(newNeighbor);
	}
	return newNode;
}

if (import.meta.main) {
}
