const express = require('express');
const util = require('util');

const {initialise, addLinks, traverseGraph} = require('../services/nodeService');

let router = express.Router();


router.post('/init', (req, res) => {

    const data = req.body;
    logger.info(util.format('Received request to init node -> %j', data));

    req.checkBody('name', 'Name not present').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        logger.error(util.format('Validation failed for the request with errors %j ', errors));
        res.status(400).json(errors);
        return;
    }

    initialise(data.name);
    res.status(200).json({});

});

router.post('/links', (req, res) => {

    const data = req.body;
    logger.info(util.format('Received request to add links to the node -> %j', data));

    req.checkBody('links', 'Links not present').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        logger.error(util.format('Validation failed for the request with errors %j ', errors));
        res.status(400).json(errors);
        return;
    }

    addLinks(data.links);
    res.status(200).json({});

});

router.post('/topology', (req, res) => {

    logger.info(util.format('Received request to post topology %j', req.body));

    const data = req.body;

    const responsePromise = traverseGraph(data);
    responsePromise.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        logger.error(util.format("error ", err));
        res.status(400).json(err);

    });


});

router.get('/topology/all', (req, res) => {

    logger.info(util.format('Received request to get topology'));

    const responsePromise = traverseGraph({});
    responsePromise.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        logger.error(util.format("error ", err));
        res.status(400).json(err);

    });

});

module.exports = router;