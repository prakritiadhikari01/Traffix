
// Firebase service structure for Traffix Control System
// This provides the complete data structure for both Realtime Database and Firestore

export interface TrafficData {
  current_green: 'north' | 'south' | 'east' | 'west';
  last_updated: string;
  cycle_start_time: string;
  next_switch_time: string;
  vehicle_counts: {
    north: VehicleCount;
    south: VehicleCount;
    east: VehicleCount;
    west: VehicleCount;
  };
  wait_times: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  congestion_levels: {
    north: CongestionLevel;
    south: CongestionLevel;
    east: CongestionLevel;
    west: CongestionLevel;
  };
  system_status: 'active' | 'maintenance' | 'error';
  auto_mode: boolean;
}

export interface VehicleCount {
  car: number;
  bike: number;
  truck: number;
  bus: number;
  total: number;
  last_updated: string;
}

export interface CongestionLevel {
  score: number; // 0-100
  status: 'clear' | 'normal' | 'heavy' | 'critical';
  color: 'emerald' | 'amber' | 'red';
  last_updated: string;
}

export interface TrafficLog {
  id?: string;
  timestamp: string;
  green_direction: string;
  switch_reason: 'timer' | 'congestion' | 'manual' | 'emergency';
  vehicle_counts: Record<string, number>;
  congestion_scores: Record<string, number>;
  decision_reason: string;
  duration_seconds: number;
}

export interface CongestionHistory {
  id?: string;
  direction: string;
  timestamp: string;
  score: number;
  wait_time: number;
  vehicle_count: number;
  weather_condition?: string;
  peak_hour: boolean;
}

export interface SystemSettings {
  min_green_time: number; // seconds
  max_green_time: number; // seconds
  yellow_light_duration: number; // seconds
  congestion_threshold: number; // 0-100
  auto_mode_enabled: boolean;
  emergency_override: boolean;
  maintenance_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrafficStats {
  date: string;
  total_vehicles: number;
  peak_hour_start: string;
  peak_hour_end: string;
  average_wait_time: number;
  direction_stats: {
    north: DirectionStats;
    south: DirectionStats;
    east: DirectionStats;
    west: DirectionStats;
  };
}

export interface DirectionStats {
  total_vehicles: number;
  average_wait_time: number;
  max_congestion_score: number;
  green_light_duration_total: number;
  green_light_count: number;
}

// Mock data for demonstration
export const mockTrafficData: TrafficData = {
  current_green: 'north',
  last_updated: new Date().toISOString(),
  cycle_start_time: new Date(Date.now() - 30000).toISOString(),
  next_switch_time: new Date(Date.now() + 30000).toISOString(),
  vehicle_counts: {
    north: { car: 8, bike: 3, truck: 1, bus: 0, total: 12, last_updated: new Date().toISOString() },
    south: { car: 6, bike: 2, truck: 0, bus: 0, total: 8, last_updated: new Date().toISOString() },
    east: { car: 2, bike: 1, truck: 0, bus: 0, total: 3, last_updated: new Date().toISOString() },
    west: { car: 10, bike: 4, truck: 1, bus: 0, total: 15, last_updated: new Date().toISOString() }
  },
  wait_times: {
    north: 25,
    south: 145,
    east: 89,
    west: 203
  },
  congestion_levels: {
    north: { score: 85, status: 'critical', color: 'red', last_updated: new Date().toISOString() },
    south: { score: 45, status: 'normal', color: 'amber', last_updated: new Date().toISOString() },
    east: { score: 15, status: 'clear', color: 'emerald', last_updated: new Date().toISOString() },
    west: { score: 78, status: 'heavy', color: 'red', last_updated: new Date().toISOString() }
  },
  system_status: 'active',
  auto_mode: true
};

// Firebase Realtime Database structure
export class FirebaseRealtimeService {
  /*
  REALTIME DATABASE STRUCTURE:
  
  traffic_system/
  ├── current_state/
  │   ├── current_green: "north"
  │   ├── last_updated: "2024-01-15T10:30:00Z"
  │   ├── cycle_start_time: "2024-01-15T10:29:30Z"
  │   ├── next_switch_time: "2024-01-15T10:30:30Z"
  │   ├── system_status: "active"
  │   └── auto_mode: true
  ├── vehicle_counts/
  │   ├── north/
  │   │   ├── car: 8
  │   │   ├── bike: 3
  │   │   ├── truck: 1
  │   │   ├── bus: 0
  │   │   ├── total: 12
  │   │   └── last_updated: "2024-01-15T10:30:00Z"
  │   ├── south/ (same structure)
  │   ├── east/ (same structure)
  │   └── west/ (same structure)
  ├── wait_times/
  │   ├── north: 25
  │   ├── south: 145
  │   ├── east: 89
  │   └── west: 203
  ├── congestion_levels/
  │   ├── north/
  │   │   ├── score: 85
  │   │   ├── status: "critical"
  │   │   ├── color: "red"
  │   │   └── last_updated: "2024-01-15T10:30:00Z"
  │   ├── south/ (same structure)
  │   ├── east/ (same structure)
  │   └── west/ (same structure)
  └── settings/
      ├── min_green_time: 30
      ├── max_green_time: 120
      ├── yellow_light_duration: 3
      ├── congestion_threshold: 70
      ├── auto_mode_enabled: true
      ├── emergency_override: false
      └── maintenance_mode: false
  */

