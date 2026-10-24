import { useState } from 'react';
import { demoDevices, demoPanels } from '../data/catalog';
import { useProject } from '../store/useProject';
import { panelCapacity, usedModules } from '../lib/calculations';

export default function Step3() {
  const { project, addDevice, removeDevice, moveDevice, renameCircuit, setStep } = useProject();
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [picker, setPicker] = useState<{ row: number; position: number } | null>(null);
  const [moveMode, setMoveMode] = useState(false);

  const panel = demoPanels.find(p => p.id === project.panelId) ?? null;
  const capacity = panelCapacity(panel);
  const used = usedModules(project, demoDevices);

  function isFree(row: number, position: number, modules: number, ignoreUid?: string) {
    if (!panel) return false;
    if (position + modules > panel.modulesPerRow) return false;
    return !project.devices.some(placed => {
      if (placed.uid === ignoreUid) return false;
      if (placed.rowIndex !== row) return false;
      const device = demoDevices.find(d => d.id === placed.deviceId);
      if (!device) return false;
      return position < placed.position + device.modules && placed.position < position + modules;
    });
  }

  function tapSlot(row: number, position: number) {
    const item = project.devices.find(p => {
      const device = demoDevices.find(d => d.id === p.deviceId);
      return device && p.rowIndex === row && position >= p.position && position < p.position + device.modules;
    });
    if (item) {
      setSelectedUid(item.uid);
      setPicker(null);
      return;
    }
    if (moveMode && selectedUid) {
      const selected = project.devices.find(p => p.uid === selectedUid);
      const device = selected ? demoDevices.find(d => d.id === selected.deviceId) : null;
      if (!selected || !device) return;
      if (!isFree(row, position, device.modules, selectedUid)) {
        alert('Poziția nu este liberă.');
        return;
      }
      moveDevice(selectedUid, row, position);
      setMoveMode(false);
      return;
    }
    setSelectedUid(null);
    setPicker({ row, position });
  }

  const selected = project.devices.find(p => p.uid === selectedUid);
  const selectedDevice = selected ? demoDevices.find(d => d.id === selected.deviceId) : null;

  return (
    <div className="card">
      <h2>Pasul 3 — Echiparea tabloului</h2>
      <div className="rail">
        {panel && Array.from({ length: panel.rows }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: panel.modulesPerRow }).map((_, position) => {
              const item = project.devices.find(p => {
                const device = demoDevices.find(d => d.id === p.deviceId);
                return device && p.rowIndex === row && position >= p.position && position < p.position + device.modules;
              });
              const device = item ? demoDevices.find(d => d.id === item.deviceId) : null;
              return (
                <div
                  key={position}
                  className={`slot ${item ? 'filled ' + device?.category : ''}`}
                  onClick={() => tapSlot(row, position)}
                >
                  {item ? device?.sku : '+'}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p>Module ocupate: {used}/{capacity}</p>

      {picker && (
        <div className="device">
          <h3>Alege aparatul</h3>
          {demoDevices.map(device => (
            <div key={device.id} className="device">
              <strong>{device.name}</strong>
              <button onClick={() => {
                addDevice({
                  uid: crypto.randomUUID(),
                  deviceId: device.id,
                  rowIndex: picker.row,
                  position: picker.position,
                  circuitName: 'Circuit nou'
                });
                setPicker(null);
              }}>Adaugă aici</button>
            </div>
          ))}
          <button className="ghost" onClick={() => setPicker(null)}>Anulează</button>
        </div>
      )}

      {selected && selectedDevice && (
        <div className="device">
          <h3>Aparat selectat</h3>
          <strong>{selectedDevice.name}</strong>
          <label>Denumire circuit</label>
          <input value={selected.circuitName} onChange={e => renameCircuit(selected.uid, e.target.value)} />
          <button className="ghost" onClick={() => setMoveMode(!moveMode)}>
            {moveMode ? 'Alege poziția nouă' : 'Mută aparatul'}
          </button>
          <button className="danger" onClick={() => {
            removeDevice(selected.uid);
            setSelectedUid(null);
          }}>Șterge</button>
        </div>
      )}

      <button disabled={!panel} onClick={() => setStep(4)}>Continuă</button>
    </div>
  );
}
