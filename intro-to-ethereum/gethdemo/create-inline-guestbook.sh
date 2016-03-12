#!/bin/bash

cat ../guestbook/contract.sol | sed '/\/\// d' | tr "'" ' ' | tr '\t' ' ' | tr '\n' ' ' > inline-guestbook.sol
