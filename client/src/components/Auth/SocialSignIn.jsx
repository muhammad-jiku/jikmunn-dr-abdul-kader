import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, googleSignInUser } from '../../actions/authActions';
import {
  // GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';
import { toast } from 'react-toastify';
// import jwtDecode from 'jwt-decode';

const SocialSignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    error,
    // loading,
    isAuthenticated,
  } = useSelector((state) => state?.user);

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const userDataCode = {
        code: code,
      };

      await dispatch(googleSignInUser(userDataCode));
    },

    onError: (errorResponse) => console.log(errorResponse),
  });

  const handleGoogleLogin = async () => {
    await console.log('google sign in check!');
    await googleLogin();
  };

  let from = location.state?.from?.pathname || '/';

  useEffect(() => {
    console.log(location);
    if (error) {
      // console.log(error);
      toast.error('Google Sign in failed! 😔');
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      toast.success('Welcome here!! 😊');
      navigate(from, {
        replace: true,
      });
    }
  }, [dispatch, location, error, isAuthenticated, navigate, from]);

  return (
    <>
      <div className='divider mb-2'>OR</div>
      <button
        className='btn text-main bg-white border-main hover:text-white hover:bg-main hover:border-main uppercase w-full'
        onClick={handleGoogleLogin}
      >
        Continue with Google <FcGoogle />
      </button>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          const USER_CREDENTIAL = jwtDecode(credentialResponse.credential);
          console.log(USER_CREDENTIAL);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}
    </>
  );
};

export default SocialSignIn;
