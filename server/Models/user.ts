import mongoose, { Document } from "mongoose";

// Define the interface for your user document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  submissions: [{
    step1Data: Step1Data;
    step2Data: Step2Data;
    step3Data: Step3Data[];
    submissionDate: Date;
  }];
}

// Define the interfaces for step data
interface AddressDetails {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface Step3Data {
  value: string;
  label: string;
}

interface Step1Data {
  addressDetails: AddressDetails;
  email: string;
  name: string;
  phone: string;
}

interface Step2Data {
  location: string;
  selectedFiles: File[];
}

// Define the user schema
const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  submissions: [
    {
      step1Data: { type: mongoose.Schema.Types.Mixed },
      step2Data: { type: mongoose.Schema.Types.Mixed },
      step3Data: [{ type: mongoose.Schema.Types.Mixed }],
      submissionDate: Date,
    },
  ],
});

// Create and export the User model
export default mongoose.model<IUser>("User", userSchema);
