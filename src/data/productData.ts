import { Recommendation, Review } from '@/types';

export const productData = {
  id: 956,
  sku: 'SL-100-001',
  name: 'SPOOLOGIC Stock Turbocharger',
  cartridgeName: 'SPOOLOGIC Stock Turbo Cartridge CHRA',
  cartridgeSku: 'SL-200-020',
  brand: 'SPOOLOGIC',
  partType: 'Stock Replacement Turbocharger',
  turboModel: 'Garrett TP38',
  warranty: '1-Year Limited Warranty',
  returnPolicy: '30-Day Hassle-Free Returns',
  prices: {
    regular: 899.95,
    sale: 799.95,
    dealer: 699.95
  },
  rating: 4.8,
  reviewCount: 6,
  fitmentList: [
    '1994-1997 Ford F-250 7.3L Powerstroke Diesel',
    '1994-1997 Ford F-350 7.3L Powerstroke Diesel',
    '1994-1997 Ford F-Super Duty 7.3L Powerstroke Diesel',
    '1995-1997 Ford E-350 Econoline 7.3L Powerstroke Diesel',
    '1996-1997 Ford E-Super Duty 7.3L Powerstroke Diesel'
  ],
  fitmentSummary: '1994-1997 Ford F-Series 7.3L Powerstroke\n1995-1997 Ford Econoline 7.3L Powerstroke',
  images: [
    '/images/turbo-main.webp',
    '/images/turbo-thumb-2.webp',
    '/images/turbo-thumb-3.webp',
    '/images/turbo-thumb-4.webp'
  ],
  description: `
    <h3>Engineered for Maximum Reliability & Direct OE Fitment</h3>
    <p>The <strong>SPOOLOGIC® Stock Replacement Turbocharger</strong> is specifically engineered for 1994–1997 Ford 7.3L Powerstroke "OBS" turbo diesel trucks and vans. Built to exceed OEM standards, this unit eliminates the notorious boost creep and oil seal degradation common to high-mileage factory units.</p>
    <p>Each turbo is assembled using precision CNC-machined aerospace-grade aluminum compressor wheels, high-nickel alloy turbine housings capable of withstanding extreme exhaust gas temperatures (EGTs), and VSR high-speed balanced rotating assemblies operating up to 130,000 RPM.</p>
    
    <h3>Key Product Highlights</h3>
    <ul>
      <li><strong>Direct Bolt-On:</strong> 100% factory match for compressor intake, exhaust downpipe, and pedestal oil feed/drain.</li>
      <li><strong>Heavy-Duty 360° Thrust Bearing:</strong> Enhanced thrust collar system provides 40% more load capacity over factory 270° bearings for heavy towing.</li>
      <li><strong>Pre-Set Internal Wastegate:</strong> Pre-calibrated actuator maintains factory boost thresholds without throwing check engine codes.</li>
      <li><strong>Multi-Step Dynamic VSR Balance:</strong> Reduces rotational harmonic vibration to well under 0.05g peak for whisper-quiet spool and longevity.</li>
      <li><strong>Includes Complete Installation Gasket Kit:</strong> Premium stainless steel pedestal O-rings, exhaust flange gasket, and pre-lube oil syringe included.</li>
    </ul>
  `,
  specifications: [
    { name: 'Compressor Wheel Inducer', value: '59.8 mm' },
    { name: 'Compressor Wheel Exducer', value: '80.0 mm' },
    { name: 'Turbine Wheel Inducer', value: '76.2 mm' },
    { name: 'Turbine Wheel Exducer', value: '68.0 mm' },
    { name: 'Turbine Housing A/R', value: '1.15 A/R' },
    { name: 'Bearing Type', value: 'Heavy Duty 360-Degree Journal Bearing' },
    { name: 'Cooling Type', value: 'Oil-Cooled Center Housing' },
    { name: 'Wastegate Actuator', value: 'Internal Mechanical (Preset 18–21 PSI)' },
    { name: 'Core Deposit Required', value: 'NO CORE RETURN REQUIRED' },
    { name: 'Shipping Weight', value: '38.5 lbs' }
  ],
  interchangePartNumbers: [
    '466057-5005', 'F4TZ-6N640-B', 'F4TZ-6N653-A', 'F4TZ-6N653-B',
    'F4TZ-6VK682-CARM', 'F4TZ-9E436-A', 'TC-2-RM', 'TC2RM'
  ]
};

