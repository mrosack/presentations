angular.module('guestbookApp', [])
  .controller('GuestBookController', function($q) {
    var account;
    var contract = GuestBook.deployed();

    var vm = this;
    vm.balance = 0;
    vm.message = '';
    vm.save = save;
    vm.flag = flag;

    init();

    ////////

    function update() {
      return $q(function (resolve, reject) {
      	web3.eth.getBalance(account, function (err, balance) {
      	  vm.balance = balance.toNumber();
          resolve();
        });
      }).then(function () {
        return contract.getNumEntries.call();
      }).then(function (numEntries) {
        var tempEntries = [];

        return Promise.each(_.rangeRight(numEntries.toNumber()), function (i) {
          return contract.getEntry.call(i).then(function (entryArray) {
            var entry = {
              number: i,
              sender: entryArray[0],
              message: entryArray[1],
              blockNumber: entryArray[2].toNumber(),
              timestamp: new Date(entryArray[3].toNumber() * 1000),
              flagged: entryArray[4]
            };

            if (!vm.isOwner && entry.flagged) {
              // Don't show flagged entries to guests!
              return;
            }

            tempEntries.push(entry);
          });
        }).then(function () {
          vm.entries = tempEntries;
        });
      });
    }

    function init() {
      return $q(function (resolve, reject) {
        web3.eth.getAccounts(function(err, accs) {
          if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
          }

          if (accs.length == 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
          }

          account = accs[0];

          resolve();
        });
      }).then(function() {
        return contract.getOwner.call().then(function (owner) {
          vm.isOwner = owner === account;
        });
      }).then(update);
    }

    function save() {
      var message = vm.message;
      vm.message = '';
      return contract.addEntry(message, {from: account})
        .then(getTransactionCost)
        .then(update);
    }

    function flag(entry) {
      return contract.flagEntry(entry.number, {from: account})
        .then(getTransactionCost)
        .then(update);
    }

    function getTransactionCost(tx_id) {
      vm.lastTransaction = {};

      return $q(function(resolve, reject) {
        web3.eth.getTransactionReceipt(tx_id, function(err, receipt) {
          vm.lastTransaction.gas = receipt.gasUsed;

          resolve();
        });
      }).then(function() {
        return $q(function(resolve, reject) {
          web3.eth.getTransaction(tx_id, function(err, tx) {
            vm.lastTransaction.ether = web3.fromWei(tx.gasPrice.times(vm.lastTransaction.gas), "ether").toNumber();
            resolve();
          });
        });
      });
    }
  });
