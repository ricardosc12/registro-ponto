"use client"

import { api } from "@/server/api"
import { RegistrarParams } from "@/server/interfaces"
import style from './style.module.css'
import Image from "next/image"
import { useEffect, useState } from "react"
import { calcTime, formatDate, formatIsoDate, formatTime } from "@/utils/formatDate"
import bg from '@/images/back.png'

const invokerImg = "https://steamuserimages-a.akamaihd.net/ugc/770618511055025175/3253214E3E3DB115DC56F1F3D549260321BC2FCA/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"

const moke = {
    "status": true,
    "data": [
        {
            "id": 9,
            "data": "2023-06-12T13:28:37.962Z",
            "endereco": "",
            "tipo_ponto": "Entrada"
        }
    ]
}

export default function HomeC() {

    const [data, setData] = useState({
        historico: moke.data,
        loading: false
    })

    // useEffect(() => {
    //     (async () => {
    //         if (!data.loading) {
    //             setData(prev => ({ ...prev, loading: true }))

    //             const resp = await api.historico()

    //             setData({
    //                 loading: false,
    //                 historico: Array.isArray(resp.data) ? resp.data : []
    //             })
    //         }

    //     })();

    // }, [])

    async function handleRegister() {

        const params: RegistrarParams = {
            data: formatIsoDate(new Date()),
            endereco: ""
        }

        // const resp = await api.registrar(params)

        console.log(params)
    }

    // async function handleHistorico() {
    //     const resp = await api.historico()

    //     console.log(resp)
    // }



    return (
        <div className={style.root_home}>
            <div className={style.back} style={{backgroundImage:`url(${bg.src})`}}></div>
            <div className="paper-modal flex-col py-4 px-5">
                <div className="mb-5">
                    <span className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <Image
                                src={invokerImg}
                                width={50}
                                height={50}
                                alt="Imagem de Perfil"
                                className="rounded-full shadow-md"
                            />
                            <div>
                                <h3 className="text-gray-800 font-medium">Heaverts</h3>
                                <p className="text-xs font-medium text-gray-600">Root</p>
                            </div>
                        </div>
                        <div className={style.icon_status}>
                            <p className="text-gray-500 font-medium text-xs">Online</p>
                        </div>
                    </span>
                </div>
                <div className="flex justify-center items-center w-full mb-5">
                    <button onClick={handleRegister} className="btn">Registrar</button>
                </div>
                <MainCard data={data.historico[0]} />
                <div className={style.list}></div>
            </div>
            {/* <div className="space-x-5">
                <button onClick={handleRegister}>REGISTRAR</button>
                <button onClick={handleHistorico}>HISTORICO</button>
            </div> */}
        </div>
    )
}

function MainCard({ data }: any) {

    let timer: NodeJS.Timeout | undefined;

    useEffect(() => {
        clearInterval(timer)
        setInterval(() => {
            const time_el = document.getElementById('time')
            if (time_el) time_el.innerHTML = calcTime(data.data)
        }, 1000)
    }, [data])

    return (
        <div className="flex w-full justify-between items-center">
            <div className="flex flex-col w-52">
                <h3 className="text-base text-gray-600">Entrada</h3>
                <h4 className="text-lg text-gray-800 font-medium">{formatTime(data.data)}</h4>
                <p className="text-xs text-gray-600">{formatDate(data.data)}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-base text-gray-600">Horas Trabalhadas</h3>
                <p className="text-lg text-[var(--primary)] font-medium" id="time">...</p>
            </div>
            <div className="flex flex-col text-right w-52">
                <h3 className="text-base text-gray-600">Saída</h3>
                <h4 className="text-lg text-gray-800 font-medium">{'...'}</h4>
                <p className="text-xs text-gray-600">{'...'}</p>
            </div>
        </div>
    )
}