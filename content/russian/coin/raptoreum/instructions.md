---
layout: 'instructions'
headless: true
title: 'Инструкции'
subtitle_text_1: 'Если у вас есть вопросы, воспользуйтесь'
subtitle_text_2: 'Начните с загрузки'
telegram_community: 'телеграмм сообщество'
pool_servers: 'Серверы пула'
miners: 'Майнеры'
windows_examples: 'Примеры для Windows'
faq_title: 'Вопросы и ответы'
faq_subtitle: 'Часто задаваемые вопросы для AlephiumPool.com'
can_use: 'Вы можете использовать'
start_downloading: 'Начните с загрузки'
ask_in_telegram: 'О других решениях вы можете спросить в'
wallet: 'Кошелек Raptoreum'
dowland_wallet_link: 'https://github.com/Raptor3um/raptoreum/releases'

miners_title: 'Майнеры'
miners_list:
  - miner: 'WyvernTKC'
    link: 'https://github.com/WyvernTKC/cpuminer-gr-avx2/releases'
  - miner: 'XMRig'
    link: 'https://github.com/xmrig/xmrig'
  - miner: 'xmrigCC'
    link: 'https://github.com/Bendr0id/xmrigCC/releases'
  - miner: 'WildRig'
    link: 'https://github.com/andru-kun/wildrig-multi/releases'
  - miner: 'Другие майнеры'
    link: 'https://raptoreum.com/sample-page/downloads/'

windows_examples_title: 'Примеры для Windows'
windowsExamples:
  - tab: 'WyvernTKC'
    instruction: |
      1. Скачайте [последнюю версию WyvernTKC](https://github.com/WyvernTKC/cpuminer-gr-avx2/releases) и распакуйте файлы.
      2. Обновите файл **alph**, например: **dual_mine_eth_aleph.bat**.
      ```
      set "ALEPHPOOL=detect-my-region.alephium-pool.com:20032"
      set "ALEPHWALLET=your_wallet"
      ```
      3. Запустите файл **alph**, например: **dual_mine_eth_aleph.bat**.
      4. PROFIT !
  - tab: 'XMRig'
    instruction: |
      1. Скачайте [последнюю версию XMRig](https://github.com/xmrig/xmrig/releases) и распакуйте файлы..
      2. Обновите файл на
      ```
      xmrig.exe -o auto-geo.raptoreum.coinmore.io:3002 -u your_wallet_address -p x
      ```
      3. Запустите файл **alph**
      4. PROFIT !
  - tab: 'xmrigCC'
    instruction: |
      1. Скачайте [последнюю версию xmrigCC](https://github.com/Bendr0id/xmrigCC/releases) и распакуйте файлы..
      2. Обновите файл на
      ```
      t-rex.exe -a blake3 -o stratum+tcp://detect-my-region.alephium-pool.com:20032 -u your_wallet_address -p x -w rig0
      ```
      3. Запустите файл **alph**
      4. PROFIT !
  - tab: 'WildRig'
    instruction: |
      1. Скачайте [последнюю версию WildRig](https://github.com/andru-kun/wildrig-multi/releases) и распакуйте файлы..
      2. Обновите файл на
      ```
      bzminer -a alph -w your_wallet_address -p stratum+tcp://detect-my-region.alephium-pool.com:20032
      ```
      3. Запустите файл **alph**
      4. PROFIT !

faq:
  - question: 'Вопрос 1'
    answer: 'Майнинговый пул Alephium настроен таким образом, что каждый майнер работает независимо от других. Награда за блок идет только тому майнеру, который его нашел, другие ничего не получают. Время поиска блока зависит от вашего хешрейта и удачи.'
  - question: 'Вопрос 2'
    answer: 'Майнинговый пул Alephium настроен таким образом, что каждый майнер работает независимо от других. Награда за блок идет только тому майнеру, который его нашел, другие ничего не получают. Время поиска блока зависит от вашего хешрейта и удачи.'
  - question: 'Вопрос 3'
    answer: 'Майнинговый пул Alephium настроен таким образом, что каждый майнер работает независимо от других. Награда за блок идет только тому майнеру, который его нашел, другие ничего не получают. Время поиска блока зависит от вашего хешрейта и удачи.'
  - question: 'Вопрос 4'
    answer: 'Майнинговый пул Alephium настроен таким образом, что каждый майнер работает независимо от других. Награда за блок идет только тому майнеру, который его нашел, другие ничего не получают. Время поиска блока зависит от вашего хешрейта и удачи.'
  - question: 'Вопрос 5'
    answer: 'Майнинговый пул Alephium настроен таким образом, что каждый майнер работает независимо от других. Награда за блок идет только тому майнеру, который его нашел, другие ничего не получают. Время поиска блока зависит от вашего хешрейта и удачи.'
  - question: 'Вопрос 6'
    answer: 'Майнинговый пул Alephium настроен таким образом, что каждый майнер работает независимо от других. Награда за блок идет только тому майнеру, который его нашел, другие ничего не получают. Время поиска блока зависит от вашего хешрейта и удачи.'
  - question: 'Вопрос 7'
    answer: 'Майнинговый пул Alephium настроен таким образом, что каждый майнер работает независимо от других. Награда за блок идет только тому майнеру, который его нашел, другие ничего не получают. Время поиска блока зависит от вашего хешрейта и удачи.'
  - question: 'Вопрос 8'
    answer: 'Майнинговый пул Alephium настроен таким образом, что каждый майнер работает независимо от других. Награда за блок идет только тому майнеру, который его нашел, другие ничего не получают. Время поиска блока зависит от вашего хешрейта и удачи.'
---
