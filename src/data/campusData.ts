import { DiningSpot, DropZone, Drone } from '../types/uniDds';

export const CAMPUS_DROP_ZONES: DropZone[] = [
  {
    id: 'pad-eng',
    name: 'Engineering Lawn Landing Pad A',
    code: 'PAD-ENG-01',
    zone: 'Science & Engineering',
    coordinates: { x: 72, y: 28 },
    description: 'Directly in front of the Turing Computer Science & Robotics Atrium.',
    padType: 'Ground Pad',
    restricted: false
  },
  {
    id: 'pad-lib',
    name: 'Main University Library South Deck',
    code: 'PAD-LIB-02',
    zone: 'Central Quad',
    coordinates: { x: 48, y: 44 },
    description: '3rd-floor outdoor terrace dock, accessible via the south elevator.',
    padType: 'Rooftop Dock',
    restricted: false
  },
  {
    id: 'pad-dorms',
    name: 'Tower Hall Dorm Quad Zone',
    code: 'PAD-DORM-03',
    zone: 'West Dorms',
    coordinates: { x: 20, y: 68 },
    description: 'Safety-fenced courtyard circle adjacent to freshman dorm commons.',
    padType: 'Winch Descent Zone',
    restricted: false
  },
  {
    id: 'pad-union',
    name: 'Student Union Plaza Hub',
    code: 'PAD-UN-04',
    zone: 'Central Quad',
    coordinates: { x: 52, y: 56 },
    description: 'Central campus crossroad landing bay with automated pickup lockers.',
    padType: 'Ground Pad',
    restricted: false
  },
  {
    id: 'pad-ath',
    name: 'Athletics & Fieldhouse East Gate',
    code: 'PAD-ATH-05',
    zone: 'Athletics & South',
    coordinates: { x: 80, y: 78 },
    description: 'East gate perimeter pad near varsity gym and soccer fields.',
    padType: 'Ground Pad',
    restricted: false
  },
  {
    id: 'pad-grad',
    name: 'Biomedical Innovation Quad',
    code: 'PAD-GRAD-06',
    zone: 'North Campus',
    coordinates: { x: 34, y: 18 },
    description: 'North medical sciences quad green space with high-speed winch pad.',
    padType: 'Winch Descent Zone',
    restricted: false
  }
];

