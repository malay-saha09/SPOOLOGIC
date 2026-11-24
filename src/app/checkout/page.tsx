'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { 
    cart, 
    cartSubtotal, 
    scenarios, 
    discountCode, 
    discountPercent, 
    applyDiscountCode, 
    clearCart,
    shippingOption,
    setShippingOption,
    shippingCost
  } = useCart();

  // Form State
  const [email, setEmail] = useState('diesel.enthusiast@example.com');
  const [phone, setPhone] = useState('(801) 555-0199');
  const [firstName, setFirstName] = useState('Tyler');
  const [lastName, setLastName] = useState('Rawlings');
  const [address, setAddress] = useState('4820 Powerstroke Way');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('Salt Lake City');
  const [state, setState] = useState('UT');
  const [zipCode, setZipCode] = useState('84101');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [cardName, setCardName] = useState('Tyler Rawlings');
  const [promoCodeInput, setPromoCodeInput] = useState('');

  // Order placement state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const discountAmount = cartSubtotal * discountPercent;
  const taxableSubtotal = Math.max(0, cartSubtotal - discountAmount);
  const taxRate = state === 'CA' ? 0.0825 : state === 'UT' ? 0.0715 : 0.065;
  const estimatedTax = taxableSubtotal * taxRate;
  const totalAmount = taxableSubtotal + estimatedTax + shippingCost;

  const isCaliforniaRestricted = state === 'CA' && scenarios.california === 'restricted';

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput) return;
    applyDiscountCode(promoCodeInput);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCaliforniaRestricted) {
      alert('Cannot place order: Selected products cannot be shipped to California addresses due to current emissions regulations.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `SP-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  // Order Confirmed View
  if (orderComplete) {
    return (
      <div className="sp-product-container my-5">
        <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 text-center max-w-2xl mx-auto">
          <div className="mb-4">
            <span className="badge bg-success-subtle text-success p-3 rounded-circle fs-1">
              <i className="bi bi-check-circle-fill"></i>
            </span>
          </div>

          <h2 className="fw-bold text-dark mb-2">Order Confirmed!</h2>
          <p className="text-secondary fs-6 mb-4">
            Thank you for choosing SPOOLOGIC. Your order number is <strong className="text-dark">{orderId}</strong>.
            A confirmation receipt and live tracking information have been sent to <strong>{email}</strong>.
          </p>

          <div className="card bg-light border p-4 text-start mb-4 rounded-3">
            <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">Delivery Summary</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="text-muted small">Shipping To:</div>
                <strong className="text-dark">{firstName} {lastName}</strong>
                <div className="small text-secondary">{address} {suite}</div>
                <div className="small text-secondary">{city}, {state} {zipCode}</div>
                <div className="small text-secondary">{phone}</div>
              </div>
              <div className="col-md-6">
                <div className="text-muted small">Shipping Method:</div>
                <strong className="text-dark">
                  {shippingOption === 'overnight' ? 'Overnight Priority' :
                   shippingOption === 'expedited' ? 'FedEx 2-Day Air' : 'Standard Ground (Free)'}
                </strong>
                <div className="small text-success mt-1">
                  <i className="bi bi-truck me-1"></i> Tracking number will be emailed upon carrier scan.
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <Link href="/" className="btn btn-danger fw-bold px-4 py-2 text-uppercase">
              Back to Product Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty on fresh reload
  if (cart.length === 0) {
    return (
      <div className="sp-product-container my-5 text-center">
        <div className="card p-5 border-0 bg-light rounded-4">
          <i className="bi bi-cart-x fs-1 text-danger mb-3"></i>
          <h3 className="fw-bold">No Items in Checkout</h3>
          <p className="text-muted">Your cart is currently empty. Please add items before checking out.</p>
          <div>
            <Link href="/" className="btn btn-danger fw-bold text-uppercase px-4 py-2 mt-2">
              Explore SPOOLOGIC Turbos &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sp-product-container my-4">
      {/* Breadcrumb */}
      <div className="sp-breadcrumb">
        <Link href="/">HOME</Link>
        <span className="mx-2">&rsaquo;</span>
        <Link href="/cart">SHOPPING CART</Link>
        <span className="mx-2">&rsaquo;</span>
        <b>CHECKOUT</b>
      </div>

      <div className="row g-4 align-items-start">
        {/* Left Column: Checkout Form (7 cols) */}
        <div className="col-lg-7">
          <form onSubmit={handlePlaceOrder}>
            {/* Express Checkout Options */}
            <div className="card border rounded-3 p-4 bg-white shadow-sm mb-4 text-center">
              <span className="text-muted small fw-bold text-uppercase mb-3 d-block">
                Express Checkout
              </span>
              <div className="row g-2">
                <div className="col-4">
                  <button type="button" className="btn btn-warning w-100 fw-bold py-2">
                    <i className="bi bi-paypal me-1"></i> PayPal
                  </button>
                </div>
                <div className="col-4">
                  <button type="button" className="btn btn-dark w-100 fw-bold py-2">
                    <i className="bi bi-apple me-1"></i> Apple Pay
                  </button>
                </div>
                <div className="col-4">
                  <button type="button" className="btn btn-primary w-100 fw-bold py-2">
                    Shop Pay
                  </button>
                </div>
              </div>
              <div className="text-center my-3 position-relative">
                <hr />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small fw-semibold">
                  OR USE STANDARD CHECKOUT
                </span>
              </div>
            </div>

            {/* Step 1: Customer Contact Information */}
            <div className="card border rounded-3 p-4 bg-white shadow-sm mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <span className="badge bg-danger rounded-circle">1</span>
                Contact Information
              </h5>
              <div className="row g-3">
                <div className="col-md-7">
                  <label className="form-label small fw-bold">Email Address (for order tracking)</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label small fw-bold">Mobile Phone (delivery updates)</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="card border rounded-3 p-4 bg-white shadow-sm mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <span className="badge bg-danger rounded-circle">2</span>
                Shipping Address
              </h5>

              {/* California Restriction Alert */}
              {isCaliforniaRestricted && (
                <div className="alert alert-danger d-flex align-items-start gap-2 mb-3">
                  <i className="bi bi-exclamation-triangle-fill fs-5 mt-1"></i>
                  <div>
                    <strong>Emissions Compliance Alert:</strong>
                    <div>Under California emissions regulations, SPOOLOGIC Stock Turbocharger (SL-100-001) cannot be legally delivered or operated on public highways in California in this scenario. Please select an alternate state or change the review simulation toolbar at top.</div>
                  </div>
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">First Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Last Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">Street Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="123 Street Address"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Apt / Suite / Unit (Optional)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={suite}
                    onChange={e => setSuite(e.target.value)}
                    placeholder="Suite 100"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">City</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-bold">State</label>
                  <select 
                    className="form-select"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    required
                  >
                    <option value="UT">UT</option>
                    <option value="CA">CA</option>
                    <option value="TX">TX</option>
                    <option value="FL">FL</option>
                    <option value="AZ">AZ</option>
                    <option value="CO">CO</option>
                    <option value="ID">ID</option>
                    <option value="NV">NV</option>
                    <option value="WA">WA</option>
                    <option value="OR">OR</option>
                    <option value="WY">WY</option>
                    <option value="MT">MT</option>
                    <option value="OH">OH</option>
                    <option value="PA">PA</option>
                    <option value="NY">NY</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-bold">ZIP</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    maxLength={5}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div className="card border rounded-3 p-4 bg-white shadow-sm mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <span className="badge bg-danger rounded-circle">3</span>
                Shipping Method
              </h5>
              <div className="d-flex flex-column gap-2">
                <label className={`card p-3 border rounded-3 cursor-pointer ${shippingOption === 'free' ? 'border-danger bg-danger-subtle' : ''}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <input 
                        type="radio" 
                        name="shipMethod" 
                        checked={shippingOption === 'free'}
                        onChange={() => setShippingOption('free')}
                      />
                      <div>
                        <strong>Standard Insured Ground (3–5 Business Days)</strong>
                        <div className="small text-secondary">Free site-wide promotion automatically applied.</div>
                      </div>
                    </div>
                    <span className="text-success fw-bold">FREE</span>
                  </div>
                </label>

                <label className={`card p-3 border rounded-3 cursor-pointer ${shippingOption === 'expedited' ? 'border-danger bg-danger-subtle' : ''}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <input 
                        type="radio" 
                        name="shipMethod" 
                        checked={shippingOption === 'expedited'}
                        onChange={() => setShippingOption('expedited')}
                      />
                      <div>
                        <strong>FedEx 2-Day Air</strong>
                        <div className="small text-secondary">Expedited air express directly from central warehouse.</div>
                      </div>
                    </div>
                    <span className="fw-bold">$34.95</span>
                  </div>
                </label>

                <label className={`card p-3 border rounded-3 cursor-pointer ${shippingOption === 'overnight' ? 'border-danger bg-danger-subtle' : ''}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <input 
                        type="radio" 
                        name="shipMethod" 
                        checked={shippingOption === 'overnight'}
                        onChange={() => setShippingOption('overnight')}
                      />
                      <div>
                        <strong>Overnight Priority Next-Day Dispatch</strong>
                        <div className="small text-secondary">Guaranteed morning priority delivery.</div>
                      </div>
                    </div>
                    <span className="fw-bold">$79.95</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Details */}
            <div className="card border rounded-3 p-4 bg-white shadow-sm mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <span className="badge bg-danger rounded-circle">4</span>
                Payment Method
              </h5>

              <div className="btn-group w-100 mb-3" role="group">
                <button
                  type="button"
                  className={`btn ${paymentMethod === 'card' ? 'btn-danger' : 'btn-outline-secondary'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <i className="bi bi-credit-card me-2"></i> Credit / Debit Card
                </button>
                <button
                  type="button"
                  className={`btn ${paymentMethod === 'paypal' ? 'btn-danger' : 'btn-outline-secondary'}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <i className="bi bi-paypal me-2"></i> PayPal
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-bold">Cardholder Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-bold">Card Number</label>
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        required
                      />
                      <span className="input-group-text bg-white">
                        <i className="bi bi-shield-lock-fill text-success"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Expiration Date</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={cardExp}
                      onChange={e => setCardExp(e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold">Security CVV</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-light rounded text-center">
                  <p className="text-secondary small mb-2">You will be redirected to PayPal to complete your payment securely.</p>
                  <button type="button" className="btn btn-warning fw-bold px-4">
                    Continue with PayPal
                  </button>
                </div>
              )}
            </div>

            {/* Step 5: Place Order Button */}
            <div className="d-grid mb-5">
              <button 
                type="submit" 
                className="btn btn-danger btn-lg py-3 fw-bold text-uppercase fs-5 shadow"
                disabled={isSubmitting || isCaliforniaRestricted}
              >
                {isSubmitting ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Processing Order...
                  </span>
                ) : (
                  <span>
                    Place Order · ${totalAmount.toFixed(2)} <i className="bi bi-lock-fill ms-2"></i>
                  </span>
                )}
              </button>
              <div className="text-center text-muted small mt-2">
                By placing this order, you agree to SPOOLOGIC's standard 1-Year warranty and 30-day return policy.
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="col-lg-5">
          <div className="card border rounded-3 p-4 bg-white shadow-sm position-sticky" style={{ top: '20px' }}>
            <h4 className="fs-5 fw-bold text-dark mb-3">Order Summary ({cart.length})</h4>

            {/* Cart Items List */}
            <div className="d-flex flex-column gap-3 mb-3 border-bottom pb-3">
              {cart.map((item) => (
                <div key={item.id} className="d-flex gap-3 align-items-center">
                  <div className="position-relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="rounded border" 
                      style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                    />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-0 text-dark small" style={{ lineHeight: 1.25 }}>
                      {item.title}
                    </h6>
                    <div className="text-muted" style={{ fontSize: '11px' }}>
                      SKU: {item.sku}
                    </div>
                    {item.isBackorder && (
                      <span className="badge bg-warning text-dark mt-1" style={{ fontSize: '10px' }}>
                        Backorder ({item.backorderEstimate || '2-3 weeks'})
                      </span>
                    )}
                  </div>
                  <div className="text-end fw-bold text-dark small">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="mb-3">
              <div className="input-group input-group-sm">
                <input 
                  type="text" 
                  className="form-control text-uppercase" 
                  placeholder="Promo Code (e.g. SPOOL10)"
                  value={promoCodeInput}
                  onChange={e => setPromoCodeInput(e.target.value)}
                />
                <button type="submit" className="btn btn-outline-dark fw-bold">
                  Apply
                </button>
              </div>
            </form>

            {/* Financial Breakdown */}
            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-secondary">Subtotal</span>
              <span className="fw-semibold text-dark">${cartSubtotal.toFixed(2)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="d-flex justify-content-between mb-2 small text-success fw-bold">
                <span>Discount ({discountCode})</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-secondary">Shipping ({shippingOption === 'free' ? 'Ground' : shippingOption === 'expedited' ? '2-Day' : 'Overnight'})</span>
              <span className={shippingCost === 0 ? 'text-success fw-bold' : 'fw-semibold text-dark'}>
                {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-3 small">
              <span className="text-secondary">Estimated Tax ({state})</span>
              <span className="fw-semibold text-dark">${estimatedTax.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between align-items-baseline pt-3 border-top mb-4">
              <span className="fs-5 fw-bold text-dark">Total Due</span>
              <span className="fs-3 fw-bold text-danger">${totalAmount.toFixed(2)}</span>
            </div>

            {/* Trust and Security Details */}
            <div className="p-3 bg-light rounded-3 text-secondary small">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-shield-check text-success fs-5"></i>
                <span className="fw-bold text-dark">Encrypted Checkout Protection</span>
              </div>
              <p className="mb-0 text-muted" style={{ fontSize: '11px', lineHeight: 1.4 }}>
                Your payment is encrypted using Level 1 PCI-DSS compliant protocols. We never store complete credit card numbers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
