import { IUserLogin } from '@/app/register/userlogin.type';
import connectMongoDB from '@/lib/database/conectMongoose';
import UserModel from '@/lib/models/userModel';
import * as jwt from '@/lib/token';
import argon2 from 'argon2';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request, response: Response) {
  try {
    const [data] = await Promise.all([request.json(), connectMongoDB()]);

    const { username, password, fullname } = data;
    const isExtended = await UserModel.findOne({ username });
    if (isExtended) {
      throw new Error('Tài khoảng đã tồn tại !');
    }
    const payload = { username, fullname };
    const [accessToken, refreshToken] = await Promise.all([
      jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SRCRET || 'ACCESS_TOKEN_SRCRET'
      ),
      jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SRCRET || 'REFRESH_TOKEN_SRCRET'
      ),
    ]);

    const newPassword = await argon2.hash(password);

    const result = await UserModel.create({
      username,
      fullname,
      password: newPassword,
      accessToken,
      refreshToken,
    });
    cookies().set('username', username);
    cookies().set('fullname', fullname);
    cookies().set('accessToken', accessToken);

    return NextResponse.json({
      account: result,
      message: 'Tạo thành công tài khoản mới !',
      status: 201,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      message: error.message,
      account: '',
      status: 404,
    });
  }
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
