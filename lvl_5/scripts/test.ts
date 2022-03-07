import { ethers } from "hardhat";

async function main() {
    const [account] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = Token.attach("0x248d9e5AA0c00A320941753a5d5a923Fb81A0D58");

    let tx = await token.transfer(token.address, 21);
    await tx.wait();

    console.log(await token.balanceOf(account.address));

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });