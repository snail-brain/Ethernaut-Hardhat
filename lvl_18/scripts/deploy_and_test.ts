import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();

    const deployed = await account.sendTransaction({
        data: "0x600a600c600039600a6000f3602a60105260206010f3",
        gasLimit: 1000000
    })
    await deployed.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });