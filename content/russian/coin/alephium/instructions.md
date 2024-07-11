---
layout: 'instructions'
headless: true
SEO:
  description: 'Узнайте, как быстро и легко настроить и использовать CoinMore Pool для майнинга Alephium. Подробные пошаговые инструкции помогут вам начать добычу криптовалюты прямо сейчас.'
  keywords: 'инструкции по майнингу Alephium, настройка майнинга Alephium, CoinMore Pool, руководство по майнингу, майнинг криптовалют, блокчейн, крипто майнинг, цифровой майнинг, безопасный майнинг, прибыльный майнинг'

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
wallet: 'Кошелька Alephium'
dowland_wallet_link: 'https://github.com/alephium/alephium-frontend/releases'
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
  - tab: 'lolMiner'
    instruction: |
      1. Скачайте [последнюю версию lolMiner](https://github.com/Lolliedieb/lolMiner-releases/releases) и распакуйте файлы.
      2. Обновите файл **mine_aleph**:
      ```
      set "ALEPHPOOL=eu1.alephium-pool.com:20032"
      set "ALEPHWALLET=your_wallet"
      ```
      3. Запустите **mine_aleph**.
      4. PROFIT!
  - tab: 'SRBMiner'
    instruction: |
      1. Скачайте [последнюю версию SRBMiner](https://github.com/doktor83/SRBMiner-Multi/releases) и распакуйте файлы.
      2. Обновите файл на:
      ```
      SRBMiner-MULTI.exe --disable-cpu --algorithm blake3_alephium --pool eu1.alephium-pool.com:20032 --wallet your_wallet_address
      ```
      3. Запустите файл **alph**.
      4. PROFIT!
  - tab: 'T-Rex'
    instruction: |
      1. Скачайте [последнюю версию T-Rex](https://github.com/trexminer/T-Rex/releases) и распакуйте файлы.
      2. Обновите файл на:
      ```
      t-rex.exe -a blake3 -o stratum+tcp://eu1.alephium-pool.com:20032 -u your_wallet_address -p x -w rig0
      ```
      3. Запустите файл **alph**.
      4. PROFIT!
  - tab: 'BzMiner'
    instruction: |
      1. Скачайте [последнюю версию BzMiner](https://github.com/bzminer/bzminer/releases) и распакуйте файлы.
      2. Обновите файл на:
      ```
      bzminer -a alph -w your_wallet_address -p stratum+tcp://eu1.alephium-pool.com:20032
      ```
      3. Запустите **alph**.
      4. PROFIT!

faq:
  - question: 'Что такое майнинговый пул Alephium?'
    answer: 'Майнинговый пул Alephium позволяет каждому майнеру работать независимо. Награда за блок идет только майнеру, который его нашел. Время поиска блока зависит от вашего хешрейта и удачи.'
  - question: 'Как начать майнить Alephium?'
    answer: 'Скачайте совместимый майнер и кошелек Alephium. Следуйте инструкциям для настройки и запуска майнера.'
  - question: 'Какая комиссия пула?'
    answer: 'Комиссия пула указана в настройках пула. Проверьте веб-сайт CoinMore Pool для получения актуальной информации.'
  - question: 'Как часто производятся выплаты?'
    answer: 'Выплаты производятся каждые 30 минут при условии, что достигнут минимальный порог выплаты.'
  - question: 'Могу ли я майнить Alephium на нескольких устройствах?'
    answer: 'Да, вы можете настроить и запустить майнер на нескольких устройствах, используя один и тот же адрес кошелька.'
  - question: 'Где я могу получить дополнительную помощь?'
    answer: 'Присоединитесь к сообществу Alephium в Discord для получения дополнительной помощи и поддержки от других майнеров.'
  - question: 'Какой минимальный порог выплаты?'
    answer: 'Минимальный порог выплаты указан в настройках пула. Проверьте веб-сайт CoinMore Pool для получения актуальной информации.'
  - question: 'Какое оборудование необходимо для майнинга Alephium?'
    answer: 'Вам нужен GPU, совместимый с поддерживаемым программным обеспечением для майнинга. Обратитесь к документации майнингового софта для конкретных требований к оборудованию.'
---
