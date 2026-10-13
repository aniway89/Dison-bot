# DisonBot

A simple Slack bot with a few useful commands.

## Commands

| Command | Description |
| --- | --- |
| `/dison-ping` | Check bot latency |
| `/dison-help` | Show available commands |
| `/dison-catfact` | Get a random cat fact |
| `/dison-joke` | Get a random joke |

## Setup

**1. Install dependencies**

```bash
npm install
```

**2. Create a `.env` file**

```env
SLACK_BOT_TOKEN=your-bot-token
SLACK_APP_TOKEN=your-app-token
```

**3. Start the bot**

```bash
node index.js
```
