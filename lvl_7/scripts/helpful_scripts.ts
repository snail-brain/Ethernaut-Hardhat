import { ethers } from "hardhat";

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

