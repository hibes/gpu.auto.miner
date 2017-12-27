let async = require('async');
let { spawn } = require('child_process');

let DEFAULT_MAX_TIME_BEFORE_KILL = 500;
let DEFAULT_MIN_TIME_BETWEEN_SWITCH = 1800000;
let SECONDS_IN_DAY = 60 * 60 * 24;

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
          let temp = current_subprocess;

          temp.on('exit', () => {
            temp.exited = true;
          });

          setTimeout(() => {
            if (temp.exited !== true) {
              console.log('Failed to kill the process with a SIGTERM, sending a SIGKILL instead.');

              temp.kill('SIGKILL');
            }
          }, conf.maxTimeBeforeKill || DEFAULT_MAX_TIME_BEFORE_KILL);

          current_subprocess.kill('SIGTERM');

          console.log('Killed', current_subprocess, 'mining coin', current_coin);
        }

        console.log('Switching to mine new coin:', JSON.stringify(gpuCoin, null, 2));

        current_coin = gpuCoin.coin.key;

        current_subprocess = spawn(bin, args, spawn_opts);

        console.log('Spawned', bin, 'with args', args);
      }
    }
  });

  setTimeout(main, conf.minTimeBetweenSwitch || DEFAULT_MIN_TIME_BETWEEN_SWITCH);
}

function checkGPUs(conf, coins) {
  let rslt = [];

  conf.gpus.forEach((gpu) => {
    rev = gpu.gpu + 'revenue';
    coins.forEach((coin) => {
      let totalCoinsPerDay = coin.block_reward * SECONDS_IN_DAY / parseFloat(coin.block_time);
      let myShareOfHashrate = gpu[coin.algorithm].hashrate / coin.nethash;

      coin[rev] = myShareOfHashrate * totalCoinsPerDay * coin.exchange_rate;
    });

    rslt.push({
      'gpu': gpu.gpu,
      'disabled': gpu.disabled,
      'coin': coins.sort(coinSortMethod)[0],
    });
  });

  return rslt;
}

function coinSortMethod(coinA, coinB) {
  if (coinA[rev] < coinB[rev]) {
    return 1;
  }

  if (coinA[rev] > coinB[rev]) {
    return -1;
  }

  return 0;
}

/*
 * Useful method for testing kill functionality.
 */
function randomSortMethod() {
  return (Math.floor(Math.random() * (1 - 0 + 1) + 0) === 0 ? -1 : 1);
}

main();
