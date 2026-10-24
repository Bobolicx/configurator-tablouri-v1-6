import { useProject } from '../store/useProject';
import { estimatedCurrentA } from '../lib/calculations';

export default function Step1() {
  const { project, setPhaseType, setPower, setStep } = useProject();
  const current = estimatedCurrentA(project);

  return (
    <div className="card">
      <h2>Pasul 1 — Branșament</h2>
      <label>Tip branșament</label>
      <select value={project.phaseType} onChange={e => setPhaseType(e.target.value as any)}>
        <option value="monofazic">Monofazic 230 V</option>
        <option value="trifazic">Trifazic 400 V</option>
      </select>
      <label>Putere instalată (kW)</label>
      <input type="number" value={project.installedPowerKw || ''} onChange={e => setPower(Number(e.target.value))} />
      {current && <div className="ok">Curent estimativ: {current.toFixed(1)} A</div>}
      <button onClick={() => setStep(2)}>Continuă</button>
    </div>
  );
}
