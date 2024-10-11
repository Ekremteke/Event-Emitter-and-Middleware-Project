const TicketManager = require("../ticketManager");
const ticketManager = new TicketManager(10);

const purchaseTicket = (req, res) => {
  const { email, numberOfTickets } = req.body;
  //   to be sure that the res. sent only one time =. to prevent duplicate response
  let responseWasSent = false;

  console.log(
    `Received purchase request: Email: ${email}, Number of Tickets: ${numberOfTickets}`
  );

  const sendResponse = (status, data) => {
    if (!responseWasSent) {
      res.status(status).json(data);
      responseWasSent = true;
    }
  };

  const buyHandler = (email, timestamp, remainingTickets) => {
    sendResponse(200, {
      message: "Ticket(s) purchased successfully!",
      remainingTickets,
    });
    // cleanupListeners();
  };

  const errorHandler = (error) => {
    console.log(`Error: ${error.message}`);
    sendResponse(400, {
      error: error.message,
      remainingTickets: ticketManager.supply,
    });
    // cleanupListeners();
  };

  //   const cleanupListeners = () => {
  //     ticketManager.removeListener("buy", buyHandler);
  //     ticketManager.removeListener("error", errorHandler);
  //   };
  // Register handlers for this request, using .once to ensure they fire only once
  ticketManager.once("buy", buyHandler);
  ticketManager.once("error", errorHandler);

  //  enough tickets controller
  try {
    if (ticketManager.supply < numberOfTickets) {
      throw new Error(
        `Not enough tickets available. Remaining tickets: ${ticketManager.supply}`
      );
    }
    ticketManager.buy(email, numberOfTickets);
  } catch (error) {
    // cleanupListeners();
    console.error(`Error: ${error.message}`);
    sendResponse(400, {
      error: error.message,
      remainingTickets: ticketManager.supply,
    });
  }
};

module.exports = { purchaseTicket };
