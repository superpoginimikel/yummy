const health = async (req, res) => {
  try {
    res.json({ result: 'ok' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  health,
};
