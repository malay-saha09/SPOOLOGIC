'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { vehiclesDatabase } from '@/data/vehiclesData';
import { Vehicle } from '@/types';

export default function VehicleSelectModal() {
  const { isVehicleModalOpen, closeVehicleModal, setSelectedVehicle, selectedVehicle } = useCart();
  const [selectedId, setSelectedId] = useState<string>(selectedVehicle?.id || '');

  if (!isVehicleModalOpen) return null;

  const handleSelect = (v: Vehicle) => {
    setSelectedId(v.id);
    setSelectedVehicle(v);
    closeVehicleModal();
  };

  const handleClear = () => {
    setSelectedId('');
    setSelectedVehicle(null);
    closeVehicleModal();
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0 rounded-3">
            <div className="modal-header border-bottom pb-3">
              <h5 className="modal-title fw-bold">
                <i className="bi bi-truck text-danger me-2"></i>
                Select Your Vehicle
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={closeVehicleModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <p className="text-muted small mb-3">
                Select your truck or van from our database to check exact fitment for this turbocharger and accessories.
              </p>

              <div className="list-group">
                {vehiclesDatabase.map((v) => {
                  const isMatching = ['1994', '1995', '1996', '1997'].includes(v.year) && v.make === 'Ford' && v.engine.includes('7.3L');
                  const isCurrent = selectedId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`list-group-item list-group-item-action p-3 d-flex justify-content-between align-items-center ${isCurrent ? 'active' : ''}`}
                      onClick={() => handleSelect(v)}
                    >
                      <div>
                        <div className="fw-bold fs-6">
                          {v.year} {v.make} {v.model}
                        </div>
                        <div className={`small ${isCurrent ? 'text-light' : 'text-secondary'}`}>
                          {v.engine}
                        </div>
                      </div>
                      <span className={`badge ${isMatching ? 'bg-success' : 'bg-secondary'}`}>
                        {isMatching ? 'Guaranteed Fit' : 'May Not Fit'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer bg-light border-top d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm" 
                onClick={handleClear}
              >
                Clear Selected Vehicle
              </button>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm" 
                onClick={closeVehicleModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
