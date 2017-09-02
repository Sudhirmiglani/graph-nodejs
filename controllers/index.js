/**
 * Created by sudhir.m on 28/12/16.
 */
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/ping', function (req, res, next) {
    res.status(200).json('pong');
});

module.exports = router;
