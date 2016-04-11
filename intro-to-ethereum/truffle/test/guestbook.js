contract('GuestBook', function(accounts) {
  it("should initialize with an empty guestbook", function (done) {
    var book = GuestBook.deployed();
    book.getNumEntries().then(function (numEntries) {
      assert.equal(numEntries.toNumber(), 0);
    }).then(done).catch(done);
  });
});
