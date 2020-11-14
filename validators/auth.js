const { check } = require('express-validator');

exports.userSignupValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('country')
    .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
            let countres = [
                'United Kingdom',
                'Poland',
                'Philippines',
                'United States'
            ];
            console.log(req.body);
            console.log(value);
            if(countres.includes(value)) {
                return resolve();
            } else {
                return reject();
            }
        });
     }).withMessage('This country doesn\'t exist'),
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password')
    .isLength( { min: 6 })
    .withMessage('Password must be at least 6 characteres long'),
]

exports.userSigninValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password')
    .isLength( { min: 6 })
    .withMessage('Password must be at least 6 characteres long'),
]

exports.forgotPasswordValidator = [
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
    check('newPassword')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];
