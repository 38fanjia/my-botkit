require('babel-register');
var Bot = require('./app/bot.js').default;

const bot = new Bot();
bot.run();