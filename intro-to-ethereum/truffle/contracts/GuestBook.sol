contract GuestBook {

	// The structure of our guestbook entries
	struct Entry {
		address sender;
		string message;
		uint blockNumber;
		uint timestamp;
		bool flagged;
	}

	/*---- Local Variables ----*/
	address owner;
	uint16 numEntries; // There's currently no way to iterate mappings :(
	mapping (uint16 => Entry) entries;

	// Contract constructor, stores the owner of the contract
	function GuestBook() {
		owner = msg.sender;
	}

	function addEntry(string guestBookEntry) {
		entries[numEntries] = Entry(msg.sender, guestBookEntry, block.number, now, false);
		numEntries++;
	}

	function getNumEntries() constant returns (uint16) {
		return numEntries;
	}

	function getEntry(uint16 entryNumber) constant returns (address sender, string message, uint blockNumber, uint timestamp, bool flagged) {
		var entry = entries[entryNumber];
		return (entry.sender, entry.message, entry.blockNumber, entry.timestamp, entry.flagged);
	}

	// Flags an entry - should only work for the contract creator!
	function flagEntry(uint16 entryNumber) {
		if (msg.sender == owner) {
			entries[entryNumber].flagged = !entries[entryNumber].flagged;
		}
	}

	// Destroys the contract - should only work for the contract creator!
	function remove() {
		if (msg.sender == owner) {
			suicide(owner);
		}
	}

	function getOwner() constant returns (address) {
		return owner;
	}
}
