'use strict';

export default class SlackChannel {

  constructor() {
    this.channelList = [];
  }

  getList(bot) {
    return new Promise(resolve => {

      if (this.channelList >= 1) {
        resolve(this.channelList);
      } else {
        bot.api.channels.list({
          token: process.env.TOKEN,
          exclude_archived: true
        }, (err, response) => {
          response['channels'].forEach(channel => {
            this.channelList[channel.name] = channel.id;
          });
          resolve(this.channelList);
        });
      }
    });
  }

  id(bot, name) {
    return new Promise((resolve, reject) => {
      this.getList(bot).then(list => {
        if (list.hasOwnProperty(name)) {
          resolve(list[name]);
        } else {
          reject();
        }
      });
    });
  }

  list(bot) {
    return new Promise(resolve => {
      this.getList(bot).then(list => {
        resolve(list);
      });
    });
  }
}