const Joi = require("joi");
const userServices = require("../services/userServices");
const create = async (req, res) => {
    try {
        const schema = Joi.object({
            firstName: Joi.string().allow(null, ''),
            lastName: Joi.string().allow(null, ''),
            address: Joi.string().allow(null, ''),
            phone: Joi.string().allow(null, ''),
            username: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ error: error.message });
        const users = await userServices.create(req.body);
        if (users.error) return res.status(400).send({ error: users.error })
        return res.status(200).send({ result: users });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
}
const get = async (req, res) => {
    try {
        const users = await userServices.get();
        return res.status(200).send({ result: users });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
};
const login = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ error: error.message });
        const result = await userServices.login(req.body);
        if (result.error) return res.status(400).send({ error: result.error })
        return res.status(200).send({ result: result });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
}
const remove = async (req, res) => {
    try {
        const users = await userServices.remove(req.params.id);
        if (users.error) return res.status(400).send({ error: users.error })
        return res.status(200).send({ result: users });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
}
const update = async (req, res) => {
    try {
        delete req.body.password;
        const schema = Joi.object({
            firstName: Joi.string().allow(null, ''),
            lastName: Joi.string().allow(null, ''),
            address: Joi.string().allow(null, ''),
            phone: Joi.string().allow(null, ''),
            email: Joi.string(),
            role: Joi.string(),
            username: Joi.string(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ error: error.message });
        const users = await userServices.update(req.body, req.params.id);
        if (users.error) return res.status(400).send({ error: users.error })
        return res.status(200).send({ result: users });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
}
const changePassword = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().required(),
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        })
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ error: error.message });
        const result = await userServices.changePassword(req.body);
        if (result.error) return res.status(400).send({ error: result.error })
        return res.status(200).send({ result: result });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
}
const resetPassword = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().required(),
        })
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ error: error.message });
        const result = await userServices.resetPassword(req.body.email);
        if (result.error) return res.status(400).send({ error: result.error })
        return res.status(200).send({ result: result });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
}
const validateAndUpdatePassword = async (req, res) => {
    try {
        const schema = Joi.object({
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        })
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ error: error.message });
        const result = await userServices.validateAndUpdatePassword(req.body, req.params.token);
        if (result.error) return res.status(400).send({ error: result.error })
        return res.status(200).send({ result: result });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
}
module.exports = {
    get,
    create,
    login,
    remove,
    update,
    changePassword,
    resetPassword,
    validateAndUpdatePassword
}