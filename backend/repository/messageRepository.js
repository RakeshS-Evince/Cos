const { db } = require("../model/index");
const Messages = db.messages;
const saveMessage = async (data) => {
    return Messages.create(data);
}

const findAllMessages=async()=>{
    return Messages.findAll();
}

module.exports = { saveMessage ,
    findAllMessages}