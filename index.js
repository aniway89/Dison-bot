require("dotenv").config();

const { App } = require("@slack/bolt");

if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_APP_TOKEN) {
  throw new Error("Missing Slack tokens. Check your .env file.");
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/dison-ping", async ({ command, ack, respond }) => {
  const start = Date.now();

  await ack();

  const latency = Date.now() - start;

  await respond({
    text: `Pong!\nLatency: ${latency}ms`,
  });
});

(async () => {
  await app.start();
  console.log("DisonBot is running!");
})();
