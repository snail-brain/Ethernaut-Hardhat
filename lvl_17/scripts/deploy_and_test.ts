import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const SimpleToken = await helper.getContractAt("SimpleToken", "0xbC1CDCBbbbA1149efbCDB75BE9939F69d088d6A1");

    let tx = await SimpleToken.destroy(account.address);
    await tx.wait()

    console.log(await helper.provider.getBalance(SimpleToken.address));


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });