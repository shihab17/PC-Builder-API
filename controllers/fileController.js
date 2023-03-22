const upload = require("../services/fileService");

const create = async (req, res, next) => {
    const result = await upload(req, res);
    res.send(result);
};
module.exports = { create }