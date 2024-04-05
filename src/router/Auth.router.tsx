import { Routes, Route, Navigate } from 'react-router-dom';
import { Signin } from '../pages/Signin';
import { Signup } from '../pages/Signup';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route element={<Signup />} path='/' />
      <Route element={<Signin />} path='/login' />
      <Route element={<Navigate to='/login' replace />} path='/logout' />
      {/* <Route element={<ForgetPassword />} path='/forgetpassword' />
      <Route element={<ResetPassword />} path='/resetpassword/:userId/:resetToken' /> */}
      {/* <Route path='*' element={<NotFound />} /> */}
    </Routes>
  );
};
