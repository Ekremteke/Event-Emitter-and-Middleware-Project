const validationMiddleware = (req, res, next) => {
  const { email, numberOfTickets } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  } else if (
    !numberOfTickets ||
    isNaN(numberOfTickets) ||
    numberOfTickets <= 0
  ) {
    return res.status(400).json({ error: "Invalid ticket quantity" });
  }

  next();
};

module.exports = validationMiddleware;
