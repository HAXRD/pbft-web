"use client";
import {useEffect, useState} from "react";
import {Data, dataSrcs} from "@/app/data/data";
import Node from "@/app/components/node";
import axios from "axios";
import MakeTxBtn from "@/app/components/make_tx_btn";

export default function Home() {
    const [data, setData] = useState<Data[]>([]);
    const [disableResetBtn, setDisableResetBtn] = useState(false);
    const fetchData = async () => {
        try {
            let newData = [];
            for (let i = 0; i < dataSrcs.length; i++) {
                const response = await axios.get<Data>(`${dataSrcs[i]}/queryNodeInfo2`);
                newData.push(response.data);
            }
            setData(newData);
            getResetBtnStatus(newData)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    const getResetBtnStatus = (data: Data[]) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].txPool.inProgress.length > 0) {
                setDisableResetBtn(true)
                return
            }
        }
        setDisableResetBtn(false)
    }

    useEffect(() => {
        fetchData(); // init fetch
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval)
    }, []);

    const handleReset = async () => {
        try {
            let result = [];
            for (let i = 0; i < dataSrcs.length; i++) {
                const response = await axios.get<Data>(`${dataSrcs[i]}/reset`);
                result.push(response.data);
            }
            // console.log(result)
        } catch (error) {
            console.error('Error resetting: ', error);
        }
    }
    // console.log(data)

    return (
        <main>
            <div className="container">
                <div className="node-block">
                    <button className="btn bg-red-400"
                            onClick={handleReset}
                            disabled={disableResetBtn}>
                        Reset
                    </button>
                    {
                        data.map(item => (
                            <MakeTxBtn key={item.nodeHash}
                                       address={item.nodeAddress}
                                       hash={item.nodeHash}/>
                        ))
                    }
                </div>

            </div>

            {
                data.map(item => (
                    <Node key={item.nodeHash} data={item}/>
                ))
            }
        </main>
    );
}


