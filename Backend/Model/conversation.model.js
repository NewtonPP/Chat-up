import mongoose from "mongoose";

const ConversationSchema = mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
    ],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        defaut:[],
    }]
}, {timestamps:true})

const Conversation = mongoose.model("conversation", ConversationSchema);
export default Conversation;
