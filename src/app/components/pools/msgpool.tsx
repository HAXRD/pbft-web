import {MsgPoolItem} from "@/app/data/data";
import {convertToColor, getTextColor} from "@/app/components/utils";

export default function MsgPool({poolType, pool}: { poolType: string, pool: Array<MsgPoolItem> }) {
    return (
        <>
            <div>{poolType}</div>
            {
                pool.toSorted(
                    (a, b) => (
                        a.blockHash > b.blockHash ? 1 : -1
                    )
                ).map(item => (
                    <SubPool key={item.blockHash} blockHash={item.blockHash} fromWhos={item.fromWhos}/>
                ))
            }
        </>
    )
}

function SubPool({blockHash, fromWhos}: { blockHash: string, fromWhos: Array<string> }) {
    return (
        <table className="table">
            <thead className="table-head">
            <tr>
                <th>Block Hash</th>
                <th>Index</th>
                <th>Wallet PubKey</th>
            </tr>
            </thead>
            <tbody>
            {
                fromWhos.toSorted(
                    (a, b) => (
                        a > b ? 1 : -1
                    )
                ).map((fromWho, index) => (
                    <tr key={fromWho} className="table-body">
                        {
                            index == 0 && (
                                <td rowSpan={fromWhos.length}>{blockHash}</td>
                            )
                        }
                        <td>{index}</td>
                        <td>
                            <div className="label" style={{
                                backgroundColor: convertToColor(fromWho),
                                color: getTextColor(fromWho)
                            }}>
                                {fromWho}
                            </div>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}