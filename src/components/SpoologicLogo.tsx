import React from 'react';

interface SpoologicLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function SpoologicLogo({ className = 'sp-logo-img', style }: SpoologicLogoProps) {
  return (
    <img src="images/logo.svg" alt="Spoologic" height={40}/>
  );
}
