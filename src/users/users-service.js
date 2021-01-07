const UsersService = {
    getAllUsers(knex, user_id) {
        return knex.select('*').from('users').where({ user_id })    
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex.from('users').select('*').where('user_id', id).first()
    },

    getByEmail(knex, email) {
        return knex.from('users').select('*').where('email', email).first()
    },

    deleteUser(knex, id) {
        return knex('users')
            .where({ id })
            .delete()
    },

    updateUser(knex, id, newUserFields) {
        return knex('users')
            .where({ id })
            .update(newUserFields)
    },
}

module.exports = UsersService