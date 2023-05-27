import connectMongoDB from '@/lib/database/conectMongoose';
import UserModel from '@/lib/models/userModel';
import * as jwt from '@/lib/token';
import argon2 from 'argon2';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = cookies().get('username')?.value;
    const fullname = cookies().get('fullname')?.value;
    const accessToken = cookies().get('accessToken')?.value;

    if (!username || !fullname || !accessToken) {
      throw new Error('Vui lòng đăng nhập!');
    }
    const payload: { username: string; fullname: string } = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SRCRET || 'ACCESS_TOKEN_SRCRET'
    );
    if (payload.username != username || payload.fullname != fullname) {
      throw new Error('Tài khoản đã hết hạn vui lòng đăng nhập');
    }

    await connectMongoDB();
    const account = await UserModel.findOneAndUpdate(
      { username },
      { status: true }
    );

    if (account) {
      account.status = true;
      return NextResponse.json({
        account,
        status: 200,
        message: 'Bạn đang online!',
      });
    }
    throw new Error('Vui lòng đăng nhập');
  } catch (error: { message: string } | any) {
    return NextResponse.json({
      account: {},
      status: 401,
      message: error.message,
    });
  }
}

export async function HEAD(request: Request) {}

export async function POST(request: Request, response: Response) {
  try {
    const [data] = await Promise.all([request.json(), connectMongoDB()]);

    const { username, password, fullname } = data;
    const isExtended = await UserModel.findOne({ username });
    if (isExtended) {
      return NextResponse.json({
        message: 'Tài khoảng đã tồn tại !',
        account: '',
        status: 404,
      });
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
// export async function OPTIONS(request: Request) {}
