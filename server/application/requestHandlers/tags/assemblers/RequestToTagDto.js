module.exports = request => {
    return {
        description: request.body.description,
        name: request.body.name
    }
}