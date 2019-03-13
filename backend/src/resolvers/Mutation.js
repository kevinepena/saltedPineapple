const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeNiceEmail } = require('../mail');
const { hasPermission } = require('../utils');
const stripe = require('../stripe');


const Mutations = {
    async createItem(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        if (!ctx.request.userId) {
            throw new Error('Must be logged in!')
        }
        const item = await ctx.db.mutation.createItem({
            data: {
                // This is how to create relationship between item with a userId
                user: {
                    connect: {
                        id: ctx.request.userId
                    }
                },
                ...args
            }
        }, info);

        return item;
    },
    updateItem(parent, args, ctx, info) {
        // Take a copy of the updates
        const updates = { ...args };
        //remove the ID from the updates
        delete updates.id;
        // run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            },
        }, info
        );
    },
    async deleteItem(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('Must be logged in!')
        }
        const where = { id: args.id };
        // 1. find the item
        const item = await ctx.db.query.item({ where }, `{ id title user { id } }`);
        // 2. Check if they own that item, or have the permissions
        const ownsItem = item.user.id === ctx.request.userId;
        const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN', 'ITEMDELETE'].includes(permission))
        // TODO
        if (!ownsItem && !hasPermissions) {
            throw new Error("You don't have permission to do that!")
        }
        // 3. Delete it
        return ctx.db.mutation.deleteItem({ where }, info);
    },
    async signup(parent, args, ctx, info) {
        // lowercase their email
        args.email = args.email.toLowerCase();
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in the database
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password: password,
                permissions: { set: ['USER'] }
            }
        }, info);
        // create JWT 
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // setting cookie on response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        });

        return user;
    },
    async signin(parent, { email, password }, ctx, info) {
        // check if there is user with email
        const user = await ctx.db.query.user({ where: { email: email } });
        if (!user) {
            throw new Error(`Invalid email`)
        }
        // check if password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        // generate the jwt token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        // return the user
        return user;
    },
    signout(parent, args, ctx, info) {
        // clearing token cookie 
        ctx.response.clearCookie('token');
        // returning info
        return { message: '👋' };
    },
    async requestReset(parent, args, ctx, info) {
        // check user
        const user = await ctx.db.query.user({ where: { email: args.email } });
        if (!user) {
            throw new Error('No user found for email')
        }
        // set tkn and expiry on user
        const resetToken = (await promisify(randomBytes)(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hr
        const res = await ctx.db.mutation.updateUser({
            where: { email: args.email },
            data: { resetToken, resetTokenExpiry }
        });
        // email them reset token
        const mailRes = await transport.sendMail({
            from: 'wes@wesbos.com',
            to: user.email,
            subject: 'Your Password Reset Token',
            html: makeNiceEmail(`Your Password Reset Token is here!
            \n\n
            <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here To Reset!</a>`),
        });
        return { message: '✈️' };
    },
    async resetPassword(parent, args, ctx, info) {
        // check if they match
        if (args.password !== args.confirmPassword) {
            throw new Error("Passwords don't match");
        }
        // check if tkn is legit

        // check if it's expired
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000
            }
        });
        if (!user) {
            throw new Error('Token is invalid')
        }
        // hash new password
        const password = await bcrypt.hash(args.password, 10);
        // save new password to user and remoe all resetToken fields
        const updatedUser = await ctx.db.mutation.updateUser({
            where: { email: user.email },
            data: {
                password: password,
                resetToken: null,
                resetTokenExpiry: null
            }
        });
        // generate & set jwt
        const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365
        });
        // return user
        return updatedUser;
    },
    async updatePermissions(parent, args, ctx, info) {
        // check if they are logged in
        if (!ctx.request.userId) {
            throw new Error('Must be logged in!')
        }
        // query the user
        const currentUser = await ctx.db.query.user({
            where: {
                id: ctx.request.userId,
            }
        }, info);
        // check if they have permissions
        hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
        // update permissions
        return ctx.db.mutation.updateUser({
            data: {
                permissions: {
                    set: args.permissions,
                }
            },
            where: {
                id: args.userId
            },
        }, info)
    },
    async addToCart(parent, args, ctx, info) {
        // make sure they're signed in
        const { userId } = ctx.request;
        if (!userId) {
            throw new Error('You are not allowed!');
        }
        // query the users current cart
        const [existingCartItem] = await ctx.db.query.cartItems({
            where: {
                user: { id: userId },
                item: { id: args.id },
            }
        });

        // check if item is already in cart or increment by 1
        if (existingCartItem) {
            return await ctx.db.mutation.updateCartItem({
                data: { quantity: existingCartItem.quantity + 1 },
                where: { id: existingCartItem.id },
            }, info);
        }
        // if not, create fresh cart item
        return ctx.db.mutation.createCartItem({
            data: {
                user: {
                    connect: { id: userId }
                },
                item: {
                    connect: { id: args.id }
                }
            }
        }, info);
    },
    async removeFromCart(parent, args, ctx, info) {
        // find item
        const cartItem = await ctx.db.query.cartItem({
            where: {
                id: args.id,
            },
        }, `{ id, user { id }}`);
        // make sure item was found
        if (!cartItem) {
            throw new Error('No cart item found!');
        }
        // make sure they own cart item
        if (cartItem.user.id !== ctx.request.userId) {
            throw new Error('You are not allowed!');
        }
        // delete cart item
        return ctx.db.mutation.deleteCartItem({
            where: { id: args.id },
        }, info);
    },
    async createOrder(parent, args, ctx, info) {
        // query the current user and make sure they're signed in
        const { userId } = ctx.request;
        if (!userId) throw new Error('You must be signed in to complete this order!');

        const user = await ctx.db.query.user({ where: { id: userId } }, `{ 
            id 
            name 
            email 
            cart {
                id
                quantity
                item { title price id description image largeImage }
            } 
        }`);
        // recalculate total for the price
        const amount = user.cart.reduce((tally, cartItem) => tally + cartItem.item.price * cartItem.quantity, 0);
        // create the stripe charge 
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'USD',
            source: args.token,
        });
        // convert cart items to order items
        const orderItems = user.cart.map(cartItem => {
            const orderItem = {
                ...cartItem.item,
                quantity: cartItem.quantity,
                user: { connect: { id: userId } },
            };
            delete orderItem.id;
            return orderItem;
        })

        // create the order
        const order = await ctx.db.mutation.createOrder({
            data: {
                total: charge.amount,
                charge: charge.id,
                items: { create: orderItems },
                user: { connect: { id: userId } }
            }
        });
        // clean-up, clear users cart, delete cartItems
        const cartItemIds = user.cart.map(cartItem => cartItem.id);
        await ctx.db.mutation.deleteManyCartItems({
            where: {
                id_in: cartItemIds
            }
        });
        // return order to client
        return order;
    }
};

module.exports = Mutations;
