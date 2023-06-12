import { env } from "process";
import { RegistrarParams } from "./interfaces";

class api {
    private static async request(url: string, options: RequestInit): Promise<any> {

        let base_url = "registro-ponto.vercel.app";

        if(env.NODE_ENV === "development") base_url = "http://localhost:3000"

        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log('Resposta:', data);
                return data;
            })
            .catch(error => {
                console.error('Erro na solicitação:', error);
                throw error;
            });
    }

    static registrar(params: RegistrarParams): Promise<any> {
        
        const url = '/api/registrar';

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
        try {
            return api.request(url, options);
        }
        catch {
            return new Promise(resolve=>{
                resolve({status:false})
            })
        }
    }

    static historico(): Promise<any> {
        
        const url = '/api/historico';

        const options: RequestInit = {
            method: 'GET'
        };
        try {
            return api.request(url, options);
        }
        catch {
            return new Promise(resolve=>{
                resolve({status:false})
            })
        }
    }
}

export { api }