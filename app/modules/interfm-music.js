'use strict';

import {
  JSDOM
} from 'jsdom';
import {
  JSDOM_OPTIONS as OPTIONS
} from '../constants';

export default class InterfmMusic {

  scraper() {
    const URI = 'https://www.interfm.co.jp/search/';
    const SELECTOR_FOR_LIST = '#content .wrp tr:nth-last-child(-n+5)';

    return new Promise((resolve, reject) => {
      JSDOM.fromURL(URI, OPTIONS).then(dom => {
        const elements = dom.window.document.querySelectorAll(SELECTOR_FOR_LIST);
        const message = `:radio: InterFM897 最近のオンエア曲 :radio:\n${this.getList(elements)}`;
        resolve(message);
      }).catch(() => {
        reject('InterFM897 Music Search へのアクセスに失敗しました.');
      });
    });
  }

  getList(elements) {
    return [...elements].map(element => {
      const title = element.querySelector('td:nth-child(2)').textContent;
      const artist = element.querySelector('td:nth-child(3)').textContent;
      return `:musical_note: ${title} / ${artist}`;
    }).join('\n');
  }
}
