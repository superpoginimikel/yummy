// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract YummyMembershipCard is ERC1155, Ownable, Pausable {

    string public name = "Yummy Membership Card Contract";

    uint256 private constant ID = 1;
    uint256 private constant INITIAL_SUPPLY = 5000;
    uint256 private constant price = 0.0045 ether;
    uint256 private inCirculation = 0;
    bool private isSaleReady = false;

    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmVjkmMpzkxZXRnXvu8k2Up3ZJeTNmKnpbZR6hiPzymkSZ/{id}.json") {}

    function mint(uint256 amountToMint) public payable whenNotPaused {
        require(isSaleReady, "Sale is not yet ready");
        require(amountToMint <= 3, "Cannot mint more than 3");
        require(inCirculation + amountToMint <= INITIAL_SUPPLY, "Not enough supply");
        require(msg.value >= amountToMint * price, "Not enough ethers sent");

        _mint(msg.sender, ID, amountToMint, "");
        inCirculation += amountToMint;
    }

    function setReadyStatus(bool status) public onlyOwner {
        isSaleReady = status;
    }

    function getReadyStatus() public view returns (bool readyStatus) {
        return isSaleReady;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    internal
    whenNotPaused
    override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function getInCirculation() public view returns (uint256 circulatingSupply) {
        return inCirculation;
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Nothing to widthraw, balance is 0");
        payable(owner()).transfer(address(this).balance);
    }

    function uri(uint256 tokenId) override public pure returns (string memory) {
        return(
        string(abi.encodePacked(
                "https://gateway.pinata.cloud/ipfs/QmVjkmMpzkxZXRnXvu8k2Up3ZJeTNmKnpbZR6hiPzymkSZ/",
                Strings.toString(tokenId),
                ".json"
            ))
        );
    }
}
