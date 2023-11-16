/* complexCode.js */

// This code demonstrates a complex algorithm for finding the optimal path between multiple nodes in a graph.

class Graph {
  constructor() {
    this.vertices = [];
    this.edges = {};
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = {};
  }

  addEdge(source, destination, weight) {
    this.edges[source][destination] = weight;
    this.edges[destination][source] = weight;
  }

  dijkstra(source) {
    const distances = {};
    const visited = new Set();
    const previous = {};

    for (let vertex of this.vertices) {
      distances[vertex] = Infinity;
    }
    distances[source] = 0;

    while (visited.size !== this.vertices.length) {
      let currentVertex = this.getMinDistance(distances, visited);
      visited.add(currentVertex);

      for (let neighbor in this.edges[currentVertex]) {
        let distance = this.edges[currentVertex][neighbor];
        let totalDistance = distances[currentVertex] + distance;
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = currentVertex;
        }
      }
    }

    return { distances, previous };
  }

  getMinDistance(distances, visited) {
    let minDistance = Infinity;
    let minVertex = null;
    for (let vertex in distances) {
      if (!visited.has(vertex) && distances[vertex] <= minDistance) {
        minDistance = distances[vertex];
        minVertex = vertex;
      }
    }
    return minVertex;
  }

  getPath(previous, destination) {
    const path = [];
    let currentVertex = destination;

    while (currentVertex) {
      path.unshift(currentVertex);
      currentVertex = previous[currentVertex];
    }

    return path;
  }
}

// Usage:

const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('D', 'E', 3);

const source = 'A';
const destination = 'E';

const { distances, previous } = graph.dijkstra(source);
const path = graph.getPath(previous, destination);

console.log('Distances:', distances);
console.log('Shortest Path:', path);