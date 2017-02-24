'use strict';

import Botkit from 'botkit';
import TwitterStream from './twitter-stream';

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
}).startRTM((error, bot, payload) => {
  if (error) {
    throw new Error('Could not connect to Slack');
  }

  // twitter stream
  const twitterStream = new TwitterStream(bot);
  twitterStream.stream();
});

// listen ======================================================================

controller.hears('ping', ['direct_message', 'direct_mention'], (bot, message) => {
  bot.reply(message, 'pong');
});

controller.hears(['hello', 'hi'], ['direct_message', 'dicrect_mention'], (bot, message) => {

  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face'
  }), (error, response) => {
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
