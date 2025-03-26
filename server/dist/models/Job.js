import { Schema, model } from 'mongoose';
const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        display_name: {
            type: String,
            required: true,
        },
    },
    location: {
        display_name: {
            type: String,
            required: true,
        },
    },
    created: {
        type: Date,
        default: Date.now,
    },
    redirect_url: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
const Job = model('Job', jobSchema);
export default Job;
