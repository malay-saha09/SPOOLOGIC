'use client';

import React from 'react';
import { recommendationsData } from '@/data/productData';
import { useCart } from '@/context/CartContext';

export default function Recommendations() {
  const { addToCart, showToast } = useCart();

  const handleAdd = (item: typeof recommendationsData[0]) => {
    addToCart({
      sku: item.sku,
      title: item.title,
      price: item.price,
      quantity: 1,
      image: item.image,
      fitmentSummary: '1994-1997 Ford 7.3L Powerstroke',
      shipsToCalifornia: true,
      warranty: '1-Year Limited Warranty'
    });
    showToast(`Added ${item.title} to your cart.`);
  };

  return (
    <section className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fs-4 fw-bold mb-1 text-dark">Frequently Bought Together</h3>
          <p className="text-secondary small mb-0">Recommended parts commonly installed during a turbo replacement</p>
        </div>
      </div>

      <div className="row g-2 g-md-4">
        {recommendationsData.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-xl-3">
            <div className="sp-recommendation-card">
              <img 
                src={item.image} 
                alt={item.title} 
                className="sp-rec-img"
              />
              <div className="text-muted small mb-1 fw-bold">SKU: {item.sku}</div>
              <h5 className="sp-rec-title">{item.title}</h5>
              <p className="sp-rec-reason">{item.reason}</p>
              <div className="sp-rec-price">${item.price.toFixed(2)}</div>
              <button 
                type="button" 
                className="sp-rec-add-btn mt-auto"
                onClick={() => handleAdd(item)}
              >
                <i className="bi bi-cart-plus me-1"></i> Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
