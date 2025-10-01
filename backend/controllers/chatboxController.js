import chatboxModel from "../models/chatbox.js";

export async function getAllChatbox(req, res) {
  try {
    const chatbox = await chatboxModel.findAll();
    res.json(chatbox);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
