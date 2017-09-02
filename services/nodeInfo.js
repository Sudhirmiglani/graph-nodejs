const {Node} = require('../graph/graph');

let nodeInfo = {};

const init = (name) => {
    nodeInfo = new Node(null, name);
};

const getCurrentNodeInfo = () => {
    return nodeInfo.name;
};

const addLink = ({ip, name}) => {
    const node = new Node(ip, name);
    nodeInfo.addEdge(node);
};

const getAdjacencyList =() => {

    return nodeInfo.getAdjacencyList();
};


module.exports = {
    init,
    addLink,
    getAdjacencyList,
    getCurrentNodeInfo
};