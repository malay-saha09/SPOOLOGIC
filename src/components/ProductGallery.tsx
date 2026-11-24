'use client';

import React, { useState } from 'react';
import { productData } from '@/data/productData';

export default function ProductGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="sp-gallery-wrapper">
      {/* Main Image */}
      <div className="sp-main-photo-wrap position-relative">
        <img 
          src={productData.images[activeImageIndex]} 
          alt={`${productData.name} - View ${activeImageIndex + 1}`}
          className="img-fluid sp-main-photo"
        />
        <div className="position-absolute bottom-0 start-0 m-3 badge bg-dark bg-opacity-75 text-white fw-normal px-2 py-1 small">
          <i className="bi bi-camera me-1"></i> View {activeImageIndex + 1} of {productData.images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="sp-thumbs-row">
        {productData.images.map((imgUrl, idx) => (
          <button
            key={idx}
            type="button"
            className={`sp-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
            onClick={() => setActiveImageIndex(idx)}
            aria-label={`Select product image view ${idx + 1}`}
            aria-pressed={activeImageIndex === idx}
          >
            <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
          </button>
        ))}
      </div>

      {/* Customer Help Box */}
      <div className="sp-help-box">
        <div className="text-danger fs-3">
          <i className="bi bi-telephone-fill"></i>
        </div>
        <div>
          <strong className="text-uppercase text-secondary">Questions about fitment?</strong>
          <a href="tel:8005557766" className="text-danger text-decoration-none fw-bold fs-5 d-block">
            (800) 555-7766
          </a>
        </div>
      </div>
    </div>
  );
}
