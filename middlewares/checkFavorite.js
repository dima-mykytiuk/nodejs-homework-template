const isValidFavorite = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({message: `missing field favorite`});
    }
    if (typeof req.body.favorite !== 'boolean') {
        return res.status(400).send({message: `field must be boolean`});
    }
    next()
}

module.exports = isValidFavorite;