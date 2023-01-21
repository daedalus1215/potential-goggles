/**
 * Moving towards this response. Moving this way of catching data loads 
 * on the front end. 
 * @param {Function} res express response callback
 */
module.exports = (res, type) => data => {
    //@TODO: Let's handle error responses
    res.jsonp({ items: data, type });
}