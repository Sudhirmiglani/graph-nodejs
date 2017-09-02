# graph-nodejs

This is an implementation of Graph Network in Nodejs

## Usage

Install npm.
cd to the project folder and run:

    npm install
    
To start the server, run:

    NODE_PORT=3001 node ./bin/www

Change NODE_PORT in another cmd to run another instances of the server

Initialise server data
    
    http://localhost:3001/graph/init
    Method : POST
    Data : {
           	"name": "A"
           }

Initialise links
    
    http://localhost:3001/graph/links
    Method : POST
    Data : {
           	"links": [{
           		"name" : "B",
           		"ip" : "http://localhost:3001"
           	},{
           		"name" : "C",
           		"ip" : "http://localhost:3007"
           	}]
           }
          
Do this for each instance of the server.

To get topology,

    http://localhost:3001/graph/topology/all
    Method : GET

This will return the adjacency list data structure of the topology


To make things easier, there is an endpoint exposed to do initialisation part,
run localhost on some other port and hit
    
    http://localhost:3000/mock
    Method : GET
    
This will initialise 3 different servers running on port 3001, 3002 and 3003. 
You can change mock.js file if you want to update the topology

Project Structure:

bin - contains server setup

config - consists of constants and logger info

controllers - endpoints

graph - graph classes

services - to interact with other servers and reuse logic
 