  static async updateCurrentState(data: Partial<TrafficData>) {
    console.log('Updating Realtime DB current state:', data);
    // firebase.database().ref('traffic_system/current_state').update(data)
  }

  static async updateVehicleCounts(direction: string, counts: VehicleCount) {
    console.log(`Updating vehicle counts for ${direction}:`, counts);
    // firebase.database().ref(`traffic_system/vehicle_counts/${direction}`).set(counts)
  }

  static async updateCongestionLevel(direction: string, congestion: CongestionLevel) {
    console.log(`Updating congestion for ${direction}:`, congestion);
    // firebase.database().ref(`traffic_system/congestion_levels/${direction}`).set(congestion)
  }

  static async listenToTrafficData(callback: (data: TrafficData) => void) {
    console.log('Listening to traffic data changes...');
    // firebase.database().ref('traffic_system').on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   callback(data);
    // });
    
    // Mock real-time updates
    setInterval(() => {
      callback(mockTrafficData);
    }, 5000);
  }

  static async switchTrafficLight(direction: 'north' | 'south' | 'east' | 'west', reason: string) {
    console.log(`Switching traffic light to ${direction}, reason: ${reason}`);
    // firebase.database().ref('traffic_system/current_state').update({
    //   current_green: direction,
    //   last_updated: new Date().toISOString(),
    //   cycle_start_time: new Date().toISOString()
    // });
  }
}

// Firestore Collections structure
export class FirestoreService {
  /*
  FIRESTORE COLLECTIONS STRUCTURE:
  
  📁 traffic_logs/
  └── 📄 {auto-id}/
      ├── timestamp: "2024-01-15T10:30:00Z"
      ├── green_direction: "north"
      ├── switch_reason: "congestion"
      ├── vehicle_counts: { north: 12, south: 8, east: 3, west: 15 }
      ├── congestion_scores: { north: 85, south: 45, east: 15, west: 78 }
      ├── decision_reason: "High congestion in north direction"
      └── duration_seconds: 45
  
  📁 congestion_history/
  └── 📄 {auto-id}/
      ├── direction: "north"
      ├── timestamp: "2024-01-15T10:30:00Z"
      ├── score: 85
      ├── wait_time: 25
      ├── vehicle_count: 12
      ├── weather_condition: "clear"
      └── peak_hour: true
  
  📁 daily_stats/
  └── 📄 2024-01-15/
      ├── date: "2024-01-15"
      ├── total_vehicles: 2847
      ├── peak_hour_start: "08:00"
      ├── peak_hour_end: "10:00"
      ├── average_wait_time: 89
      └── direction_stats: {
          north: { total_vehicles: 712, average_wait_time: 67, ... },
          south: { total_vehicles: 698, average_wait_time: 72, ... },
          east: { total_vehicles: 723, average_wait_time: 105, ... },
          west: { total_vehicles: 714, average_wait_time: 112, ... }
      }
  
  📁 system_events/
  └── 📄 {auto-id}/
      ├── timestamp: "2024-01-15T10:30:00Z"
      ├── event_type: "manual_override" | "system_error" | "maintenance_start" | "emergency"
      ├── description: "Manual override activated by operator"
      ├── operator_id: "user123"
      └── resolved: false
  
  📁 settings/
  └── 📄 current/
      ├── min_green_time: 30
      ├── max_green_time: 120
      ├── yellow_light_duration: 3
      ├── congestion_threshold: 70
      ├── auto_mode_enabled: true
      ├── emergency_override: false
      ├── maintenance_mode: false
      ├── created_at: "2024-01-15T10:30:00Z"
      └── updated_at: "2024-01-15T10:30:00Z"
  */

