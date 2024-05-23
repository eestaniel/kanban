import React from 'react';
import Image from 'next/image';
import Logo_Mobile from '@/app/assets/logo-mobile.svg';

const Logo = ({className}) => (
  <div className={`logo ${className}`}>
    <Image src={Logo_Mobile} alt="Logo" />
  </div>
);

export default Logo;
