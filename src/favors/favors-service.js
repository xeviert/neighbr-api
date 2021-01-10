const FavorsService = {
    getAllFavors(knex) {
        return knex.select('*').from('favors')
    },

    insertFavor(knex, newFavor) {
        return knex
            .insert(newFavor)
            .into('favors')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    serializeFavor(favor) {
        const { user } = favor
        return {
            favor_id: favor.favor_id,
            title: favor.title,
            payment: favor.payment,
            description: favor.description,
            posted: new Date(favor.posted)
        }
    },
}

module.exports = FavorsService