export const CAMPUS_DINING_SPOTS: DiningSpot[] = [
  {
    id: 'spot-burger',
    name: 'The Quad Burger Forge',
    location: 'Student Union Ground Floor, Hub 3',
    zone: 'Central Quad',
    cuisine: 'Gourmet Smashburgers & Truffle Fries',
    rating: 4.8,
    reviewCount: 342,
    averageFlightTimeMins: 4.5,
    droneLaunchPad: 'Launch Bay C-1 (Union Rooftop)',
    coordinates: { x: 50, y: 54 },
    acceptsMealPlan: true,
    menu: [
      {
        id: 'bg-1',
        name: 'Dean\'s Double Wagyu Smash',
        description: 'Two seared smashed beef patties, aged cheddar, caramelised onions, brioche bun, house burger sauce.',
        price: 11.50,
        category: 'Burgers',
        dietary: ['High-Protein'],
        calories: 780,
        isAvailable: true,
        optionGroups: [
          {
            id: 'cheese-choice',
            title: 'Cheese Selection',
            required: true,
            maxSelect: 1,
            options: [
              { id: 'ch-cheddar', name: 'Sharp Cheddar', price: 0 },
              { id: 'ch-pepperjack', name: 'Spicy Pepper Jack', price: 0 },
              { id: 'ch-swiss', name: 'Swiss Cheese', price: 0 }
            ]
          },
          {
            id: 'extra-toppings',
            title: 'Add Extras',
            required: false,
            maxSelect: 3,
            options: [
              { id: 'ex-bacon', name: 'Crispy Smoked Bacon', price: 1.75 },
              { id: 'ex-jalapeno', name: 'Pickled Jalapeños', price: 0.75 },
              { id: 'ex-egg', name: 'Fried Farm Egg', price: 1.50 }
            ]
          }
        ]
      },
      {
        id: 'bg-2',
        name: 'Beyond Botany Vegan Smash',
        description: 'Plant-based patty, vegan cheddar, butter lettuce, heirloom tomato, vegan garlic aioli on potato bun.',
        price: 12.00,
        category: 'Burgers',
        dietary: ['Vegan', 'Vegetarian'],
        calories: 590,
        isAvailable: true,
        optionGroups: [
          {
            id: 'vegan-sauce',
            title: 'Sauce Choice',
            required: true,
            maxSelect: 1,
            options: [
              { id: 's-garlic', name: 'Garlic Herb Aioli (Vegan)', price: 0 },
              { id: 's-bbq', name: 'Smoky Chipotle BBQ', price: 0 }
            ]
          }
        ]
      },
      {
        id: 'bg-3',
        name: 'Parmesan Truffle Fries',
        description: 'Crisp hand-cut Idaho potatoes tossed in white truffle oil, sea salt, shaved parmesan, and parsley.',
        price: 5.50,
        category: 'Sides',
        dietary: ['Vegetarian', 'Gluten-Free'],
        calories: 420,
        isAvailable: true
      },
      {
        id: 'bg-4',
        name: 'Salted Caramel Campus Shake',
        description: 'Real vanilla bean ice cream spun with house-made salted caramel and crushed malt biscuit.',
        price: 6.00,
        category: 'Shakes',
        dietary: ['Vegetarian'],
        calories: 520,
        isAvailable: true
      }
    ]
  },
  {
    id: 'spot-wok',
    name: 'Polytechnic Wok & Ramen Lab',
    location: 'Science & Engineering Complex, B-Wing',
    zone: 'Science & Engineering',
    cuisine: 'Japanese Ramen & Sizzling Rice Bowls',
    rating: 4.9,
    reviewCount: 489,
    averageFlightTimeMins: 3.8,
    droneLaunchPad: 'Launch Catapult SE-2',
    coordinates: { x: 74, y: 30 },
    acceptsMealPlan: true,
    menu: [
      {
        id: 'wk-1',
        name: 'Tokyo Tonkotsu Rich Pork Ramen',
        description: '12-hour simmered pork broth, handmade wheat noodles, chashu pork belly, marinated egg, menma bamboo shoots.',
        price: 13.50,
        category: 'Ramen',
        dietary: ['High-Protein'],
        calories: 740,
        isAvailable: true,
        optionGroups: [
          {
            id: 'ramen-spice',
            title: 'Spice Level',
            required: true,
            maxSelect: 1,
            options: [
              { id: 'sp-0', name: 'Mild (Standard Umami)', price: 0 },
              { id: 'sp-1', name: 'Spicy Chili Rayu (+ Level 1)', price: 0 },
              { id: 'sp-2', name: 'Fire Dragon Paste (+ Level 2)', price: 0.50 }
            ]
          },
          {
            id: 'ramen-add',
            title: 'Noodle & Broth Add-ons',
            required: false,
            maxSelect: 2,
            options: [
              { id: 'ad-egg', name: 'Extra Ajitsuke Tamago (Egg)', price: 1.50 },
              { id: 'ad-noodle', name: 'Extra Portion Kaedama Noodles', price: 2.00 },
              { id: 'ad-chashu', name: 'Extra Chashu (2 slices)', price: 3.00 }
            ]
          }
        ]
      },
      {
        id: 'wk-2',
        name: 'Crispy Tofu Hibachi Rice Bowl',
        description: 'Wok-charred sweet chili tofu, stir-fry seasonal vegetables, sticky calrose rice, toasted sesame seeds.',
        price: 11.00,
        category: 'Bowls',
        dietary: ['Vegan', 'Vegetarian', 'Gluten-Free'],
        calories: 510,
        isAvailable: true
      },
      {
        id: 'wk-3',
        name: 'Pan-Fried Chicken Gyoza (6 pcs)',
        description: 'Golden-crisped dumplings served with sweet chili ponzu dipping sauce.',
        price: 6.50,
        category: 'Appetizers',
        dietary: ['High-Protein'],
        calories: 380,
        isAvailable: true
      }
    ]
  },
  {
    id: 'spot-pizza',
    name: 'Red Brick Oven Pizza Co.',
    location: 'North Campus Commons, Building 4',
    zone: 'North Campus',
    cuisine: 'Artisan Wood-Fired Personal Pizzas',
    rating: 4.7,
    reviewCount: 275,
    averageFlightTimeMins: 5.2,
    droneLaunchPad: 'Launch Pad North-1',
    coordinates: { x: 32, y: 20 },
    acceptsMealPlan: true,
    menu: [
      {
        id: 'pz-1',
        name: 'Margherita Fresca (10")',
        description: 'San Marzano tomato base, fresh buffalo mozzarella, fresh basil, cold-pressed olive oil, sourdough crust.',
        price: 11.00,
        category: 'Pizzas',
        dietary: ['Vegetarian'],
        calories: 680,
        isAvailable: true,
        optionGroups: [
          {
            id: 'crust-style',
            title: 'Crust Preference',
            required: true,
            maxSelect: 1,
            options: [
              { id: 'cr-neapolitan', name: 'Traditional Neapolitan', price: 0 },
              { id: 'cr-glutenfree', name: 'Gluten-Free Cauliflower Crust', price: 2.50 }
            ]
          }
        ]
      },
      {
        id: 'pz-2',
        name: 'Spicy Pepperoni & Hot Honey',
        description: 'Cup-and-char artisan pepperoni, aged mozzarella, crushed red pepper flakes, Mike’s hot honey drizzle.',
        price: 13.00,
        category: 'Pizzas',
        dietary: ['High-Protein'],
        calories: 840,
        isAvailable: true
      },
      {
        id: 'pz-3',
        name: 'Cheesy Garlic Pull-Apart Knots',
        description: 'Fresh dough knots drenched in garlic parsley butter, melted mozzarella, with warm marinara dipping sauce.',
        price: 5.00,
        category: 'Sides',
        dietary: ['Vegetarian'],
        calories: 450,
        isAvailable: true
      }
    ]
  },
  {
    id: 'spot-cafe',
    name: 'Caffeine Lab & Study Bakery',
    location: 'Main Library Concourse, Level 1',
    zone: 'Central Quad',
    cuisine: 'Cold Brew, Nitro Espresso & Warm Pastries',
    rating: 4.9,
    reviewCount: 610,
    averageFlightTimeMins: 3.2,
    droneLaunchPad: 'Library Rooftop Dock 2',
    coordinates: { x: 46, y: 42 },
    acceptsMealPlan: true,
    menu: [
      {
        id: 'cf-1',
        name: 'Finals Fuel Nitro Cold Brew (20 oz)',
        description: 'Single-origin Ethiopian cold brew infused with pure nitrogen for a velvety stout-like foam head.',
        price: 5.25,
        category: 'Coffee',
        dietary: ['Vegan', 'Gluten-Free'],
        calories: 5,
        isAvailable: true,
        optionGroups: [
          {
            id: 'milk-type',
            title: 'Milk Selection',
            required: true,
            maxSelect: 1,
            options: [
              { id: 'm-black', name: 'Black (No Milk)', price: 0 },
              { id: 'm-oat', name: 'Oat Milk (Barista Blend)', price: 0.75 },
              { id: 'm-almond', name: 'Almond Milk', price: 0.75 },
              { id: 'm-whole', name: 'Whole Dairy Milk', price: 0 }
            ]
          },
          {
            id: 'syrup-flavor',
            title: 'Flavor Shot',
            required: false,
            maxSelect: 1,
            options: [
              { id: 'sy-vanilla', name: 'Madagascar Vanilla', price: 0.60 },
              { id: 'sy-caramel', name: 'Toasted Caramel', price: 0.60 },
              { id: 'sy-hazelnut', name: 'Brown Sugar Hazelnut', price: 0.60 }
            ]
          }
        ]
      },
      {
        id: 'cf-2',
        name: 'Warm Pistachio Cardamom Croissant',
        description: 'Twice-baked butter croissant filled with spiced almond-pistachio frangipane and dusted with powdered sugar.',
        price: 4.75,
        category: 'Bakery',
        dietary: ['Vegetarian'],
        calories: 360,
        isAvailable: true
      },
      {
        id: 'cf-3',
        name: 'Ceremonial Iced Matcha Latte',
        description: 'Stone-ground Uji ceremonial green tea whisked with creamy oat milk and a touch of wild honey.',
        price: 5.75,
        category: 'Tea',
        dietary: ['Vegetarian', 'Gluten-Free'],
        calories: 140,
        isAvailable: true
      }
    ]
  },
  {
    id: 'spot-green',
    name: 'Campus Green Bowls & Smoothies',
    location: 'Varsity Rec Center Wellness Plaza',
    zone: 'Athletics & South',
    cuisine: 'Organic Grain Bowls, Acai & Cold Pressed Juices',
    rating: 4.8,
    reviewCount: 220,
    averageFlightTimeMins: 4.8,
    droneLaunchPad: 'Launch Bay South-3',
    coordinates: { x: 78, y: 76 },
    acceptsMealPlan: true,
    menu: [
      {
        id: 'gr-1',
        name: 'Superfood Power Protein Bowl',
        description: 'Grilled herb chicken, warm quinoa, avocado, roasted sweet potato, baby kale, toasted pumpkin seeds, tahini dressing.',
        price: 12.50,
        category: 'Bowls',
        dietary: ['Gluten-Free', 'High-Protein'],
        calories: 580,
        isAvailable: true
      },
      {
        id: 'gr-2',
        name: 'Amazonian Acai Energy Bowl',
        description: 'Pure organic acai blend topped with gluten-free coconut granola, fresh strawberries, blueberries, banana, chia seeds.',
        price: 9.50,
        category: 'Bowls',
        dietary: ['Vegan', 'Gluten-Free', 'Vegetarian'],
        calories: 410,
        isAvailable: true
      }
    ]
  }
];

