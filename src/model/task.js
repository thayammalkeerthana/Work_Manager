import mongoose,{Schema} from "mongoose";

const taskSchema = new Schema({
    title: { type: String },
    content: { type: String },
    addedDate: { type: Date, default: Date.now },
    status: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId },
}, { 
    timestamps: { createdAt: 'createdOn', updatedAt: 'modifiedOn' }
});

let Tasks;

if (mongoose.models.task) {
    Tasks = mongoose.model('task');
} else {
    Tasks = mongoose.model('task', taskSchema);
}

export default Tasks;