/**
 *
 * @param {*} data
 * @returns
 */
function response(data = {}) {
  const result = {
    data: data?.data ? data?.data : [],
    errors: data?.errors ? data?.errors : "",
    message: data?.message ? data?.message : "Opps! Something went wrong",
    status: data?.status ? data?.status : false,
    ...data,
  };
  return result;
}

module.exports = { response };
