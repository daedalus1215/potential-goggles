/**
 * @TODO: Can remove this. No need for it, since we are not wrapping responses anymore for redux store
 * @param {*} res 
 * @param {*} type 
 * @returns 
 */
module.exports = (res, type) => data => {
    //@TODO: Let's handle error responses
    res.jsonp(data);
}