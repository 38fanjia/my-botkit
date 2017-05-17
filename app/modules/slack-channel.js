'use strict';

export default class SlackChannel {

  getList(bot) {
    return new Promise((resolve, reject) => {

      bot.api.channels.list({
        token: process.env.TOKEN,
        exclude_archived: true
      }, (error, response) => {

        if (!error) {
          reject('Channle List の取得に失敗しました.');
        } else {
          response['channels'].forEach(channel => {
            this.channelList[channel.name] = channel.id;
          });
          resolve(this.channelList);
        }
      });
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
