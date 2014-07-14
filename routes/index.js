module.exports = function(app) {

    app.get('/', require('./jqmap').get);
    app.post('/', require('./jqmap').post);

    app.get('/friends', require('./friends').get);
    app.post('/friends', require('./friends').post);

    app.get('/friend', require('./friend').get);
    app.post('/friend', require('./friend').post);
};