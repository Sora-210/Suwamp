const createQuery = (...querys) => {
    let query = '';
    const len = querys.length;
    querys.forEach((iQuery, index) => {
        query += iQuery;
    })

    return query
}

module.exports = createQuery;