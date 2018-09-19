'use strict';

module.exports = function (RegisteredUser) {

    RegisteredUser.getAuthenticatedUserRoles = function (req, cb) {
        const id = req.accessToken.userId;

        /*
        if (req.headers && req.headers.access_token) {
            tokenId = req.headers.access_token;
            console.log('Token: ' + tokenId);
        }
        */

        let Role = RegisteredUser.app.models.Role;

        Role.find(function (err, roles) {
            if (err) {
                cb(err)
            }
            let roleMap = {}
            roles.forEach(role => {
                roleMap[role.id] = role.name;
            });

            let userRoles = [];
            let RoleMapping = RegisteredUser.app.models.RoleMapping;

            const filter = {
                where: {
                    principalId: id,
                    principalType: 'USER'
                }
            };

            RoleMapping.find(filter, function (err, principals) {
                if (err) {
                    cb(err)
                }
                principals.forEach(principal => {

                    const principalId = principal.principalId;
                    const roleName = roleMap[principalId];

                    userRoles.push(roleName);
                })
                cb(null, userRoles);
            })
        });
    };

    RegisteredUser.remoteMethod('getAuthenticatedUserRoles', {
        accepts: [
            { arg: 'req', type: 'object', 'http': { source: 'req' } },
        ],
        description: "Get array of Roles for authenticated User",
        returns: { type: 'array', root: true },
        http: { path: '/roles', verb: 'get' }
    });
};
