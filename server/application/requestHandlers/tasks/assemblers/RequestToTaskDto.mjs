/**
 * 
 * @param {Object} request 
 */
const RequestToTaskDto = request => {
    // eslint-disable-next-line no-underscore-dangle
    return {
        id: request.body._id,
        description: request.body.WorkUnit[0].description,
        date: request.body.date,
        contractId: request.body.WorkUnit[0].contractId,
        title: request.body.WorkUnit[0].title,
        tags: request.body.WorkUnit[0].tags,
        time: request.body.WorkUnit[0].time
    }
}

export default RequestToTaskDto;