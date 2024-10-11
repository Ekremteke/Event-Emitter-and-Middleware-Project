class EmailService {
  sendConfirmation(email, timestamp, remainingTickets) {
    setTimeout(() => {
      console.log(`Email was sent to ${email}`);
    }, 1000);
  }
}

module.exports = EmailService;
