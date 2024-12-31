const Joi = require('joi');

// Signup Validation
const signupvalidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
        role: Joi.string().valid('admin', 'user', 'moderator').required(), 

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
