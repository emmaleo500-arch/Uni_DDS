import { Order } from '../types/uniDds';
import { CAMPUS_DINING_SPOTS, CAMPUS_DROP_ZONES } from './campusData';

export const getPast10StudentOrders = (studentName: string, studentId: string): Order[] => {
  const burgerSpot = CAMPUS_DINING_SPOTS[0];
  const wokSpot = CAMPUS_DINING_SPOTS[1];
  const pizzaSpot = CAMPUS_DINING_SPOTS[2];
  const cafeSpot = CAMPUS_DINING_SPOTS[3];
  const saladSpot = CAMPUS_DINING_SPOTS[4];

  const engPad = CAMPUS_DROP_ZONES[0];
  const libPad = CAMPUS_DROP_ZONES[1];
  const dormPad = CAMPUS_DROP_ZONES[2];
  const unionPad = CAMPUS_DROP_ZONES[3];
  const athPad = CAMPUS_DROP_ZONES[4];
  const gradPad = CAMPUS_DROP_ZONES[5];

  return [
    {
      id: 'DDS-8419',
      studentName,
      studentIdNumber: studentId,
      diningSpot: burgerSpot,
      dropZone: engPad,
      status: 'delivered',
      subtotal: 17.00,
      mealPlanDiscount: 1.70,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 2.00,
      grandTotal: 20.78,
      paymentMethod: 'Campus Meal Plan',
      placedAt: 'Today · 12:28 PM',
      estimatedArrivalAt: '12:33 PM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-1-1',
          menuItem: burgerSpot.menu[0], // Dean's Double Wagyu Smash
          diningSpotId: burgerSpot.id,
          diningSpotName: burgerSpot.name,
          quantity: 1,
          selectedOptions: [
            {
              groupId: 'cheese-choice',
              groupTitle: 'Cheese',
              optionId: 'ch-cheddar',
              optionName: 'Sharp Cheddar',
              price: 0
            }
          ],
          totalItemPrice: 11.50
        },
        {
          id: 'hist-1-2',
          menuItem: burgerSpot.menu[2], // Parmesan Truffle Fries
          diningSpotId: burgerSpot.id,
          diningSpotName: burgerSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 5.50
        }
      ],
      telemetry: {
        droneId: 'DDS-Aero-X1',
        droneModel: 'SkyCargo Hexacopter Pro',
        batteryPct: 91,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 7,
        payloadKg: 1.35,
        gpsCoordinates: { x: engPad.coordinates.x, y: engPad.coordinates.y },
        headingDegrees: 45
      }
    },
    {
      id: 'DDS-8302',
      studentName,
      studentIdNumber: studentId,
      diningSpot: wokSpot,
      dropZone: libPad,
      status: 'delivered',
      subtotal: 20.00,
      mealPlanDiscount: 2.00,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 2.50,
      grandTotal: 23.98,
      paymentMethod: 'Dining Dollars',
      placedAt: 'Yesterday · 6:45 PM',
      estimatedArrivalAt: '6:50 PM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-2-1',
          menuItem: wokSpot.menu[0], // Tokyo Tonkotsu Ramen
          diningSpotId: wokSpot.id,
          diningSpotName: wokSpot.name,
          quantity: 1,
          selectedOptions: [
            {
              groupId: 'ramen-spice',
              groupTitle: 'Spice',
              optionId: 'sp-1',
              optionName: 'Spicy Chili Rayu (+ Level 1)',
              price: 0
            }
          ],
          totalItemPrice: 13.50
        },
        {
          id: 'hist-2-2',
          menuItem: wokSpot.menu[2], // Chicken Gyoza
          diningSpotId: wokSpot.id,
          diningSpotName: wokSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 6.50
        }
      ],
      telemetry: {
        droneId: 'DDS-Swift-02',
        droneModel: 'Apex Urban eVTOL Quad',
        batteryPct: 88,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 6,
        payloadKg: 1.25,
        gpsCoordinates: { x: libPad.coordinates.x, y: libPad.coordinates.y },
        headingDegrees: 180
      }
    },
    {
      id: 'DDS-8195',
      studentName,
      studentIdNumber: studentId,
      diningSpot: cafeSpot,
      dropZone: dormPad,
      status: 'delivered',
      subtotal: 10.00,
      mealPlanDiscount: 1.00,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 1.50,
      grandTotal: 13.98,
      paymentMethod: 'Campus Meal Plan',
      placedAt: 'Oct 25, 2026 · 8:15 AM',
      estimatedArrivalAt: '8:19 AM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-3-1',
          menuItem: cafeSpot.menu[0], // Finals Fuel Nitro Cold Brew
          diningSpotId: cafeSpot.id,
          diningSpotName: cafeSpot.name,
          quantity: 1,
          selectedOptions: [
            {
              groupId: 'milk-type',
              groupTitle: 'Milk',
              optionId: 'm-oat',
              optionName: 'Oat Milk (Barista Blend)',
              price: 0.75
            }
          ],
          totalItemPrice: 6.00
        },
        {
          id: 'hist-3-2',
          menuItem: cafeSpot.menu[1], // Pistachio Croissant
          diningSpotId: cafeSpot.id,
          diningSpotName: cafeSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 4.75
        }
      ],
      telemetry: {
        droneId: 'DDS-Valkyrie-03',
        droneModel: 'SkyCargo Hexacopter Pro',
        batteryPct: 95,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 5,
        payloadKg: 0.65,
        gpsCoordinates: { x: dormPad.coordinates.x, y: dormPad.coordinates.y },
        headingDegrees: 90
      }
    },
    {
      id: 'DDS-8041',
      studentName,
      studentIdNumber: studentId,
      diningSpot: pizzaSpot,
      dropZone: unionPad,
      status: 'delivered',
      subtotal: 16.00,
      mealPlanDiscount: 1.60,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 2.00,
      grandTotal: 19.88,
      paymentMethod: 'Campus Meal Plan',
      placedAt: 'Oct 24, 2026 · 1:10 PM',
      estimatedArrivalAt: '1:16 PM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-4-1',
          menuItem: pizzaSpot.menu[0], // Margherita Fresca
          diningSpotId: pizzaSpot.id,
          diningSpotName: pizzaSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 11.00
        },
        {
          id: 'hist-4-2',
          menuItem: pizzaSpot.menu[2], // Cheesy Garlic Knots
          diningSpotId: pizzaSpot.id,
          diningSpotName: pizzaSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 5.00
        }
      ],
      telemetry: {
        droneId: 'DDS-Aero-X1',
        droneModel: 'SkyCargo Hexacopter Pro',
        batteryPct: 89,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 8,
        payloadKg: 1.45,
        gpsCoordinates: { x: unionPad.coordinates.x, y: unionPad.coordinates.y },
        headingDegrees: 120
      }
    },
    {
      id: 'DDS-7922',
      studentName,
      studentIdNumber: studentId,
      diningSpot: saladSpot,
      dropZone: athPad,
      status: 'delivered',
      subtotal: 12.50,
      mealPlanDiscount: 1.25,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 1.50,
      grandTotal: 16.23,
      paymentMethod: 'Dining Dollars',
      placedAt: 'Oct 22, 2026 · 12:05 PM',
      estimatedArrivalAt: '12:10 PM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-5-1',
          menuItem: saladSpot.menu[0], // Superfood Power Protein Bowl
          diningSpotId: saladSpot.id,
          diningSpotName: saladSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 12.50
        }
      ],
      telemetry: {
        droneId: 'DDS-Swift-02',
        droneModel: 'Apex Urban eVTOL Quad',
        batteryPct: 94,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 4,
        payloadKg: 0.85,
        gpsCoordinates: { x: athPad.coordinates.x, y: athPad.coordinates.y },
        headingDegrees: 210
      }
    },
    {
      id: 'DDS-7810',
      studentName,
      studentIdNumber: studentId,
      diningSpot: burgerSpot,
      dropZone: gradPad,
      status: 'delivered',
      subtotal: 17.50,
      mealPlanDiscount: 1.75,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 2.00,
      grandTotal: 21.23,
      paymentMethod: 'Campus Meal Plan',
      placedAt: 'Oct 20, 2026 · 7:30 PM',
      estimatedArrivalAt: '7:35 PM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-6-1',
          menuItem: burgerSpot.menu[1], // Beyond Botany Vegan Smash
          diningSpotId: burgerSpot.id,
          diningSpotName: burgerSpot.name,
          quantity: 1,
          selectedOptions: [
            {
              groupId: 'vegan-sauce',
              groupTitle: 'Sauce',
              optionId: 's-garlic',
              optionName: 'Garlic Herb Aioli (Vegan)',
              price: 0
            }
          ],
          totalItemPrice: 12.00
        },
        {
          id: 'hist-6-2',
          menuItem: burgerSpot.menu[2], // Truffle Fries
          diningSpotId: burgerSpot.id,
          diningSpotName: burgerSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 5.50
        }
      ],
      telemetry: {
        droneId: 'DDS-Valkyrie-03',
        droneModel: 'SkyCargo Hexacopter Pro',
        batteryPct: 92,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 6,
        payloadKg: 1.20,
        gpsCoordinates: { x: gradPad.coordinates.x, y: gradPad.coordinates.y },
        headingDegrees: 15
      }
    },
    {
      id: 'DDS-7694',
      studentName,
      studentIdNumber: studentId,
      diningSpot: pizzaSpot,
      dropZone: dormPad,
      status: 'delivered',
      subtotal: 13.00,
      mealPlanDiscount: 1.30,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 2.00,
      grandTotal: 17.18,
      paymentMethod: 'Campus Meal Plan',
      placedAt: 'Oct 18, 2026 · 9:15 PM',
      estimatedArrivalAt: '9:21 PM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-7-1',
          menuItem: pizzaSpot.menu[1], // Spicy Pepperoni & Hot Honey
          diningSpotId: pizzaSpot.id,
          diningSpotName: pizzaSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 13.00
        }
      ],
      telemetry: {
        droneId: 'DDS-Aero-X1',
        droneModel: 'SkyCargo Hexacopter Pro',
        batteryPct: 86,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 9,
        payloadKg: 0.95,
        gpsCoordinates: { x: dormPad.coordinates.x, y: dormPad.coordinates.y },
        headingDegrees: 270
      }
    },
    {
      id: 'DDS-7540',
      studentName,
      studentIdNumber: studentId,
      diningSpot: wokSpot,
      dropZone: libPad,
      status: 'delivered',
      subtotal: 17.50,
      mealPlanDiscount: 1.75,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 2.00,
      grandTotal: 21.23,
      paymentMethod: 'Dining Dollars',
      placedAt: 'Oct 15, 2026 · 1:40 PM',
      estimatedArrivalAt: '1:45 PM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-8-1',
          menuItem: wokSpot.menu[1], // Crispy Tofu Hibachi Rice Bowl
          diningSpotId: wokSpot.id,
          diningSpotName: wokSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 11.00
        },
        {
          id: 'hist-8-2',
          menuItem: wokSpot.menu[2], // Gyoza
          diningSpotId: wokSpot.id,
          diningSpotName: wokSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 6.50
        }
      ],
      telemetry: {
        droneId: 'DDS-Swift-02',
        droneModel: 'Apex Urban eVTOL Quad',
        batteryPct: 90,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 5,
        payloadKg: 1.10,
        gpsCoordinates: { x: libPad.coordinates.x, y: libPad.coordinates.y },
        headingDegrees: 180
      }
    },
    {
      id: 'DDS-7412',
      studentName,
      studentIdNumber: studentId,
      diningSpot: cafeSpot,
      dropZone: engPad,
      status: 'delivered',
      subtotal: 10.50,
      mealPlanDiscount: 1.05,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 1.50,
      grandTotal: 14.43,
      paymentMethod: 'Campus Meal Plan',
      placedAt: 'Oct 12, 2026 · 10:20 AM',
      estimatedArrivalAt: '10:24 AM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-9-1',
          menuItem: cafeSpot.menu[2], // Ceremonial Iced Matcha Latte
          diningSpotId: cafeSpot.id,
          diningSpotName: cafeSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 5.75
        },
        {
          id: 'hist-9-2',
          menuItem: cafeSpot.menu[1], // Pistachio Croissant
          diningSpotId: cafeSpot.id,
          diningSpotName: cafeSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 4.75
        }
      ],
      telemetry: {
        droneId: 'DDS-Valkyrie-03',
        droneModel: 'SkyCargo Hexacopter Pro',
        batteryPct: 96,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 4,
        payloadKg: 0.70,
        gpsCoordinates: { x: engPad.coordinates.x, y: engPad.coordinates.y },
        headingDegrees: 60
      }
    },
    {
      id: 'DDS-7288',
      studentName,
      studentIdNumber: studentId,
      diningSpot: saladSpot,
      dropZone: unionPad,
      status: 'delivered',
      subtotal: 9.50,
      mealPlanDiscount: 0.95,
      droneFlightFee: 2.49,
      campusServiceFee: 0.99,
      tip: 1.50,
      grandTotal: 13.53,
      paymentMethod: 'Dining Dollars',
      placedAt: 'Oct 09, 2026 · 3:15 PM',
      estimatedArrivalAt: '3:20 PM',
      flightProgressPct: 100,
      items: [
        {
          id: 'hist-10-1',
          menuItem: saladSpot.menu[1], // Amazonian Acai Energy Bowl
          diningSpotId: saladSpot.id,
          diningSpotName: saladSpot.name,
          quantity: 1,
          selectedOptions: [],
          totalItemPrice: 9.50
        }
      ],
      telemetry: {
        droneId: 'DDS-Aero-X1',
        droneModel: 'SkyCargo Hexacopter Pro',
        batteryPct: 93,
        altitudeMeters: 0,
        airspeedKmh: 0,
        windSpeedKnots: 6,
        payloadKg: 0.60,
        gpsCoordinates: { x: unionPad.coordinates.x, y: unionPad.coordinates.y },
        headingDegrees: 150
      }
    }
  ];
};
