// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"getNumEntries","outputs":[{"name":"","type":"uint16"}],"type":"function"},{"constant":false,"inputs":[{"name":"guestBookEntry","type":"string"}],"name":"addEntry","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"entryNumber","type":"uint16"}],"name":"getEntry","outputs":[{"name":"sender","type":"address"},{"name":"message","type":"string"},{"name":"blockNumber","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"flagged","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"entryNumber","type":"uint16"}],"name":"flagEntry","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"remove","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008054600160a060020a0319163317905561043d806100246000396000f3606060405236156100565760e060020a600035046309e2d1a6811461005857806317ce42bd1461006d5780633cdba68f146101745780634a1bca7b1461021b578063893d20e81461025f578063a7f4377914610273575b005b61029b60005460a060020a900461ffff165b90565b60206004803580820135601f81018490049093026080908101604052606084815261005694602493919291840191819083828082843750506040805160a0810182523381526020818101888152438385015242838a01526000948301859052845460a060020a900461ffff16855260018083529385208351815473ffffffffffffffffffffffffffffffffffffffff1916178155905180518286018054818952978590209b9d50949b509199939850600294861615610100026000190190951693909304601f90810182900483019650929450909201908390106103c157805160ff19168380011785555b5061034f9291505b808211156103f15760008155600101610160565b6102a96004356000606081815261ffff83168252600160208181526040808520805460028083015460038401546004850154858901805460a0601f6000199c831615610100029c909c0190911695909504998a01899004909802840190965260808881528a9889988998600160a060020a039790971696909560ff9190911692918691828280156104205780601f106103f557610100808354040283529160200191610420565b61005660043560005433600160a060020a03908116911614156103be5761ffff166000908152600160205260409020600401805460ff81161560ff19909116179055565b61033c600054600160a060020a031661006a565b61005660005433600160a060020a039081169116141561043b57600054600160a060020a0316ff5b61ffff166060908152602090f35b6040518086600160a060020a03168152602001806020018581526020018481526020018381526020018281038252868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561032a5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b600160a060020a03166060908152602090f35b5050604082015181600201600050556060820151816003016000505560808201518160040160006101000a81548160ff021916908302179055509050506000601481819054906101000a900461ffff168092919060010191906101000a81548161ffff02191690830217905550505b50565b82800160010185558215610158579182015b828111156101585782518260005055916020019190600101906103d3565b5090565b820191906000526020600020905b81548152906001019060200180831161040357829003601f168201915b50505050509350955095509550955095505091939590929450565b56",
    unlinked_binary: "606060405260008054600160a060020a0319163317905561043d806100246000396000f3606060405236156100565760e060020a600035046309e2d1a6811461005857806317ce42bd1461006d5780633cdba68f146101745780634a1bca7b1461021b578063893d20e81461025f578063a7f4377914610273575b005b61029b60005460a060020a900461ffff165b90565b60206004803580820135601f81018490049093026080908101604052606084815261005694602493919291840191819083828082843750506040805160a0810182523381526020818101888152438385015242838a01526000948301859052845460a060020a900461ffff16855260018083529385208351815473ffffffffffffffffffffffffffffffffffffffff1916178155905180518286018054818952978590209b9d50949b509199939850600294861615610100026000190190951693909304601f90810182900483019650929450909201908390106103c157805160ff19168380011785555b5061034f9291505b808211156103f15760008155600101610160565b6102a96004356000606081815261ffff83168252600160208181526040808520805460028083015460038401546004850154858901805460a0601f6000199c831615610100029c909c0190911695909504998a01899004909802840190965260808881528a9889988998600160a060020a039790971696909560ff9190911692918691828280156104205780601f106103f557610100808354040283529160200191610420565b61005660043560005433600160a060020a03908116911614156103be5761ffff166000908152600160205260409020600401805460ff81161560ff19909116179055565b61033c600054600160a060020a031661006a565b61005660005433600160a060020a039081169116141561043b57600054600160a060020a0316ff5b61ffff166060908152602090f35b6040518086600160a060020a03168152602001806020018581526020018481526020018381526020018281038252868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561032a5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b600160a060020a03166060908152602090f35b5050604082015181600201600050556060820151816003016000505560808201518160040160006101000a81548160ff021916908302179055509050506000601481819054906101000a900461ffff168092919060010191906101000a81548161ffff02191690830217905550505b50565b82800160010185558215610158579182015b828111156101585782518260005055916020019190600101906103d3565b5090565b820191906000526020600020905b81548152906001019060200180831161040357829003601f168201915b50505050509350955095509550955095505091939590929450565b56",
    address: "0x2ce23310019e23b192d318ae99cb7c3c3c3005f1",
    generated_with: "2.0.6",
    contract_name: "GuestBook"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("GuestBook error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("GuestBook error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("GuestBook error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("GuestBook error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.GuestBook = Contract;
  }

})();
