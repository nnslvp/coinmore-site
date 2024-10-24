---
layout: 'instructions'
type: 'instructions'

SEO:
  description: 'Get step-by-step instructions on setting up and using CoinMore Pool for mining Alephium. Our detailed guides will help you start mining this cryptocurrency quickly and easily.'
  keywords: 'Alephium mining instructions, CoinMore Pool, mining guide, mining setup, Alephium mining, cryptocurrency mining, blockchain, crypto mining, digital mining, decentralized mining, secure mining, profitable mining'
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
dowland_wallet_link: 'https://github.com/alephium/alephium-frontend/releases'

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

windows_examples_title: 'Examples'
windowsExamples:
  - tab: 'IolMiner'
    instruction: |
      1. Download [latest release of lolMiner](https://github.com/Lolliedieb/lolMiner-releases/releases) and unzip the files.
      2. Update **mine_aleph** file:
      ```
      set "ALEPHPOOL=eu1.alephium.coinmore.io:20032"
      set "ALEPHWALLET=your_wallet_address"
      ```
      3. Run **mine_aleph**.
      4. PROFIT!
  - tab: 'SRBMiner'
    instruction: |
      1. Download [latest release of SRBMiner](https://github.com/doktor83/SRBMiner-Multi/releases) and unzip the files.
      2. Update file to:
      ```
      SRBMiner-MULTI.exe --disable-cpu --algorithm blake3_alephium --pool eu1.alephium.coinmore.io:20032 --wallet your_wallet_address
      ```
      3. Run **alph** file.
      4. PROFIT!
  - tab: 'T-Rex'
    instruction: |
      1. Download [latest release of T-Rex](https://github.com/trexminer/T-Rex/releases) and unzip the files.
      2. Update file to:
      ```
      t-rex.exe -a blake3 -o stratum+tcp://eu1.alephium.coinmore.io:20032 -u your_wallet_address -p x -w rig0
      ```
      3. Run **alph** file.
      4. PROFIT!
  - tab: 'BzMiner'
    instruction: |
      1. Download [latest release of BzMiner](https://github.com/bzminer/bzminer/releases) and unzip the files.
      2. Update file to:
      ```
      bzminer -a alph -w your_wallet_address -p stratum+tcp://eu1.alephium.coinmore.io:20032
      ```
      3. Run **alph** file.
      4. PROFIT!

faq:
  - question: 'What is Alephium mining pool?'
    answer: 'Alephium mining pool is a setup where each miner works independently. The block reward goes only to the miner who found it. Block search time depends on your hashrate and luck.'
  - question: 'How do I start mining Alephium?'
    answer: 'Start by downloading a compatible miner and the Alephium wallet. Follow the instructions provided to configure and run your miner.'
  - question: 'What are the pool fees?'
    answer: 'The pool fee is specified in the pool settings and may vary. Check the CoinMore Pool website for the current fee structure.'
  - question: 'How often are payouts?'
    answer: 'Payouts are made every 1 hour, provided you meet the minimum payout threshold.'
  - question: 'Can I mine Alephium on multiple devices?'
    answer: 'Yes, you can configure and run the miner on multiple devices using the same wallet address.'
  - question: 'Where can I find more help?'
    answer: 'Join the Alephium community on Discord for more help and support from other miners.'
  - question: 'What is the minimum payout?'
    answer: 'The minimum payout threshold is specified in the pool settings. Check the CoinMore Pool website for the current minimum payout value.'
  - question: 'What hardware do I need to mine Alephium?'
    answer: 'You need a GPU compatible with the supported mining software. Refer to the mining software documentation for specific hardware requirements.'
---
