const mineflayer = require('mineflayer');
const { setTimeout } = require('timers/promises');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'Lifesteal_8.aternos.me', // Replace with your Aternos server IP
    port: 26279,
    username: 'BOT',
    version: false,
  });

  bot.on('login', () => {
    console.log('[+] Bot logged in.');
    bot.chat('Bot is online!');
    wander();
  });

  bot.on('end', async () => {
    console.log('[!] Bot disconnected. Reconnecting in 10 seconds...');
    await setTimeout(10000);
    createBot();
  });

  bot.on('error', err => console.error('[X] Error:', err.message));
}

function wander() {
  const movements = ['forward', 'back', 'left', 'right'];
  let i = 0;
  setInterval(() => {
    const move = movements[i % movements.length];
    bot.setControlState(move, true);
    setTimeout(() => bot.setControlState(move, false), 2000);
    i++;
  }, 5000);
}

createBot();
