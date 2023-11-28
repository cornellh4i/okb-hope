

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Extract the data sent in the POST request
    // const userData = await request.json();
    const { uid, name, authProvider, email } = await request.json();

    const createdUser = await prisma.user.create({
      data: {
        user_id: uid,
        name: name,
        authProvider: authProvider,
        email: email,
      },
    });

    // Return the created user as a response
    return NextResponse.json(createdUser);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // Retrieve all users from the database
    const users = await prisma.user.findMany();

    // Return the list of users
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}