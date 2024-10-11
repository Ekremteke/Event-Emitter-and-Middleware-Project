const EventEmitter = require("events");
const myEmitter = require("./events/eventEmitter");
const DatabaseService = require("./services/databaseService"); // simulate database by logging to the console
const EmailService = require("./services/emailService");

class TicketManager extends EventEmitter {
  constructor(supply) {
    super();
    this.supply = supply;
    this.db = new DatabaseService();
    this.emailService = new EmailService();
  }

  buy(email, numberOfTickets) {
    if (this.supply >= numberOfTickets) {
      this.supply -= numberOfTickets;
      const timestamp = Date.now();
      this.emit("buy", email, timestamp, this.supply);

      // myEmitter.emit("buy", email, timestamp, this.supply);
      this.db.save(email, timestamp, this.supply);
      this.emailService.sendConfirmation(email, timestamp, this.supply);
    } else {
      myEmitter.emit(
        "error",
        new Error(
          `Not enough tickets available. Remaining tickets: ${this.supply}`
        )
      );
    }
  }
}

module.exports = TicketManager;
