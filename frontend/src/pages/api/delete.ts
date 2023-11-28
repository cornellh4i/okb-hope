

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Delete all users from the database
    await prisma.user.deleteMany();

    // You can add more deletions if you have other tables.

    return NextResponse.json({ message: "All data deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
