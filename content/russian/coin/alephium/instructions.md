---
layout: 'instructions'
headless: true
SEO:
  description: 'Получите пошаговые инструкции по настройке и использованию CoinMore Pool для майнинга Alephium. Наши подробные руководства помогут вам начать майнинг этой криптовалюты быстро и легко.'
  keywords: 'инструкции по майнингу Alephium, CoinMore Pool, руководство по майнингу, настройка майнинга, майнинг Alephium, майнинг криптовалют, блокчейн, крипто майнинг, цифровой майнинг, децентрализованный майнинг, безопасный майнинг, прибыльный майнинг, майнинг софт, майнинг оборудование'
  
title: 'Инструкции'
subtitle_text_1: 'Если у вас есть вопросы, воспользуйтесь'
subtitle_text_2: 'Начните с загрузки'
pool_servers: 'Серверы пула'
miners_title: 'Майнеры'
faq_title: 'Вопросы и ответы'
faq_subtitle: 'Часто задаваемые вопросы для Alephium Pool'
can_use: 'Вы можете использовать'
start_downloading: 'Начните с загрузки'
ask_in_discord: 'О других решениях вы можете спросить в'
download_lolminer_phrase: 'последнюю версию lolMiner'
wallet: 'Кошелек Alephium'
dowland_wallet_link: 'https://github.com/alephium/desktop-wallet/releases'
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
  - miner: 'Другие майнеры'
    link: 'https://github.com/alephium/awesome-alephium?tab=readme-ov-file#mining-software'

windows_examples_title: 'Примеры для Windows'
windowsExamples:
  - tab: 'IolMiner'
    instruction: |
      1. Скачайте [последнюю версию lolMiner](https://github.com/Lolliedieb/lolMiner-releases/releases) и распакуйте файлы.
      2. Обновите файл **alph**, например: **mine_aleph**
      ```
      set "ALEPHPOOL=eu1.alephium-pool.com:20032"
      set "ALEPHWALLET=your_wallet"
      ```
      3. Запустите файл **alph**, например: **mine_aleph**.
      4. PROFIT!
  - tab: 'SRBMiner'
    instruction: |
      1. Скачайте [последнюю версию SRBMiner](https://github.com/doktor83/SRBMiner-Multi/releases) и распакуйте файлы.
      2. Обновите файл на
      ```
      SRBMiner-MULTI.exe --disable-cpu --algorithm blake3_alephium --pool eu1.alephium-pool.com:20032 --wallet your_wallet_address
      ```
      3. Запустите файл **alph**
      4. PROFIT!
  - tab: 'T-Rex'
    instruction: |
      1. Скачайте [последнюю версию T-Rex](https://github.com/trexminer/T-Rex/releases) и распакуйте файлы.
      2. Обновите файл на
      ```
      t-rex.exe -a blake3 -o stratum+tcp://eu1-region.alephium-pool.com:20032 -u your_wallet_address -p x -w rig0
      ```
      3. Запустите файл **alph**
      4. PROFIT!
  - tab: 'Bzminer'
    instruction: |
      1. Скачайте [последнюю версию BzMiner](https://github.com/bzminer/bzminer/releases) и распакуйте файлы.
      2. Обновите файл на
      ```
      bzminer -a alph -w your_wallet_address -p stratum+tcp://eu1.alephium-pool.com:20032
      ```
      3. Запустите файл **alph**
      4. PROFIT!

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
