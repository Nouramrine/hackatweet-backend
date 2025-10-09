function checkBody(body, fields){
   
    if (Object.keys(body).length !== fields.length) {
        return false;
    }

    for (const field of fields) {
        if (body[field] === undefined || body[field] === "") {
            return false;
        }
    }

    return true;

}

module.exports = {checkBody}