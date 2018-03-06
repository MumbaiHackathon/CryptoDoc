pragma solidity^0.4.17;

contract Profile {
    address manager;
    address owner;
    string public name;
    string public nationality;
    address public aadharData;

    string public aadharStatus;
    string public passportStatus;
    string public pancardStatus;
    string public mobileStatus;
    
    //modifers
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Profile(string _name, string _nation) public {
        name = _name;
        nationality = _nation;
        manager = msg.sender;
    }
    
    function createAadhar(address _profile, address _userAddress, uint _aadharNumber, uint _mobile) public restricted {
       aadharData =  new Aadhar(_profile, _userAddress, _aadharNumber, _mobile);
       aadharStatus = "verified";
    }
    
}

contract Aadhar {
    address public profile;
    address public userAddress;
    uint public aadharNumber;
    uint public mobile;
    address public placeholder;
        
    function Aadhar(address _profile, address _userAddress, uint _aadharNumber, uint _mobile) public {
        profile = _profile;
        userAddress = _userAddress;
        aadharNumber = _aadharNumber;
        mobile = _mobile;
        placeholder = this;
    }
}



