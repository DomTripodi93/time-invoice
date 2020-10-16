module.exports = (fullObj, partialObj) => {
    let objForReturn = {...fullObj};
    Object.keys(partialObj).forEach(key => {
        objForReturn[key] = partialObj[key];
    })
    return objForReturn;
}