---
layout: 'instructions'
headless: true
title: 'Instructions'
subtitle_text_1: 'If you have any questions, please use the'
subtitle_text_2: 'Start by downloading'
telegram_community: 'telegram community'
pool_servers: 'Pool servers'
miners: 'Miners'
windows_examples: 'Windows examples'
faq_title: 'FAQ'
faq_subtitle: 'Frequently Asked Questions for AlephiumPool.com'
can_use: 'You can use'
start_downloading: 'Start by downloading'
ask_in_telegram: 'About other solutions you can ask in'
download_word: 'Download'
download_lolminer_phrase: 'last release of lolMiner'
unzip_phrase: 'and unzip files'
update_file_phrase: 'Update <strong>alph</strong> file, for example:'
run_alph_file_phrase: 'Run <strong>alph</strong> file, for example:'
wallet: 'Raptoreum Wallet'
dowland_wallet_link: 'https://github.com/Raptor3um/raptoreum/releases'
update_file: 'Update `alph` file, for example: `dual_mine_eth_aleph.bat`.'
run_file: 'Run `alph` file, for example: `dual_mine_eth_aleph.bat`.'
profit: 'PROFIT!'

miners_title: 'Miners'
miners_list:
  - miner: 'WyvernTKC'
    link: 'https://github.com/WyvernTKC/cpuminer-gr-avx2/releases'
  - miner: 'XMRig'
    link: 'https://github.com/xmrig/xmrig'
  - miner: 'xmrigCC'
    link: 'https://github.com/Bendr0id/xmrigCC/releases'
  - miner: 'WildRig'
    link: 'https://github.com/andru-kun/wildrig-multi/releases'
  - miner: 'Other miners'
    link: 'https://raptoreum.com/sample-page/downloads/'

windows_examples_title: 'Windows examples'
windowsExamples:
  - tab: 'WyvernTKC'
    instruction: |
      1. Download [last release of WyvernTKC](https://github.com/WyvernTKC/cpuminer-gr-avx2/releases) and unzip the files.
      2. Update **alph** file, for example: **dual_mine_eth_aleph.bat**
      ```
      set "ALEPHPOOL=detect-my-region.alephium-pool.com:20032"
      set "ALEPHWALLET=your_wallet"
      ```
      3. Run **alph** file, for example: **dual_mine_eth_aleph.bat**.
      4. PROFIT !
  - tab: 'XMRig'
    instruction: |
      1. Download [last release of XMRig](https://github.com/xmrig/xmrig/releases) and unzip the files.
      2. Update file to
      ```
      xmrig.exe -o auto-geo.raptoreum.coinmore.io:3002 -u your_wallet_address -p x
      ```
      3. Run **alph** file
      4. PROFIT !
  - tab: 'xmrigCC'
    instruction: |
      1. Download [last release of xmrigCC](https://github.com/Bendr0id/xmrigCC/releases) and unzip the files.
      2. Update file to
      ```
      t-rex.exe -a blake3 -o stratum+tcp://detect-my-region.alephium-pool.com:20032 -u your_wallet_address -p x -w rig0
      ```
      3. Run **alph** file
      4. PROFIT !
  - tab: 'WildRig'
    instruction: |
      1. Download [last release of WildRig](https://github.com/andru-kun/wildrig-multi/releases) and unzip the files.
      2. Update file to
      ```
      bzminer -a alph -w your_wallet_address -p stratum+tcp://detect-my-region.alephium-pool.com:20032
      ```
      3. Run **alph**  file
      4. PROFIT !

faq:
  - question: 'Question 1'
    answer: 'Alephium mining pool is a mining pool configured in such a way that each miner works independently of the others. The block reward goes to only the miner who found it, others do not get anything. Block search time depends on your hashrate and luck.'
  - question: 'Question 2'
    answer: 'Alephium mining pool is a mining pool configured in such a way that each miner works independently of the others. The block reward goes to only the miner who found it, others do not get anything. Block search time depends on your hashrate and luck.'
  - question: 'Question 3'
    answer: 'Alephium mining pool is a mining pool configured in such a way that each miner works independently of the others. The block reward goes to only the miner who found it, others do not get anything. Block search time depends on your hashrate and luck.'
  - question: 'Question 4'
    answer: 'Alephium mining pool is a mining pool configured in such a way that each miner works independently of the others. The block reward goes to only the miner who found it, others do not get anything. Block search time depends on your hashrate and luck.'
  - question: 'Question 5'
    answer: 'Alephium mining pool is a mining pool configured in such a way that each miner works independently of the others. The block reward goes to only the miner who found it, others do not get anything. Block search time depends on your hashrate and luck.'
  - question: 'Question 6'
    answer: 'Alephium mining pool is a mining pool configured in such a way that each miner works independently of the others. The block reward goes to only the miner who found it, others do not get anything. Block search time depends on your hashrate and luck.'
  - question: 'Question 7'
    answer: 'Alephium mining pool is a mining pool configured in such a way that each miner works independently of the others. The block reward goes to only the miner who found it, others do not get anything. Block search time depends on your hashrate and luck.'
  - question: 'Question 8'
    answer: 'Alephium mining pool is a mining pool configured in such a way that each miner works independently of the others. The block reward goes to only the miner who found it, others do not get anything. Block search time depends on your hashrate and luck.'
---