export const reviewsData: Review[] = [
  {
    id: 'rev-1',
    author: 'Clint M.',
    rating: 5,
    date: 'October 14, 2026',
    title: 'Brought my 1996 F-250 back to life!',
    vehicle: '1996 Ford F-250 7.3L Powerstroke',
    content: 'Bolted right up to my stock pedestal with zero hassle. Spool up is noticeably crisper than my worn out 280k mile factory turbo, and EGTs dropped about 80 degrees while pulling my 32ft 5th wheel up 6% grades. Highly recommend!',
    helpfulCount: 14,
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Tyler R.',
    rating: 5,
    date: 'September 28, 2026',
    title: 'Spot on OE replacement, no core charge headache',
    vehicle: '1997 Ford F-350 Dually 7.3L',
    content: 'Love that Spoologic doesn\'t make you ship your oily old core back across the country. Packaging was bulletproof, gaskets were top notch, and truck runs like new.',
    helpfulCount: 9,
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Dave H.',
    rating: 5,
    date: 'August 19, 2026',
    title: 'Fast shipping and great customer support',
    vehicle: '1995 Ford F-250 SuperCab',
    content: 'Had a question regarding the exhaust pedestal O-rings and called their support line. The technician answered on the second ring and walked me right through it. Ordered on a Tuesday afternoon and it was on my doorstep Thursday morning.',
    helpfulCount: 7,
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Marcus B.',
    rating: 4,
    date: 'July 11, 2026',
    title: 'Solid turbo, great boost response',
    vehicle: '1997 Ford E-350 Van 7.3L',
    content: 'Installing on an Econoline van doghouse is never fun, but the turbo itself was 100% true to OEM dimensions. Cleared firewall insulation perfectly. Boost gauge hits 21 psi cleanly with no fluttering.',
    helpfulCount: 5,
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Dustin K.',
    rating: 5,
    date: 'June 03, 2026',
    title: 'Quality craftsmanship you can feel',
    vehicle: '1994.5 Ford F-250 7.3L OBS',
    content: 'Zero shaft play straight out of the box. Beautiful casting on both housings and smooth compressor wheel finish. Truck sounds healthy again without any whistle whine.',
    helpfulCount: 11,
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Brad S.',
    rating: 5,
    date: 'April 22, 2026',
    title: 'Best value for 7.3 OBS turbos',
    vehicle: '1996 Ford F-350 4x4',
    content: 'Did a full top-end refresh along with new bellowed up-pipes. This turbo was the centerpiece. 6,000 miles in now and not a single drop of oil in the intake boots.',
    helpfulCount: 8,
    verified: true
  }
];

export const recommendationsData: Recommendation[] = [
  {
    id: 1234,
    sku: 'SL-380-001',
    title: 'Turbo Intake Boot',
    reason: 'Replace a worn turbo inlet connection.',
    price: 54.95,
    image: '/images/accessories/boot-inlet.svg',
    url: '/product/sl-380-001'
  },
  {
    id: 597,
    sku: 'SL-330-001',
    title: 'Downpipe V-Band Clamp',
    reason: 'Replace a worn turbo-to-downpipe clamp.',
    price: 29.95,
    image: '/images/accessories/vband-clamp.svg',
    url: '/product/sl-330-001'
  },
  {
    id: 1181,
    sku: 'SL-420-001',
    title: 'Spider-to-Plenum Boots',
    reason: 'Refresh the two intake plenum connections.',
    price: 79.95,
    image: '/images/accessories/plenum-boots.svg',
    url: '/product/sl-420-001'
  },
  {
    id: 719,
    sku: 'SL-510-001',
    title: 'Bellowed Up-Pipe Kit',
    reason: 'Replace the manifold-to-turbo exhaust assembly.',
    price: 219.95,
    image: '/images/accessories/uppipe-kit.svg',
    url: '/product/sl-510-001'
  },
  {
    id: 1389,
    sku: 'SL-500-001',
    title: 'Exhaust Manifold Kit',
    reason: 'Optional replacement for worn or damaged manifolds.',
    price: 459.95,
    image: '/images/accessories/manifold-kit.svg',
    url: '/product/sl-500-001'
  },
  {
    id: 2218,
    sku: 'SL-600-010',
    title: 'MAP Sensor',
    reason: 'Replace only when diagnosis confirms a sensor fault.',
    price: 239.95,
    image: '/images/accessories/map-sensor.svg',
    url: '/product/sl-600-010'
  },
  {
    id: 484,
    sku: 'SL-340-001',
    title: 'Turbo Pedestal With EBPV',
    reason: 'Replacement pedestal when required.',
    price: 259.95,
    image: '/images/accessories/pedestal.svg',
    url: '/product/sl-340-001'
  },
  {
    id: 474,
    sku: 'SL-370-001',
    title: 'Turbo Outlet Plate EBPV',
    reason: 'Replacement outlet plate when required.',
    price: 79.95,
    image: '/images/accessories/outlet-plate.svg',
    url: '/product/sl-370-001'
  }
];
