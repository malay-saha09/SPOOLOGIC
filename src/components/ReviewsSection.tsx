'use client';

import React, { useState } from 'react';
import { reviewsData } from '@/data/productData';
import { useCart } from '@/context/CartContext';

export default function ReviewsSection() {
  const { showToast } = useCart();
  const [reviews, setReviews] = useState(reviewsData);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newVehicle, setNewVehicle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleHelpful = (id: string) => {
    if (helpfulClicked[id]) {
      showToast('You already voted on this review.');
      return;
    }

    setReviews(prev => prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
    setHelpfulClicked(prev => ({ ...prev, [id]: true }));
    showToast('Thank you for your feedback!');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newContent) {
      showToast('Please complete all review fields.');
      return;
    }

    const createdReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      title: newTitle,
      vehicle: newVehicle || 'Ford 7.3L Powerstroke',
      content: newContent,
      helpfulCount: 0,
      verified: true
    };

    setReviews([createdReview, ...reviews]);
    setIsWriteModalOpen(false);
    showToast('Your review has been submitted. Thank you!');
    setNewAuthor('');
    setNewTitle('');
    setNewContent('');
    setNewVehicle('');
  };

  return (
    <section id="sp-reviews" className="sp-reviews-section">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="fs-3 fw-bold mb-1">Customer Reviews</h2>
          <div className="d-flex align-items-center gap-2">
            <div className="sp-stars-gold">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
            <strong className="fs-5">4.8 out of 5</strong>
            <span className="text-muted">({reviews.length} total customer ratings)</span>
          </div>
        </div>

        <button 
          type="button" 
          className="btn btn-danger fw-bold px-4 py-2"
          onClick={() => setIsWriteModalOpen(true)}
        >
          <i className="bi bi-pencil-square me-2"></i>
          Write a Review
        </button>
      </div>

      {/* Review Cards Grid */}
      <div className="row g-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="col-md-6 col-lg-4">
            <div className="sp-review-card">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div className="sp-stars-gold fs-6 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i 
                        key={i} 
                        className={`bi ${i < rev.rating ? 'bi-star-fill' : 'bi-star'} me-1`}
                      ></i>
                    ))}
                  </div>
                  <strong className="d-block text-dark">{rev.author}</strong>
                  {rev.verified && (
                    <span className="badge bg-success-subtle text-success small">
                      <i className="bi bi-patch-check-fill me-1"></i> Verified Purchaser
                    </span>
                  )}
                </div>
                <time className="small text-muted">{rev.date}</time>
              </div>

              <div className="sp-review-vehicle">{rev.vehicle}</div>
              <h4 className="sp-review-title">{rev.title}</h4>
              <p className="sp-review-content">{rev.content}</p>

              <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center text-muted small">
                <span>Was this helpful?</span>
                <button
                  type="button"
                  className={`btn btn-sm ${helpfulClicked[rev.id] ? 'btn-success' : 'btn-outline-secondary'}`}
                  onClick={() => handleHelpful(rev.id)}
                >
                  <i className="bi bi-hand-thumbs-up me-1"></i>
                  Yes ({rev.helpfulCount})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <>
          <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow-lg border-0 rounded-3">
                <form onSubmit={handleAddReview}>
                  <div className="modal-header border-bottom">
                    <h5 className="modal-title fw-bold">Write a Product Review</h5>
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setIsWriteModalOpen(false)}
                    ></button>
                  </div>
                  <div className="modal-body p-4">
                    <div className="mb-3">
                      <label className="form-label fw-bold small">Rating</label>
                      <div className="d-flex gap-2 fs-4 text-warning">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i 
                            key={star}
                            role="button"
                            className={`bi ${star <= newRating ? 'bi-star-fill' : 'bi-star'} cursor-pointer`}
                            onClick={() => setNewRating(star)}
                          ></i>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold small">Your Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={newAuthor} 
                        onChange={e => setNewAuthor(e.target.value)}
                        placeholder="e.g. Austin K."
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold small">Your Truck Model &amp; Year</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={newVehicle} 
                        onChange={e => setNewVehicle(e.target.value)}
                        placeholder="e.g. 1996 Ford F-250 7.3L"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold small">Review Headline</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={newTitle} 
                        onChange={e => setNewTitle(e.target.value)}
                        placeholder="e.g. Fantastic boost response, easy install"
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold small">Detailed Experience</label>
                      <textarea 
                        className="form-control" 
                        rows={4} 
                        value={newContent} 
                        onChange={e => setNewContent(e.target.value)}
                        placeholder="How did the turbo perform? How was installation and fitment?"
                        required 
                      />
                    </div>
                  </div>
                  <div className="modal-footer bg-light border-top">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary" 
                      onClick={() => setIsWriteModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-danger fw-bold">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </section>
  );
}
