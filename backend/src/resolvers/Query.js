const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    category: forwardTo('db'),
    categories: forwardTo('db'),
    me(parent, args, ctx, info) {
        // check if there is a current user ID
        if (!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user({
            where: { id: ctx.request.userId }
        }, info);
    },
    async users(parent, args, ctx, info) {
        // if(check if user has permission to query users)
        if (!ctx.request.userId) {
            throw new Error('You must be logged in!');
        }

        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

        return ctx.db.query.users({}, info);
    },
    async order(parent, args, ctx, info) {
        // check they're logged in
        if (!ctx.request.userId) throw new Error('Not Logged In');
        // query current order
        const order = await ctx.db.query.order({
            where: { id: args.id },
        }, info);
        // check permissions
        const ownsOrder = order.user.id === ctx.request.userId;
        const hasPermissionToSeeOrder = await ctx.request.user.permissions.includes('ADMIN');
        if (!ownsOrder || !hasPermissionToSeeOrder) {
            throw new Error("Sorry, you can't see this")
        }
        // return order
        return order;
    },
    async orders(parent, args, ctx, info) {
        // check they're logged in
        const { userId } = ctx.request;
        if (!userId) throw new Error('Not Logged In');

        return ctx.db.query.orders({
            where: {
                user: {
                    id: userId
                }
            }
        }, info);
        // return await ctx.db.query.orders({
        //     skip: args.skip,
        //     first: args.first,
        //     orderBy: args.orderBy
        // }, info);
    }
};

module.exports = Query;

    // async items(parent, args, ctx, info) {
    //         const items = await ctx.db.query.items();
    //         return items;
    //     }