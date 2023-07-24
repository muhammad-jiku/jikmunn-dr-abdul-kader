import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialSignIn = () => {
  const handleGoogleLogin = async () => {
    await console.log('google sign in');
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
    </>
  );
};

export default SocialSignIn;
