

const Graph = require('./graph/graph');

let graph;

function createGraph() {

    graph = new Graph();
    graph.addNode("192.168.8.1", "A");
    graph.addNode("192.168.8.2", "B");
    graph.addNode("192.168.8.3", "C");
    graph.addNode("192.168.8.4", "D");
    graph.addNode("192.168.8.5", "E");
    graph.addNode("192.168.8.6", "F");
    graph.addNode("192.168.8.7", "G");


    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("A", "D");
    graph.addEdge("D", "E");
    graph.addEdge("D", "F");
    graph.addEdge("F", "G");

}

function search() {
    console.log(graph.getPath("A", "Y"));
}

createGraph();
search();