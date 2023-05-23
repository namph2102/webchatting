import { FC, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { BiLoader } from 'react-icons/bi';
interface SimpleBackdropProps {
  ishandleTouchClose?: boolean;
}
const SimpleBackdrop: FC<SimpleBackdropProps> = ({
  ishandleTouchClose = false,
}) => {
  const [open, setOpen] = useState<any>(true);
  const handleClose = () => {
    ishandleTouchClose && setOpen(false);
  };
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <BiLoader className="animate-spin duration-[4000]" fontSize={35} />
      </Backdrop>
    </div>
  );
};
export default SimpleBackdrop;
