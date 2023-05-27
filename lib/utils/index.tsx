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

export function handleStopPropagation<T extends React.MouseEvent>(e: T): any {
  return e.stopPropagation();
}
export function Debounced(callback: () => void, delay: number) {
  delay = delay || 0;
  let timeId: any;

  return () => {
    console.log('time  previos at', timeId);
    if (timeId) {
      clearTimeout(timeId);
      timeId = null;
    }
    timeId = setTimeout(() => {
      callback();
      clearTimeout(timeId);
    }, delay);
  };
}

export const deFaultIconSize = '1.5rem';
