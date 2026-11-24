'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { 
  CaliforniaScenario, 
  StockScenario, 
  ShippingTimeScenario, 
  BackorderEstimateScenario, 
  VehicleFitScenario, 
  PricingScenario, 
  PolicyScenario 
} from '@/types';

export default function ScenarioToolbar() {
  const { scenarios, updateScenario, openAckModal, showToast } = useCart();
  const [isOpenMobile, setIsOpenMobile] = React.useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Review link copied to clipboard!');
    }
  };

  return (
    <div>
      {/* Top Cart / Checkout navigation links */}
      <div className="cart-review-entry d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div>
          <Link href="/cart">Selected cart design A · Desktop &amp; mobile &rarr;</Link>
          <span className="mx-2 text-muted">|</span>
          <Link href="/checkout">NEW: Checkout design &rarr;</Link>
        </div>
        <button 
          type="button" 
          className="btn btn-sm btn-outline-dark d-md-none"
          onClick={() => setIsOpenMobile(prev => !prev)}
          aria-expanded={isOpenMobile}
        >
          <i className="bi bi-sliders2 me-1 text-danger"></i>
          {isOpenMobile ? 'Hide Scenario Controls' : 'Test Scenarios (6)'}
        </button>
      </div>

      {/* Visual Design Scenario Controls */}
      <div className={`viz-controls ${isOpenMobile ? 'd-block' : 'd-none d-md-block'}`}>
        <div className="row g-2 align-items-end">
          {/* California Shipping */}
          <div className="col-12 col-sm-6 col-md-3 col-xl-2">
            <label htmlFor="sp2-ca">California example</label>
            <select 
              id="sp2-ca" 
              className="form-select form-select-sm"
              value={scenarios.california}
              onChange={(e) => updateScenario('california', e.target.value as CaliforniaScenario)}
            >
              <option value="restricted">Cannot ship to California</option>
              <option value="allowed">Can ship to California</option>
            </select>
          </div>

          {/* Stock Scenario */}
          <div className="col-12 col-sm-6 col-md-3 col-xl-2">
            <label htmlFor="sp2-stock">Stock example</label>
            <select 
              id="sp2-stock" 
              className="form-select form-select-sm"
              value={scenarios.stock}
              onChange={(e) => updateScenario('stock', e.target.value as StockScenario)}
            >
              <option value="in">In stock</option>
              <option value="limited">Limited stock</option>
              <option value="backorder">On backorder</option>
              <option value="out">Out of stock</option>
            </select>
          </div>

          {/* Shipping Cutoff / Timing */}
          <div className="col-12 col-sm-6 col-md-3 col-xl-2">
            <label htmlFor="sp-shipping-time">Shipping time example · Pacific</label>
            <select 
              id="sp-shipping-time" 
              className="form-select form-select-sm"
              value={scenarios.shippingTime}
              onChange={(e) => updateScenario('shippingTime', e.target.value as ShippingTimeScenario)}
              disabled={scenarios.stock === 'out'}
            >
              <option value="before">Tuesday, 2 p.m. · before cutoff</option>
              <option value="after">Tuesday, 4 p.m. · after cutoff</option>
              <option value="friday">Friday, 4 p.m. · after cutoff</option>
              <option value="weekend">Saturday · weekend</option>
              <option value="holiday">Generic Monday · carrier holiday</option>
              <option value="longweekend">Weekend · Monday holiday closure</option>
              <option value="memorial">Memorial Day · May 25, 2026</option>
              <option value="labor">Labor Day · September 7, 2026</option>
              <option value="july">4th of July · July 4, 2026</option>
              <option value="christmas">Christmas · December 25, 2026</option>
              <option value="thanksgiving">Thanksgiving · November 26, 2026</option>
              <option value="newyear">New Year’s Day · January 1, 2027</option>
            </select>
          </div>

          {/* Backorder Estimate (Conditional) */}
          {scenarios.stock === 'backorder' && (
            <div className="col-12 col-sm-6 col-md-3 col-xl-2">
              <label htmlFor="sp-backorder-estimate">Backorder estimate example</label>
              <select 
                id="sp-backorder-estimate" 
                className="form-select form-select-sm"
                value={scenarios.backorderEstimate}
                onChange={(e) => updateScenario('backorderEstimate', e.target.value as BackorderEstimateScenario)}
              >
                <option value="dates">Date range · October 19–23</option>
                <option value="lead">Lead time · 1–2 weeks</option>
                <option value="unknown">Ship date pending confirmation</option>
              </select>
            </div>
          )}

          {/* Vehicle Match Simulation */}
          <div className="col-12 col-sm-6 col-md-3 col-xl-2">
            <label htmlFor="sp-vehicle-fit-state">Vehicle match · simulated</label>
            <select 
              id="sp-vehicle-fit-state" 
              className="form-select form-select-sm"
              value={scenarios.vehicleFit}
              onChange={(e) => updateScenario('vehicleFit', e.target.value as VehicleFitScenario)}
            >
              <option value="match">Fits selected vehicle</option>
              <option value="mismatch">Does not fit selected vehicle</option>
              <option value="none">No vehicle selected</option>
            </select>
          </div>

          {/* Pricing Simulation */}
          <div className="col-12 col-sm-6 col-md-3 col-xl-2">
            <label htmlFor="sp-pricing">Pricing example · simulated</label>
            <select 
              id="sp-pricing" 
              className="form-select form-select-sm"
              value={scenarios.pricing}
              onChange={(e) => updateScenario('pricing', e.target.value as PricingScenario)}
            >
              <option value="regular">Regular price ($899.95)</option>
              <option value="sale">Public sale price ($799.95)</option>
              <option value="dealer">Dealer price ($699.95)</option>
            </select>
          </div>

          {/* Return & Warranty Policy */}
          <div className="col-12 col-sm-6 col-md-3 col-xl-2">
            <label htmlFor="sp-main-policy">Return / warranty scenario</label>
            <select 
              id="sp-main-policy" 
              className="form-select form-select-sm"
              value={scenarios.policy}
              onChange={(e) => updateScenario('policy', e.target.value as PolicyScenario)}
            >
              <option value="actual">Use actual product policies</option>
              <option value="standard">Standard returns + warranty</option>
              <option value="no_returns">No returns · warranty applies</option>
              <option value="diy">DIY · no returns / no warranty</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="col-12 col-md-auto d-flex gap-2 pt-2">
            <button 
              type="button" 
              className="btn btn-sm btn-outline-danger fw-bold text-nowrap"
              onClick={openAckModal}
            >
              Show acknowledgment
            </button>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-danger fw-bold text-nowrap"
              onClick={handleCopyLink}
            >
              Copy review link
            </button>
          </div>
          
        </div>
        <div className='row col-md-auto pt-4'><p>Using this example product’s actual policies. No acknowledgment pop-up for this policy.</p></div>
      </div>

      <div className="sp-preview-banner">
        DESIGN PREVIEW · Select a scenario above to test interactive states. Holiday dates are examples for 2026–27; actual closures follow carrier pickup availability.
      </div>
    </div>
  );
}
