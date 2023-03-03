
const RequestToTagDto = request => {
    return {
        description: request.body.description,
        name: request.body.name
    }
}

export default RequestToTagDto;