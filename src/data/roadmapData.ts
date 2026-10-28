import { RoadmapPhase, Milestone, PlatformModule, DatabaseTable } from '../types/roadmap';

export const INITIAL_PHASES: RoadmapPhase[] = [
  {
    id: 'phase-1',
    phaseNumber: 1,
    name: 'Discovery, Strategy & UX Prototyping',
    durationLabel: 'Weeks 1–3 (Sprints 1–2)',
    startWeek: 1,
    endWeek: 3,
    objective: 'Establish market positioning, finalize 3-sided marketplace workflows, and design high-fidelity interactive wireframes for all user roles.',
    keyOutcomes: [
      'Validated user journeys for Customer, Merchant, and Driver apps',
      'System architecture document and PostGIS database schema signed off',
      'Figma wireframe clickable prototypes approved by stakeholders',
      'Merchant pre-onboarding pipeline established in launch cluster'
    ],
    tasks: [
      {
        id: 't-1-1',
        title: 'Competitive Analysis & Target Niche Scoping',
        description: 'Map delivery density, competitors, and commission expectations in target pilot zone (2–3 km urban cluster).',
        track: 'product_ux',
        sprint: 1,
        startWeek: 1,
        endWeek: 1,
        status: 'completed',
        assigneeRole: 'Lead Product Manager',
        deliverable: 'Market Positioning & Pilot Zone Scope Doc'
      },
      {
        id: 't-1-2',
        title: '3-Sided Workflow Architecture & User Personas',
        description: 'Detail state machines for order lifecycle: Placed -> Kitchen Accepted -> Ready -> Driver Dispatched -> Picked Up -> Delivered.',
        track: 'product_ux',
        sprint: 1,
        startWeek: 1,
        endWeek: 2,
        status: 'completed',
        assigneeRole: 'Senior UX Researcher',
        deliverable: 'End-to-End Order State Transition Flowchart'
      },
      {
        id: 't-1-3',
        title: 'System Architecture & Database Schema Design',
        description: 'Design PostgreSQL + PostGIS tables, Redis geo-caching structure, WebSocket pub/sub design, and API gateway routes.',
        track: 'backend',
        sprint: 1,
        startWeek: 1,
        endWeek: 2,
        status: 'completed',
        assigneeRole: 'Principal Systems Architect',
        deliverable: 'ERD Diagram & PostGIS Spatial Data Blueprint'
      },
      {
        id: 't-1-4',
        title: 'High-Fidelity Wireframes for Customer Mobile App',
        description: 'Design onboarding, search/filtering, restaurant menu with add-ons, checkout, and live order tracking screen.',
        track: 'frontend',
        sprint: 2,
        startWeek: 2,
        endWeek: 3,
        status: 'in_progress',
        assigneeRole: 'Senior UI/UX Designer',
        deliverable: 'Customer App Figma Wireframes & Design System'
      },
      {
        id: 't-1-5',
        title: 'Restaurant Tablet & Driver App UI Wireframes',
        description: 'Design high-contrast kitchen order queue view and mobile driver navigation & accept/decline HUD.',
        track: 'frontend',
        sprint: 2,
        startWeek: 2,
        endWeek: 3,
        status: 'in_progress',
        assigneeRole: 'Senior UI/UX Designer',
        deliverable: 'Tablet Kitchen HUD & Driver Mobile Mockups'
      },
      {
        id: 't-1-6',
        title: 'Pilot Restaurant Merchant Outreach (Pipeline Setup)',
        description: 'Target 25 local food vendors in launch hub; establish merchant commission tiers (18-22%) and POS equipment terms.',
        track: 'operations',
        sprint: 2,
        startWeek: 2,
        endWeek: 3,
        status: 'in_progress',
        assigneeRole: 'Head of Merchant Partnerships',
        deliverable: 'Initial Merchant LOI Pipeline (15 Signed)'
      }
    ]
  },
  {
    id: 'phase-2',
    phaseNumber: 2,
    name: 'MVP Core Engineering & API Infrastructure',
    durationLabel: 'Weeks 4–12 (Sprints 3–6)',
    startWeek: 4,
    endWeek: 12,
    objective: 'Build core backend microservices, implement cross-platform apps for customer & driver, and build restaurant tablet & super admin consoles.',
    keyOutcomes: [
      'Complete REST & WebSocket API suite with JWT auth & role-based permissions',
      'Working cross-platform Customer App (iOS/Android/Web) with Stripe checkout',
      'Restaurant Web/Tablet App with real-time audio order alerts and menu management',
      'Driver App with background GPS telemetry and geo-dispatch matching engine',
      'Super Admin dashboard for order dispatch monitoring and financial reporting'
    ],
    tasks: [
      {
        id: 't-2-1',
        title: 'Auth & Multi-Tenant Role Access Control (RBAC)',
        description: 'Implement JWT authentication with Phone OTP verification (Twilio/Firebase) and roles: Customer, Merchant, Driver, Admin.',
        track: 'backend',
        sprint: 3,
        startWeek: 4,
        endWeek: 5,
        status: 'not_started',
        assigneeRole: 'Senior Backend Engineer',
        deliverable: 'Auth API & Session Service'
      },
      {
        id: 't-2-2',
        title: 'Restaurant Catalog & Dynamic Menu Management Service',
        description: 'Hierarchical categories, item modifiers (add-ons, spice level), stock availability toggle (86ing items), and operating hours.',
        track: 'backend',
        sprint: 3,
        startWeek: 4,
        endWeek: 6,
        status: 'not_started',
        assigneeRole: 'Backend Engineer',
        deliverable: 'Catalog CRUD & Pricing Endpoints'
      },
      {
        id: 't-2-3',
        title: 'Customer App Core: Discovery, Menu, Cart & Customization',
        description: 'Build React Native / Flutter customer interface: location search, filter by cuisine/ETA, options drawer, cart state.',
        track: 'frontend',
        sprint: 3,
        startWeek: 5,
        endWeek: 8,
        status: 'not_started',
        assigneeRole: 'Senior Mobile Engineer',
        deliverable: 'Customer App Navigation & Catalog Build'
      },
      {
        id: 't-2-4',
        title: 'Payment Engine: Stripe, Apple Pay & Split Billing',
        description: 'Integrate Stripe PaymentIntents, customer payment method storage, automated merchant split & driver escrow hold.',
        track: 'backend',
        sprint: 4,
        startWeek: 6,
        endWeek: 8,
        status: 'not_started',
        assigneeRole: 'Fintech Backend Engineer',
        deliverable: 'Stripe Payment Webhooks & Settlement API'
      },
      {
        id: 't-2-5',
        title: 'Restaurant Tablet HUD & Sound-Alerted Order Management',
        description: 'Web/Tablet app with incoming order sound bell, accept/prep timer, kitchen ticket printing (ESC/POS), and driver ETA tracker.',
        track: 'frontend',
        sprint: 4,
        startWeek: 6,
        endWeek: 9,
        status: 'not_started',
        assigneeRole: 'Frontend Engineer',
        deliverable: 'Restaurant Kitchen Tablet Interface'
      },
      {
        id: 't-2-6',
        title: 'Driver Real-Time Telemetry & Redis Geospatial Dispatch',
        description: 'Driver App GPS pinging every 5s; Redis GEOADD/GEORADIUS dispatch worker matching orders to closest idle drivers within 2.5km.',
        track: 'backend',
        sprint: 5,
        startWeek: 8,
        endWeek: 11,
        status: 'not_started',
        assigneeRole: 'Distributed Systems Engineer',
        deliverable: 'Real-Time Dispatch Engine & Socket Server'
      },
      {
        id: 't-2-7',
        title: 'Driver Mobile App: Accept Request, Mapbox Turn-by-Turn & Payouts',
        description: '30-second accept timer with route preview & guaranteed payout, navigation integration, and daily earnings wallet.',
        track: 'frontend',
        sprint: 5,
        startWeek: 8,
        endWeek: 11,
        status: 'not_started',
        assigneeRole: 'Mobile Engineer',
        deliverable: 'Driver iOS/Android App Build'
      },
      {
        id: 't-2-8',
        title: 'Super Admin Control Room & Live Dispatch Map',
        description: 'Fleet monitoring map, manual order re-assignment, merchant approval queue, dispute resolution, and commission adjustments.',
        track: 'frontend',
        sprint: 6,
        startWeek: 10,
        endWeek: 12,
        status: 'not_started',
        assigneeRole: 'Full Stack Engineer',
        deliverable: 'Admin Web Portal & Fleet Map'
      }
    ]
  },
  {
    id: 'phase-3',
    phaseNumber: 3,
    name: 'End-to-End QA, Field Testing & Security',
    durationLabel: 'Weeks 13–15 (Sprints 7–8)',
    startWeek: 13,
    endWeek: 15,
    objective: 'Subject the entire ecosystem to live field trials, simulated network disconnects, load stress, and security/PCI audits.',
    keyOutcomes: [
      'Real GPS field driving trials in target launch district with test orders',
      'Peak load testing sustaining 2,500 simultaneous requests/sec without socket drops',
      'PCI-DSS and data privacy compliance verification',
      'Automated fallback logic for driver rejection / unassigned order escalation'
    ],
    tasks: [
      {
        id: 't-3-1',
        title: 'Live Field Trials with Dummy Drivers & Real GPS Trajectories',
        description: 'Simulate full order cycles with 5 field test drivers in vehicles/bikes; stress test geofence triggers for restaurant arrival and doorstep delivery.',
        track: 'operations',
        sprint: 7,
        startWeek: 13,
        endWeek: 14,
        status: 'not_started',
        assigneeRole: 'QA Lead & Field Operations Lead',
        deliverable: 'Field Trial Report & GPS Accuracy Benchmark'
      },
      {
        id: 't-3-2',
        title: 'WebSocket Reconnection & Edge Disconnect Resilience',
        description: 'Verify graceful offline handling when customer enters elevators, driver passes through tunnels, or restaurant loses Wi-Fi.',
        track: 'backend',
        sprint: 7,
        startWeek: 13,
        endWeek: 14,
        status: 'not_started',
        assigneeRole: 'Senior Backend Engineer',
        deliverable: 'Offline Sync & Socket Heartbeat Patch'
      },
      {
        id: 't-3-3',
        title: 'Load Spike Stress Testing (Simulated Friday Dinner Rush)',
        description: 'Simulate 5,000 concurrent cart updates and 800 simultaneous order placements via k6 to guarantee under 120ms p95 latency.',
        track: 'backend',
        sprint: 8,
        startWeek: 14,
        endWeek: 15,
        status: 'not_started',
        assigneeRole: 'DevOps / SRE Engineer',
        deliverable: 'k6 Performance Report & Auto-Scaling Rules'
      },
      {
        id: 't-3-4',
        title: 'Payment Flow & Security Audit (PCI-DSS & OWASP)',
        description: 'Verify zero cardholder data touches application servers, audit API rate limiting, and conduct token security review.',
        track: 'backend',
        sprint: 8,
        startWeek: 14,
        endWeek: 15,
        status: 'not_started',
        assigneeRole: 'Security Consultant',
        deliverable: 'Penetration Test Report & PCI Attestation'
      }
    ]
  },
  {
    id: 'phase-4',
    phaseNumber: 4,
    name: 'Soft Launch & Hyper-Local Beta',
    durationLabel: 'Weeks 16–18 (Sprints 9–10)',
    startWeek: 16,
    endWeek: 18,
    objective: 'Deploy in a single confined geographic radius with 15–20 curated restaurant partners and 8–12 dedicated fleet drivers.',
    keyOutcomes: [
      'Average prep time and delivery time calibrated within 32 minutes total cycle',
      'Merchant onboarding SLA refined to under 48 hours',
      'Driver earnings floor validated ($22-26/hour during pilot windows)',
      'Customer NPS and repeat order rate baseline established'
    ],
    tasks: [
      {
        id: 't-4-1',
        title: 'Merchant Kitchen Hardware Setup & Staff Training',
        description: 'Deploy 20 configured Android tablets with rugged stands and thermal printers to partner restaurants; train kitchen staff.',
        track: 'operations',
        sprint: 9,
        startWeek: 16,
        endWeek: 16,
        status: 'not_started',
        assigneeRole: 'Merchant Ops Specialist',
        deliverable: '20 Active Restaurant Kitchens Onboarded'
      },
      {
        id: 't-4-2',
        title: 'Fleet Driver Onboarding & Equipment Distribution',
        description: 'Vetted background checks, driver license verification, insulated delivery bag issuance, and safety onboarding briefing.',
        track: 'operations',
        sprint: 9,
        startWeek: 16,
        endWeek: 17,
        status: 'not_started',
        assigneeRole: 'Fleet Manager',
        deliverable: '12 Active Certified Couriers on Shift'
      },
      {
        id: 't-4-3',
        title: 'Closed Beta Invitations & Neighborhood Launch',
        description: 'Issue access codes to 500 local residents in launch corridor; offer $10 first-order voucher and free delivery.',
        track: 'product_ux',
        sprint: 9,
        startWeek: 17,
        endWeek: 18,
        status: 'not_started',
        assigneeRole: 'Growth Marketing Manager',
        deliverable: 'First 500 Consumer Accounts Active'
      },
      {
        id: 't-4-4',
        title: 'Operations War Room & Rapid Bug Triage',
        description: 'Daily operational review of order fulfillment rates, kitchen delays, driver wait times, and cold-food incidents.',
        track: 'operations',
        sprint: 10,
        startWeek: 17,
        endWeek: 18,
        status: 'not_started',
        assigneeRole: 'VP of Operations',
        deliverable: 'Weekly Unit Economics & Friction Log'
      }
    ]
  },
  {
    id: 'phase-5',
    phaseNumber: 5,
    name: 'Public Launch, Scaling & Optimization',
    durationLabel: 'Weeks 19–24+ (Sprints 11–12+)',
    startWeek: 19,
    endWeek: 24,
    objective: 'App Store & Google Play public release, expand geographic delivery radius, initiate multi-order batching algorithm, and rollout subscription loyalty.',
    keyOutcomes: [
      'App Store & Play Store public availability with 4.5+ star rating target',
      'Delivery corridor expanded from 1 to 5 contiguous municipal zones',
      'Batching algorithm live reducing cost-per-delivery by ~28%',
      'Premium subscription membership model ("Pass") launched'
    ],
    tasks: [
      {
        id: 't-5-1',
        title: 'App Store & Google Play Production Submission',
        description: 'Submit production builds with compliance documentation, app screenshots, localized privacy disclosures, and Apple Review demo credentials.',
        track: 'frontend',
        sprint: 11,
        startWeek: 19,
        endWeek: 19,
        status: 'not_started',
        assigneeRole: 'Lead Mobile Release Engineer',
        deliverable: 'Approved App Store & Google Play Listings'
      },
      {
        id: 't-5-2',
        title: 'Route Batching & Multi-Order Dispatch Optimization',
        description: 'Deploy algorithmic bundling allowing couriers to carry 2 orders from adjacent restaurants to nearby dropoffs without breaching SLA.',
        track: 'backend',
        sprint: 11,
        startWeek: 19,
        endWeek: 21,
        status: 'not_started',
        assigneeRole: 'Algorithms & Optimization Engineer',
        deliverable: 'Smart Route Batching Engine v1'
      },
      {
        id: 't-5-3',
        title: 'Subscription Membership Tier ("FoodPass" $9.99/mo)',
        description: 'Build zero-dollar delivery fee threshold for orders over $15, exclusive merchant perks, and recurring Stripe billing.',
        track: 'product_ux',
        sprint: 12,
        startWeek: 21,
        endWeek: 23,
        status: 'not_started',
        assigneeRole: 'Product Manager - Monetization',
        deliverable: 'Subscription Checkout & Billing Engine'
      },
      {
        id: 't-5-4',
        title: 'Sponsored Listings & Merchant Ad Bidding Engine',
        description: 'Enable restaurants to bid for top placement in cuisine categories and search results with CPC analytics.',
        track: 'backend',
        sprint: 12,
        startWeek: 22,
        endWeek: 24,
        status: 'not_started',
        assigneeRole: 'Senior Backend Engineer',
        deliverable: 'Sponsored Merchant Placement Engine'
      }
    ]
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: 'm-1',
    week: 3,
    phaseId: 'phase-1',
    title: 'Architecture & Design Freeze',
    description: 'PostGIS spatial schemas, API contracts, and high-fidelity prototypes locked.',
    criteria: [
      'All 3 user role Figma prototypes signed off',
      'Database ERD schema reviewed and approved',
      'Initial 15 restaurant partner letters of intent secured'
    ],
    status: 'reached'
  },
  {
    id: 'm-2',
    week: 12,
    phaseId: 'phase-2',
    title: 'Alpha Code Complete (MVP Built)',
    description: 'All 4 modules operational on staging environment with mock transactions.',
    criteria: [
      'Customer app can checkout with test cards',
      'Restaurant tablet receives order push and responds in under 3 seconds',
      'Driver app successfully streams GPS updates to Redis dispatch queue'
    ],
    status: 'pending'
  },
  {
    id: 'm-3',
    week: 15,
    phaseId: 'phase-3',
    title: 'Field Test & Security Sign-Off',
    description: 'Successful real-world delivery test runs with zero unhandled dropouts.',
    criteria: [
      '50 real test runs completed in pilot zone',
      'k6 load test passes 2,500 req/sec benchmark',
      'PCI-DSS compliance checklist verified'
    ],
    status: 'pending'
  },
  {
    id: 'm-4',
    week: 18,
    phaseId: 'phase-4',
    title: 'Soft Launch Go-Decision',
    description: 'Hyper-local beta completes with sub-35min delivery and 85%+ fulfillment.',
    criteria: [
      '500 completed live orders in pilot zone',
      'Customer order rating > 4.3 stars',
      'Driver earnings target met without excessive platform subsidy'
    ],
    status: 'pending'
  },
  {
    id: 'm-5',
    week: 20,
    phaseId: 'phase-5',
    title: 'Commercial Public Launch',
    description: 'Public app store launch with marketing campaign activation.',
    criteria: [
      'iOS and Android store approvals complete',
      '50 active restaurant partners on the grid',
      'First 5,000 public downloads achieved'
    ],
    status: 'pending'
  }
];

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    id: 'customer',
    name: 'Customer Experience (iOS, Android, Web)',
    targetPlatform: 'React Native / Flutter + Next.js Web',
    userPersona: 'Hungry diner ordering lunch/dinner, looking for speedy delivery, transparent ETA, and easy payment.',
    summary: 'The consumer-facing portal prioritizing visual discovery, intuitive menu item customization, friction-free checkout, and transparent live order tracking.',
    features: [
      {
        id: 'feat-c-1',
        name: 'Location-Aware Restaurant Discovery',
        description: 'Auto-detect GPS address or reverse-geocode with autocomplete. Filter by cuisine, dietary needs, delivery fee, rating, and ETA.',
        priority: 'P0 - MVP Essential',
        techStack: 'Google Places API / Mapbox, React Native Geolocation',
        apiEndpoint: 'GET /api/v1/restaurants?lat={lat}&lng={lng}&radius=5000'
      },
      {
        id: 'feat-c-2',
        name: 'Interactive Menu & Item Customization',
        description: 'Configurable options: size, add-ons (cheese, bacon), spice level, exclusion notes (e.g. no onions), allergy warnings.',
        priority: 'P0 - MVP Essential',
        techStack: 'State management via Zustand/Redux, Dynamic Nested Modifiers',
        apiEndpoint: 'GET /api/v1/restaurants/{id}/menu'
      },
      {
        id: 'feat-c-3',
        name: 'Smart Cart & Transparent Fee Breakdown',
        description: 'Real-time calculation of subtotal, restaurant delivery fee, dynamic service fee, tip selector ($2, $4, $6, custom), and promo voucher application.',
        priority: 'P0 - MVP Essential',
        techStack: 'Cart Reducer + Pricing Engine API',
        apiEndpoint: 'POST /api/v1/cart/calculate-fees'
      },
      {
        id: 'feat-c-4',
        name: 'Payments & Digital Wallets',
        description: 'One-click checkout via Apple Pay, Google Pay, Credit/Debit cards (Stripe Elements SDK) with tokenized card reuse.',
        priority: 'P0 - MVP Essential',
        techStack: 'Stripe PaymentIntents SDK',
        apiEndpoint: 'POST /api/v1/orders/checkout'
      },
      {
        id: 'feat-c-5',
        name: 'Live Multi-State Order Tracker',
        description: 'Animated 4-step progress: Order Placed -> Kitchen Preparing -> Driver Picked Up -> Arriving at Doorstep with live courier map marker.',
        priority: 'P0 - MVP Essential',
        techStack: 'WebSockets (Socket.io) / Server-Sent Events, Mapbox GL',
        apiEndpoint: 'WS /ws/orders/{id}/stream'
      },
      {
        id: 'feat-c-6',
        name: 'Two-Tier Ratings & Reviews',
        description: 'Independent 1-5 star ratings for Food Quality (Restaurant) vs Delivery Speed/Care (Courier) with photo upload.',
        priority: 'P1 - High Priority',
        techStack: 'Cloud Storage (S3/GCS), Review Service API',
        apiEndpoint: 'POST /api/v1/orders/{id}/review'
      }
    ],
    keyChallenges: [
      'Preventing cart abandonment when delivery fee is revealed',
      'Maintaining accurate restaurant opening hours and stock states',
      'Handling smooth map animations during network handovers'
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant Merchant Dashboard',
    targetPlatform: 'Dedicated Android/iPad Tablet App + Responsive Web',
    userPersona: 'Kitchen manager or head chef handling incoming tickets amid a noisy, high-pressure dinner rush.',
    summary: 'A high-contrast, audio-alerted tablet interface engineered to minimize order acceptance delay, manage ticket pacing, and dynamically toggle 86ed items.',
    features: [
      {
        id: 'feat-r-1',
        name: 'Audio-Alerted Kitchen Order Queue',
        description: 'Loud persistent chime for incoming orders with 120-second timeout. Visual count of pending, preparing, and ready tickets.',
        priority: 'P0 - MVP Essential',
        techStack: 'Web Audio API, React Native Sound, WakeLock API',
        apiEndpoint: 'WS /ws/merchants/{id}/incoming'
      },
      {
        id: 'feat-r-2',
        name: 'Preparation Pacing & Custom ETA Adjustment',
        description: 'Kitchen can accept with standard prep time (15m, 25m, 40m) or add delay time during peak rushes.',
        priority: 'P0 - MVP Essential',
        techStack: 'Merchant Order Action API',
        apiEndpoint: 'POST /api/v1/merchant/orders/{id}/status'
      },
      {
        id: 'feat-r-3',
        name: 'Live Item 86ing (Out-of-Stock Toggle)',
        description: 'Immediate toggle to disable dishes or specific ingredients when supplies run dry during shift.',
        priority: 'P0 - MVP Essential',
        techStack: 'Optimistic UI state, Redis cache bust',
        apiEndpoint: 'PATCH /api/v1/merchant/menu/items/{id}/stock'
      },
      {
        id: 'feat-r-4',
        name: 'Thermal Receipt & Kitchen Ticket Printing',
        description: 'Auto-print ESC/POS kitchen chits with item modifiers, allergies, order ID, and courier name upon order acceptance.',
        priority: 'P1 - High Priority',
        techStack: 'Bluetooth / LAN ESC/POS Thermal Printer SDK',
        apiEndpoint: 'Local hardware driver daemon'
      },
      {
        id: 'feat-r-5',
        name: 'Driver Inbound Radar',
        description: 'Displays assigned courier name, vehicle type, and estimated ETA (e.g., "Arriving in 4 min") to synchronize packing.',
        priority: 'P1 - High Priority',
        techStack: 'WebSocket driver geo stream',
        apiEndpoint: 'GET /api/v1/merchant/orders/{id}/driver-eta'
      },
      {
        id: 'feat-r-6',
        name: 'Daily Settlement & Performance Analytics',
        description: 'Daily gross revenue, commission deducted, net payout calculation, average prep time, and order rejection rate.',
        priority: 'P1 - High Priority',
        techStack: 'PostgreSQL analytical views',
        apiEndpoint: 'GET /api/v1/merchant/analytics/daily'
      }
    ],
    keyChallenges: [
      'Tablets getting unplugged or losing Wi-Fi in stainless steel kitchens',
      'Accidental missed orders during extreme kitchen volume rushes',
      'Menu synchronization across third-party POS systems'
    ]
  },
  {
    id: 'driver',
    name: 'Delivery Driver Fleet App',
    targetPlatform: 'Native iOS & Android Mobile Apps',
    userPersona: 'Gig economy courier on motorcycle, bicycle, or car maximizing hourly income with reliable navigation.',
    summary: 'A fast, high-contrast mobile interface with one-tap order acceptance, turn-by-turn navigation, geofenced status updates, and transparent instant payouts.',
    features: [
      {
        id: 'feat-d-1',
        name: 'Driver Onboarding & Document Verification',
        description: 'Driver license photo, motor vehicle registration, background check status tracking, vehicle type selection (Bike, Scooter, Car).',
        priority: 'P0 - MVP Essential',
        techStack: 'Persona / Checkr Identity API, Cloud Storage',
        apiEndpoint: 'POST /api/v1/driver/onboard'
      },
      {
        id: 'feat-d-2',
        name: '30-Second Request Accept/Decline HUD',
        description: 'Shows guaranteed payout ($8.40), pickup restaurant name/distance, delivery dropoff distance, and total estimated duration.',
        priority: 'P0 - MVP Essential',
        techStack: 'High-priority APNS/FCM Push, React Native Audio',
        apiEndpoint: 'POST /api/v1/driver/offers/{id}/accept'
      },
      {
        id: 'feat-d-3',
        name: 'Turn-by-Turn In-App GPS Navigation',
        description: 'Integrated vector map route to restaurant, then to customer with real-time traffic rerouting and audio voice prompts.',
        priority: 'P0 - MVP Essential',
        techStack: 'Mapbox Navigation SDK / Google Maps SDK',
        apiEndpoint: 'Native navigation module'
      },
      {
        id: 'feat-d-4',
        name: 'Geofenced Status Updates & Proof of Delivery',
        description: 'Auto-detect "Arrived at Restaurant"; photo capture "Proof of Dropoff" at customer doorstep with recipient signature or note.',
        priority: 'P0 - MVP Essential',
        techStack: 'PostGIS Geofencing, Device Camera SDK',
        apiEndpoint: 'POST /api/v1/driver/orders/{id}/deliver'
      },
      {
        id: 'feat-d-5',
        name: 'Earnings Ledger & Instant Cashout',
        description: 'Daily/weekly breakdown of base pay, distance bonus, customer tips (100% to driver), and instant Stripe debit card payout.',
        priority: 'P0 - MVP Essential',
        techStack: 'Stripe Instant Payouts API',
        apiEndpoint: 'POST /api/v1/driver/payouts/instant'
      },
      {
        id: 'feat-d-6',
        name: 'Masked VoIP & Secure Messaging',
        description: 'Direct call/chat with customer and restaurant without exposing personal phone numbers.',
        priority: 'P1 - High Priority',
        techStack: 'Twilio Voice Proxy / Masked Phone API',
        apiEndpoint: 'POST /api/v1/comms/mask-call'
      }
    ],
    keyChallenges: [
      'Battery drain caused by background GPS telemetry',
      'Unsafe app usage while operating moving vehicles',
      'High driver churn during off-peak hours if order volume is low'
    ]
  },
  {
    id: 'admin',
    name: 'Super Admin Control Center',
    targetPlatform: 'Desktop Web Application',
    userPersona: 'Platform Operations Director, Dispatch Controllers, and Financial Analysts overseeing entire ecosystem.',
    summary: 'The operational command center providing birds-eye dispatch monitoring, merchant vetting, commission controls, and dispute arbitration.',
    features: [
      {
        id: 'feat-a-1',
        name: 'Real-Time Dispatch Radar & Fleet Map',
        description: 'Live interactive map showing every active order, courier location marker, pending dispatch queue, and unassigned alerts.',
        priority: 'P0 - MVP Essential',
        techStack: 'Mapbox GL JS, WebSockets, Canvas Marker Clustering',
        apiEndpoint: 'WS /ws/admin/fleet-live'
      },
      {
        id: 'feat-a-2',
        name: 'Merchant & Driver Verification Pipeline',
        description: 'Document review table to inspect sanitation permits, tax IDs, driver licenses, and approve/reject with audit logs.',
        priority: 'P0 - MVP Essential',
        techStack: 'React Table, Document Viewer',
        apiEndpoint: 'PATCH /api/v1/admin/merchants/{id}/approval'
      },
      {
        id: 'feat-a-3',
        name: 'Commission & Dynamic Surge Pricing Rule Engine',
        description: 'Configure standard commission per restaurant (15-30%), delivery fee tiers by distance (0-3km: $3.99, 3-6km: $5.99), and weather surge multiplier.',
        priority: 'P0 - MVP Essential',
        techStack: 'Pricing Policy Rules Engine',
        apiEndpoint: 'PUT /api/v1/admin/pricing-rules'
      },
      {
        id: 'feat-a-4',
        name: 'Manual Order Reassignment & Override',
        description: 'Allows dispatchers to manually re-assign stuck orders or dispatch backup couriers when a driver vehicle breaks down.',
        priority: 'P0 - MVP Essential',
        techStack: 'Admin Dispatch Override Service',
        apiEndpoint: 'POST /api/v1/admin/orders/{id}/reassign'
      },
      {
        id: 'feat-a-5',
        name: 'Financial Settlement & Batch Payouts',
        description: 'Automated weekly reconciliation: total customer charges, Stripe processing fees, merchant net transfers, and fleet disbursements.',
        priority: 'P1 - High Priority',
        techStack: 'Financial Reconciliation Worker, Stripe Connect',
        apiEndpoint: 'GET /api/v1/admin/financials/ledger'
      },
      {
        id: 'feat-a-6',
        name: 'Promotions, Discount Codes & Referrals Engine',
        description: 'Create multi-use vouchers (e.g., "$10 off first order with $25 minimum"), referral link tracker, and marketing campaign attribution.',
        priority: 'P1 - High Priority',
        techStack: 'Campaign Engine & Promo Validator',
        apiEndpoint: 'POST /api/v1/admin/promotions'
      }
    ],
    keyChallenges: [
      'Maintaining real-time performance with thousands of concurrent map markers',
      'Balancing customer refund disputes against restaurant compensation',
      'Preventing voucher and referral fraud syndicates'
    ]
  }
];