export const INITIAL_DRONE_FLEET: Drone[] = [
  {
    id: 'drone-01',
    callsign: 'DDS-Aero-X1',
    model: 'SkyCargo Hexacopter Pro',
    status: 'in_flight',
    batteryPct: 88,
    currentZone: 'Central Quad',
    totalMissions: 247,
    maxPayloadKg: 3.2
  },
  {
    id: 'drone-02',
    callsign: 'DDS-Swift-02',
    model: 'Apex Urban eVTOL Quad',
    status: 'idle_docked',
    batteryPct: 96,
    currentZone: 'Science & Engineering',
    totalMissions: 189,
    maxPayloadKg: 2.5
  },
  {
    id: 'drone-03',
    callsign: 'DDS-Valkyrie-03',
    model: 'SkyCargo Hexacopter Pro',
    status: 'idle_docked',
    batteryPct: 100,
    currentZone: 'North Campus',
    totalMissions: 312,
    maxPayloadKg: 3.2
  },
  {
    id: 'drone-04',
    callsign: 'DDS-Zephyr-04',
    model: 'Apex Urban eVTOL Quad',
    status: 'maintenance',
    batteryPct: 45,
    currentZone: 'Athletics & South',
    totalMissions: 142,
    maxPayloadKg: 2.5
  }
];
