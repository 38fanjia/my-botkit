'use strict';

export default class BaseSkill {

  constructor(controller) {
    this.controller = controller;
  }

  addReaction(bot, message, emoji) {
    bot.api.reactions.add({
      timestamp: message.ts,
      channel: message.channel,
      name: emoji
    }), error => {
      if (error) {
        bot.botkit.log('Failed to add emoji reaction :(', error);
      }
    };
  }
}
