import type { Device, Panel, Project } from '../types';

export function estimatedCurrentA(project: Project): number | null {
  if (!project.installedPowerKw) return null;
  if (project.phaseType === 'monofazic') {
    return (project.installedPowerKw * 1000) / 230;
  }
  return (project.installedPowerKw * 1000) / (Math.sqrt(3) * 400);
}

export function usedModules(project: Project, devices: Device[]): number {
  return project.devices.reduce((sum, placed) => {
    const device = devices.find(d => d.id === placed.deviceId);
    return sum + (device?.modules ?? 0);
  }, 0);
}

export function panelCapacity(panel: Panel | null): number {
  return panel ? panel.rows * panel.modulesPerRow : 0;
}
