contract GuestBook {
	struct Entry {
		address sender;
		string message;
	}
	
	// There's currently no way to iterate mappings :(
	uint8 numEntries;
	mapping (uint8 => Entry) entries;

	function addEntry(string guestBookEntry) {
		entries[numEntries] = Entry(msg.sender, guestBookEntry);
		numEntries++;
	}
	
	function getNumEntries() constant returns (uint8) {
		return numEntries;
	}

	function getEntry(uint8 entryNumber) constant returns (address sender, string message) {
		return (entries[entryNumber].sender, entries[entryNumber].message);
	}
}
