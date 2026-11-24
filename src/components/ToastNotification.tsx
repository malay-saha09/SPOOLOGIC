'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function ToastNotification() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="sp-toast-container">
      <div className="sp-toast">
        <i className="bi bi-info-circle-fill text-danger"></i>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
