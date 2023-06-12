import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

    try {
        const resp = await request.json()

        const client = await sql.connect();

        const { rows: registro } = await client.sql`SELECT * FROM pontos ORDER BY id DESC LIMIT 1`;

        let registro_tipo = "Entrada"

        if (registro.length > 0 && registro[0].tipo_ponto == "Entrada") {
            registro_tipo = "Saída"
        }
        console.log(resp.data)
        const sql_resp = await client.sql`
            INSERT INTO pontos (data, endereco, tipo_ponto) 
            VALUES (${resp.data}, ${resp.endereco}, ${registro_tipo});`;

        if (sql_resp.rowCount != 1) {
            throw 'error'
        }
        
        return NextResponse.json({ status: true }, { status: 200 })
    }
    catch {
        return NextResponse.json({ status: false }, { status: 200 })
    }
}