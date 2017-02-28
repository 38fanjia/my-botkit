'use strict';

export default class SlackChannel {

  constructor(bot) {
    this.bot = bot;
    this.channelList = [];
  }

  init() {
    this.bot.api.channels.list({
      token: process.env.TOKEN,
      exclude_archived: true
    },(err, channel) => {
      channel['channels'].forEach(channel => {
        this.channelList[channel.name] = channel.id;
      });
    });
  }

  list() {
    return this.channelList;
  }

  id(channelName) {
    if (this.channelList.hasOwnProperty(channelName)) {
      return this.channelList[channelName];
    } else {
      return null;
    }
  }
}