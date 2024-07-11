---
layout: 'instructions'
headless: true
SEO:
  description: 'Learn how to mine Raptoreum with CoinMore Pool. Follow our step-by-step guide to start mining efficiently and profitably.'
  keywords: 'Raptoreum mining guide, mine Raptoreum, CoinMore Pool, cryptocurrency mining, blockchain, crypto mining, mining tutorial, mining setup, mining software, mining hardware'

title: 'Instructions'
subtitle_text_1: 'If you have any questions, please use the'
subtitle_text_2: 'Start by downloading'
pool_servers: 'Pool Servers'
miners: 'Miners'
windows_examples: 'Windows Examples'
faq_title: 'FAQ'
faq_subtitle: 'Frequently Asked Questions for Raptoreum Pool'
can_use: 'You can use'
start_downloading: 'Start by downloading'
ask_in_discord: 'For more help, ask in'
wallet: 'Raptoreum Wallet'
dowland_wallet_link: 'https://github.com/Raptor3um/raptoreum/releases'

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

windows_examples_title: 'Examples'
windowsExamples:
  - tab: 'WyvernTKC'
    instruction: |
      1. Download [latest release of WyvernTKC](https://github.com/WyvernTKC/cpuminer-gr-avx2/releases) and unzip the files.
      2. Update **config.json** file with:
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
      3. Run the file **cpuminer**.
      4. PROFIT!
  - tab: 'XMRig'
    instruction: |
      1. Download [latest release of XMRig](https://github.com/xmrig/xmrig/releases) and unzip the files.
      2. Update **config.json** file with:
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
      3. Run the file.
      4. PROFIT!
  - tab: 'xmrigCC'
    instruction: |
      1. Download [latest release of xmrigCC](https://github.com/Bendr0id/xmrigCC/releases) and unzip the files.
      2. Update **config.json** file with:
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
      3. Run the file.
      4. PROFIT!
  - tab: 'WildRig'
    instruction: |
      1. Download [latest release of WildRig](https://github.com/andru-kun/wildrig-multi/releases) and unzip the files.
      2. Update **start-Raptoreum** file with:
      ```bash
      wildrig.exe --algo ghostrider --url stratum+tcp://auto-geo.raptoreum.coinmore.io:3002 --user your_wallet_address --pass x
      ```
      3. Run the file.
      4. PROFIT!

faq:
  - question: 'What is the Raptoreum mining pool?'
    answer: 'Raptoreum mining pool allows miners to work independently. Block rewards go to the miner who finds it. Time to find a block depends on your hashrate and luck.'
  - question: 'How do I start mining Raptoreum?'
    answer: 'Download a compatible miner and the Raptoreum wallet. Follow the provided instructions to configure and run your miner.'
  - question: 'What are the pool fees?'
    answer: 'Pool fees are specified in the pool settings. Check the CoinMore Pool website for the current fee structure.'
  - question: 'How often are payouts?'
    answer: 'Payouts are made every 30 minutes if the minimum payout threshold is met.'
  - question: 'Can I mine Raptoreum on multiple devices?'
    answer: 'Yes, you can configure and run the miner on multiple devices using the same wallet address.'
  - question: 'Where can I get more help?'
    answer: 'Join the Raptoreum community on Discord for more support from other miners.'
  - question: 'What is the minimum payout?'
    answer: 'The minimum payout threshold is specified in the pool settings. Check the CoinMore Pool website for the current value.'
  - question: 'What hardware do I need to mine Raptoreum?'
    answer: 'You need a CPU or GPU compatible with the supported mining software. Refer to the mining software documentation for specific hardware requirements.'
---
