---
layout: 'instructions'
headless: true
title: 'Instructions'
subtitle_text_1: 'If you have any questions, please use the'
subtitle_text_2: 'Start by downloading'
pool_servers: 'Pool servers'
faq_title: 'FAQ'
faq_subtitle: 'Frequently Asked Questions for Alephium Pool'
can_use: 'You can use'
start_downloading: 'Start by downloading'
ask_in_discord: 'About other solutions you can ask in'
wallet: 'Alephium Wallet'
dowland_wallet_link: 'https://github.com/alephium/desktop-wallet/releases'

miners_title: 'Miners'
miners_list:
  - miner: 'SRBMiner'
    link: 'https://github.com/doktor83/SRBMiner-Multi/releases'
  - miner: 'IolMiner'
    link: 'https://github.com/Lolliedieb/lolMiner-releases/releases'
  - miner: 'BzMiner'
    link: 'https://github.com/bzminer/bzminer/releases'
  - miner: 'T-Rex'
    link: 'https://github.com/trexminer/T-Rex/releases'
  - miner: 'Rigel'
    link: 'https://github.com/rigelminer/rigel/releases'
  - miner: 'WildRig Multi'
    link: 'https://github.com/andru-kun/wildrig-multi/releases'
  - miner: 'Other miners'
    link: 'https://github.com/alephium/awesome-alephium?tab=readme-ov-file#mining-software'

windows_examples_title: 'Windows examples'
windowsExamples:
  - tab: 'IolMiner'
    instruction: |
      1. Download [last release of lolMiner](https://github.com/Lolliedieb/lolMiner-releases/releases) and unzip the files.
      2. Update **alph** file, for example: **mine_aleph**
      ```
      set "ALEPHPOOL=eu1.alephium-pool.com:20032"
      set "ALEPHWALLET=your_wallet"
      ```
      3. Run **mine_aleph**.
      4. PROFIT !
  - tab: 'SRBMiner'
    instruction: |
      1. Download [last release of SRBMiner](https://github.com/doktor83/SRBMiner-Multi/releases) and unzip the files.
      2. Update file to
      ```
      SRBMiner-MULTI.exe --disable-cpu --algorithm blake3_alephium --pool eu1.alephium-pool.com:20032 --wallet your_wallet_address
      ```
      3. Run **alph** file
      4. PROFIT !
  - tab: 'T-Rex'
    instruction: |
      1. Download [last release of T-Rex](https://github.com/trexminer/T-Rex/releases) and unzip the files.
      2. Update file to
      ```
      t-rex.exe -a blake3 -o stratum+tcp://eu1.alephium-pool.com:20032 -u your_wallet_address -p x -w rig0
      ```
      3. Run **alph** file
      4. PROFIT !
  - tab: 'Bzminer'
    instruction: |
      1. Download [last release of BzMiner](https://github.com/bzminer/bzminer/releases) and unzip the files.
      2. Update file to
      ```
      bzminer -a alph -w your_wallet_address -p stratum+tcp://eu1.alephium-pool.com:20032
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
