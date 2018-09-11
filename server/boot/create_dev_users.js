module.exports = function (app) {
    var User = app.models.User;
    User.create({ email: 'foo@bar.com', username: 'foo', password: 'bar' }, function (err, userInstance) {
        console.log(userInstance);
    })
};