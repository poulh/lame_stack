module.exports = function (app) {

    var Account = app.models.Account;

    Account.signup({ accountName: "XYZ Corp", firstName: "Pat", lastName: "Smith", email: "psmith@xyz.com", username: "psmith", password: "xyz" }, function (err, token) {
        if (err) {
            throw (err);
        }
        console.log("account and user created. login!");
    });

};