export const DATABASE_TABLES: DatabaseTable[] = [
  {
    name: 'users',
    description: 'Core identities across the platform with role partitioning and authentication credentials.',
    columns: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Unique user identifier' },
      { name: 'phone', type: 'VARCHAR(20)', constraints: 'UNIQUE NOT NULL', description: 'E.164 verified phone number' },
      { name: 'email', type: 'VARCHAR(255)', constraints: 'UNIQUE', description: 'User email for invoices' },
      { name: 'role', type: 'VARCHAR(20)', constraints: 'NOT NULL CHECK (role IN (\'customer\', \'merchant\', \'driver\', \'admin\'))', description: 'System role' },
      { name: 'full_name', type: 'VARCHAR(100)', constraints: 'NOT NULL', description: 'User legal / display name' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Registration timestamp' }
    ],
    sqlDefinition: `CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'merchant', 'driver', 'admin')),
  full_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`
  },
  {
    name: 'restaurants',
    description: 'Merchant profiles, operating hours, spatial coordinates, and commercial terms.',
    columns: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Merchant identifier' },
      { name: 'owner_user_id', type: 'UUID', constraints: 'REFERENCES users(id)', description: 'Owner merchant account' },
      { name: 'name', type: 'VARCHAR(150)', constraints: 'NOT NULL', description: 'Commercial restaurant name' },
      { name: 'cuisine_types', type: 'TEXT[]', constraints: 'NOT NULL', description: 'Array of cuisines (e.g. Italian, Sushi)' },
      { name: 'commission_rate', type: 'NUMERIC(4,2)', constraints: 'DEFAULT 0.20', description: 'Agreed commission (e.g. 0.20 = 20%)' },
      { name: 'location', type: 'GEOGRAPHY(Point, 4326)', constraints: 'NOT NULL', description: 'PostGIS spatial coordinate for distance calculation' },
      { name: 'prep_time_minutes', type: 'INT', constraints: 'DEFAULT 25', description: 'Average kitchen turnaround' }
    ],
    sqlDefinition: `CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(150) NOT NULL,
  cuisine_types TEXT[] NOT NULL,
  commission_rate NUMERIC(4,2) DEFAULT 0.20,
  address_street TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  location GEOGRAPHY(Point, 4326) NOT NULL,
  prep_time_minutes INT DEFAULT 25,
  is_accepting_orders BOOLEAN DEFAULT TRUE,
  rating_average NUMERIC(3,2) DEFAULT 5.00,
  rating_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_restaurants_location ON restaurants USING GIST(location);`
  },
  {
    name: 'orders',
    description: 'Central transaction entity linking customer, restaurant, delivery driver, fee breakdown, and status state machine.',
    columns: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Unique order ID' },
      { name: 'customer_id', type: 'UUID', constraints: 'REFERENCES users(id)', description: 'Ordering customer' },
      { name: 'restaurant_id', type: 'UUID', constraints: 'REFERENCES restaurants(id)', description: 'Fulfilling merchant' },
      { name: 'driver_id', type: 'UUID', constraints: 'REFERENCES users(id)', description: 'Assigned courier (NULL until claimed)' },
      { name: 'status', type: 'VARCHAR(30)', constraints: 'NOT NULL', description: 'placed, accepted, preparing, ready, picked_up, delivered, cancelled' },
      { name: 'subtotal_cents', type: 'INT', constraints: 'NOT NULL', description: 'Food subtotal in cents' },
      { name: 'delivery_fee_cents', type: 'INT', constraints: 'NOT NULL', description: 'Delivery fee charged to customer' },
      { name: 'service_fee_cents', type: 'INT', constraints: 'NOT NULL', description: 'Platform fee' },
      { name: 'driver_tip_cents', type: 'INT', constraints: 'DEFAULT 0', description: '100% tip pass-through to driver' },
      { name: 'platform_commission_cents', type: 'INT', constraints: 'NOT NULL', description: 'Net cut taken from merchant' },
      { name: 'dropoff_location', type: 'GEOGRAPHY(Point, 4326)', constraints: 'NOT NULL', description: 'Customer delivery point' }
    ],
    sqlDefinition: `CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  driver_id UUID REFERENCES users(id),
  status VARCHAR(30) NOT NULL CHECK (status IN (
    'placed', 'accepted', 'preparing', 'ready', 'driver_assigned', 'picked_up', 'delivered', 'cancelled'
  )),
  subtotal_cents INT NOT NULL,
  delivery_fee_cents INT NOT NULL,
  service_fee_cents INT NOT NULL,
  driver_tip_cents INT DEFAULT 0,
  platform_commission_cents INT NOT NULL,
  driver_payout_cents INT NOT NULL,
  dropoff_location GEOGRAPHY(Point, 4326) NOT NULL,
  dropoff_address TEXT NOT NULL,
  dropoff_instructions TEXT,
  placed_at TIMESTAMPTZ DEFAULT NOW(),
  estimated_delivery_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);`
  },
  {
    name: 'driver_telemetry',
    description: 'Spatial telemetry logs capturing driver location, speed, and heading for dispatch and client tracking.',
    columns: [
      { name: 'driver_id', type: 'UUID', constraints: 'REFERENCES users(id)', description: 'Driver identifier' },
      { name: 'location', type: 'GEOGRAPHY(Point, 4326)', constraints: 'NOT NULL', description: 'Current GPS point' },
      { name: 'status', type: 'VARCHAR(20)', constraints: 'NOT NULL', description: 'offline, idle_available, on_pickup, on_dropoff' },
      { name: 'heading_degrees', type: 'FLOAT', constraints: '', description: 'Bearing for directional navigation' },
      { name: 'recorded_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Timestamp of GPS ping' }
    ],
    sqlDefinition: `CREATE TABLE driver_telemetry (
  id BIGSERIAL PRIMARY KEY,
  driver_id UUID NOT NULL REFERENCES users(id),
  location GEOGRAPHY(Point, 4326) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('offline', 'idle_available', 'on_pickup', 'on_dropoff')),
  speed_kmh NUMERIC(5,2),
  heading_degrees NUMERIC(5,2),
  battery_level_pct INT,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_telemetry_driver_time ON driver_telemetry(driver_id, recorded_at DESC);`
  }
];

export const INITIAL_UNIT_ECONOMICS: { [key: string]: number } = {
  averageOrderValue: 34.0,
  restaurantCommissionPct: 20.0, // 20%
  deliveryFeeToCustomer: 3.99,
  serviceFeeToCustomer: 2.50,
  driverPayoutPerOrder: 5.80,
  paymentGatewayFeePct: 2.9, // 2.9%
  paymentGatewayFixedFee: 0.30,
  monthlyOrderVolume: 12500,
  customerAcquisitionCost: 18.0,
  restaurantAcquisitionCost: 150.0,
  cloudInfraBaseMonthly: 2400.0
};
