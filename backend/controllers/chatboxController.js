import chatboxModel from "../models/chatbox.js";

// Lấy tất cả chatbox

export async function getAllChatbox(req, res) {
  try {
    const chatbox = await chatboxModel.findAll();
    res.json(chatbox);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//Lấy chatbox theo ID
export async function getChatboxById(req, res) {
  try{
    const { id } = req.params;
    const chatbox = await chatboxModel.findByPk(id);
    if (!chatbox) {
      return res.status(404).json({ error: "Chatbox not found" });
    }
    res.json(chatbox);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Tạo mới chatbox
export async function createChatbox(req, res) {
  try {
    // Giả sử chat box bao gồm userId, message, timestamp,...
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: "userId and message are required" });
    }
    const newChatbox = await chatboxModel.create({
      userId,
      message,
      createdAt: new Date(),
    });
    res.status(201).json(newChatbox);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Cập nhật chatbox theo ID
export async function updateChatbox(req, res) {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const chatbox = await chatboxModel.findByPk(id);
    if (!chatbox) {
      return res.status(404).json({ error: "Chatbox not found" });
    }
    chatbox.message = message || chatbox.message;
    await chatbox.save();
    res.json(chatbox);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Xóa chatbox theo ID
export async function deleteChatbox(req, res) {
  try {
    const { id } = req.params;
    const chatbox = await chatboxModel.findByPk(id);
    if (!chatbox) {
      return res.status(404).json({ error: "Chatbox not found" });
    }
    await chatbox.destroy();
    res.json({ message: "Chatbox deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
