
export const dataSrcs = [
    "http://localhost:18080",
    "http://localhost:18081",
    "http://localhost:18082"
]

export interface Block {
    hash: string,
    proposer: string,
}

export interface TxPoolItem {
    hash: string,
    pubKey: string,
}

export interface TxPoolInfo {
    waiting: Array<TxPoolItem>,
    inProgress: Array<TxPoolItem>,
    committed: Array<TxPoolItem>,
}

export interface BlockPoolItem {
    blockHash: string,
    pubKey: string,
}

export interface MsgPoolItem {
    blockHash: string,
    fromWhos: Array<string>,
}

export interface Data {
    nodeAddress: string,
    nodeHash: string
    blockchain: Array<Block>,
    sockets: Array<string>,
    txPool: TxPoolInfo,
    blockPool: Array<BlockPoolItem>,
    preparePool: Array<MsgPoolItem>,
    commitPool: Array<MsgPoolItem>,
    rcPool: Array<MsgPoolItem>,
}
