require("dotenv").config();

const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/dison-ping", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();

  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/dison-help", async ({ ack, respond }) => {
  await ack();

  await respond({
    text:
      "*DisonBot Commands*\n\n" +
      "/dison-ping - Check bot latency\n" +
      "/dison-help - Show available commands\n" +
      "/dison-catfact - Get a random cat fact\n" +
      "/dison-joke - Get a random joke",
  });
});

app.command("/dison-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://catfact.ninja/fact",
      { timeout: 8000 }
    );

    await respond({
      text: `🐱 *Cat Fact*\n${response.data.fact}`,
    });
  } catch (err) {
    console.error("Cat fact API error:", err.message);

    await respond({
      text: "Couldn't fetch a cat fact right now. Try again later!",
    });
  }
});

// Joke command
app.command("/dison-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
      { timeout: 8000 }
    );

    const { setup, punchline } = response.data;

    await respond({
      text: `😂 *Random Joke*\n\n${setup}\n${punchline}`,
    });
  } catch (err) {
    console.error("Joke API error:", err.message);

    await respond({
      text: "Couldn't fetch a joke right now. Try again later!",
    });
  }
});

// Start bot
(async () => {
  try {
    await app.start();
    console.log("DisonBot is running!");
  } catch (err) {
    console.error("Failed to start DisonBot:", err);
    process.exitCode = 1;
  }
})();