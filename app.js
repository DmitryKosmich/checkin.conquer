var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');
var swig = require('swig');

var options = {
    key: fs.readFileSync('keys/conquer-key.pem'),
    cert: fs.readFileSync('keys/conquer-cert.pem')
};

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.set('view cache', false);

app.use(express.favicon());

if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use(express.bodyParser());

app.use(express.cookieParser());

app.use(app.router);

require('routes')(app);

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(err, req, res, next) {
    if (typeof err == 'number') { // next(404);
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            console.log(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

https.createServer(options, app).listen(8000, function() {
    console.log('Express server listening on port ' + '8000');
});