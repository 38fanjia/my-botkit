'use strict';

import {JSDOM} from 'jsdom';
import {JSDOM_OPTIONS as OPTIONS} from '../constants';

export default class TrainInfo {

  scraper() {
    return new Promise((resolve, reject) => {
      JSDOM.fromURL('http://www.keikyu.co.jp/', OPTIONS).then(dom => {
        const element = dom.window.document.querySelector('.train-information > dl dd a');
        const message = `:keikyu: ${element.textContent.trim()} ${element.href}`;
        resolve(message);
      }).catch(() => {
        reject('京急電鉄オフィシャルサイト へのアクセスに失敗しました.');
      });
    });
  }
}
