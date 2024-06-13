import {BlockPoolItem} from "@/app/data/data";
import {convertToColor, getTextColor} from "@/app/components/utils";

export default function Blockpool({blockPool}: { blockPool: Array<BlockPoolItem> }) {
    return (
        <>
            <div>Block Pool</div>

            <table className="table">
                {
                    blockPool.length > 0 && (
                        <thead className="table-head">
                        <tr>
                            <th>Index</th>
                            <th>Block Hash</th>
                            <th>Wallet PubKey</th>
                        </tr>
                        </thead>
                    )
                }
                {
                    blockPool.toSorted(
                        (a, b) => (
                            a.blockHash > b.blockHash ? 1 : -1
                        )
                    ).map((blockPoolItem, index) => (
                        <tbody key={blockPoolItem.blockHash} className="table-body">
                        <tr>
                            <td>{index}</td>
                            <td>{blockPoolItem.blockHash}</td>
                            <td>
                                <div className="label" style={{
                                    backgroundColor: convertToColor(blockPoolItem.pubKey),
                                    color: getTextColor(blockPoolItem.pubKey)
                                }}>
                                    {blockPoolItem.pubKey}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    ))
                }
            </table>
        </>
    )
}