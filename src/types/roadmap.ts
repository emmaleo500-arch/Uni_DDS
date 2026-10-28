export type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';

export type Track = 'all' | 'frontend' | 'backend' | 'product_ux' | 'operations';

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  track: 'frontend' | 'backend' | 'product_ux' | 'operations';
  sprint: number; // e.g. Sprint 1 to 12
  startWeek: number;
  endWeek: number;
  status: TaskStatus;
  assigneeRole: string;
  deliverable: string;
  dependencies?: string[];
  isMilestone?: boolean;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  name: string;
  durationLabel: string;
  startWeek: number;
  endWeek: number;
  objective: string;
  keyOutcomes: string[];
  tasks: RoadmapTask[];
}

export interface Milestone {
  id: string;
  week: number;
  title: string;
  phaseId: string;
  description: string;
  criteria: string[];
  status: 'pending' | 'reached';
}

export interface ModuleFeature {
  id: string;
  name: string;
  description: string;
  priority: 'P0 - MVP Essential' | 'P1 - High Priority' | 'P2 - Fast Follow';
  techStack: string;
  apiEndpoint?: string;
}

export interface PlatformModule {
  id: 'customer' | 'restaurant' | 'driver' | 'admin';
  name: string;
  targetPlatform: string;
  userPersona: string;
  summary: string;
  features: ModuleFeature[];
  keyChallenges: string[];
}

export interface DatabaseTable {
  name: string;
  description: string;
  columns: {
    name: string;
    type: string;
    constraints?: string;
    description: string;
  }[];
  sqlDefinition: string;
}

export interface UnitEconomicsParams {
  averageOrderValue: number;
  restaurantCommissionPct: number;
  deliveryFeeToCustomer: number;
  serviceFeeToCustomer: number;
  driverPayoutPerOrder: number;
  paymentGatewayFeePct: number;
  paymentGatewayFixedFee: number;
  monthlyOrderVolume: number;
  customerAcquisitionCost: number;
  restaurantAcquisitionCost: number;
  cloudInfraBaseMonthly: number;
}
