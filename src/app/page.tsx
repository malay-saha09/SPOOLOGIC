import React from 'react';
import Link from 'next/link';
import ProductGallery from '@/components/ProductGallery';
import ProductInfo from '@/components/ProductInfo';
import ProductTabs from '@/components/ProductTabs';
import ReviewsSection from '@/components/ReviewsSection';
// import Recommendations from '@/components/Recommendations';

export default function ProductPage() {
  return (
    <div className="sp-page-wrapper">
      <div className="sp-product-container">
        {/* Breadcrumb Navigation */}
        <div className="sp-breadcrumb">
          <Link href="/">HOME</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/shop/spoologic">SPOOLOGIC</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/shop/turbochargers">TURBOCHARGERS</Link>
          <span className="mx-2">&rsaquo;</span>
          <b>SPOOLOGIC STOCK TURBOCHARGER</b>
        </div>

        {/* Top Product Showcase: Gallery + Product Info */}
        <div className="row g-4 g-lg-5 align-items-start mb-4 mb-lg-5">
          {/* Left Column: Gallery */}
          <div className="col-lg-6">
            <ProductGallery />
          </div>

          {/* Right Column: Purchasing Info & Scenarios */}
          <div className="col-lg-6">
            <ProductInfo />
          </div>
        </div>

        {/* Detailed Tabs: Specs, Description, Fitment, Warranty */}
        <ProductTabs />

        {/* Frequently Bought Together Recommendations */}
        {/* <Recommendations /> */}

        {/* Verified Customer Reviews */}
        <ReviewsSection />
      </div>
    </div>
  );
}
