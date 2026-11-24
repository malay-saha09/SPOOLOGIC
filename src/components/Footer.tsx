import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="sp-footer">
      <div className="container">
        <div className="row g-4">
          {/* Column 1: Brand Info */}
          <div className="col-lg-4">
            <h4>SPOOLOGIC <span>TURBO SYSTEMS</span></h4>
            <p>
              Dedicated to manufacturing high-performance, precision balanced OEM replacement turbochargers and heavy-duty diesel hardware for Ford Powerstroke, Chevrolet Duramax, and Dodge Cummins engines.
            </p>
            <div className="mt-3 text-light small">
              <div><i className="bi bi-geo-alt-fill text-danger me-2"></i> Salt Lake City, Utah, USA</div>
              <div className="mt-1"><i className="bi bi-telephone-fill text-danger me-2"></i> (800) 555-7766 · Mon–Fri 8am–5pm MST</div>
              <div className="mt-1"><i className="bi bi-envelope-fill text-danger me-2"></i> support@spoologic.com</div>
            </div>
          </div>

          {/* Column 2: Navigation & Diesel Platforms */}
          <div className="col-lg-4 col-sm-6">
            <h4>QUICK <span>LINKS</span></h4>
            <div className="row">
              <div className="col-6">
                <Link href="/">Ford 7.3L OBS Turbo</Link>
                <Link href="/">Ford 6.0L Powerstroke</Link>
                <Link href="/">Ford 6.4L Twin Turbos</Link>
                <Link href="/">Ford 6.7L Scorpions</Link>
                <Link href="/">Chevy 6.6L LB7 / LLY</Link>
              </div>
              <div className="col-6">
                <Link href="/">Chevy 6.6L LBZ / LMM</Link>
                <Link href="/">Dodge 5.9L 12V &amp; 24V</Link>
                <Link href="/">Dodge 6.7L Cummins</Link>
                <Link href="/">Turbo Pedestals</Link>
                <Link href="/">Bellowed Up-Pipes</Link>
              </div>
            </div>
          </div>

          {/* Column 3: Customer Service & Trust */}
          <div className="col-lg-4 col-sm-6">
            <h4>CUSTOMER <span>GUARANTEE</span></h4>
            <p>
              All SPOOLOGIC turbos are dynamically balanced to aerospace tolerances. We back our products with an industry leading 1-Year Unlimited Mileage Warranty and zero core charge returns.
            </p>
            <div className="d-flex gap-2 mt-3 fs-3 text-light">
              <i className="bi bi-credit-card-2-front"></i>
              <i className="bi bi-shield-lock-fill text-success"></i>
              <i className="bi bi-box-seam text-danger"></i>
              <i className="bi bi-patch-check-fill text-warning"></i>
            </div>
            <div className="mt-3">
              <Link href="/cart" className="text-danger fw-bold">View Shopping Cart &rarr;</Link>
              <Link href="/checkout" className="text-secondary small">Secure Checkout System</Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="sp-footer-bottom d-flex flex-wrap justify-content-between align-items-center">
          <div>
            &copy; {new Date().getFullYear()} SPOOLOGIC Turbo Systems. All rights reserved.
          </div>
          <div className="d-flex gap-3 mt-2 mt-sm-0">
            <span className="text-gray">Terms of Service</span>
            <span className="text-gray">Privacy Policy</span>
            <span className="text-gray">California Prop 65 Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
