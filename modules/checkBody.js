<<<<<<< HEAD
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
=======
function checkBody(body, keys) {
  let isValid = true;

  for (const field of keys) {
    if (!body[field] || body[field] === '') {
      isValid = false;
    }
  }

  return isValid;
}

module.exports = { checkBody };
>>>>>>> 373960da14f3527b5eeb3a5fe70b3a90f86e3de7
