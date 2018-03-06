pragma solidity^0.4.17;

contract Profile {
    address manager;
    address owner;
    string public name;
    string public nationality;
    address public aadharData;
    address public addressData;
    address public mobileData;
    
    //serviceProviders
    mapping (address => bool) public mobProviders;

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
    
    function Profile(string _name, string _nation) public {
        name = _name;
        nationality = _nation;
        manager = msg.sender;
        //initializeServices();
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
    address public placeholder;
        
    function Aadhar(address _profile, address _userAddress,  address _mobile, uint _aadharNumber) public {
        profile = _profile;
        userAddress = _userAddress;
        aadharNumber = _aadharNumber;
        mobile = _mobile;
        placeholder = this;
    }
}


