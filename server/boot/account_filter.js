var loopback = require('loopback');
console.log("sample")
module.exports = function (app) {

    console.log(typeof app);

    var Account = app.models.Account;



    for (let modelRelationName in Account.definition.settings.relations) {

        const modelMeta = Account.definition.settings.relations[modelRelationName];

        const modelName = modelMeta['model'];

        let M = loopback.getModel(modelName);
        console.log("Setting up access hooks for %s", M.modelName);

        M.defineProperty('created', { type: Date, default: '$now' });
        M.defineProperty('modified', { type: Date, default: '$now' });

        M.observe('before save', function event(ctx, next) { //Observe any insert/update event on Model
            if (ctx.instance) {
                console.log("we have an instance");
                ctx.instance.modified = Date.now();
                console.log(ctx.instance);
            } else if (ctx.data) {
                console.log("we have data");
                ctx.data.modified = Date.now();
                console.log(ctx.data);
            }
            next();
        });

        M.observe("access", function logQuery(ctx, next) {
            console.log('access: %s query:', ctx.Model.modelName)
            console.log(ctx.query);
            next();
        });

        M.observe("access", function accountAccessFilter(ctx, next) {
            // console.log(ctx)
            console.log("--------------------context options access %s---------------------", ctx.Model.modelName);
            if (ctx.Model.accessToken) {
                console.log(ctx.Model.accessToken.userId);
            }
            console.log("---------");

            if (ctx && ctx.options && ctx.options.accessToken && ctx.options.accessToken.userId) {

                const userId = ctx.options.accessToken.userId;

                let RegisteredUser = ctx.Model.app.models.RegisteredUser;
                RegisteredUser.findById(userId, function (err, user) {
                    ctx.query.where = Object.assign({}, ctx.query.where, { accountId: user.accountId })
                    console.log(ctx.query)
                    next();
                });
            } else {
                console.log("not logged in access");

                next();
            }
        });

        M.observe("before save", function accountBeforeSaveFilter(ctx, next) {
            console.log("context options before save-------------: %s", ctx.Model.modelName)
            if (ctx.Model.accessToken) {

                console.log(ctx.Model.accessToken.userId);
            }
            console.log("---------");

            if (ctx && ctx.options && ctx.options.accessToken && ctx.options.accessToken.userId) {
                console.log('before save: %s', ctx.Model.modelName)

                const userId = ctx.options.accessToken.userId;

                let RegisteredUser = ctx.Model.app.models.RegisteredUser;
                RegisteredUser.findById(userId, function (err, user) {
                    if (ctx.instance) {
                        console.log("instance");
                        ctx.instance.accountId = user.accountId;
                        console.log(ctx.instance);

                    } else {
                        console.log("data");
                        ctx.data['accountId'] = user.accountId;
                        console.log(ctx.data);
                    }

                    next();
                });
            }
            else {
                console.log("not logged in before save")
                next();
            }
        });
    }
}