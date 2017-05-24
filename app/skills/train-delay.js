'use strict';

import BaseSkill from './base-skill';
import TrainInfo from '../modules/train-info';

export default class TrainDelay extends BaseSkill {

  bind() {
    this.controller.hears(['^train delay'], ['direct_message', 'direct_mention'], (bot, message) => {
      this.execute(bot, message);
    });
  }

  execute(bot, message) {
    const trainInfo = new TrainInfo();
    trainInfo.scraper().then(data => {
      bot.reply(message, data);
    }).catch(error => {
      bot.reply(message, error);
    });
  }
}
