import React, { FC } from 'react';
import ModelProvider from './ModelProvider';
import { BsXCircle, BsXLg } from 'react-icons/bs';
import { deFaultIconSize, handleStopPropagation } from '@/lib/utils';
interface ModalStatusProps {
  callBackStatus: (isSucess: boolean) => void;
}
const ModalStatus: FC<ModalStatusProps> = ({ callBackStatus }) => {
  return (
    <ModelProvider>
      <article
        onClick={handleStopPropagation}
        className="relative text-[#ffff] bg-[#131720] rounded-lg shadow dark:bg-gray-700"
      >
        <button
          type="button"
          onClick={() => callBackStatus(false)}
          className="absolute top-3 right-2.5 text-gray-200 hover:text-gray-500 bg-transparent"
          data-modal-hide="popup-modal"
        >
          <BsXLg fontSize={deFaultIconSize} />
        </button>
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold">Thông Báo</h2>
          <p className="mb-5 text-lg font-normal my-4">
            Are you sure you want to delete this product?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => callBackStatus(true)}
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-main/90 hover:bg-main/60   font-medium rounded-full text-sm basis-5/6 px-5 py-2.5 "
            >
              Đồng ý
            </button>
            <button
              onClick={() => callBackStatus(false)}
              data-modal-hide="popup-modal"
              type="button"
              className="bg-[#fff] hover:bg-[#dddddd]  text-black font-medium rounded-full text-sm  basis-5/6 px-5 py-2.5 "
            >
              Hủy
            </button>
          </div>
        </div>
      </article>
    </ModelProvider>
  );
};

export default ModalStatus;
