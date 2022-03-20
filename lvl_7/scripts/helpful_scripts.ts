import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();
const network = "rinkeby"

export const provider = ethers.getDefaultProvider(network, {
    etherscan: process.env.ETHERSCAN_KEY,
    alchemy: process.env.ALCHEMY_KEY
})

export async function deployContract(name: string) {
    const factory = await ethers.getContractFactory(name);
    const deployed = factory.deploy();
    return deployed;
}

export async function getContractAt(name: string, address: string) {
    const factory = await ethers.getContractFactory(name);
    const contract = factory.attach(address);
    return contract;
}

