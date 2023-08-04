import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import {
  // GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';

const SocialSignIn = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(
        'http://localhost:5000/api/v1/auth/google',
        {
          code,
        }
      );

      console.log(tokens);
    },

    onError: (errorResponse) => console.log(errorResponse),
  });
  const handleGoogleLogin = async () => {
    await console.log('google sign in check!');
    await googleLogin();
  };

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
