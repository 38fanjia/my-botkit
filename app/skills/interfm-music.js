'use strict';

import BaseSkill from './base-skill';
import InterfmMusic from '../modules/interfm-music';

export default class MusicInfo extends BaseSkill {

  bind() {
    this.controller.hears(['^interfm', '^今の曲教えて'], ['direct_message', 'direct_mention'], (bot, message) => {
      this.execute(bot, message);
    });
  }

  execute(bot, message) {
    const trainInfo = new InterfmMusic();
    trainInfo.scraper().then(data => {
      bot.reply(message, data);
    }).catch(error => {
      bot.reply(message, error);
    });
  }
}
