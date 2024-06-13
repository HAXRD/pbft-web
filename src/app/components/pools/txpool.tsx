import {TxPoolInfo, TxPoolItem} from "@/app/data/data";
import {convertToColor, getTextColor} from "@/app/components/utils";

export default function TxPool({txPoolInfo}: { txPoolInfo: TxPoolInfo }) {
    return (
        <>
            <div>Tx Pool</div>

            <SubPool poolType={`Waiting`} subPool={txPoolInfo.waiting}/>
            <SubPool poolType={`In-Progress`} subPool={txPoolInfo.inProgress}/>
            <SubPool poolType={`Committed`} subPool={txPoolInfo.committed}/>
        </>
    )
}

function SubPool({poolType, subPool}: { poolType: string; subPool: Array<TxPoolItem> }) {
    return (
        <>
            <table className="table">
                {
                    subPool.length >0 && (
                        <thead className="table-head">
                        <tr>
                            <th colSpan="3">{poolType}</th>
                        </tr>
                        <tr>
                            <th>Index</th>
                            <th>Tx Hash</th>
                            <th>Wallet PubKey</th>
                        </tr>
                        </thead>
                    )
                }
                {
                    subPool.toSorted(
                        (a, b) => (
                            a.hash > b.hash ? 1 : -1
                        )
                    ).map((txPoolItem, index) => (
                        <tbody key={txPoolItem.hash} className="table-body">
                        <tr>
                            <td>{index}</td>
                            <td>{txPoolItem.hash}</td>
                            <td>
                                <div className="btn" style={{
                                    backgroundColor: convertToColor(txPoolItem.pubKey),
                                    color: getTextColor(txPoolItem.pubKey)
                                }}>
                                    {txPoolItem.pubKey}
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