'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { productData } from '@/data/productData';

export default function PurchaseAckModal() {
  const { 
    isAckModalOpen, 
    closeAckModal, 
    confirmAddToCart, 
    scenarios, 
    pendingCartItem,
    isProp65Open,
    closeProp65
  } = useCart();

  const [acknowledgedTerms, setAcknowledgedTerms] = useState(false);

  if (!isAckModalOpen && !isProp65Open) return null;

  return (
    <>
      {/* Pre-purchase Acknowledgment Modal */}
      {isAckModalOpen && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-3">
              <div className="modal-header border-bottom pb-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="p-2 bg-warning-subtle text-warning rounded-circle">
                    <i className="bi bi-exclamation-triangle-fill fs-4"></i>
                  </div>
                  <h4 className="modal-title fw-bold fs-5 mb-0" id="sp-ack-title">
                    Before you add this item
                  </h4>
                </div>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeAckModal}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body p-4">
                <h6 className="fw-bold text-danger mb-1">
                  {pendingCartItem ? pendingCartItem.title : productData.name} ({productData.sku})
                </h6>
                <p className="text-secondary small mb-3">
                  Please review and accept the following important product terms and order policies before continuing:
                </p>

                {/* Backorder notice if scenario is backorder */}
                {scenarios.stock === 'backorder' && (
                  <div className="p-3 bg-amber-subtle border border-warning rounded-3 mb-3 text-dark">
                    <div className="fw-bold text-dark mb-1">
                      <i className="bi bi-clock-history me-1"></i>
                      {scenarios.backorderCustomText || 'Estimated to ship in 2–3 weeks.'}
                    </div>
                    <p className="small mb-2 text-secondary">
                      Estimated shipping schedules are subject to factory production schedules and component availability.
                    </p>
                    <p className="small mb-0 text-danger fw-bold">
                      Note: If a placed backorder is canceled prior to shipping, a 5% administrative transaction processing fee will be deducted from your refund.
                    </p>
                  </div>
                )}

                {/* Policy specifics */}
                <div className="list-group list-group-flush border rounded-3 mb-3">
                  <div className="list-group-item d-flex gap-2 align-items-start py-3">
                    <i className="bi bi-shield-check text-success fs-5"></i>
                    <div>
                      <div className="fw-bold small">
                        {scenarios.policy === 'diy' ? 'DIY Policy: No Returns / No Warranty' :
                         scenarios.policy === 'no_returns' ? 'Special Order: Warranty Applies, No Returns' :
                         'Standard 1-Year Manufacturer Warranty'}
                      </div>
                      <div className="small text-secondary">
                        {scenarios.policy === 'diy' 
                          ? 'Sold as-is for custom/DIY builds. Professional installation recommended.' 
                          : 'Covers manufacturer defects and structural failure under normal operating conditions.'}
                      </div>
                    </div>
                  </div>

                  <div className="list-group-item d-flex gap-2 align-items-start py-3">
                    <i className="bi bi-arrow-repeat text-primary fs-5"></i>
                    <div>
                      <div className="fw-bold small">
                        {scenarios.policy === 'no_returns' || scenarios.policy === 'diy' ? 'Final Sale Item' : '30-Day Hassle-Free Returns'}
                      </div>
                      <div className="small text-secondary">
                        {scenarios.policy === 'no_returns' || scenarios.policy === 'diy'
                          ? 'This item cannot be returned once packaging seal is broken.'
                          : 'Uninstalled items in original packaging can be returned within 30 days.'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agree checkbox */}
                <div className="form-check p-3 bg-light rounded border">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="ackCheck" 
                    checked={acknowledgedTerms}
                    onChange={(e) => setAcknowledgedTerms(e.target.checked)}
                  />
                  <label className="form-check-label small fw-semibold" htmlFor="ackCheck">
                    I have read, understand, and agree to the fitment, warranty, and return policies for this SPOOLOGIC product.
                  </label>
                </div>
              </div>

              <div className="modal-footer bg-light border-top">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={closeAckModal}
                >
                  Keep Shopping
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger fw-bold text-uppercase px-4" 
                  disabled={!acknowledgedTerms}
                  onClick={() => {
                    confirmAddToCart();
                    setAcknowledgedTerms(false);
                  }}
                >
                  Agree &amp; Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prop 65 California Warning Modal */}
      {isProp65Open && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-3">
              <div className="modal-header border-bottom pb-3">
                <div className="d-flex align-items-center">
                  <img src="/images/prop65-icon.svg" alt="Prop 65 Warning" width="28" height="28" className="me-2" />
                  <h5 className="modal-title fw-bold text-danger mb-0">
                    California Proposition 65
                  </h5>
                </div>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeProp65}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <p className="fs-6 fw-bold mb-2 text-danger">
                  WARNING: Cancer and Reproductive Harm
                </p>
                <p className="text-secondary small mb-3">
                  This product contains chemicals known to the State of California to cause cancer, birth defects, or other reproductive harm. 
                  Heavy duty diesel engine components and cast iron turbocharger housings may contain trace levels of nickel, chromium, and lead compounds.
                </p>
                <p className="small mb-0">
                  For more detailed chemical disclosure and testing information, please visit{' '}
                  <a href="https://www.p65warnings.ca.gov/" target="_blank" rel="noopener noreferrer" className="text-danger fw-bold">
                    www.P65Warnings.ca.gov
                  </a>.
                </p>
              </div>
              <div className="modal-footer bg-light border-top">
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  onClick={closeProp65}
                >
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="modal-backdrop fade show"></div>
    </>
  );
}
