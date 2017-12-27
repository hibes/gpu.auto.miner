let http = require('http');

let gpu_url = 'http://whattomine.com/coins.json';
let asic_url = 'http://whattomine.com/asic.json';

module.exports = {
  gpu: (conf) => {
    return new Promise((resolve, reject) => {
      let result;

      http.get(gpu_url, (res) => {
        let data = [];
        res.on('data', (d) => {
          data += d;
        });

        res.on('end', () => {
          let json = JSON.parse(data);

          let relevantCoins = [];

          Object.keys(json.coins).forEach((key) => {
            if (
                  (!json.coins[key].lagging || conf.includeLagging) &&
                  (!key.includes('Nicehash') || conf.includeNicehash) &&
                  (Object.keys(conf.crypto).includes(key) || conf.includeUnconfiguredCryptos)
               ) {
              json.coins[key]['key'] = key;
              relevantCoins.push(json.coins[key]);
            }
          });

          resolve(relevantCoins);
        });

        res.on('error', (err) => {
          reject(err);
        });
      });
    });
  },
  asic: () => {
  },
};
