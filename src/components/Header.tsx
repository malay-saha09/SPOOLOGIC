'use client';

import React from 'react';
import Link from 'next/link';
import SpoologicLogo from './SpoologicLogo';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cartCount, openCartDrawer, openVehicleModal, selectedVehicle } = useCart();

  return (
    <header className="sp-header">
      {/* Sitewide Top Announcement */}
      <div className="sp-sitewide-banner">
        SITE WIDE FREE SHIPPING ON ORDERS OVER $99
      </div>

      <div className="sp-header-inner">
        {/* Top Mobile Bar: Logo & Icons */}
        <div className="d-flex justify-content-between align-items-center w-100 d-lg-none">
          <Link href="/" className="sp-logo-link">
            <SpoologicLogo className="sp-logo-img" />
          </Link>

          <div className="sp-header-icons">
            <a href="tel:8005557766" className="sp-header-icon-link text-danger" title="Call Us: (800) 555-7766">
              <i className="bi bi-telephone-fill"></i>
            </a>
            <Link href="#" className="sp-header-icon-link" title="My Account">
              <i className="bi bi-person-circle"></i>
            </Link>
            <button 
              type="button" 
              className="sp-header-icon-link bg-transparent border-0 p-0 position-relative" 
              onClick={openCartDrawer}
              title="View Cart"
            >
              <i className="bi bi-cart3"></i>
              {cartCount > 0 && (
                <span className="sp-cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Brand Logo */}
        <Link href="/" className="sp-logo-link d-none d-lg-block">
          <SpoologicLogo className="sp-logo-img" />
        </Link>

        {/* Search Bar */}
        <div className="sp-search-wrapper w-100">
          <input 
            type="text" 
            className="form-control sp-search-input" 
            placeholder="SEARCH BY KEYWORD OR PART NUMBER…" 
            aria-label="Search by keyword or part number"
          />
        </div>

        {/* Select a vehicle button */}
        <button 
          type="button" 
          className="sp-vehicle-btn"
        >
          <span>
              <i className="bi bi-car-front-fill me-2"></i>
              SELECT A VEHICLE
            </span>
        </button>

        {/* Desktop Action icons */}
        <div className="sp-header-icons d-none d-lg-flex">
          {/* Account */}
          <Link href="#" className="sp-header-icon-link" title="My Account">
            <i className="bi bi-person-circle"></i>
          </Link>

          {/* Cart Icon with badge */}
          <button 
            type="button" 
            className="sp-header-icon-link bg-transparent border-0 p-0 position-relative" 
            onClick={openCartDrawer}
            title="View Cart"
          >
            <i className="bi bi-cart3"></i>
            {cartCount > 0 && (
              <span className="sp-cart-badge">{cartCount}</span>
            )}
          </button>

          {/* Support Phone */}
          <a href="tel:8005557766" className="sp-header-icon-link text-danger" title="Call Us: (800) 555-7766">
            <i className="bi bi-telephone-fill"></i>
          </a>
        </div>
      </div>
    </header>
  );
}
