pragma solidity >=0.4.24 <0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";

contract SmartPiggiesBacon is ERC20, ERC20Detailed, ERC20Mintable, ERC20Burnable, ERC20Pausable {

  address payable owner;

  constructor()
    ERC20Burnable()
    ERC20Mintable()
    ERC20Detailed("SmartPiggiesBacon","BACON",18)
    ERC20()
    public
  {
    owner = msg.sender;
  }

  function changeOwner(address payable _newOwner)
    public
    returns (bool)
  {
    require(msg.sender == owner, "Only owner can change ownership.");
    owner = _newOwner;
    return true;
  }

  function kill() public
  {
    require(msg.sender == owner);
    selfdestruct(owner);
  }

}
