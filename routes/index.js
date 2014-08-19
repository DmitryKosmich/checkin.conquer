'use strict';

module.exports = function(app) {

    app.post('/email/send', require('./db_services/email').send);

    app.get('/error/browser', require('./pages/error-browser').get);
    app.post('/error/browser', require('./pages/error-browser').post);

    app.get('/', require('./pages/map').get);
    app.post('/', require('./pages/map').post);

    app.get('/user', require('./pages/user').get);
    app.post('/user', require('./pages/user').post);

    app.get('/friends', require('./pages/friends').get);
    app.post('/friends', require('./pages/friends').post);

    app.get('/battle', require('./pages/battle').get);
    app.post('/battle', require('./pages/battle').post);

    app.get('/countries', require('./pages/countries').get);
    app.post('/countries', require('./pages/countries').post);

    app.get('/album', require('./pages/album').get);
    app.post('/album', require('./pages/album').post);

    app.get('/albums', require('./pages/albums').get);
    app.post('/albums', require('./pages/albums').post);

    app.get('/messages', require('./pages/messages').get);
    app.post('/messages', require('./pages/messages').post);

    app.get('/chat', require('./pages/chat').get);
    app.post('/chat', require('./pages/chat').post);


    app.post('/user/add', require('./db_services/user').add);
    app.post('/user/get', require('./db_services/user').getOne);
    app.post('/user/all', require('./db_services/user').getAll);
    app.post('/user/delete', require('./db_services/user').delete);
    app.post('/user/search', require('./db_services/user').search);
    app.post('/user/update', require('./db_services/user').update);

    app.post('/country/add', require('./db_services/country').add);
    app.post('/country/get', require('./db_services/country').getOne);
    app.post('/country/many', require('./db_services/country').getMany);
    app.post('/country/all', require('./db_services/country').getAll);
    app.post('/country/delete', require('./db_services/country').delete);
    app.post('/country/search', require('./db_services/country').search);
    app.post('/country/update', require('./db_services/country').update);

    app.post('/album/add', require('./db_services/album').add);
    app.post('/album/get', require('./db_services/album').getOne);
    app.post('/album/all', require('./db_services/album').getAll);
    app.post('/album/delete', require('./db_services/album').delete);
    app.post('/album/search', require('./db_services/album').search);
    app.post('/album/update', require('./db_services/album').update);

    app.post('/checkin/add', require('./db_services/checkin').add);
    app.post('/checkin/get', require('./db_services/checkin').getOne);
    app.post('/checkin/all', require('./db_services/checkin').getAll);
    app.post('/checkin/delete', require('./db_services/checkin').delete);
    app.post('/checkin/search', require('./db_services/checkin').search);
    app.post('/checkin/update', require('./db_services/checkin').update);

    app.post('/message/add', require('./db_services/message').add);
    app.post('/message/get', require('./db_services/message').getOne);
    app.post('/message/all', require('./db_services/message').getAll);
    app.post('/message/delete', require('./db_services/message').delete);
    app.post('/message/search', require('./db_services/message').search);
    app.post('/message/many', require('./db_services/message').getMany);

    app.post('/chat/add', require('./db_services/chat').add);
    app.post('/chat/get', require('./db_services/chat').getOne);
    app.post('/chat/all', require('./db_services/chat').getAll);
    app.post('/chat/delete', require('./db_services/chat').delete);
    app.post('/chat/search', require('./db_services/chat').search);
    app.post('/chat/update', require('./db_services/chat').update);
};