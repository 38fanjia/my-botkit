'use strict';

import BaseSkill from './base-skill';

export default class System extends BaseSkill {

  bind() {
    this.controller.hears(['^ping'], ['direct_message', 'direct_mention'], (bot, message) => {
      bot.reply(message, 'pong');
    });
  }
}
