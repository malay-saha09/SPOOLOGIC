# SPOOLOGIC · Interactive Product Page, Cart & Checkout Design Flow

An interactive, responsive e-commerce web application recreating the **SPOOLOGIC Turbo Systems** product design review reference ([reference site](https://spoologic-product-design-review.spoologic-7013.chatgpt.site/)).

Built with **Next.js 14**, **Bootstrap 5**, **Bootstrap Icons**, and **TypeScript**.

---

## 🚀 Key Features & Interactive Architecture

### 1. Interactive Review Toolbar & Scenarios
- **California Shipping Simulator**: Toggle between *Can ship to California* (with emissions compliance badge) and *Cannot ship to California* (prohibition badge & Prop 65 warning modal).
- **Stock Status Engine**: Real-time reactive updates between:
  - **In Stock** (Green badge + same-day cutoff shipping countdown)
  - **Limited Stock** (Alert badge + "ONLY 2 LEFT IN STOCK - Order soon!" banner)
  - **On Backorder** (Amber badge + configurable estimated lead times / dates + pre-purchase agreement)
  - **Out of Stock** (Disabled stepper and button)
- **Cutoff & Holiday Calendar Simulator**:
  - Cutoff countdown (*Ships today — Order within 1h 42m*)
  - Carrier holidays (*Memorial Day, Labor Day, 4th of July, Christmas, Thanksgiving, New Year's Day*) with greetings and updated shipping resumption schedules.
- **Vehicle Match Simulation**:
  - Live compatibility check with green "Guaranteed to Fit" banner, red "Does Not Fit" warning, or neutral prompt to select a vehicle.
- **Pricing Scenarios**:
  - Regular Price ($899.95), Public Sale Price ($799.95 with $100 off badge), and Dealer Wholesale ($699.95).
- **Return & Warranty Policy Scenarios**:
  - Actual policies, Standard 1-Year, No returns / Warranty applies, and DIY build policies.

### 2. Product Page Components (`/`)
- **Branded Header**: Sitewide free shipping announcement, vector SVG Spoologic turbo swoosh logo, search bar, active vehicle indicator, account / cart / phone icons.
- **Navigation Bar**: Quick category links for Ford Powerstroke, Chevrolet/GMC Duramax, and Dodge/Ram Cummins engines.
- **High-Resolution Gallery**: Interactive multi-angle image viewer with thumbnail switcher and customer technical support telephone box.
- **Product Details & Fitment**: Clear SKU tracking (`SL-100-001`), 5-star customer ratings, guaranteed vehicle fitment table, and shipping cutoff timers with FedEx & UPS logistics badges.
- **Pre-Purchase Acknowledgment Modal**:
  - Triggers on backorders or special policy scenarios before adding items to cart.
  - Transparent disclosure of the 5% cancellation processing fee and warranty agreements.
- **Tabbed Technical Specifications**: Detailed inducer/exducer dimensions, A/R ratio, wastegate calibrations, OE cross-references, and vehicle application lists.
- **Frequently Bought Together**: Recommendation engine with 1-click Add to Cart for intake boots, v-band clamps, plenum boots, and bellowed up-pipe kits.
- **Customer Reviews**: Interactive rating breakdown with 6 verified reviews, vote-up helpful buttons, and a "Write a Review" submission modal.

### 3. Cart Flow & Offcanvas Drawer (`/cart` & Drawer)
- **Slide-in Offcanvas Drawer**: Slides out instantly upon adding an item or clicking the header cart badge.
- **Dedicated Full Cart Page**:
  - Free shipping progress bar (target: $99 threshold).
  - Quantity steppers with real-time recalculation of subtotals and discounts.
  - California ZIP code verification tool.
  - Order delivery notes and special instruction inputs.
  - Order summary sidebar with promo code engine (try `SPOOL10` for 10% off).

### 4. Checkout Flow (`/checkout`)
- **Responsive 2-Column Checkout**:
  - **Express Checkout**: 1-click Shop Pay, PayPal, and Apple Pay buttons.
  - **Contact Information**: Email for dispatch updates and phone for carrier delivery coordination.
  - **Shipping Address**: Includes dynamic state-specific validation that detects California addresses and enforces emissions compliance flags.
  - **Shipping Methods**: Free Standard Ground, FedEx 2-Day Air ($34.95), and Overnight Priority ($79.95).
  - **Payment Processing**: Simulated credit card form (with cardholder name, card number, expiry, CVV, and 256-bit SSL encryption badge) and PayPal tab.
  - **Order Confirmation Screen**: Confirms order with unique order ID (`SP-XXXXXX`), customer receipt details, shipping method, and tracking notification summary.

---

## 🛠️ Getting Started & Run Instructions

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ / v22+ recommended)
- **NPM**: v9.0.0 or later

### Installation

1. Open your terminal in the project directory:
   ```bash
   cd "f:\New Office\SPOOLOGIC"
   ```

2. Dependencies are already installed. If running on a new machine, install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

To create an optimized production build and run it:
```bash
npm run build
npm start
```

---

## 📁 Source Code Structure

```
SPOOLOGIC/
├── public/
│   └── images/
│       ├── turbo-main.webp             # Primary high-res stock turbocharger
│       ├── turbo-thumb-1.webp          # Angle view 1
│       ├── turbo-thumb-2.webp          # Angle view 2 (Compressor angle)
│       ├── turbo-thumb-3.webp          # Angle view 3 (Turbine housing)
│       ├── turbo-thumb-4.webp          # Angle view 4 (Wastegate actuator)
│       ├── carrier-trucks.webp         # Official FedEx / UPS / USPS carrier trucks banner
│       ├── california-map.svg          # Official California vector contour
│       ├── prop65-icon.svg             # Official California Prop 65 warning hazard icon
│       ├── spoologic-logo-full.svg     # SPOOLOGIC Turbosystems official dual-gradient logo
│       └── accessories/                # 8 high-fidelity genuine part SVG product diagrams
│           ├── boot-inlet.svg          # Compressor inlet boot (SL-380-001)
│           ├── vband-clamp.svg         # V-band clamp (SL-330-001)
│           ├── plenum-boots.svg        # Spider-to-plenum boots (SL-420-001)
│           ├── uppipe-kit.svg          # Bellowed up-pipe kit (SL-510-001)
│           ├── manifold-kit.svg        # Ductile iron exhaust manifold kit (SL-500-001)
│           ├── map-sensor.svg          # MAP pressure sensor (SL-600-010)
│           ├── pedestal.svg            # Turbo pedestal with EBPV (SL-340-001)
│           └── outlet-plate.svg        # Turbo outlet plate with butterfly (SL-370-001)
├── src/
│   ├── app/
│   │   ├── cart/page.tsx               # Dedicated full Cart page & calculations
│   │   ├── checkout/page.tsx           # Complete 2-column Checkout flow & receipt
│   │   ├── globals.css                 # Comprehensive CSS with responsive breakpoints
│   │   ├── layout.tsx                  # Root layout, theme, modals, and drawers
│   │   └── page.tsx                    # Interactive Product Page showcase
│   ├── components/
│   │   ├── CartDrawer.tsx              # Slide-in offcanvas cart drawer
│   │   ├── Footer.tsx                  # Dark 3-column branded footer
│   │   ├── Header.tsx                  # Responsive header with search & vehicle badge
│   │   ├── Navigation.tsx              # Smooth horizontal scrollable engine categories
│   │   ├── ProductGallery.tsx          # Multi-angle switcher with active thumbnails
│   │   ├── ProductInfo.tsx             # Pricing, stock, California check, carrier trucks
│   │   ├── ProductTabs.tsx             # Specs, vehicle fitment table, return policy
│   │   ├── PurchaseAckModal.tsx        # Pre-purchase disclaimer & Prop 65 modal
│   │   ├── Recommendations.tsx         # Frequently bought together 2-col/4-col grid
│   │   ├── ReviewsSection.tsx          # Verified customer reviews & review submission
│   │   ├── ScenarioToolbar.tsx         # Top testing toolbar with mobile collapse toggle
│   │   ├── SpoologicLogo.tsx           # Dual-swoosh vector SVG brand logo
│   │   ├── ToastNotification.tsx       # Live status feedback toasts
│   │   └── VehicleSelectModal.tsx      # Year/Make/Model vehicle selector
│   ├── context/
│   │   └── CartContext.tsx             # Global cart & scenario simulation engine
│   ├── data/
│   │   ├── productData.ts              # Specs, descriptions, reviews, and accessory items
│   │   └── vehiclesData.ts             # Heavy-duty Ford/Chevy/Dodge compatibility table
│   └── types/
│       └── index.ts                    # TypeScript types and interfaces
├── package.json                        # Next.js 14, React 18, Bootstrap 5.3
├── tsconfig.json                       # TypeScript compiler configuration
└── README.md                           # Documentation and run instructions
```
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Header, Navigation, Modals, Footer
│   │   ├── page.tsx               # Interactive Product Page (Matching reference design)
│   │   ├── cart/
│   │   │   └── page.tsx           # Full Cart page with shipping calculator & promo codes
│   │   ├── checkout/
│   │   │   └── page.tsx           # Complete 2-column Checkout page with state validation
│   │   └── globals.css            # Spoologic design system tokens, typography, and styling
│   ├── components/
│   │   ├── Header.tsx             # Main header with search, vehicle selector, and cart badge
│   │   ├── Navigation.tsx         # Shop by Engine navigation bar
│   │   ├── ScenarioToolbar.tsx    # Interactive design review toolbar (Stock, CA, Cutoff, etc.)
│   │   ├── SpoologicLogo.tsx      # Exact vector SVG logo with turbo swoosh
│   │   ├── ProductGallery.tsx     # Image viewer, thumbnail selector, and help box
│   │   ├── ProductInfo.tsx        # Pricing, stock badges, California compliance, and buy button
│   │   ├── ProductTabs.tsx        # Technical specs, description, fitment, and warranty tabs
│   │   ├── ReviewsSection.tsx     # Review cards, star ratings, and review submission modal
│   │   ├── Recommendations.tsx    # "Frequently Bought Together" with 1-click cart addition
│   │   ├── PurchaseAckModal.tsx   # Pre-purchase policy and backorder acknowledgment modal
│   │   ├── VehicleSelectModal.tsx # "SELECT A VEHICLE" interactive selector
│   │   ├── CartDrawer.tsx         # Slide-in offcanvas cart drawer
│   │   ├── ToastNotification.tsx  # Dynamic feedback alerts
│   │   └── Footer.tsx             # 3-column dark Spoologic footer
│   ├── context/
│   │   └── CartContext.tsx        # Global state management for cart, scenarios, and vehicles
│   ├── data/
│   │   ├── productData.ts         # Complete product specs, reviews, and recommendations
│   │   └── vehiclesData.ts        # Database of trucks for fitment testing
│   └── types/
│       └── index.ts               # TypeScript data definitions
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies and scripts
└── tsconfig.json                  # TypeScript compiler settings
```
