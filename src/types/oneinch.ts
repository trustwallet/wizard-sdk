import { BytesLike } from "ethers";



export type OneInchOrder = {
    makerAsset: string;
    takerAsset: string;
    maker: string;
    receiver: string;
    allowedSender: string;
    makingAmount: string;
    takingAmount: string;
    salt: string;
    offsets: string;
    interactions: BytesLike;
};


