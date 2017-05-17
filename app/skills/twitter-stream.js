'use strict';

import BaseSkill from './base_skill';

import Twitter from '../modules/twitter-stream';
import SlackChannel from '../modules/slack-channel';

export default class TwitterStream extends BaseSkill {

  bind() {
    this.controller.on('message_received', (bot, message) => {
      if (message.type === 'hello') {

        const slackChannel = new SlackChannel();
        slackChannel.id(bot, 'general').then(data => {
          this.execute(bot, data);
        }).catch(error => {
          bot.botkit.log('Failed to get Slack channel list :(', error);
        });
      }
    });
  }

  execute(bot, channel) {
    if (process.env.STREAM_FILTER) {
      bot.reply('Twitter Stream のキーワードが設定されていません.');
    } else {
      const twitter = new Twitter();
      twitter.stream(bot, channel, process.env.STREAM_FILTER);
    }
  }
}
