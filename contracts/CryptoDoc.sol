pragma solidity^0.4.17;

contract Profile {
    address manager;
    address public profileAddress;
    string public name;
    uint public birthday;
    string public nationality;
    uint public password;
    bytes32 public aadharData;
    
    //only for testing - delete these afterwards
    Address[] public addresses;
    Aadhar public aadhar;
    
    mapping(bytes32 => bool) public aadharStatus;
    mapping(address => bool) public passportStatus;
    mapping(address => bool) public pancardStatus;

    struct Address {
        address owner;
        string country;
        string state;
        string city;
        uint pincode;
    }
    
    struct Aadhar {
        address profile;
        address userAddress;
        uint aadharNumber;
        uint mobile;
    }

    //modifers
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Profile(string _name, uint _birthday, string _nation) public {
        name = _name;
        birthday = _birthday;
        nationality = _nation;
        manager = msg.sender;
        profileAddress = this;
    }
    
    function setPassword(uint _password) public restricted{
        password = uint256(keccak256(_password));
    }
    
    function createAddress(string _country, string _state, string _city, uint _pincode) public restricted {
        Address memory newAddress = Address({
            owner: manager,
            country: _country,
            state : _state,
            city : _city,
            pincode: _pincode  
        });
        
        addresses.push(newAddress);
    }
    
    function createAadhar(uint _aadharNumber, uint _mobile) public restricted{
        Aadhar memory newAadhar = Aadhar({
            profile: this,
            userAddress: msg.sender,
            aadharNumber: _aadharNumber,
            mobile: _mobile
        });
        
        aadharData = keccak256(newAadhar); 
        aadhar = newAadhar;
        aadharStatus[aadharData] = true;
    }
}
    
// Tried making Address, Aadhar into different contracts, but got an error related to abstract functions: This contract does not
// implement all the functions hence cannot be compiled

/*contract Aadhar is Profile, Address {
    address public profile;
    address public userAddress;
    uint public aadharNumber;
    uint public mobile;
        
    function Aadhar(address _profile, address _userAddress, uint _aadharNumber, uint _mobile) public {
        profile = _profile;
        userAddress = _userAddress;
        aadharNumber = _aadharNumber;
        mobile = _mobile;
        
        aadharStatus[this] = true;
    }
}*/



