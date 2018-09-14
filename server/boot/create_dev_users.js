module.exports = function (app) {
    var user = app.models.user;
    var Account = app.models.Account;

    Account.signup("XYZ Corp", "foo@bar.com", "foo", "bar", function (err, user) {
        console.log(user);
    });

    user.create({ email: "rick@therick.com", username: "rick", password: "rick", accountId: 7 }, function (err, theUser) {
        if (err) {
            console.log(err);
        }
        console.log(theUser);
    });
};