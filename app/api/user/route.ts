import connectMongoDB from '@/lib/database/conectMongoose';
import UserModel from '@/lib/models/userModel';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectMongoDB();
    const result = await UserModel.create(data);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
