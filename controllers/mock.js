const express = require('express');
const request = require('request');
var promise = require('promise');
const API = require('../config/config').API;
const util = require('util');

let router = express.Router();


router.get('', (req, res) => {

    let promises = [];
    promises.push(makeRequest('http://localhost:3001/graph/init', {"name": "A"}));
    promises.push(makeRequest('http://localhost:3001/graph/links', {
        "links": [{
            "name": "B",
            "ip": "http://localhost:3002"
        }, {
            "name": "C",
            "ip": "http://localhost:3005"
        }]
    }));


    promises.push(makeRequest('http://localhost:3002/graph/init', {"name": "B"}));
    promises.push(makeRequest('http://localhost:3002/graph/links', {
        "links": [{
            "name": "D",
            "ip": "http://localhost:3003"
        }, {
            "name": "E",
            "ip": "http://localhost:3007"
        }]
    }));

    promises.push(makeRequest('http://localhost:3003/graph/init', {"name": "D"}));
    promises.push(makeRequest('http://localhost:3003/graph/links', {
        "links": [{
            "name": "A",
            "ip": "http://localhost:3001"
        }]
    }));

    Promise.all(promises).then((data) => {
        res.status(200).json({});
    });

});

const makeRequest = (url, data) => {
    const options = {
        method: 'post',
        json: true,
        body: data,
        url
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {

            if (response.statusCode === 200) {
                logger.info(util.format('Response %j', body));
            } else {
                logger.error(util.format('Error %j', response.body));
            }
            resolve();
        });
    })
};

module.exports = router;