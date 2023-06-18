import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server'

export const revalidate = 0

export async function GET() {

    try {
        const client = await sql.connect();

        const { rows: registro } = await client.sql`SELECT * FROM pontos ORDER BY id DESC;`;

        return NextResponse.json({ status: true, data: registro }, { status: 200 })
    }

    catch {
        return NextResponse.json({ status: false }, { status: 200 })
    }
}