'use client';

import React, { useState } from 'react';
import { useCart, shippingExamples } from '@/context/CartContext';
import { productData } from '@/data/productData';

export default function ProductInfo() {
  const { 
    scenarios, 
    currentPrice, 
    originalPrice, 
    addToCart, 
    selectedVehicle, 
    openVehicleModal, 
    openProp65 
  } = useCart();

  const [quantity, setQuantity] = useState(1);

  const isAvailable = scenarios.stock === 'in' || scenarios.stock === 'limited';
  const isBackorder = scenarios.stock === 'backorder';
  const isOutOfStock = scenarios.stock === 'out';
  const canPurchase = isAvailable || isBackorder;

  const shippingInfo = shippingExamples[scenarios.shippingTime] || shippingExamples.before;

  const handleAddToCart = () => {
    if (!canPurchase) return;

    addToCart({
      sku: productData.sku,
      title: productData.name,
      price: currentPrice,
      originalPrice: scenarios.pricing === 'sale' ? originalPrice : undefined,
      quantity,
      image: productData.images[0],
      fitmentSummary: productData.fitmentSummary,
      isBackorder,
      backorderEstimate: isBackorder ? scenarios.backorderCustomText : undefined,
      shipsToCalifornia: scenarios.california === 'allowed',
      warranty: productData.warranty
    });
  };

  const scrollToReviews = () => {
    const el = document.getElementById('sp-reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sp-product-card">
      {/* Product Title & SKU */}
      <div className="sp-sku-tag">SKU # : {productData.sku}</div>
      <h1 className="sp-product-title">{productData.name}</h1>

      {/* Rating & Review Link */}
      <div className="sp-rating-row">
        <div className="sp-stars-gold">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
        </div>
        <span className="fw-bold">{productData.rating}</span>
        <button 
          type="button" 
          className="sp-review-link"
          onClick={scrollToReviews}
        >
          {productData.reviewCount} Reviews
        </button>
        <span className="text-muted">|</span>
        <button 
          type="button" 
          className="sp-review-link text-muted"
          onClick={scrollToReviews}
        >
          Write a review
        </button>
      </div>

      {/* Vehicle Fitment Indicator */}
      <div className={`sp-fitment-box ${scenarios.vehicleFit}`}>
        {scenarios.vehicleFit === 'match' && (
          <>
            <div className="sp-fitment-title text-success">
              <i className="bi bi-check-circle-fill fs-5"></i>
              <span>Guaranteed to Fit: {selectedVehicle ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model} ${selectedVehicle.engine}` : '1996 Ford F-250 7.3L Powerstroke'}</span>
            </div>
            <p className="sp-fitment-desc">
              1994-1997 Ford F-Series 7.3L Powerstroke<br />
              1995-1997 Ford Econoline 7.3L Powerstroke
            </p>
          </>
        )}

        {scenarios.vehicleFit === 'mismatch' && (
          <>
            <div className="sp-fitment-title text-danger">
              <i className="bi bi-x-circle-fill fs-5"></i>
              <span>Does Not Fit Selected Vehicle: {selectedVehicle ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}` : 'Selected Vehicle'}</span>
            </div>
            <p className="sp-fitment-desc">
              This turbocharger is engineered specifically for 1994–1997 Ford 7.3L Powerstroke diesel engines.
            </p>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-danger mt-2"
              onClick={openVehicleModal}
            >
              Change Vehicle
            </button>
          </>
        )}

        {scenarios.vehicleFit === 'none' && (
          <>
            <div className="sp-fitment-title text-secondary">
              <i className="bi bi-question-circle-fill fs-5"></i>
              <span>Select Your Vehicle to Confirm Guaranteed Fitment</span>
            </div>
            <p className="sp-fitment-desc">
              1994-1997 Ford F-Series 7.3L Powerstroke<br />
              1995-1997 Ford Econoline 7.3L Powerstroke
            </p>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-secondary mt-2"
              onClick={openVehicleModal}
            >
              Select Vehicle
            </button>
          </>
        )}
      </div>

      {/* Price & Stock Section */}
      <div className="sp-price-stock-row">
        <div className="sp-price-wrap">
          <span className="sp-price-main">${currentPrice.toFixed(2)}</span>
          {scenarios.pricing === 'sale' && (
            <>
              <span className="sp-price-original">${originalPrice.toFixed(2)}</span>
              <span className="sp-price-badge">Save $100</span>
            </>
          )}
          {scenarios.pricing === 'dealer' && (
            <span className="badge bg-dark text-white px-2 py-1">Dealer Wholesale</span>
          )}
        </div>

        {/* Dynamic Stock Status */}
        <div>
          {scenarios.stock === 'in' && (
            <div className="sp-stock-badge available">
              <i className="bi bi-check-circle-fill"></i>
              <span>IN STOCK</span>
            </div>
          )}
          {scenarios.stock === 'limited' && (
            <div className="sp-stock-badge limited">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>LIMITED STOCK</span>
            </div>
          )}
          {scenarios.stock === 'backorder' && (
            <div className="sp-stock-badge backordered">
              <i className="bi bi-clock-history"></i>
              <span>ON BACKORDER</span>
            </div>
          )}
          {scenarios.stock === 'out' && (
            <div className="sp-stock-badge out">
              <i className="bi bi-x-circle-fill"></i>
              <span>OUT OF STOCK</span>
            </div>
          )}
        </div>
      </div>

      {/* Limited Stock Warning Notice */}
      {scenarios.stock === 'limited' && (
        <div className="sp-low-notice">
          <strong>ONLY 2 LEFT IN STOCK</strong>
          <p>Order soon to guarantee same-day dispatch before our warehouse allocation sells out.</p>
        </div>
      )}

      {/* Holiday Announcement Banner if active */}
      {shippingInfo.greeting && isAvailable && (
        <div className="sp-holiday-greeting">
          <span className="fs-4">{shippingInfo.icon}</span>
          <div>
            <strong>{shippingInfo.greeting}</strong>
            <div className="small text-secondary">{shippingInfo.label} · Carrier pickup availability applies</div>
          </div>
        </div>
      )}

      {/* Shipping & Delivery Cutoff Timer */}
      {canPurchase && (
        <div className="sp-timer-box">
          <div className="sp-timer-title">
            <i className={`bi ${isBackorder ? 'bi-calendar-check text-warning' : 'bi-truck text-success'}`}></i>
            <span>
              {isBackorder ? (
                scenarios.backorderEstimate === 'dates' ? 'Estimated ship window: October 19–23' :
                scenarios.backorderEstimate === 'lead' ? 'Estimated to ship in 1–2 weeks' :
                scenarios.backorderCustomText || 'Ship date pending confirmation'
              ) : (
                shippingInfo.title
              )}
            </span>
            {!isBackorder && shippingInfo.countdown && (
              <span className="sp-timer-countdown">
                — Order within <b>{shippingInfo.hoursLeft}h {shippingInfo.minsLeft}m</b>
              </span>
            )}
          </div>
          <div className="sp-timer-detail">
            {isBackorder ? (
              'Estimated timing is not guaranteed and may change. 5% cancellation fee applies if cancelled.'
            ) : (
              shippingInfo.detail
            )}
          </div>
        </div>
      )}

      {/* California Shipping Indicator Card */}
      <div className={`sp-ca-card ${scenarios.california === 'allowed' ? 'allowed' : ''}`}>
        <div className="sp-ca-badge-icon">
          <img 
            src="/images/california-map.svg" 
            alt="California State Map" 
            className="sp-ca-map-img" 
            style={{
              width: '38px',
              height: '38px',
              filter: scenarios.california === 'allowed' 
                ? 'invert(37%) sepia(85%) saturate(450%) hue-rotate(85deg) brightness(95%) contrast(90%)'
                : 'invert(19%) sepia(82%) saturate(4328%) hue-rotate(352deg) brightness(85%) contrast(85%)'
            }} 
          />
          <div className={`sp-ca-status-pill ${scenarios.california === 'allowed' ? 'check' : 'ban'}`}>
            <i className={`bi ${scenarios.california === 'allowed' ? 'bi-check' : 'bi-slash-circle'}`}></i>
          </div>
        </div>

        <div>
          <div className="sp-ca-title">California Shipping</div>
          <p className="sp-ca-status-text">
            {scenarios.california === 'allowed' ? 'Ships to California' : 'Cannot ship to California'}
          </p>
          <div className="small text-secondary mt-1">
            {scenarios.california === 'allowed' 
              ? 'Meets California emissions or OEM replacement criteria for 49-state/50-state certification.'
              : 'Restricted under California emissions regulations for highway use in CA.'}
          </div>
        </div>
      </div>

      {/* California Prop 65 Link */}
      <div className="sp-prop65-row">
        <img src="/images/prop65-icon.svg" alt="Prop 65" width="20" height="20" className="me-2 flex-shrink-0" />
        <span>
          <strong>WARNING:</strong> Cancer and Reproductive Harm —{' '}
          <a onClick={openProp65} role="button">P65Warnings.ca.gov</a>
        </span>
      </div>

      {/* Order Stepper & Buy Button */}
      <div className="sp-order-row">
        {canPurchase && (
          <div className="sp-qty-stepper">
            <button 
              type="button" 
              className="sp-qty-btn"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              &minus;
            </button>
            <div className="sp-qty-value">{quantity}</div>
            <button 
              type="button" 
              className="sp-qty-btn"
              onClick={() => setQuantity(q => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}

        <button 
          type="button" 
          className="sp-add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!canPurchase}
        >
          {isBackorder ? 'PLACE BACKORDER' : isAvailable ? 'ADD TO CART' : 'OUT OF STOCK'}
        </button>
      </div>

      {/* Carrier Footer */}
      <div className="sp-carrier-footer">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-shield-check text-success fs-5"></i>
          <span className="fw-semibold">Official SPOOLOGIC Guaranteed Quality &amp; Fit</span>
        </div>
        <div className="sp-carrier-trucks">
          <img 
            src="/images/carrier-trucks.webp" 
            alt="FedEx UPS Ground Overnight Freight" 
            className="sp-carrier-img" 
            style={{ height: '36px', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}
