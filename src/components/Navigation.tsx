import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="sp-nav" aria-label="Main Navigation">
      <Link href="/shop/engine">SHOP BY ENGINE</Link>
      <span>/</span>
      <Link href="/">SPOOLOGIC</Link>
      <span>/</span>
      <Link href="/shop/ford-powerstroke">FORD POWERSTROKE</Link>
      <span>/</span>
      <Link href="/shop/chevy-duramax">CHEVROLET / GMC DURAMAX</Link>
      <span>/</span>
      <Link href="/shop/dodge-cummins">DODGE / RAM CUMMINS</Link>
    </nav>
  );
}
