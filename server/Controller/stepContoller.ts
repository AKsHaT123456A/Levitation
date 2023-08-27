import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import User, { IUser } from "../Models/user";

const storeStepData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as any;
    const { step1Data, step2Data, step3Data } = req.body;

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the current submission to the user's submissions array
    const newSubmission = {
      step1Data,
      step2Data,
      step3Data,
      submissionDate: new Date(),
    };
    user.submissions.push(newSubmission);

    await user.save();

    res.status(200).json({ message: "Step data stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const uploadFile = async (req, res) => {
  console.log(req.files);

  const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);

  try {
    res
      .status(200)
      .json({ message: "Data saved successfully", fileUrls: fileUrls });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getData = async (req, res) => {
  try {
    const { userId } = req.params as any;
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

export { storeStepData, uploadFile , getData};
