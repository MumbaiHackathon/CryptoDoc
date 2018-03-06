pragma solidity^0.4.17;

contract Profile {
    address manager;
    
    //actual public data
    address public owner;
    string public name;
    string public nationality;
    bytes32 public password;
    
    //created contract hases - to be deleted later
    address public aadharData;
    address public addressData;
    address public mobileData;
    
    //serviceProviders
    mapping (address => bool) public mobProviders;

    //document status
    string public aadharStatus;
    string public passportStatus;
    string public pancardStatus;
    string public mobileStatus;
    
    //modifers
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    modifier onlyMob() {
        require(mobProviders[msg.sender]);
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    //constructor
    function Profile(string _name, string _nation) public {
        name = _name;
        nationality = _nation;
        manager = msg.sender;
        //initializeServices();
    }
    
    //the organization(government) sets a password for the user
    function setPassword(string _password) public restricted {
        password = keccak256(_password);
    }
    
    //change the password 
    function changePassword(string _password) public onlyOwner {
        password = keccak256(_password);    
    }
    
    //user enters that to assign himself as owner
    function setOwner(string _password) public {
        require(keccak256(_password) == password);
        owner = msg.sender;
    }
    
    
    function initializeServices() public {
        mobProviders[msg.sender] = true;
    }
        
    function createAddress(address _profile, string _local, string _city, string _state, string _nation) public restricted {
        addressData = new Address(_profile, _local, _city, _state, _nation);
    }
    
    function createMobile(address _profile, uint _number) public onlyMob {
        mobileData = new Mobile(_profile, _number, msg.sender);
    }
    
    function createAadhar(address _profile, address _userAddress,  address _mobile, uint _aadharNumber) public restricted {
       aadharData =  new Aadhar(_profile, _userAddress,  _mobile, _aadharNumber);
       aadharStatus = "verified";
    }
}

contract Address {
    address public profile;
    string private local;
    string private city;
    string private state;
    string private nation;
    
    function Address(address _profile, string _local, string _city, string _state, string _nation) public {
        profile = _profile;
        local = _local;
        city = _city;
        state = _state;
        nation = _nation;
    }
}

contract Mobile {
    address public profile;
    address public serviceProvider;
    uint public number;
    
    function Mobile(address _profile, uint _number, address _serviceProvider) public {
        serviceProvider = _serviceProvider;
        profile = _profile;
        number = _number;
    }
}

contract Aadhar {
    address public profile;
    address public userAddress;
    address public mobile;
    uint public aadharNumber;
        
    function Aadhar(address _profile, address _userAddress,  address _mobile, uint _aadharNumber) public {
        profile = _profile;
        userAddress = _userAddress;
        aadharNumber = _aadharNumber;
        mobile = _mobile;
    }
}