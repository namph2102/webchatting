import connectMongoDB from '@/lib/database/conectMongoose';
import UserModel from '@/lib/models/userModel';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const search = await request.json();
    if (!search) {
      throw new Error('Dữ liệu thiếu');
    }
    await connectMongoDB();
    let listUserSearchs = await UserModel.find({
      $text: { $search: search },
    })
      .select('username fullname avatar')
      .limit(7);
    if (!listUserSearchs) {
      listUserSearchs = await UserModel.find()
        .select('username fullname avatar')
        .limit(7);
    }
    return NextResponse.json({
      listUserSearchs,
      status: 200,
      messsage: 'Tìm thấy user',
    });
  } catch (err) {
    return NextResponse.json({
      listUserSearchs: [],
      status: 204,
      messsage: 'không có dữ liệu',
    });
  }
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}
