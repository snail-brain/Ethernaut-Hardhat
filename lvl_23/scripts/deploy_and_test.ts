import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const dex = await helper.getContractAt("DexTwo", "0xDE44f4E56763593e714c4516b35A453a7b07Ce4E");
    const myToken = await helper.deployContract("Token", "Titty", "TITS", 4);
    const token1 = await dex.token1();
    const token2 = await dex.token2();

    await helper.waitForTx(myToken.approve(dex.address, 10));
    await helper.waitForTx(dex.add_liquidity(myToken.address, 1));
    await helper.waitForTx(dex.swap(myToken.address, token1, 1));
    await helper.waitForTx(dex.swap(myToken.address, token2, 2));

    console.log(await dex.balanceOf(token1, dex.address));
    console.log(await dex.balanceOf(token2, dex.address));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });