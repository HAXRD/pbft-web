import {FromWho, MsgPoolItem} from "@/app/data/data";
import {convertToColor, getTextColor} from "@/app/components/utils";

export default function MsgPool({poolType, pool}: { poolType: string, pool: Array<MsgPoolItem> }) {
    return (
        <>
            <div>{poolType}</div>
            {
                pool.toSorted().map(item => (
                    <SubPool key={item.blockHash} blockHash={item.blockHash} fromWhos={item.fromWhos}/>
                ))
            }
        </>
    )
}

function SubPool({blockHash, fromWhos}: { blockHash: string, fromWhos: Array<FromWho> }) {
    return (
        <table className="table">
            <thead className="table-head">
            <tr>
                <th>Block Hash</th>
                <th>Index</th>
                <th>Wallet PubKey</th>
            </tr>
            </thead>
            {
                fromWhos.map((fromWho, index) => (
                    <tr key={fromWho.pubKey} className="table-body">
                        {
                            index == 0 && (
                                <td rowSpan={fromWhos.length}>{blockHash}</td>
                            )
                        }
                        <td>{fromWho.index}</td>
                        <td>
                            <div className="btn" style={{
                                backgroundColor: convertToColor(fromWho.pubKey),
                                color: getTextColor(fromWho.pubKey)
                            }}>
                                {fromWho.pubKey}
                            </div>
                        </td>
                    </tr>
                ))
            }
        </table>
    )
}