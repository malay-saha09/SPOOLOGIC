export type StockScenario = 'in' | 'limited' | 'backorder' | 'out';
export type CaliforniaScenario = 'allowed' | 'restricted';
export type ShippingTimeScenario = 
  | 'before' 
  | 'after' 
  | 'friday' 
  | 'weekend' 
  | 'holiday' 
  | 'longweekend' 
  | 'memorial' 
  | 'labor' 
  | 'july' 
  | 'christmas' 
  | 'thanksgiving' 
  | 'newyear';

export type BackorderEstimateScenario = 'dates' | 'lead' | 'unknown';
export type VehicleFitScenario = 'match' | 'mismatch' | 'none';
export type PricingScenario = 'regular' | 'sale' | 'dealer';
export type PolicyScenario = 'actual' | 'standard' | 'no_returns' | 'diy';

export interface Vehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  engine: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  vehicle: string;
  content: string;
  helpfulCount: number;
  verified: boolean;
}

export interface Recommendation {
  id: number;
  sku: string;
  title: string;
  reason: string;
  price: number;
  image: string;
  url: string;
}

export interface CartItem {
  id: string;
  sku: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  fitmentSummary: string;
  isBackorder?: boolean;
  backorderEstimate?: string;
  shipsToCalifornia: boolean;
  warranty: string;
}

export interface ScenarioState {
  stock: StockScenario;
  california: CaliforniaScenario;
  shippingTime: ShippingTimeScenario;
  backorderEstimate: BackorderEstimateScenario;
  backorderCustomText: string;
  vehicleFit: VehicleFitScenario;
  pricing: PricingScenario;
  policy: PolicyScenario;
}
