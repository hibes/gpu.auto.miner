module.exports = {
  'crypto': {
    'Zclassic': {
      'key': 'Zclassic',
      'cli': './miner.exe --server us-east.equihash-hub.miningpoolhub.com --pass x --port 20575 --user your_username_here.%WORKER%',
    },
    'Zencash': {
      'key': 'Zencash',
      'cli': './miner.exe --server us-east.equihash-hub.miningpoolhub.com --pass x --port 20594 --user your_username_here.%WORKER%',
    },
    'LBRY': {
      'key': 'LBRY',
      'cli': './ccminer-x64.exe -a Lbry -o stratum+tcp://lbry.suprnova.cc:6256 -u your_username_here.%WORKER% -p your_password_here',
    },
    'Monacoin': {
      'key': 'Monacoin',
      'cli': './ccminer-x64.exe -a lyra2v2 -o stratum+tcp://hub.miningpoolhub.com:20593 --cpu-priority 4 -u your_username_here.%WORKER%',
    },
  },
  'centsPerkWh': 10,
  'gpus': [
    {
      'gpu': '1080',
      'disabled': false,
      'Ethash': {
        'hashrate': 23300000,
        'watts': 140,
      },
      'Groestl': {
        'hashrate': 44500000,
        'watts': 150,
      },
      'Myriad-Groestl': {
        'hashrate': 58000000,
        'watts': 210,
      },
      'X11Gost': {
        'hashrate': 13500000,
        'watts': 145,
      },
      'CryptoNight': {
        'hashrate': 580,
        'watts': 100,
      },
      'Equihash': {
        'hashrate': 550,
        'watts': 130,
      },
      'Lyra2REv2': {
        'hashrate': 46500000,
        'watts': 150,
      },
      'NeoScrypt': {
        'hashrate': 1060000,
        'watts': 150,
      },
      'LBRY': {
        'hashrate': 360000000,
        'watts': 130,
      },
      'Blake (2b)': {
        'hashrate': 2150000000,
        'watts': 150,
      },
      'Blake (14r)': {
        'hashrate': 3300000000,
        'watts': 150,
      },
      'Pascal': {
        'hashrate': 1250000000,
        'watts': 150,
      },
      'Skunkhash': {
        'hashrate': 36500000,
        'watts': 150,
      },
    },
    {
      'gpu': '1080ti',
      'disabled': true,
      'Ethash': {
        'hashrate': 35000000,
        'watts': 140,
      },
      'Groestl': {
        'hashrate': 58000000,
        'watts': 210,
      },
      'Myriad-Groestl': {
        'hashrate': 58000000,
        'watts': 210,
      },
      'X11Gost': {
        'hashrate': 19500000,
        'watts': 170,
      },
      'CryptoNight': {
        'hashrate': 830,
        'watts': 140,
      },
      'Equihash': {
        'hashrate': 685,
        'watts': 190,
      },
      'Lyra2REv2': {
        'hashrate': 64000000,
        'watts': 190,
      },
      'NeoScrypt': {
        'hashrate': 1400000,
        'watts': 190,
      },
      'LBRY': {
        'hashrate': 460000000,
        'watts': 190,
      },
      'Blake (2b)': {
        'hashrate': 2800000000,
        'watts': 190,
      },
      'Blake (14r)': {
        'hashrate': 4350000000,
        'watts': 210,
      },
      'Pascal': {
        'hashrate': 1700000000,
        'watts': 210,
      },
      'Skunkhash': {
        'hashrate': 47500000,
        'watts': 190,
      },
    },
  ],
  'worker': 'your_workername_here',
};
