import { cn, deFaultIconSize } from '@/lib/utils';
import { componentsProps } from '@/styles';
import { Tooltip } from '@mui/material';
import { FC } from 'react';
import { IconType } from 'react-icons/lib';

type MenuProps = {
  title: string;
  Icon: IconType;
  active?: boolean;
  handleClick: (title: string) => void;
  className?: string;
};
export const MenuItem: FC<MenuProps> = ({
  active,
  title,
  Icon,
  handleClick,
  className = {},
}) => {
  return (
    <li
      className={cn('cursor-pointer', className ? className : '')}
      onClick={() => handleClick(title)}
    >
      <a
        className={cn(
          'flex items-center  justify-center capitalize ',
          active ? 'lg:border-r-main lg:border-r-2 text-main' : ''
        )}
      >
        <Tooltip
          componentsProps={componentsProps}
          title={title}
          arrow
          placement="left"
          className="text-xl cursor-pointer"
        >
          <span className="lg">
            <Icon fontSize={deFaultIconSize} />
          </span>
        </Tooltip>
      </a>
    </li>
  );
};
