const createMessage = (name, message) => {

    if (name === null)
        return message

    return {
        name,
        message,
        date: new Date().getTime()
    }
}

module.exports = {
    createMessage
}