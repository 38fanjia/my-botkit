'use strict';

export default class Hello {

  constructor(controller) {
    this.controller = controller;
  }

  run() {

    this.controller.hears(['^hello', '^hi'], ['direct_message', 'direct_mention'], (bot, message) => {

      // add reactions
      bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face'
      }), error => {
        if (error) {
          bot.botkit.log('Failed to add emoji reaction :(', error);
        }
      };

      // reply message
      this.controller.storage.users.get(message.user, (error, user) => {
        if (user && user.name) {
          bot.reply(message, `Hello ${user.name}!!`);
        } else {
          bot.reply(message, 'Hello.');
        }
      });

    });
  }
}
