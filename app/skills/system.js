'use strict';

export default class System {

  run(controller) {
    controller.hears(['^ping'], ['direct_message', 'direct_mention'], (bot, message) => {
      bot.reply(message, 'pong');
    })
  }
}
