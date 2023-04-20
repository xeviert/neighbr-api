const UsersService = {
    getAllUsers(knex, id) {
        return knex.select('*').from('user').where({ id })    
    },

    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('user')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getById(knex, id) {
        return knex.from('user').select('*').where('id', id).first()
    },

    getByEmail(knex, email) {
        return knex.from('user').select('*').where('email', email).first()
    },

    deleteUser(knex, id) {
        return knex('user')
            .where({ id })
            .delete()
    },

    updateUser(knex, id, newUserFields) {
        return knex('user')
            .where({ id })
            .update(newUserFields)
    },
}

module.exports = UsersService