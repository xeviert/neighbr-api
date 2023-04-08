const FavorsService = {
    getAllFavors(knex) {
        return knex
            .select('*')
            .from('favor')
            .orderBy('posted', 'desc')
            .leftJoin('user', 'favor.user_id', 'user.id')
    },

    insertFavor(knex, newFavor) {
        return knex
            .insert(newFavor)
            .into('favor')
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