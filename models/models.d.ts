export interface CrewStatus {
  code: number;
  value: string;
}

export interface CrewAssigned {
  id: number;
  name: string;
  district: string;
  status: CrewStatus;
  assignedAt: string; // Use Date if you plan to parse the date string
  members: any[]; // You can define a more specific type if you have member details
  isLeadCrew: boolean;
}

export interface IncidentCause {
  code: number;
  value: string;
}

export interface WeatherCondition {
  code: number;
  value: string;
}

export interface IncidentStatus {
  code: number;
  value: string;
}

export interface TroubleInfo {
  code: number;
  value: string;
}

export interface DeviceType {
  code: number;
  value: string;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface PointOfContact {
  incidentId: number;
  action: string;
  notes: string;
  employeeId: number;
  createdAt: string;
}

export interface Incident {
  id: number;
  historyId: number;
  isActive: boolean;
  isCritical: boolean;
  isPlanned: boolean;
  isConfirmed: boolean;
  isGMP: boolean;
  customerCount: number;
  messageCount: number | null;
  criticalCustomerCount: number;
  customersByTown: { [key: string]: number };
  dispatcherRemarks: string | null;
  cause: IncidentCause;
  weather: WeatherCondition;
  status: IncidentStatus;
  trouble: TroubleInfo;
  deviceType: DeviceType;
  taglet: string;
  linePole: string;
  street: string;
  incidentAddress: string;
  district: string;
  region: string;
  town: string;
  county: string;
  feeder: string;
  substation: string;
  crewsAssigned: CrewAssigned[];
  location: Location;
  estimatedRestoredAt: string | null; // Use Date if you plan to parse the date string
  restoredAt: string | null; // Use Date if you plan to parse the date string
  durationMinutes: number;
  createdAt: string; // Use Date if you plan to parse the date string
  modifiedAt: string | null; // Use Date if you plan to parse the date string
  versionId: string;
  etrEarliest: string | null; // Use Date if you plan to parse the date string
  etrLatest: string | null; // Use Date if you plan to parse the date string
  distanceInMiles: number;
  contactPhone: string;
}

export interface IncidentPOC { 
  incident: Incident;
  pointOfContact: PointOfContact;
}
