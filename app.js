const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const index = require('./controllers/index');
const mock = require('./controllers/mock');
const graph = require('./controllers/graph');
const {isLinkAllowed} = require('./services/nodeService');
const util = require('util');

const app = express();

// setup(init) logger
global.logger = require('./config/logger');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.enable('trust proxy');

app.use(function (req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (isLinkAllowed(ip)) {
        next();
    } else {
        logger.info(util.format("IP is blocked -> {}"), ip);
        res.status(403).json('Not authorized to connect here.');
    }

});

// app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use("/", index);
app.use("/graph", graph);
app.use("/mock", mock);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.statusCode = 404;
    logger.error(util.format('Not found %j', req.url));
    res.status(err.statusCode).json({message: err.message});
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});

module.exports = app;
