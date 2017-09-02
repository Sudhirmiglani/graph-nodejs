'use strict';

const request = require('request');
const util = require('util');
const Promise = require('promise');
const {init, addLink, getAdjacencyList, getCurrentNodeInfo} = require('./nodeInfo');

const initialise = (name) => {

    init(name);

};

const addLinks = (links) => {

    links.forEach((link) => {
        addLink(link);
    });

};

const traverseAdjacencyList = ({ip}, disjointSet) => {

    const options = {
        method: 'post',
        json: true,
        body: disjointSet,
        url: ip + '/graph/topology'
    };

    logger.info(util.format('requesting from the link %s', options.url));

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {

            if (error) {
                logger.error(util.format('Error while connecting to the link %j', error));
            } else if (response.statusCode === 200) {
                logger.info(util.format('Response from the link %j', body));
                resolve(body);
            } else {
                logger.error(util.format('Error while connecting to the link %j', response.body));
            }
            resolve();
        });
    });

};


const traverseGraph = (disjointSet) => {
    const list = getAdjacencyList();
    const currentNode = getCurrentNodeInfo();

    disjointSet[currentNode] = list.map((node) => {
        return node.name;
    });

    let promises = [];

    list.forEach((node) => {
        if (!disjointSet[node.name]) {
            promises.push(traverseAdjacencyList(node, disjointSet));
        }
    });

    return new Promise((resolve, reject) => {
        Promise.all(promises)
            .then((data) => {
                logger.info(util.format("All promises resolved %j", data));
                data.forEach((res) => {
                    if (res && res !== null) {
                        Object.assign(disjointSet, res);
                    }
                });
                logger.info(util.format("After merging data %j", disjointSet));
                resolve(disjointSet);
            }).catch(function (err) {
            logger.error("error while collecting all promises");
            reject(disjointSet);
        });
    });

};

module.exports = {
    initialise,
    addLinks,
    traverseGraph
};