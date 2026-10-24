import { demoPanels } from '../data/catalog';
import { useProject } from '../store/useProject';

export default function Step2() {
  const { project, setPanel, setStep } = useProject();

  return (
    <div className="card">
      <h2>Pasul 2 — Alegerea tabloului</h2>
      {demoPanels.map(panel => (
        <div key={panel.id} className="device">
          <strong>{panel.name}</strong>
          <p>{panel.mounting} · {panel.rows} rânduri × {panel.modulesPerRow} module</p>
          <button onClick={() => setPanel(panel.id)}>Selectează</button>
        </div>
      ))}
      <button disabled={!project.panelId} onClick={() => setStep(3)}>Continuă</button>
    </div>
  );
}
