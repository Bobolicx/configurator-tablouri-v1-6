export type PhaseType = 'monofazic' | 'trifazic';

export interface Panel {
  id: string;
  sku: string;
  name: string;
  manufacturer: string;
  mounting: 'incasabil' | 'aplicat';
  rows: number;
  modulesPerRow: number;
  price: number;
  stock: number;
}

export interface Device {
  id: string;
  sku: string;
  name: string;
  manufacturer: string;
  category: 'general' | 'mcb' | 'rcd' | 'rcbo' | 'spd';
  poles: number;
  ratedCurrentA?: number;
  modules: number;
  price: number;
  stock: number;
}

export interface PlacedDevice {
  uid: string;
  deviceId: string;
  rowIndex: number;
  position: number;
  circuitName: string;
}

export interface Project {
  phaseType: PhaseType;
  installedPowerKw: number;
  panelId: string | null;
  devices: PlacedDevice[];
}
