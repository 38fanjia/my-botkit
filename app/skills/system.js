'use strict';

export default class System {

  constructor(controller) {
    this.controller = controller;
  }

  run() {

    this.controller.hears(['^ping'], ['direct_message', 'direct_mention'], (bot, message) => {
      bot.reply(message, 'pong');
    });

  }
}
