const crypto = require('crypto');
const { Token } = require('./../models/index');
const generateLink = async (userId) => {
    let token = parseInt(Math.floor((Math.random() * 1000000) + 99999)) + (new Date().getTime());
    token = crypto.createHash('md5').update(token + '').digest("hex");
    token = new Token({
        userId: userId,
        consumed: false,
        token: token
    });
    token = await token.save();

    return token.token;
}
module.exports = {
    generateLink
}