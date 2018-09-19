
module.exports = function (app) {

    let Role = app.models.Role;

    //create the admin role
    console.log("----------------")
    Role.create({
        name: 'admin'
    }, function (err, role) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('Created role:', role);
    });
}
