#!/bin/bash

cat ../mix/contract.sol | sed '/\/\// d' | tr "'" ' ' | tr '\t' ' ' | tr '\n' ' ' > inline-guestbook.sol
