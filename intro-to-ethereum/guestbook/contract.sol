contract GuestBook {
	struct Entry {
		address sender;
		// Currently there's no way to return a variable
		// sized string back :()
		bytes32 message;
	}
	
	// There's currently no way to iterate mappings :(
	uint8 numEntries;
	mapping (uint8 => Entry) entries;

	function addEntry(bytes32 guestBookEntry) {
		entries[numEntries] = Entry(msg.sender, guestBookEntry);
		numEntries++;
	}
	
	function getNumEntries() constant returns (uint8) {
		return numEntries;
	}

	function getEntry(uint8 entryNumber) constant returns (address sender, bytes32 message) {
		return (entries[entryNumber].sender, entries[entryNumber].message);
	}
}
