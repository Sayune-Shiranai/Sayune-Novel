import reportModel from "../models/report.js";

export async function getAllReport(req, res) {
  try {
    const report = await reportModel.findAll();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
