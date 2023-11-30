const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';


module.exports.invokeApi = async ({ path, method = 'GET', headers = {}, queryParams = {}, postData = {}, auth = {}, data = {} }) => {

    let reqObj = {
        method: method,
        url: path,
        headers: headers
    };
    if (method === 'GET') {
        reqObj['params'] = queryParams;
    }
    if (method === 'POST') {
        reqObj['data'] = postData;
    }
    if (method === 'DELETE') {
        reqObj['params'] = queryParams;
    }
    if (method === 'PUT') {
        reqObj['data'] = postData;
    }
    let results = undefined;
    try {
        results = await axios(reqObj);
        return results.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        else if (error.response && error.response.status && error.response.statusText) {
            console.log(error.response);
            throw new Error(error.response.statusText);
        }
        else {
            console.log(error);
            throw new Error('Some thing went wrong');
        }

    }

};
