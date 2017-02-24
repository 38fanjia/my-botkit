'use strict';

import Botkit from 'botkit';

if (!process.env.TOKEN) {
  console.log('Error: Specify TOKEN in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
  debug: false
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.TOKEN
}).startRTM();

// listen ======================================================================

controller.hears('ping', ['direct_message', 'direct_mention'], (bot, message) => {
  bot.reply(message, 'pong');
});

controller.hears(['hello', 'hi'], ['direct_message', 'dicrect_mention'], (bot, message) => {

  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face'
  }), (error) => {
    if(error) {
      bot.botkit.log('Failed to add emoji reaction :(', error);
    }
  };

  controller.storage.users.get(message.user, (error, user) => {
    if (user && user.name) {
      bot.reply(message, 'Hello ' + user.name + '!!');
    } else {
      bot.reply(message, 'Hello.');
    }
  });
});
