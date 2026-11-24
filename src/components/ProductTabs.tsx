'use client';

import React, { useState } from 'react';
import { productData } from '@/data/productData';

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'fitment' | 'warranty'>('description');

  return (
    <div className="sp-tabs-container">
      {/* Tab Navigation */}
      <div className="sp-tabs-nav" role="tablist">
        <div className="scroll_res">
        <button
          type="button"
          className={`sp-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
          role="tab"
          aria-selected={activeTab === 'description'}
        >
          Description
        </button>
        <button
          type="button"
          className={`sp-tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('specifications')}
          role="tab"
          aria-selected={activeTab === 'specifications'}
        >
          Specifications
        </button>
        <button
          type="button"
          className={`sp-tab-btn ${activeTab === 'fitment' ? 'active' : ''}`}
          onClick={() => setActiveTab('fitment')}
          role="tab"
          aria-selected={activeTab === 'fitment'}
        >
          Vehicle Fitment
        </button>
        <button
          type="button"
          className={`sp-tab-btn ${activeTab === 'warranty' ? 'active' : ''}`}
          onClick={() => setActiveTab('warranty')}
          role="tab"
          aria-selected={activeTab === 'warranty'}
        >
          Warranty &amp; Returns
        </button>
        </div>
      </div>

      {/* Tab Content Panes */}
      <div className="sp-tab-pane">
        {activeTab === 'description' && (
          <div dangerouslySetInnerHTML={{ __html: productData.description }} />
        )}

        {activeTab === 'specifications' && (
          <div>
            <h3>Technical Specifications</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped mt-3">
                <tbody>
                  {productData.specifications.map((spec, i) => (
                    <tr key={i}>
                      <th className="w-50 bg-light text-secondary">{spec.name}</th>
                      <td className="w-50 fw-semibold text-dark">{spec.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <th className="bg-light text-secondary">OE Interchange Numbers</th>
                    <td className="small text-muted">{productData.interchangePartNumbers.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'fitment' && (
          <div>
            <h3>Application Guide &amp; Vehicle Compatibility</h3>
            <p className="text-secondary">
              Direct drop-in replacement for the following Ford Powerstroke turbo diesel models:
            </p>
            <div className="row g-3">
              {productData.fitmentList.map((fit, idx) => (
                <div key={idx} className="col-md-6">
                  <div className="p-3 bg-light border rounded-3 d-flex align-items-center gap-2">
                    <i className="bi bi-check2-circle text-danger fs-5"></i>
                    <span className="fw-semibold text-dark">{fit}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="alert alert-info mt-4 mb-0">
              <i className="bi bi-info-circle-fill me-2"></i>
              <strong>Notice:</strong> Will not fit 1999–2003 "Super Duty" late 7.3L engines equipped with Garrett GTP38 (split-shot injector setup). Please verify your build date prior to purchase.
            </div>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div>
            <h3>SPOOLOGIC® Standard Warranty &amp; Return Terms</h3>
            <div className="row g-4 mt-1">
              <div className="col-md-6">
                <div className="card h-100 border-0 bg-light p-4 rounded-3">
                  <h5 className="fw-bold text-dark">
                    <i className="bi bi-shield-fill-check text-success me-2"></i>
                    1-Year Unlimited Mileage Warranty
                  </h5>
                  <p className="text-secondary small mt-2">
                    Every SPOOLOGIC stock replacement turbocharger is backed by our comprehensive 1-Year Limited Manufacturer Warranty covering any material defects or mechanical failure under standard vehicle operation.
                  </p>
                  <ul className="small text-secondary ps-3">
                    <li>Full replacement coverage for shaft and bearing integrity</li>
                    <li>Pre-tested dynamic balance verification certificate included</li>
                    <li>Fast claim resolution handled by our US-based diesel support team</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 border-0 bg-light p-4 rounded-3">
                  <h5 className="fw-bold text-dark">
                    <i className="bi bi-arrow-counterclockwise text-primary me-2"></i>
                    30-Day Hassle-Free Returns
                  </h5>
                  <p className="text-secondary small mt-2">
                    We want you to be 100% satisfied with your build. Uninstalled parts in original factory packaging can be returned within 30 days of delivery date with no restocking fees.
                  </p>
                  <ul className="small text-secondary ps-3">
                    <li>Zero core return required — keep or sell your original unit</li>
                    <li>Pre-paid return labels available upon RMA request</li>
                    <li>Quick inspection and instant refund to original payment method</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
