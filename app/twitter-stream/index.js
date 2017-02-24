'use strict';

import Twitter from 'twitter';

const twitterclient = Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

if (!process.env.CONSUMER_KEY || !process.env.CONSUMER_SECRET || !process.env.ACCESS_TOKEN_KEY || !process.env.ACCESS_TOKEN_SECRET || !process.env.STREAM_FILTER || !process.env.STREAM_CHANNEL) {
  console.log('Error: Specify CONSUMER_KEY CONSUMER_SECRET ACCESS_TOKEN_KEY ACCESS_TOKEN_SECRET STREAM_FILTER STREAM_CHANNEL in environment');
  process.exit(1);
}

export default class TwitterStream {

  constructor(bot) {
    this.bot = bot;
  }

  stream() {
    twitterclient.stream('statuses/filter', {track: process.env.STREAM_FILTER}, (stream) => {

      stream.on('data', (tweet) => {
        const url = 'http://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str;
        this.bot.api.chat.postMessage({
          text: url,
          channel: process.env.STREAM_CHANNEL,
          username: 'twitter',
          icon_emoji: ':bird:'
        });
      });

      stream.on('error', (error) => {
        console.log(error);
      });
    });
  }
}