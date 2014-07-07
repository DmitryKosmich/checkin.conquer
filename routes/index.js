module.exports = function(app) {

    app.get('/', require('./jqmap').get);
    app.post('/', require('./jqmap').post);
};