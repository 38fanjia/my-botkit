'use strict';

import BaseSkill from './base_skill';

export default class Hello extends BaseSkill {

  bind() {

    this.controller.hears(['^hello', '^hi'], ['direct_message', 'direct_mention'], (bot, message) => {
      this.addReaction(bot, message, 'robot_face');
      bot.reply(message, 'Hello.');
    });
  }
}
