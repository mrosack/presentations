contract('GuestBook', function(accounts) {
  it("should initialize with an empty guestbook", function (done) {
    var book = GuestBook.deployed();

    book.getNumEntries.call().then(function (numEntries) {
      assert.equal(numEntries.toNumber(), 0);
    }).then(done).catch(done);
  });

  it("should allow a comment", function (done) {
    var book = GuestBook.deployed();
    var message = "hidey ho good neighbor!";

    return book.addEntry(message, {from: accounts[0]}).then(function () {
      return book.getNumEntries.call();
    }).then(function (numEntries) {
      assert.equal(numEntries.toNumber(), 1);

      return book.getEntry.call(0);
    }).then(function (entry) {
      assert.equal(entry[0], accounts[0]);
      assert.equal(entry[1], message);
    }).then(done).catch(done);
  });

  it("should allow a flag from the contract owner", function (done) {
    var book = GuestBook.deployed();

    return book.flagEntry(0, {from: accounts[0]}).then(function () {
      return book.getEntry.call(0);
    }).then(function (entry) {
      assert.equal(entry[4], true);
    }).then(done).catch(done);
  });

  it("should NOT allow a flag from anyone else", function (done) {
    var book = GuestBook.deployed();

    return book.flagEntry(0, {from: accounts[1]}).then(function () {
      return book.getEntry.call(0);
    }).then(function (entry) {
      assert.equal(entry[4], true);
    }).then(done).catch(done);
  });
});
