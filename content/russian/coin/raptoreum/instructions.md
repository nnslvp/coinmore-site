---
SEO:
  description: 'Получите пошаговые инструкции по настройке и использованию CoinMore Pool для майнинга Raptoreum. Наши подробные руководства помогут вам начать майнинг быстро и легко.'
  keywords: 'инструкции по майнингу Raptoreum, CoinMore Pool, руководство по майнингу, настройка майнинга, майнинг Raptoreum, майнинг криптовалют, блокчейн, крипто майнинг, цифровой майнинг, безопасный майнинг, прибыльный майнинг'

layout: 'instructions'
headless: true
title: 'Инструкции'
subtitle_text_1: 'Если у вас есть вопросы, воспользуйтесь'
subtitle_text_2: 'Начните с загрузки'
pool_servers: 'Серверы пула'
miners: 'Майнеры'
windows_examples: 'Примеры для Windows'
faq_title: 'Вопросы и ответы'
faq_subtitle: 'Часто задаваемые вопросы для Raptoreum Pool'
can_use: 'Вы можете использовать'
start_downloading: 'Начните с загрузки'
ask_in_discord: 'О других решениях вы можете спросить в'
wallet: 'Кошелека Raptoreum'
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
    1. Скачайте [latest release of WyvernTKC](https://github.com/WyvernTKC/cpuminer-gr-avx2/releases) и распакуйте файлы.
    2. Обновите **config.json** файл
    ```json
    {
      "_comment1": "Any long-format command line argument ",
      "_comment2": "may be used in this JSON configuration file",
  
      "url": "stratum+tcps://auto-geo.raptoreum.coinmore.io:3002",
  
      "_comment3": "Backup/failover stratum used in case of connection problems",
      "url-backup": "stratum+tcps://ru1.raptoreum.coinmore.io:3002",
  
      "user": "your_wallet_address",
      "pass": "x",
  
      "algo": "gr",
      "threads": 0,
  
      "_comment4": "tune-full takes longer but should provide better hashrate",
      "tune-full": false,
  
      "_comment5": "You can specify different name/location for your tune config",
      "tune-config": "tune_config",
  
      "_comment6": "You can force miner to not tune. It tunes by default",
      "_comment7": "Or force it even if tune-config file already exists",
      "no-tune": false,
      "force-tune": false,
  
      "_comment8": "\"log\": \"filename\" can be used to create logfile of output",
      "benchmark": false,
      "stress-test": false,
      "quiet": false
    }
    ```
    3. Запустите файл**cpuminer**.
    4. PROFIT!
- tab: 'XMRig'
  instruction: |
    1. Скачайте [latest release of XMRig](https://github.com/xmrig/xmrig/releases) и распакуйте файлы.
    2. Обновите **config.json** файл
    ```json
    {
      "api": {
        "id": null,
        "worker-id": null
      },
      "http": {
        "enabled": false,
        "host": "127.0.0.1",
        "port": 0,
        "access-token": null,
        "restricted": true
      },
      "autosave": true,
      "background": false,
      "colors": true,
      "title": true,
      "randomx": {
        "init": -1,
        "init-avx2": -1,
        "mode": "auto",
        "1gb-pages": false,
        "rdmsr": true,
        "wrmsr": true,
        "cache_qos": false,
        "numa": true,
        "scratchpad_prefetch_mode": 1
      },
      "cpu": {
        "enabled": true,
        "huge-pages": true,
        "huge-pages-jit": false,
        "hw-aes": null,
        "priority": null,
        "memory-pool": false,
        "yield": true,
        "max-threads-hint": 100,
        "asm": true,
        "argon2-impl": null,
        "cn/0": false,
        "cn-lite/0": false
      },
      "opencl": {
        "enabled": false,
        "cache": true,
        "loader": null,
        "platform": "AMD",
        "adl": true,
        "cn/0": false,
        "cn-lite/0": false
      },
      "cuda": {
        "enabled": false,
        "loader": null,
        "nvml": true,
        "cn/0": false,
        "cn-lite/0": false
      },
      "donate-level": 1,
      "donate-over-proxy": 1,
      "log-file": null,
      "pools": [
        {
          "algo": null,
          "coin": null,
          "url": "auto-geo.raptoreum.coinmore.io:3002",
          "user": "your_wallet_address",
          "pass": "x",
          "rig-id": null,
          "nicehash": false,
          "keepalive": false,
          "enabled": true,
          "tls": false,
          "tls-fingerprint": null,
          "daemon": false,
          "socks5": null,
          "self-select": null,
          "submit-to-origin": false
        }
      ],
      "print-time": 60,
      "health-print-time": 60,
      "dmi": true,
      "retries": 5,
      "retry-pause": 5,
      "syslog": false,
      "tls": {
        "enabled": false,
        "protocols": null,
        "cert": null,
        "cert_key": null,
        "ciphers": null,
        "ciphersuites": null,
        "dhparam": null
      },
      "dns": {
        "ipv6": false,
        "ttl": 30
      },
      "user-agent": null,
      "verbose": 0,
      "watch": true,
      "pause-on-battery": false,
      "pause-on-active": false
    }     
    ```
    3. Запустите файл**xmrig**.
    4. PROFIT!
- tab: 'xmrigCC'
  instruction: |
    1. Скачайте [latest release of xmrigCC](https://github.com/Bendr0id/xmrigCC/releases) и распакуйте файлы.
    2. Обновите **config.json** файл
    ```json
    {
      "api": {
          "id": null,
          "worker-id": null
      },
      "http": {
          "enabled": false,
          "host": "127.0.0.1",
          "port": 0,
          "access-token": null,
          "restricted": true
      },
      "autosave": true,
      "background": false,
      "colors": true,
      "title": true,
      "randomx": {
          "init": -1,
          "init-avx2": -1,
          "mode": "auto",
          "1gb-pages": false,
          "rdmsr": true,
          "wrmsr": true,
          "cache_qos": false,
          "numa": true,
          "scratchpad_prefetch_mode": 1
      },
      "cpu": {
          "enabled": true,
          "huge-pages": true,
          "huge-pages-jit": false,
          "hw-aes": null,
          "priority": null,
          "memory-pool": false,
          "yield": true,
          "force-autoconfig": false,
          "max-threads-hint": 100,
          "max-cpu-usage": null,
          "asm": true,
          "argon2-impl": null,
          "cn/0": false,
          "cn-lite/0": false
      },
      "opencl": {
          "enabled": false,
          "cache": true,
          "loader": null,
          "platform": "AMD",
          "adl": true,
          "cn/0": false,
          "cn-lite/0": false
      },
      "cuda": {
          "enabled": false,
          "loader": null,
          "nvml": true,
          "cn/0": false,
          "cn-lite/0": false
      },
      "donate-level": 3,
      "donate-over-proxy": 1,
      "log-file": null,
      "pools": [
          {
              "algo": null,
              "coin": null,
              "url": "auto-geo.raptoreum.coinmore.io:3002",
              "user": "your_wallet_address",
              "pass": "x",
              "rig-id": null,
              "nicehash": false,
              "keepalive": false,
              "enabled": true,
              "tls": false,
              "tls-fingerprint": null,
              "daemon": false,
              "socks5": null,
              "self-select": null,
              "submit-to-origin": false
          }
      ],
      "cc-client": {
          "enabled": true,
          "servers": [
              {
                  "url": "localhost:3344",
                  "access-token": "mySecret",
                  "use-tls": false
              }
          ],
          "use-remote-logging": true,
          "upload-config-on-start": true,
          "worker-id": null,
          "reboot-cmd": null,
          "update-interval-s": 10,
          "retries-to-failover": 5
      },
      "print-time": 60,
      "health-print-time": 60,
      "dmi": true,
      "retries": 5,
      "retry-pause": 5,
      "syslog": false,
      "tls": {
          "enabled": false,
          "protocols": null,
          "cert": null,
          "cert_key": null,
          "ciphers": null,
          "ciphersuites": null,
          "dhparam": null
      },
      "dns": {
          "ipv6": false,
          "ttl": 30
      },
      "user-agent": null,
      "verbose": 0,
      "watch": true,
      "pause-on-battery": false,
      "pause-on-active": false
    }
    ```
    3. Запустите майнер.
    4. PROFIT!
- tab: 'WildRig'
  instruction: |
    1. Скачайте [latest release of WildRig](https://github.com/andru-kun/wildrig-multi/releases) и распакуйте файлы.
    2. Обновите **start-Raptoreum** файл:
    ```bash
    wildrig.exe --algo ghostrider --url stratum+tcp://auto-geo.raptoreum.coinmore.io:3002 --user your_wallet_address --pass x
    ```
    3. Запустите **start-Raptoreum** файл.
    4. PROFIT!

faq:
  - question: 'Что такое пул майнинга Raptoreum?'
    answer: 'Пул майнинга Raptoreum позволяет майнерам работать независимо. Награды за блоки получают только те майнеры, которые их находят. Время поиска блока зависит от вашего хешрейта и удачи.'
  - question: 'Как начать майнить Raptoreum?'
    answer: 'Скачайте совместимый майнер и кошелек Raptoreum. Следуйте инструкциям для настройки и запуска майнера.'
  - question: 'Какие комиссии в пуле?'
    answer: 'Комиссии пула указаны в настройках пула. Проверьте веб-сайт CoinMore Pool для актуальной информации.'
  - question: 'Как часто происходят выплаты?'
    answer: 'Выплаты производятся каждые 30 минут при условии, что достигнут минимальный порог выплаты.'
  - question: 'Можно ли майнить Raptoreum на нескольких устройствах?'
    answer: 'Да, вы можете настроить и запустить майнер на нескольких устройствах, используя один и тот же адрес кошелька.'
  - question: 'Где можно получить дополнительную помощь?'
    answer: 'Присоединитесь к сообществу Raptoreum в Discord для получения дополнительной помощи и поддержки от других майнеров.'
  - question: 'Какой минимальный порог выплаты?'
    answer: 'Минимальный порог выплаты указан в настройках пула. Проверьте веб-сайт CoinMore Pool для актуальной информации.'
  - question: 'Какое оборудование нужно для майнинга Raptoreum?'
    answer: 'Вам нужен процессор или видеокарта, совместимые с поддерживаемым программным обеспечением для майнинга. Обратитесь к документации майнингового софта для конкретных требований к оборудованию.'
---
