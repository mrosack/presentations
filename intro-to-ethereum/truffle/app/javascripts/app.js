(function() {
  var account;
  var contract;

	function update() {
    return contract.getNumEntries().then(function (numEntries) {
  		document.getElementById("noEntries").style.display = numEntries.toNumber() ? 'none' : 'block';
  		document.getElementById("entries").innerHTML = "";

      return Promise.each(_.range(numEntries.toNumber()), function (i) {
        return contract.getEntry(i).then(function (entry) {
          var li = document.createElement("li");
          li.innerText = "From " + entry[0] + ": " + entry[1];
          document.getElementById("entries").appendChild(li);
        });
      })
    });
	}

  window.onload = function () {
    contract = GuestBook.deployed();

    document.getElementById('save').addEventListener('click', function() {
  		contract.addEntry(document.getElementById('message').value, {from: account}).then(function () {
        return update();
      });
  	});

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

      update();
    });
  }
})();
