'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartDrawerOpen, 
    closeCartDrawer, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal,
    scenarios
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 99;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <>
      {/* Backdrop */}
      <div className="sp-drawer-backdrop" onClick={closeCartDrawer} />

      {/* Drawer Panel */}
      <div className={`sp-cart-drawer ${isCartDrawerOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        {/* Drawer Header */}
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-bag-check-fill text-danger fs-5"></i>
            <h5 className="mb-0 fw-bold">Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</h5>
          </div>
          <button 
            type="button" 
            className="btn-close" 
            onClick={closeCartDrawer}
            aria-label="Close cart drawer"
          ></button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-3 py-2 bg-light border-bottom">
          <div className="d-flex justify-content-between small mb-1 fw-bold">
            {remainingForFreeShipping > 0 ? (
              <span>Add <strong className="text-danger">${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>FREE SHIPPING</strong>!</span>
            ) : (
              <span className="text-success"><i className="bi bi-check-circle-fill me-1"></i> You unlocked <strong>FREE SHIPPING!</strong></span>
            )}
            <span>${cartSubtotal.toFixed(2)} / ${freeShippingThreshold}</span>
          </div>
          <div className="progress" style={{ height: '6px' }}>
            <div 
              className={`progress-bar ${remainingForFreeShipping === 0 ? 'bg-success' : 'bg-danger'}`} 
              role="progressbar" 
              style={{ width: `${progressToFreeShipping}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="p-3 flex-grow-1 overflow-auto">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart-x fs-1 text-muted d-block mb-3"></i>
              <h6 className="fw-bold text-secondary">Your cart is currently empty</h6>
              <p className="text-muted small">Explore our precision engineered turbochargers and upgrades.</p>
              <button 
                type="button" 
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={closeCartDrawer}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div key={item.id} className="p-3 border rounded-3 bg-white position-relative">
                  <div className="d-flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="rounded"
                      style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="fw-bold mb-1 text-dark fs-6" style={{ lineHeight: 1.3 }}>
                          {item.title}
                        </h6>
                        <button 
                          type="button" 
                          className="btn btn-link text-secondary p-0 ms-2"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>

                      <div className="small text-muted mb-1">SKU: {item.sku}</div>

                      {item.isBackorder && (
                        <span className="badge bg-amber-subtle text-warning border border-warning mb-2 d-inline-block">
                          <i className="bi bi-clock-history me-1"></i> Backordered: {item.backorderEstimate || '2-3 weeks'}
                        </span>
                      )}

                      {!item.shipsToCalifornia && scenarios.california === 'restricted' && (
                        <div className="small text-danger fw-bold mb-1">
                          <i className="bi bi-exclamation-octagon-fill me-1"></i> Cannot ship to CA addresses
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        {/* Stepper */}
                        <div className="input-group input-group-sm" style={{ width: '90px' }}>
                          <button 
                            className="btn btn-outline-secondary btn-sm" 
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="input-group-text bg-white px-2 fw-bold text-center justify-content-center" style={{ width: '32px' }}>
                            {item.quantity}
                          </span>
                          <button 
                            className="btn btn-outline-secondary btn-sm" 
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-end">
                          <span className="fw-bold fs-6 text-dark">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <div className="text-muted" style={{ fontSize: '11px' }}>
                              (${item.price.toFixed(2)} ea)
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div className="p-3 bg-light border-top">
            <div className="d-flex justify-content-between mb-2 fs-6">
              <span className="text-secondary">Subtotal</span>
              <strong className="fs-5 text-dark">${cartSubtotal.toFixed(2)}</strong>
            </div>
            <div className="small text-muted mb-3">
              Taxes and expedited shipping calculated at checkout.
            </div>

            <div className="d-grid gap-2">
              <Link 
                href="/checkout" 
                className="btn btn-danger btn-lg fw-bold text-uppercase py-3"
                onClick={closeCartDrawer}
              >
                Proceed to Checkout <i className="bi bi-arrow-right ms-2"></i>
              </Link>
              <Link 
                href="/cart" 
                className="btn btn-outline-secondary fw-semibold py-2"
                onClick={closeCartDrawer}
              >
                View Full Cart
              </Link>
            </div>

            <div className="d-flex justify-content-center gap-3 text-muted small mt-3">
              <span><i className="bi bi-shield-check text-success"></i> 256-Bit SSL</span>
              <span><i className="bi bi-arrow-repeat text-primary"></i> 30-Day Returns</span>
              <span><i className="bi bi-truck text-dark"></i> Fast Dispatch</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
