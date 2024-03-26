import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconType } from '../icon/IconType';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export const Modal = ({ token }: { token: string | undefined }) => {
  const [close, setClose] = useState(false);
  return (
    token && (
      <div className={close ? 'hidden' : ''}>
        <div className="fixed content-[''] flex flex-col justify-center space-y-3 z-[1003] top-[50%] left-[50%] -translate-x-[50%] border-2 border-white/25 -translate-y-[50%] bg-gray-800/70 dark:bg-white/10 shadow-black/25 rounded-lg px-6 py-6 max-w-xl w-full h-52">
          <header>
            <h1 className='text-xl font-semibold text-white'>Token Expiration Notification</h1>
          </header>
          <p className='text-lg font-medium text-white'>
            Your token has expired !!!, please try to log in or signin
          </p>
          <Link
            to='/auth/signin'
            className='py-2 px-4 bg-white/10 text-white text-xl font-semibold self-end mt-auto block rounded-md'>
            Sign In
          </Link>
          <IconType
            icon={faClose}
            className='absolute right-4 h-7 w-7 text-red-600 top-2 cursor-pointer'
            onClick={() => setClose(true)}
          />
        </div>
        <div className='fixed top-0 left-0 right-0 min-h-screen bg-black/40 z-[1001] backdrop-blur-sm'></div>
      </div>
    )
  );
};
