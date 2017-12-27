let async = require('async');
let { spawn } = require('child_process');

let conf = require('./config.js');
let wtm = require('./whattomine.api.js');

let current_coin = null;
let current_subprocess = null;

let spawn_opts = {
  stdio: ['inherit', 'inherit', 'inherit']
};

async function main() {
  let gpu = await wtm.gpu(conf);

  checkGPUs(conf, gpu).forEach((gpuCoin) => {
    if (gpuCoin.disabled !== true) {
      let cli = conf.crypto[gpuCoin.coin.key].cli.replace('%WORKER%', conf.worker || require('os').hostname());
      cli = cli.split(' ');
      let bin = cli[0];
      let args = cli.slice(1);

      if (gpuCoin.coin.key != current_coin) {
        if (current_subprocess !== null) {
          current_subprocess.kill();

          console.log('Killed', current_subprocess, 'mining coin', current_coin);
        }

        console.log('Switching to mine new coin:', JSON.stringify(gpuCoin, null, 2));

        current_coin = gpuCoin.coin.key;

        current_subprocess = spawn(bin, args, spawn_opts);

        console.log('Spawned', bin, 'with args', args);
      }
    }
  });

  //setTimeout(main, 1800000);
  setTimeout(main, conf.minTimeBetweenSwitch);
}

function checkGPUs(conf, coins) {
  let rslt = [];

  conf.gpus.forEach((gpu) => {
    rev = gpu.gpu + 'revenue';
    coins.forEach((coin) => {
      let secondsInDay = 60 * 60 * 24;
      let totalCoinsPerDay = coin.block_reward * secondsInDay / parseFloat(coin.block_time);
      let myShareOfHashrate = gpu[coin.algorithm].hashrate / coin.nethash;

      coin[rev] = myShareOfHashrate * totalCoinsPerDay * coin.exchange_rate;
    });

    rslt.push({
      'gpu': gpu.gpu,
      'disabled': gpu.disabled,
      'coin': coins.sort((coinA, coinB) => {
      if (coinA[rev] < coinB[rev]) {
        return 1;
      }

      if (coinA[rev] > coinB[rev]) {
        return -1;
      }

      return 0;
      })[0]
    });
  });

  return rslt;
}

main();
