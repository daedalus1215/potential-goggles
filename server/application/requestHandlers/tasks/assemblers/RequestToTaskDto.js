/**
 * 
 * @param {Object} request 
 */
module.exports = request => {
    // eslint-disable-next-line no-underscore-dangle
    return {
        id: request.body._id,
        description: request.body.WorkUnit[0].description,
        date: request.body.date,
        contractId: request.body.WorkUnit[0].contractId,
        
        tags: request.body.WorkUnit[0].tags,
        time: request.body.WorkUnit[0].time
    }
}