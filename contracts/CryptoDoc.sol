
contract CryptoDoc {
    address private manager;
    address[] public documents;

    event TransactionInfo(
        bytes32 txhash
    );
    
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }
    
    function CryptoDoc() public {
        manager = msg.sender;
    }
    
    function createDocument(bytes32 _key, address _owner, string _data) public onlyManager {
        address newDocument = new Document(_key, _owner, _data);
        documents.push(newDocument);
    }

}

contract Document {
    bytes32 public key;
    address owner;
    bytes32 data;
    
    function Document(bytes32 _key, address _owner, string _data) public{
        owner = _owner;
        data = keccak256(_data);
    }
    
}