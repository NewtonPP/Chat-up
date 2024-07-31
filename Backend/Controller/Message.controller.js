import Conversation from "../Model/conversation.model.js";
import Message from "../Model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res)=>{
    try{
        const {message} = req.body;
        const {id:ReceiverId} = req.params;
        const senderId = req.user._id;

       let conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,ReceiverId]
            }
        })
        if(!conversation){
            conversation  = await Conversation.create(
                {
                    participants:[senderId, ReceiverId],
                }
            )
        }

        const newMessage = new Message({
            UserId:senderId,
            ReceiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
            await Promise.all[newMessage.save(), conversation.save()]

        const receiverSocketId = getReceiverSocketId(ReceiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    }
    catch(error){
        console.log("Error in SendMessage controller: ", error.message)
        res.status(500).json({
            error:"Internal server error"
        })
    }
}


export const getMessage = async(req,res)=>{
try{
const {id:userToChatId}= req.params;
const senderId = req.user._id;

const conversation  = await Conversation.findOne({
    participants:{
        $all:[senderId, userToChatId]
    }
}).populate("messages");

if(!conversation) return res.status(200).json([]);

const messages = conversation.messages;

res.status(200).json(conversation.messages);
}
catch(error){
    console.log("Error in GetMessage controller: ", error.message)
    res.status(500).json({
        error:"Internal server error"
    })
}
}