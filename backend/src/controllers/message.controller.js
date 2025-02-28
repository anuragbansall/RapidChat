import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsers = async (req, res) => {
  const userId = req.user.id;
  try {
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMessages = async (req, res) => {
  const sender = req.user._id;
  const receiver = req.params.id;

  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    })
      .populate("sender", "fullName profilePic")
      .populate("receiver", "fullName profilePic")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  const sender = req.user._id;
  const receiver = req.params.id;

  const { message, image } = req.body;

  if (!message && !image) {
    return res.status(400).json({ message: "Message or image is required" });
  }

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image);
      image = uploadRes.secure_url;
    }

    const newMessage = await new Message({
      sender,
      receiver,
      message,
      image,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
