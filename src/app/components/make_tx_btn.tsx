import {convertToColor, getTextColor} from "@/app/components/utils";
import axios from "axios";

export default function MakeTxBtn({address, hash}: { address: string, hash: string }) {
    const makeTx = async () => {
        try {
            const response = await axios.get(`${address}/makeTx`);
            // console.log("Make Tx response: ", response);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <button className="btn"
                onClick={makeTx}
                style={{
                    backgroundColor: convertToColor(hash),
                    color: getTextColor(hash)
                }}>
            Make Tx on [{hash}]
        </button>
    )
}