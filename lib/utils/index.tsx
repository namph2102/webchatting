import clsx, { ClassValue } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...classnames: ClassValue[]) {
  return twMerge(clsx(classnames));
}
export function ScroolToBottom(element: HTMLElement, time: number = 1000) {
  if (time == 0) {
    element.scrollTo(0, element.scrollHeight);
    return;
  }
  const idTimeout = setTimeout(() => {
    element.scrollTo(0, element.scrollHeight);

    clearTimeout(idTimeout);
  }, time);
}

export const ToastMessage = (message = '', icon?: string) => {
  const options: any = {};
  console.log(message);
  if (icon) options.icon = icon;
  return {
    normal(suboptions?: object) {
      return toast(message, { ...suboptions });
    },
    success(suboptions?: object) {
      return toast.success(message, { ...suboptions });
    },
    error(suboptions?: object) {
      return toast.error(message, { ...suboptions });
    },
  };
};

export const deFaultIconSize = '1.5rem';
