const Joi = require('joi');

const signupvalidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
        confirmPassword: Joi.string().min(6).required(),
        practiceName: Joi.string().optional().allow(''),
        phone: Joi.string().optional(),
        streetAddress: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        zip: Joi.string().optional(),
        username: Joi.string().required(),
        assignRoles: Joi.string().optional(),
        status: Joi.string().optional(),
        name: Joi.string().optional(),
        role: Joi.string().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message,
        });
    }
    next();
};

// Login Validation
const loginvalidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message,
        });
    }
    next();
};

// forget password

const validateEmail = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    return schema.validate(data);
  };
  
  const validatePassword = (data) => {
    const schema = Joi.object({
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  };

module.exports = { signupvalidation, loginvalidation,validateEmail, validatePassword  };
