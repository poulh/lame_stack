'use strict';

module.exports = function (Account) {

    // signup
    Account.signup = function (accountName, email, username, password, cb) {

        Account.create({ name: accountName, creationDate: new Date() }, function (err, account) {
            account.users.create({ username: username, password: password, email: email }, function (err, user) {
                if (err) return cb(err);
                cb(null, user);
            });
        });
    };
    Account.remoteMethod('signup', {
        accepts: [
            { arg: 'accountName', type: 'string' },
            { arg: 'email', type: 'string' },
            { arg: 'username', type: 'string' },
            { arg: 'password', type: 'string' }
        ],
        returns: { arg: 'user', type: 'object' },
        http: { path: '/signup', verb: 'post' }
    });



};
