import db from '../models/index.js';

export async function getAllReport(req, res) {
  try {
    const report = await db.reportModel.findAll();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
