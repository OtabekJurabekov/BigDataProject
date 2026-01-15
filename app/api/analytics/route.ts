import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { queries } from '@/lib/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryType = searchParams.get('type');

    if (!queryType || !(queryType in queries)) {
      return NextResponse.json(
        { error: 'Invalid query type' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    try {
      const query = queries[queryType as keyof typeof queries];
      const [rows] = await connection.execute(query);
      return NextResponse.json({ data: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Database query failed' },
      { status: 500 }
    );
  }
}
