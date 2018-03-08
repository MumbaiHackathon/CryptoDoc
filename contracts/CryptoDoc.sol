 pragma solidity^0.4.17;

contract CryptoDoc {

    event TransactionInfo(
        address account
    );

    function create_document(string owner, string hash, string data)view public returns(address){
        address d = new Document(owner,hash,data);
        TransactionInfo(d);
        return d;
    }

}

contract Document {
    string public owner;
    address creator;
    string hash;
    string data;

    function Document(string owner, string hash, string data) {
        creator = msg.sender;
    }

    function set_owner(string account) view public returns(address){
        owner = account;
    }

    function set_data(string _data) view public returns(address){
        data = _data;
    }

}
