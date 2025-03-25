import { Schema, model, Document } from 'mongoose';

interface IJob extends Document {
  title: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  created: Date;
  redirect_url: string;
}

const jobSchema = new Schema<IJob>(
  {
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
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Job = model<IJob>('Job', jobSchema);

export default Job;