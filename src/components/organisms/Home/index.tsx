"use client"

import { api } from "@/server/api"
import { RegistrarParams } from "@/server/interfaces"


export default function Home() {

    async function handleRegister() {

        const params: RegistrarParams = {
            data: new Date(),
            endereco: "rua..."
        }

        const resp = await api.registrar(params)

        console.log(resp)
    }

    return (
        <div className="flex bg-red-100 h-full justify-center items-center">
            <button onClick={handleRegister}>REGISTRAR</button>
        </div>
    )
}