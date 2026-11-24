'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
// import Recommendations from '@/components/Recommendations';

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    scenarios,
    discountCode,
    discountPercent,
    applyDiscountCode,
    shippingCost,
    shippingOption,
    setShippingOption
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [caZipCheck, setCaZipCheck] = useState('');
  const [caZipMessage, setCaZipMessage] = useState<string | null>(null);

  const freeShippingThreshold = 99;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = cartSubtotal * discountPercent;
  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const estimatedTax = taxableAmount * 0.0725;
  const orderTotal = taxableAmount + estimatedTax + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    applyDiscountCode(promoInput);
  };

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caZipCheck) return;
    const zip = parseInt(caZipCheck, 10);
    if (zip >= 90001 && zip <= 96162) {
      if (scenarios.california === 'restricted') {
        setCaZipMessage('⚠️ California address detected: One or more items in your cart cannot ship to California under current emissions regulations.');
      } else {
        setCaZipMessage('✅ California address verified: All items in your cart are legal for sale and shipment to California.');
      }
    } else {
      setCaZipMessage('✅ Destination verified: 49-state standard shipping applies.');
    }
  };

  return (
    <div className="sp-product-container my-4">
      {/* Breadcrumb */}
      <div className="sp-breadcrumb">
        <Link href="/">HOME</Link>
        <span className="mx-2">&rsaquo;</span>
        <b>SHOPPING CART</b>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fs-2 fw-bold text-dark mb-0">Your Shopping Cart</h1>
        <span className="text-muted fw-semibold">
          {cart.reduce((a, b) => a + b.quantity, 0)} {cart.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="card border-0 bg-light p-5 text-center my-4 rounded-3">
          <div className="py-4">
            <i className="bi bi-cart-x fs-1 text-danger d-block mb-3"></i>
            <h3 className="fw-bold text-dark">Your Cart is Currently Empty</h3>
            <p className="text-secondary max-w-md mx-auto mb-4">
              Looking for a direct replacement turbo for your Ford Powerstroke 7.3L or high-performance accessories?
            </p>
            <Link href="/" className="btn btn-danger btn-lg fw-bold text-uppercase px-5 py-3">
              Shop Stock Turbocharger &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4 align-items-start">
          {/* Left Column: Cart Items List */}
          <div className="col-lg-8">
            {/* Free Shipping Alert Bar */}
            <div className="card border-0 bg-light p-3 mb-4 rounded-3 border-start border-4 border-danger">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold small">
                  {remainingForFreeShipping > 0 ? (
                    <>Add <strong className="text-danger">${remainingForFreeShipping.toFixed(2)}</strong> more to unlock <strong>FREE GROUND SHIPPING</strong>!</>
                  ) : (
                    <span className="text-success fw-bold">
                      <i className="bi bi-check-circle-fill me-1"></i> You have unlocked FREE GROUND SHIPPING!
                    </span>
                  )}
                </span>
                <span className="small text-muted fw-semibold">
                  ${cartSubtotal.toFixed(2)} / ${freeShippingThreshold}
                </span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div 
                  className={`progress-bar ${remainingForFreeShipping === 0 ? 'bg-success' : 'bg-danger'}`} 
                  role="progressbar" 
                  style={{ width: `${progressToFreeShipping}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Items Table */}
            <div className="card border rounded-3 p-3 mb-4 bg-white shadow-sm">
              <div className="d-flex flex-column gap-3">
                {cart.map((item) => (
                  <div key={item.id} className="p-3 border rounded-3 bg-white">
                    <div className="row g-3 align-items-center">
                      {/* Product Image */}
                      <div className="col-auto">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="rounded border"
                          style={{ width: '90px', height: '90px', objectFit: 'contain' }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="col">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="fs-6 fw-bold mb-1 text-dark">
                              {item.title}
                            </h5>
                            <div className="text-muted small mb-1">
                              SKU: <strong className="text-dark">{item.sku}</strong>
                            </div>
                            <div className="small text-secondary mb-1">
                              {item.fitmentSummary}
                            </div>
                          </div>

                          <button 
                            type="button" 
                            className="btn btn-sm btn-outline-danger border-0"
                            onClick={() => removeFromCart(item.id)}
                            title="Remove from cart"
                          >
                            <i className="bi bi-trash3 fs-6"></i>
                          </button>
                        </div>

                        {/* Backorder or CA warnings */}
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {item.isBackorder && (
                            <span className="badge bg-warning text-dark">
                              <i className="bi bi-clock-history me-1"></i>
                              Backordered ({item.backorderEstimate || '2-3 weeks'})
                            </span>
                          )}

                          {!item.shipsToCalifornia && scenarios.california === 'restricted' && (
                            <span className="badge bg-danger">
                              <i className="bi bi-slash-circle me-1"></i> Cannot Ship To California
                            </span>
                          )}
                          {item.shipsToCalifornia && (
                            <span className="badge bg-success-subtle text-success">
                              <i className="bi bi-check me-1"></i> 50-State Legal
                            </span>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                          <div className="d-flex align-items-center gap-2">
                            <span className="small text-muted fw-semibold">Quantity:</span>
                            <div className="input-group input-group-sm" style={{ width: '110px' }}>
                              <button 
                                className="btn btn-outline-secondary" 
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                              >
                                &minus;
                              </button>
                              <span className="input-group-text bg-white px-2 fw-bold text-center justify-content-center" style={{ width: '40px' }}>
                                {item.quantity}
                              </span>
                              <button 
                                className="btn btn-outline-secondary" 
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="text-end">
                            <span className="fs-5 fw-bold text-dark">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            {item.quantity > 1 && (
                              <div className="text-muted small">
                                (${item.price.toFixed(2)} each)
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* California Zip Code Checker */}
            <div className="card border rounded-3 p-3 mb-4 bg-white shadow-sm">
              <h6 className="fw-bold text-dark mb-2">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                Check Destination State &amp; Emissions Compliance
              </h6>
              <p className="text-muted small mb-3">
                Enter your destination ZIP code to verify state delivery options, emissions status, and carrier pickup routes.
              </p>
              <form onSubmit={handleZipCheck} className="row g-2 align-items-center">
                <div className="col-sm-5">
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    placeholder="Enter 5-digit ZIP (e.g. 90210)"
                    value={caZipCheck}
                    onChange={e => setCaZipCheck(e.target.value)}
                    maxLength={5}
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-secondary btn-sm fw-semibold">
                    Verify ZIP Code
                  </button>
                </div>
              </form>
              {caZipMessage && (
                <div className={`mt-3 p-2 rounded small ${caZipMessage.includes('⚠️') ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                  {caZipMessage}
                </div>
              )}
            </div>

            {/* Order Special Instructions */}
            <div className="card border rounded-3 p-3 bg-white shadow-sm">
              <h6 className="fw-bold text-dark mb-2">
                <i className="bi bi-chat-text text-secondary me-2"></i>
                Order Notes / Special Delivery Instructions
              </h6>
              <textarea 
                className="form-control" 
                rows={2}
                placeholder="Gate codes, delivery directions, or commercial dock instructions..."
                value={orderNotes}
                onChange={e => setOrderNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="col-lg-4">
            <div className="card border rounded-3 p-4 bg-white shadow-sm position-sticky" style={{ top: '20px' }}>
              <h4 className="fs-5 fw-bold text-dark mb-3">Order Summary</h4>

              {/* Subtotal */}
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Subtotal</span>
                <span className="fw-bold">${cartSubtotal.toFixed(2)}</span>
              </div>

              {/* Promo Discount if applied */}
              {discountPercent > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success fw-semibold">
                  <span>Discount ({discountCode} - {(discountPercent * 100).toFixed(0)}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Shipping Options */}
              <div className="mb-3 pt-2 border-top">
                <label className="fw-bold small text-secondary mb-2 d-block">Shipping Method</label>
                <div className="form-check mb-2">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="shippingOption" 
                    id="shipFree" 
                    checked={shippingOption === 'free'}
                    onChange={() => setShippingOption('free')}
                  />
                  <label className="form-check-label small d-flex justify-content-between" htmlFor="shipFree">
                    <span>Standard Ground (3–5 days)</span>
                    <strong className="text-success">FREE</strong>
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="shippingOption" 
                    id="shipExpedited" 
                    checked={shippingOption === 'expedited'}
                    onChange={() => setShippingOption('expedited')}
                  />
                  <label className="form-check-label small d-flex justify-content-between" htmlFor="shipExpedited">
                    <span>FedEx 2-Day Air</span>
                    <strong>$34.95</strong>
                  </label>
                </div>
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="shippingOption" 
                    id="shipOvernight" 
                    checked={shippingOption === 'overnight'}
                    onChange={() => setShippingOption('overnight')}
                  />
                  <label className="form-check-label small d-flex justify-content-between" htmlFor="shipOvernight">
                    <span>Overnight Priority</span>
                    <strong>$79.95</strong>
                  </label>
                </div>
              </div>

              {/* Estimated Sales Tax */}
              <div className="d-flex justify-content-between mb-3">
                <span className="text-secondary">Estimated Sales Tax (7.25%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>

              {/* Promo Code Input Form */}
              <form onSubmit={handleApplyPromo} className="mb-3 pt-3 border-top">
                <label className="fw-bold small text-secondary mb-1">Promo or Dealer Code</label>
                <div className="input-group input-group-sm">
                  <input 
                    type="text" 
                    className="form-control text-uppercase" 
                    placeholder="Enter SPOOL10"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-outline-dark fw-bold">
                    Apply
                  </button>
                </div>
                <small className="text-muted d-block mt-1">Try code <strong>SPOOL10</strong> for 10% off</small>
              </form>

              {/* Order Total */}
              <div className="d-flex justify-content-between align-items-baseline mb-4 pt-3 border-top">
                <span className="fs-5 fw-bold text-dark">Estimated Total</span>
                <span className="fs-3 fw-bold text-danger">${orderTotal.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Link 
                href="/checkout" 
                className="btn btn-danger btn-lg w-100 fw-bold text-uppercase py-3 mb-3 shadow"
              >
                Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i>
              </Link>

              <Link 
                href="/" 
                className="btn btn-outline-secondary w-100 fw-semibold text-center py-2"
              >
                &larr; Continue Shopping
              </Link>

              {/* Guarantee badges */}
              <div className="mt-4 pt-3 border-top text-center">
                <div className="d-flex justify-content-around text-secondary fs-4 mb-2">
                  <i className="bi bi-shield-lock-fill text-success" title="256-bit SSL encryption"></i>
                  <i className="bi bi-credit-card-2-back-fill text-primary" title="All major credit cards accepted"></i>
                  <i className="bi bi-box-seam-fill text-danger" title="Insured shipping"></i>
                  <i className="bi bi-award-fill text-warning" title="1-Year warranty"></i>
                </div>
                <p className="small text-muted mb-0">
                  Backed by SPOOLOGIC 1-Year Warranty &amp; 30-Day Hassle-Free Returns with zero core charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Upgrades in Cart */}
      {/* <Recommendations /> */}
    </div>
  );
}
