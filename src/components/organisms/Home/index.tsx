"use client"

import { api } from "@/server/api"
import { RegistrarParams } from "@/server/interfaces"
import style from './style.module.css'
import Image from "next/image"
import { useEffect, useState } from "react"

const invokerImg = "https://steamuserimages-a.akamaihd.net/ugc/770618511055025175/3253214E3E3DB115DC56F1F3D549260321BC2FCA/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"

export default function HomeC() {

    const [data, setData] = useState({
        historico: [],
        loading: true
    })

    useEffect(()=>{
        console.log('resp')
        // (async ()=>{
        //     const resp = await api.historico()

        //     console.log(resp)
        // })();

    },[])

    async function handleRegister() {

        const params: RegistrarParams = {
            data: new Date(),
            endereco: ""
        }

        const resp = await api.registrar(params)

        console.log(resp)
    }

    // async function handleHistorico() {
    //     const resp = await api.historico()

    //     console.log(resp)
    // }



    return (
        <div className="flex bg-red-100 h-full justify-center items-center">
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
                <div className="flex justify-center items-center w-full">
                    <button className="btn">Entrar</button>
                </div>
                <div className={style.list}></div>
            </div>
            {/* <div className="space-x-5">
                <button onClick={handleRegister}>REGISTRAR</button>
                <button onClick={handleHistorico}>HISTORICO</button>
            </div> */}
        </div>
    )
}