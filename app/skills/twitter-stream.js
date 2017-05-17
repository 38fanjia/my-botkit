'use strict';

import BaseSkill from './base_skill';
import Twitter from 'twitter';
import SlackChannel from '../slack-channel';

export default class TwitterStream extends BaseSkill {

  constructor(controller) {
    super();

    this.controller = controller;

    if (!process.env.CONSUMER_KEY || !process.env.CONSUMER_SECRET || !process.env.ACCESS_TOKEN_KEY || !process.env.ACCESS_TOKEN_SECRET || !process.env.STREAM_FILTER) {
      console.log('Error: Specify CONSUMER_KEY CONSUMER_SECRET ACCESS_TOKEN_KEY ACCESS_TOKEN_SECRET STREAM_FILTER in environment');
      process.exit(1);
    }

    // twitter consumer config
    this.client = Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    // twitter stream filter
    this.filter = process.env.STREAM_FILTER;

  }

  bind() {
    this.controller.on('message_received', (bot, message) => {
      if (message.type === 'hello') {

        // channel id
        const slackChannel = new SlackChannel();
        slackChannel.id(bot, 'general').then(data => {
          // stream
          this.stream(bot, data);
        }).catch(error => {
          bot.botkit.log('Failed to get Slack channel list :(', error);
        });
      }
    });
  }

  stream(bot, channel) {
    this.client.stream('statuses/filter', {
      track: this.filter
    }, stream => {

      stream.on('data', (tweet) => {
        const url = `http://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
        bot.api.chat.postMessage({
          text: url,
          channel: channel,
          username: 'twitter',
          icon_emoji: ':bird:'
        });
      });

      stream.on('error', (error) => {
        bot.botkito.log('Error: Twitter Stream ', error);
      });
    });
  }
}
