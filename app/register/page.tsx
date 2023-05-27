'use client';
import InputElement from '@/components/forminput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import {
  BsFacebook,
  BsFillChatSquareTextFill,
  BsGithub,
  BsGoogle,
} from 'react-icons/bs';
import axios from 'axios';
import { ToastMessage } from '@/lib/utils';
import SimpleBackdrop from '@/components/Ui/Backdrop';

import { useRouter } from 'next/navigation';

const Login = () => {
  const aboutController = new AbortController();
  const signal = aboutController.signal;
  useEffect(() => {
    document.title = 'Đăng ký tại Zecky';
    return () => {
      aboutController.abort();
    };
  }, []);
  const router = useRouter();
  const [isLoading, setIsloading] = useState<Boolean>(false);
  const formik = useFormik({
    initialValues: {
      fullname: '',
      password: '',
      username: '',
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string()
        .required('không được để trống')
        .matches(/^[\D \s]+$/, 'chỉ bao gồm "chữ cái"')
        .min(2, 'Ít nhất là 2 ký tự')
        .max(30, 'không vượt quá 30 ký tự'),
      password: Yup.string()

        .required('không được để trống')
        .min(5, 'Ít nhất là 5 ký tự')
        .max(50, 'không vượt vượt quá 50 ký tự'),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+$/,
          'chỉ bao gồm "chữ số" , "chữ cái" và không có "dấu cách"'
        )
        .required('không được để trống')
        .min(3, 'Ít nhất là 3 ký tự')
        .max(50, 'không vượt vượt quá 50 ký tự'),
    }),
    onSubmit: async (value) => {
      router.push('/');
      setIsloading(true);
      const data = {
        username: value.username.trim(),
        fullname: value.fullname.trim().toLowerCase(),
        password: value.password.trim(),
      };

      const res: any = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal,
      });
      const newData: { message: string; account: any; status: number } =
        await res.json();

      const { status, message = 'Lỗi xử lý !' } = newData;
      console.log(newData);
      if (status != 404) {
        ToastMessage(message || '').success();

        const idtimeout = setTimeout(() => {
          if (status === 201) {
            router.push('');
          } else {
            ToastMessage('Lỗi Đăng ký bạn vui lòng nhập lại').error();
          }
          clearTimeout(idtimeout);
        }, 2000);
        formik.resetForm();
      } else {
        ToastMessage(message || '').error();
      }

      setIsloading(false);
    },
  });

  return (
    <section className="bg-main overflow-y-auto relative">
      <div className="py-6 container mx-auto px-2 flex flex-wrap h-screen ">
        <article className="lg:basis-1/4 basis-full lg:text-left text-center">
          <div className="text-[#fff] flex items-end lg:justify-start justify-center gap-3">
            <BsFillChatSquareTextFill fontSize="1.5rem" />
            <h1 className="font-semibold text-2xl ">Zecky</h1>
          </div>
          <div className="text-[#e9ece9] text-base lg:text-left lg:mb-0 mb-8 text-center mt-2 grid place-items-center">
            <div className="typing-demo min-h-[16px]">
              Chào bạn đã đến với <b className=" font-semibold ">Zecky!</b>
            </div>
          </div>
        </article>
        <article className="lg:basis-3/4 basis-full flex flex-col items-center justify-center bg-white/90 rounded-xl py-6 px-2">
          <div className="text-center mb-6">
            <h2 className="text-black font-bold text-3xl">Đăng Kí Tài Khoản</h2>
            <p className="text-sm">
              Tạo tài khoản miễn phí của bạn ngay đây thôi.
            </p>
          </div>

          <form method="POST" onSubmit={formik.handleSubmit}>
            <div className="grid gap-2 mb-1 md:grid-cols-1">
              <InputElement
                name="fullname"
                error={formik.errors.fullname}
                value={formik.values.fullname}
                handleChange={formik.handleChange}
                title="họ và tên"
              />

              <InputElement
                name="username"
                error={formik.errors.username}
                value={formik.values.username}
                handleChange={formik.handleChange}
                title="tài khoản"
              />
              <InputElement
                name="password"
                error={formik.errors.password}
                value={formik.values.password}
                handleChange={formik.handleChange}
                isPassword={true}
                title="mật khẩu"
              />
            </div>

            <p className="text-sm">
              Chấp nhận chính sách của tôi{' '}
              <strong className="text-main">Terms of Use</strong>
            </p>
            <button
              type="submit"
              className="py-2 w-full my-3 bg-main/80 hover:bg-main text-[#fff] text-base
            "
            >
              Đăng kí ngay
            </button>
            <p className="text-center mb-2">Có thể sử dụng với</p>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                className="py-4 rounded-xl bg-slate-200 hover:bg-slate-400 flex justify-center"
              >
                <BsFacebook fill="#560BAD" className="sm:text-base text-sm" />
              </button>
              <button
                type="button"
                className="py-4 rounded-xl bg-slate-200 hover:bg-slate-400 flex justify-center"
              >
                <BsGoogle fill="#EF476F" className="sm:text-base text-sm" />
              </button>
              <button
                type="button"
                className="py-4 rounded-xl bg-slate-200 hover:bg-slate-400 flex justify-center"
              >
                <BsGithub fill="#000" className="sm:text-base text-sm" />
              </button>
            </div>
          </form>
        </article>
      </div>
      <figure className="absolute bottom-0 left-[20px] lg:block hidden">
        <Image
          src="/theme/bg-login.png"
          alt="Bg-Login"
          width="500"
          height="400"
          className="object-cover"
        />
      </figure>
      {isLoading && <SimpleBackdrop />}
    </section>
  );
};

export default Login;
