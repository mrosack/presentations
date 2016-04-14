#!/bin/bash

geth --datadir="~/demochain" --maxpeers 0 --genesis genesis.json --networkid 101010101  --rpc --rpccorsdomain "*" --rpcaddr 0.0.0.0 --unlock 7fbe93bc104ac4bcae5d643fd3747e1866f1ece4 console