  static async addTrafficLog(log: TrafficLog) {
    console.log('Adding traffic log to Firestore:', log);
    // firebase.firestore().collection('traffic_logs').add({
    //   ...log,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
    // });
  }

  static async addCongestionHistory(history: CongestionHistory) {
    console.log('Adding congestion history:', history);
    // firebase.firestore().collection('congestion_history').add({
    //   ...history,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
    // });
  }

  static async getTrafficLogs(limit: number = 50): Promise<TrafficLog[]> {
    console.log(`Getting latest ${limit} traffic logs`);
    // return firebase.firestore()
    //   .collection('traffic_logs')
    //   .orderBy('timestamp', 'desc')
    //   .limit(limit)
    //   .get()
    //   .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TrafficLog)));
    
    return []; // Mock data
  }

  static async getCongestionHistory(direction: string, hours: number = 24): Promise<CongestionHistory[]> {
    console.log(`Getting congestion history for ${direction} (${hours}h)`);
    const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    // return firebase.firestore()
    //   .collection('congestion_history')
    //   .where('direction', '==', direction)
    //   .where('timestamp', '>=', startTime)
    //   .orderBy('timestamp', 'desc')
    //   .get()
    //   .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CongestionHistory)));
    
    return []; // Mock data
  }

  static async getDailyStats(date: string): Promise<TrafficStats | null> {
    console.log(`Getting daily stats for ${date}`);
    // return firebase.firestore()
    //   .collection('daily_stats')
    //   .doc(date)
    //   .get()
    //   .then(doc => doc.exists ? doc.data() as TrafficStats : null);
    
    return null; // Mock data
  }

  static async updateSystemSettings(settings: Partial<SystemSettings>) {
    console.log('Updating system settings:', settings);
    // firebase.firestore()
    //   .collection('settings')
    //   .doc('current')
    //   .update({
    //     ...settings,
    //     updated_at: firebase.firestore.FieldValue.serverTimestamp()
    //   });
  }
}

// Helper functions for React components
export const getCurrentTrafficData = async (): Promise<TrafficData> => {
  console.log('Getting current traffic data...');
  return mockTrafficData;
};

export const getTrafficLogs = async (limit: number = 50): Promise<TrafficLog[]> => {
  return FirestoreService.getTrafficLogs(limit);
};

export const getCongestionHistory = async (direction: string, hours: number = 24): Promise<CongestionHistory[]> => {
  return FirestoreService.getCongestionHistory(direction, hours);
};

// Example React Hook for real-time data
/*
import { useState, useEffect } from 'react';
import { FirebaseRealtimeService, TrafficData, mockTrafficData } from '@/services/firebaseService';

export const useTrafficData = () => {
  const [trafficData, setTrafficData] = useState<TrafficData>(mockTrafficData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = FirebaseRealtimeService.listenToTrafficData((data) => {
      setTrafficData(data);
      setLoading(false);
    });

    return () => {
      // unsubscribe if needed
    };
  }, []);

  return { trafficData, loading, error };
};

// Usage in components:
const { trafficData, loading, error } = useTrafficData();
*/
