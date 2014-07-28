module.exports = function(app) {

    app.get('/', require('./jqmap').get);
    app.post('/', require('./jqmap').post);

    app.get('/friends', require('./friends').get);
    app.post('/friends', require('./friends').post);

    app.get('/friend', require('./friend').get);
    app.post('/friend', require('./friend').post);

    app.get('/countries', require('./countries').get);
    app.post('/countries', require('./countries').post);

    app.get('/album', require('./album').get);
    app.post('/album', require('./album').post);
    app.post('/album/add', require('./album').add);
    app.post('/album/get', require('./album').getOne);
    app.post('/album/delete', require('./album').delete);

    app.get('/albums', require('./albums').get);
    app.post('/albums', require('./albums').post);
    app.post('/albums/get', require('./albums').getAll);

    app.post('/country', require('./country').getOne);
    app.post('/country/add', require('./country').add);
    app.post('/country/delete', require('./country').delete);
    app.post('/country/all', require('./country').all);
};