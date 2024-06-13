"use client";
import {useEffect, useState} from "react";
import {Data} from "@/app/data/data";
import Node from "@/app/components/node";
import axios from "axios";

export default function Home() {
    const [data, setData] = useState<Data[]>([]);
    const [disableResetBtn, setDisableResetBtn] = useState(false);
    const fetchData = async () => {
        try {
            const response1 = await axios.get<Data>("http://localhost:18080/queryNodeInfo2");
            const response2 = await axios.get<Data>("http://localhost:18081/queryNodeInfo2");
            const response3 = await axios.get<Data>("http://localhost:18082/queryNodeInfo2");
            const newData = [response1.data, response2.data, response3.data]
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
            const response1 = axios.get("http://localhost:18080/reset");
            const response2 = axios.get("http://localhost:18081/reset");
            const response3 = axios.get("http://localhost:18082/reset");
            const result = await Promise.all([response1, response2, response3]);
            console.log(result)
        } catch (error) {
            console.error('Error resetting: ', error);
        }
    }

    return (
        <main>
            <div className="container">
                <div>
                    <button className="btn bg-red-400"
                            onClick={handleReset}
                            disabled={disableResetBtn}>
                        Reset
                    </button>
                </div>
            </div>

            {
                data.map(dataItem => (
                    <Node key={dataItem.nodeHash} data={dataItem}/>
                ))
            }
        </main>
    );
}


