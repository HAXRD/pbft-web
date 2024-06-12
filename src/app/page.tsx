"use client";
import {useEffect, useState} from "react";
import {Data} from "@/app/data/data";
import Node from "@/app/components/node";
import axios from "axios";

export default function Home() {
    const [data, setData] = useState<Data[]>([]);
    const fetchData = async () => {
        try {
            const response1 = await axios.get<Data>("http://localhost:18080/queryNodeInfo2");
            const response2 = await axios.get<Data>("http://localhost:18081/queryNodeInfo2");
            const response3 = await axios.get<Data>("http://localhost:18082/queryNodeInfo2");
            setData([response1.data, response2.data, response3.data]);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    useEffect(() => {
        fetchData(); // init fetch
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval)
    }, []);


    return (
        <main>
            <div className="container">
                <div>
                    <button className="btn bg-red-400">
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


