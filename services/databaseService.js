class DatabaseService {
  save(email, timestamp, supply) {
    console.log(
      `Running query: email:'${email}', time: ${timestamp}, remaining tickets: ${supply})`
    );
  }
}

module.exports = DatabaseService;
