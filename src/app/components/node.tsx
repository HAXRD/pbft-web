import {Data} from "@/app/data/data";
import {convertToColor, getTextColor} from "@/app/components/utils";
import TxPool from "@/app/components/pools/txpool";
import BlockPool from "@/app/components/pools/blockpool";
import MsgPool from "@/app/components/pools/msgpool";

export default function Node({data}: { data: Data }) {

    const style = {
        backgroundColor: convertToColor(data.nodeHash),
        color: getTextColor(data.nodeHash)
    }

    const getBlockchain = () => {
        let bc;
        if (data.blockchain == null || data.blockchain.length == 0) {
            bc = [<li key="null" className="blockchain-li">null</li>];
        } else {
            bc = data.blockchain.map(block => (
                <li key={block.hash} className="blockchain-li" style={{
                    backgroundColor: convertToColor(block.proposer),
                    color: getTextColor(block.proposer)
                }}>{block.hash}</li>
            ));
        }

        const interleavedBC = [];
        for (let i = 0; i < bc.length; i++) {
            interleavedBC.push(bc[i]);
            if (i < bc.length - 1) {
                interleavedBC.push(
                    <li key={`arrow-${i}`} className="blockchain-li" style={{
                        backgroundColor: "black",
                        color: "white"
                    }}>--{`>`}</li>);
            }
        }
        return interleavedBC;
    }

    return (
        <div className="container node-container">
            <div className="node-block">
                <label className="label" style={style}>
                    Node [{data.nodeHash}]
                </label>
                <div className="blockchain-block">
                    <label className="label" style={style}>
                        Blockchain
                    </label>
                    <ul className="ul blockchain-ul">
                        {getBlockchain()}
                    </ul>
                </div>
            </div>
            <div className="node-block">
                <label className="label" style={style}>
                    Connected Sockets
                </label>
                <div>
                    <ul className="ul socket-ul">
                        {
                            data.sockets.toSorted(
                                (a, b) => (
                                    a > b ? 1 : -1
                                )
                            ).map((socket, index) => (
                                <li key={index} className="socket-li">{socket}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="grid-block-container">
                <div className="grid-item item1" style={style}>
                    <TxPool txPoolInfo={data.txPool}/>
                </div>
                <div className="grid-item" style={style}>
                    <BlockPool blockPool={data.blockPool}/>
                </div>
                <div className="grid-item" style={style}>
                    <MsgPool poolType={`Prepare Pool`} pool={data.preparePool}/>
                </div>
                <div className="grid-item" style={style}>
                    <MsgPool poolType={`Commit Pool`} pool={data.commitPool}/>
                </div>
                <div className="grid-item" style={style}>
                    <MsgPool poolType={`RC Pool`} pool={data.rcPool}/>
                </div>
            </div>
        </div>
    )
}

