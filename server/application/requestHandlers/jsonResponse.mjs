/**
 * @deprecated favor apiResponse
 * @param {Func} res express response function
 */
const jsonResponse = res => item => {
  res.jsonp(item);
};

export default jsonResponse;
