'use strict';

module.exports = function (Account) {

    // signup
    Account.signup = function (accountName, email, username, password, cb) {

        Account.create({ name: accountName, creationDate: new Date() }, function (err, account) {
            if (err) {
                throw (err);
            }

            const credentials = {
                email: email,
                username: username,
                password: password
            };

            account.clients.create(credentials, function (err, client) {
                if (err) {
                    throw (err);
                }

                let Client = Account.app.models.Client;
                delete credentials.email;

                Client.login(credentials, 'user', function (err, token) {
                    if (err) {
                        console.log(err);
                        throw (err);
                    }

                    cb(null, token);
                });

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
        description: "Signup new Client. Create Account and adds Client to it",
        returns: { type: 'object', root: true },
        http: { path: '/signup', verb: 'post' }
    });



};
