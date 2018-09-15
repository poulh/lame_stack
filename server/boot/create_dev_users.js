module.exports = function (app) {

    var Account = app.models.Account;

    Account.signup("XYZ Corp", "foo@bar.com", "foo", "bar", function (err, token) {
        if (err) {
            throw (err);
        }
        console.log("account and user created. login!");
    });

};