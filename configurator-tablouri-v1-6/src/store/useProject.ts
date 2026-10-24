import { create } from 'zustand';
import type { PhaseType, PlacedDevice, Project } from '../types';

const STORAGE_KEY = 'configurator-tablouri-v1-6';

const emptyProject: Project = {
  phaseType: 'monofazic',
  installedPowerKw: 0,
  panelId: null,
  devices: []
};

function load(): Project {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyProject, ...JSON.parse(raw) } : emptyProject;
  } catch {
    return emptyProject;
  }
}

interface State {
  project: Project;
  step: number;
  setStep: (step: number) => void;
  setPhaseType: (phaseType: PhaseType) => void;
  setPower: (kw: number) => void;
  setPanel: (panelId: string | null) => void;
  addDevice: (device: PlacedDevice) => void;
  removeDevice: (uid: string) => void;
  moveDevice: (uid: string, rowIndex: number, position: number) => void;
  renameCircuit: (uid: string, name: string) => void;
  reset: () => void;
}

export const useProject = create<State>((set, get) => ({
  project: load(),
  step: 1,
  setStep: step => {
    set({ step });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(get().project));
  },
  setPhaseType: phaseType => {
    const project = { ...get().project, phaseType };
    set({ project });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  },
  setPower: installedPowerKw => {
    const project = { ...get().project, installedPowerKw };
    set({ project });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  },
  setPanel: panelId => {
    const project = { ...get().project, panelId };
    set({ project });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  },
  addDevice: device => {
    const project = { ...get().project, devices: [...get().project.devices, device] };
    set({ project });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  },
  removeDevice: uid => {
    const project = { ...get().project, devices: get().project.devices.filter(d => d.uid !== uid) };
    set({ project });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  },
  moveDevice: (uid, rowIndex, position) => {
    const project = {
      ...get().project,
      devices: get().project.devices.map(d => d.uid === uid ? { ...d, rowIndex, position } : d)
    };
    set({ project });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  },
  renameCircuit: (uid, circuitName) => {
    const project = {
      ...get().project,
      devices: get().project.devices.map(d => d.uid === uid ? { ...d, circuitName } : d)
    };
    set({ project });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  },
  reset: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ project: emptyProject, step: 1 });
  }
}));
