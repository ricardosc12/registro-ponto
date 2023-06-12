import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

    try {
        const client = await sql.connect();

        const { rows: registro } = await client.sql`SELECT * FROM pontos;`;

        return NextResponse.json({ status: true, data: registro }, { status: 200 })
    }
    catch {
        return NextResponse.json({ status: false }, { status: 200 })
    }
}