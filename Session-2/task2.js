function pingServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const online = Math.random() > 0.5;

      if (online) {
        resolve("Server is online.");
      } else {
        reject("Server is offline.");
      }
    }, 1000);
  });
}

async function checkServer() {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);

      const result = await pingServer();

      console.log(result);
      console.log("Connected successfully!");
      return;

    } catch (error) {
      console.log(error);

      if (attempt === 5) {
        console.log("Server is unreachable after 5 attempts.");
      }
    }
  }
}

checkServer();