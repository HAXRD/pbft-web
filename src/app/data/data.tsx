
export interface Block {
    hash: string,
    proposer: string,
}

export interface TxPoolItem {
    index: number,
    hash: string,
    pubKey: string,
}

export interface TxPoolInfo {
    waiting: Array<TxPoolItem>,
    inProgress: Array<TxPoolItem>,
    committed: Array<TxPoolItem>,
}

export interface BlockPoolItem {
    index: number,
    blockHash: string,
    pubKey: string,
}

export interface FromWho {
    index: number,
    pubKey: string,
}

export interface MsgPoolItem {
    blockHash: string,
    fromWhos: Array<FromWho>,
}

export interface Data {
    nodeHash: string
    blockchain: Array<Block>,
    sockets: Array<string>,
    txPool: TxPoolInfo,
    blockPool: Array<BlockPoolItem>,
    preparePool: Array<MsgPoolItem>,
    commitPool: Array<MsgPoolItem>,
    rcPool: Array<MsgPoolItem>,
}