export type CampusZone = 'North Campus' | 'Central Quad' | 'Science & Engineering' | 'Athletics & South' | 'West Dorms';

export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Halal' | 'Kosher' | 'High-Protein';

export interface DropZone {
  id: string;
  name: string;
  code: string;
  zone: CampusZone;
  coordinates: { x: number; y: number }; // Campus grid percentage (0-100)
  description: string;
  padType: 'Rooftop Dock' | 'Ground Pad' | 'Winch Descent Zone';
  restricted: boolean;
}

export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItemOptionGroup {
  id: string;
  title: string;
  required: boolean;
  maxSelect: number;
  options: MenuItemOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary: DietaryTag[];
  calories: number;
  isAvailable: boolean;
  optionGroups?: MenuItemOptionGroup[];
  imageUrl?: string;
}

export interface DiningSpot {
  id: string;
  name: string;
  location: string;
  zone: CampusZone;
  cuisine: string;
  rating: number;
  reviewCount: number;
  averageFlightTimeMins: number;
  droneLaunchPad: string;
  coordinates: { x: number; y: number };
  acceptsMealPlan: boolean;
  menu: MenuItem[];
}

export interface CartItemOption {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  diningSpotId: string;
  diningSpotName: string;
  quantity: number;
  selectedOptions: CartItemOption[];
  specialInstructions?: string;
  totalItemPrice: number;
}

export type OrderFlightStatus =
  | 'received'
  | 'preparing'
  | 'drone_loading'
  | 'airborne'
  | 'descending_winch'
  | 'delivered'
  | 'cancelled';

export interface DroneTelemetry {
  droneId: string;
  droneModel: string;
  batteryPct: number;
  altitudeMeters: number;
  airspeedKmh: number;
  windSpeedKnots: number;
  payloadKg: number;
  gpsCoordinates: { x: number; y: number };
  headingDegrees: number;
}

export interface Order {
  id: string;
  studentName: string;
  studentIdNumber: string;
  diningSpot: DiningSpot;
  items: CartItem[];
  dropZone: DropZone;
  status: OrderFlightStatus;
  subtotal: number;
  mealPlanDiscount: number;
  droneFlightFee: number;
  campusServiceFee: number;
  tip: number;
  grandTotal: number;
  paymentMethod: 'Campus Meal Plan' | 'Dining Dollars' | 'Credit Card' | 'Apple Pay';
  placedAt: string;
  estimatedArrivalAt: string;
  telemetry: DroneTelemetry;
  flightProgressPct: number; // 0 to 100
}

export interface Drone {
  id: string;
  callsign: string;
  model: string;
  status: 'idle_docked' | 'loading' | 'in_flight' | 'descending' | 'returning' | 'maintenance';
  batteryPct: number;
  currentZone: CampusZone;
  assignedOrderId?: string;
  totalMissions: number;
  maxPayloadKg: number;
}
