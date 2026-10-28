export interface StudentUser {
  id: string;
  fullName: string;
  email: string;
  studentIdNumber: string;
  role: 'student' | 'staff' | 'flight_controller';
  campusDormOrBuilding: string;
  mealPlanType: 'Unlimited Plus' | '14-Meal Weekly Swipes' | 'Dining Dollars Only' | 'None (Card Only)';
  diningDollarsBalance: number;
  mealSwipesRemaining: number;
  preferredDropZoneId: string;
}

export const DEMO_USERS: StudentUser[] = [
  {
    id: 'user-01',
    fullName: 'Alex Chen',
    email: 'alex.chen@university.edu',
    studentIdNumber: 'U-9021849',
    role: 'student',
    campusDormOrBuilding: 'Tower Hall Dormitory, Suite 402',
    mealPlanType: '14-Meal Weekly Swipes',
    diningDollarsBalance: 165.50,
    mealSwipesRemaining: 9,
    preferredDropZoneId: 'pad-dorms'
  },
  {
    id: 'user-02',
    fullName: 'Maya Lin',
    email: 'maya.lin@engineering.university.edu',
    studentIdNumber: 'U-782194',
    role: 'student',
    campusDormOrBuilding: 'Turing Robotics & CS Research Lab',
    mealPlanType: 'Unlimited Plus',
    diningDollarsBalance: 240.00,
    mealSwipesRemaining: 24,
    preferredDropZoneId: 'pad-eng'
  },
  {
    id: 'user-03',
    fullName: 'Chef Marco Rossi',
    email: 'm.rossi@dining.university.edu',
    studentIdNumber: 'STAFF-4091',
    role: 'staff',
    campusDormOrBuilding: 'Student Union Dining Services',
    mealPlanType: 'Dining Dollars Only',
    diningDollarsBalance: 310.00,
    mealSwipesRemaining: 0,
    preferredDropZoneId: 'pad-union'
  }
];
