'use strict';

module.exports = function (Account) {

    // signup
    Account.signup = function (credentials, cb) {

        Account.create({ name: credentials.accountName, creationDate: new Date() }, function (err, account) {
            if (err) {
                throw (err);
            }
            delete credentials.accountName;

            account.registeredUsers.create(credentials, function (err, registeredUser) {
                if (err) {
                    throw (err);
                }

                let Role = Account.app.models.Role;

                Role.findOne({ where: { name: 'admin' } }, function (err, role) {
                    if (err) {
                        console.log(err);
                        throw (err);
                    }
                    role.principals.create({
                        principalType: "USER",
                        principalId: registeredUser.id
                    }, function (err, principal) {
                        if (err) {
                            console.log(err);
                            throw (err);
                        }
                        console.log('created admin: ', registeredUser);
                    })
                });

                let RegisteredUser = Account.app.models.RegisteredUser;
                delete credentials.email;

                const loginCredentials = {
                    username: credentials.username,
                    password: credentials.password
                };

                RegisteredUser.login(loginCredentials, 'user', function (err, token) {
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
            { arg: 'credentials', type: 'object', http: { source: 'body' } }
        ],
        description: "Signup new Client. Create Account and adds Client to it",
        returns: { type: 'object', root: true },
        http: { path: '/signup', verb: 'post' }
    });

    Account.foo = function (params, cb) {
        console.log(params);
        cb(null, params);
    };

    Account.remoteMethod('foo', {
        accepts: [
            { arg: 'data', type: 'object', http: { source: 'body' } },

        ],
        description: 'foo',
        returns: { arg: 'data', type: 'object' },
        http: { path: '/foo', verb: 'post' }
    });
};
