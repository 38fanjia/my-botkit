'use strict';

import Twitter from 'twitter';

export default class TwitterStream {

  constructor() {

    if (!process.env.CONSUMER_KEY || !process.env.CONSUMER_SECRET || !process.env.ACCESS_TOKEN_KEY || !process.env.ACCESS_TOKEN_SECRET) {
      console.error('Error: Specify TWITTER STREAM PARAMETER in environemt');
      process.exit(1);
    }

    // twitter consumer config
    this.client = Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
  }

  stream(bot, channel, keyword) {
    this.client.stream('statuses/filter', {
      track: keyword
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
