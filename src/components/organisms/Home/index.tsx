"use client"

import { api } from "@/server/api"
import { RegistrarParams } from "@/server/interfaces"
import style from './style.module.css'
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { calcTime, formatDate, formatIsoDate, formatTime, formatTimeFromMile, getTimeDif, isDifferentDay } from "@/utils/formatDate"
import bg from '@/images/back.png'

const invokerImg = "https://steamuserimages-a.akamaihd.net/ugc/770618511055025175/3253214E3E3DB115DC56F1F3D549260321BC2FCA/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"

// const moke = {
//     "status": true,
//     "data": [
//         {
//             "id": 13,
//             "data": "2023-06-18T10:45:52.392Z",
//             "endereco": "",
//             "tipo_ponto": "Entrada"
//         },
//         {
//             "id": 12,
//             "data": "2023-06-18T10:43:36.365Z",
//             "endereco": "",
//             "tipo_ponto": "Saída"
//         },
//         {
//             "id": 11,
//             "data": "2023-06-18T10:41:52.392Z",
//             "endereco": "",
//             "tipo_ponto": "Entrada"
//         },
//         {
//             "id": 10,
//             "data": "2023-06-15T17:41:36.365Z",
//             "endereco": "",
//             "tipo_ponto": "Saída"
//         },
//         {
//             "id": 9,
//             "data": "2023-06-12T13:28:37.962Z",
//             "endereco": "",
//             "tipo_ponto": "Entrada"
//         }
//     ]
// }

export default function HomeC() {

    const [data, setData] = useState<any>({
        historico: [],
        loading: false
    })

    const historico_today: any = useRef([])

    useEffect(() => {
        (async () => {
            if (!data.loading) {
                setData((prev: any) => ({ ...prev, loading: true }))

                const resp = await api.historico()

                setData({
                    loading: false,
                    historico: Array.isArray(resp.data) ? resp.data : []
                })
            }
        })();
    }, [])

    useEffect(() => {
        historico_today.current = []
        data.historico.every((item: any) => {
            if (!isDifferentDay(new Date(item.data))) {
                historico_today.current.unshift(item)
                return true;
            }
            if (item.tipo_ponto == "Entrada") {
                historico_today.current.shift()
            }
            return false;
        })
    }, [data])

    async function handleRegister() {

        const date = new Date()

        const params: RegistrarParams = {
            data: formatIsoDate(date),
            endereco: ""
        }

        const resp = await api.registrar(params)

        if (resp.status != true) {
            alert("Não foi possível abrir ponto !")
            return
        }

        setData((prev: any) => ({
            ...prev,
            historico: [{
                id: prev.historico[0]?.id ? prev.historico[0].id + 1 : 0,
                endereco: params.endereco,
                tipo_ponto: prev.historico[0] ? prev.historico[0].tipo_ponto == "Entrada" ? "Saída" : "Entrada" : "Entrada",
                data: date.toISOString()
            }, ...prev.historico,]
        }))
    }

    return (
        <div className={style.root_home}>
            <div className={style.back} style={{ backgroundImage: `url(${bg.src})` }}></div>
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
                <MainCard data={data.historico} historico={historico_today} />
                <div className={style.list}></div>
            </div>
        </div>
    )
}

function MainCard({ data, historico }: any) {

    let timer: NodeJS.Timeout | undefined;

    const [state, setState] = useState<any>({
        init: {},
        last: {},
        horas: 0
    })

    useEffect(() => {
        if (!data.length) return
        clearInterval(timer)
        timer = setInterval(() => {
            setState(getHist(historico.current))
        }, 1000)
    }, [data])

    return (
        <div className="flex w-full justify-between items-center">
            <div className="flex flex-col w-52">
                <h3 className="text-base text-gray-600">Entrada</h3>
                <h4 className="text-lg text-gray-800 font-medium">{state.init.time || '...'}</h4>
                <p className="text-xs text-gray-600">{state.init.date || '...'}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-base text-gray-600">Horas Trabalhadas</h3>
                <p className="text-lg text-[var(--primary)] font-medium" id="time">{state.horas || '...'}</p>
            </div>
            <div className="flex flex-col text-right w-52">
                <h3 className="text-base text-gray-600">Saída</h3>
                <h4 className="text-lg text-gray-800 font-medium">{state.last.time || '...'}</h4>
                <p className="text-xs text-gray-600">{state.last.date || '...'}</p>
            </div>
        </div>
    )
}

function getHist(historico: any) {

    let data_total = 0;

    for (let index = 0; index < historico.length; index++) {
        if (index == historico.length - 1) {
            data_total += getTimeDif(new Date(historico[index].data), new Date())
        }
        else {
            data_total += getTimeDif(new Date(historico[index].data), new Date(historico[index + 1].data))
            index++
        }
    }

    const init = { time: formatTime(historico[0].data), date: formatDate(historico[0].data) }
    let last = {};

    if (historico[historico.length - 1].tipo_ponto == "Saída") {
        let pos = historico.length - 1
        last = { time: formatTime(historico[pos].data), date: formatDate(historico[pos].data) }
    }

    return { init, last, horas: formatTimeFromMile(data_total) }
}

function pontoAtrasado() {
    // const data = new Date(moke.data[0].data)
    // const today = new Date()

    // let atrasado;

    // if (moke.data[0].tipo_ponto == "Entrada" && (data.getDate() != today.getDate() || data.getFullYear() != today.getFullYear() || today.getMonth() != data.getMonth())) {
    //     atrasado = formatDate(data.toDateString())
    //     console.log("PONTO DO DIA ", atrasado)
    // }
}