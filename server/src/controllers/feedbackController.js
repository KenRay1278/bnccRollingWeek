import { readData, writeData } from "../data/feedbackData.js";

export const getFeedbacks = (req, res) => {
  const feedbacks = readData();
  res.json(feedbacks);
};

export const createFeedback = (req, res) => {
  const feedbacks = readData();

  const newFeedback = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
    status: "open"
  };

  feedbacks.push(newFeedback);
  writeData(feedbacks);

  res.json(newFeedback);
};

export const updateFeedback = (req, res) => {
  const feedbacks = readData();
  const id = parseInt(req.params.id);

  const index = feedbacks.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  feedbacks[index] = { ...feedbacks[index], ...req.body };
  writeData(feedbacks);

  res.json(feedbacks[index]);
};

export const deleteFeedback = (req, res) => {
  const feedbacks = readData();
  const id = parseInt(req.params.id);

  const filtered = feedbacks.filter(f => f.id !== id);

  if (filtered.length === feedbacks.length) {
    return res.status(404).json({ message: "Not found" });
  }

  writeData(filtered);

  res.json({ message: "Deleted" });
};