const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("buy", (email, timestamp, remainingTickets) => {
  console.log(
    `Ticket purchased! Email: ${email}, Time: ${timestamp}, Remaining tickets: ${remainingTickets}`
  );
});

myEmitter.on("error", (error) => {
  console.error(`Error occurred: ${error.message}`);
});

module.exports = myEmitter;
