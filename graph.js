class Graph {

    constructor() {
        this.nodes = [];
    }

    addNode(ip, name) {
        this.nodes.push(new Node(ip, name))
    };

    addEdge(source, destination) {
        const sourceNode = this.getNodeByName(source);
        const destinationNode = this.getNodeByName(destination);
        sourceNode.addEdge(destinationNode);
    };

    getNodeByName(nodeName) {
        return this.nodes.find((node) => {
            return node.name === nodeName;
        });
    }

    getAllNodes() {
        return this.nodes;
    }

    getPath(source, destination) {

        let visited = {};
        let path = [];
        return this.doDFS(source, destination);
    }

    doDFS(source, destination) {

        const sourceNode = this.getNodeByName(source);

        const path = [];

        const traversedNodes = [];
        traversedNodes.push(sourceNode);

        const marked = {};
        let isFound = false;

        while (traversedNodes.length !== 0) {

            const node = traversedNodes.pop();
            marked[node.name] = true;

            const adjList = node.getAdjacencyList();
            path.push(node.name);

            if (node.name === destination) {
                return path;
            }

            for (let i = 0; i < adjList.length; i++) {
                const node = adjList[i];
                if (!marked[node.name]) {
                    if (node.name === destination) {
                        path.push(node.name);
                        isFound = true;
                        break;
                    }
                    traversedNodes.push(node);
                    marked[node.name] = true;
                }
            }

            if (isFound) {
                return path;
            }
        }
        return "No path exists";
    }
}

class Node {

    constructor(ip, name) {
        this.ip = ip;
        this.name = name;
        this.adjList = [];
    }

    addEdge(node) {
        if (!this.adjList.includes(node)) {
            this.adjList.push(node);
        }
    }

    getAdjacencyList() {
        return this.adjList;
    }
}


module.exports = Graph;
