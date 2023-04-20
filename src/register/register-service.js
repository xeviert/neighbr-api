const bcrypt = require('bcryptjs')

//-----------------------------------------------------------
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const RegisterService = {
    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('user')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    hasUserWithEmail(db, email) {
        return db('user')
            .where({ email })
            .first()
            .then((user) => !!user)
    },
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be longer than 8 characters'
        }
        if (password.length > 16) {
            return 'Password must be less than 16 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Password must contain one upper case, lower case, number and special character'
        }
        return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 10)
    },
}

module.exports = RegisterService