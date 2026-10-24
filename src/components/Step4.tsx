import { demoDevices, demoPanels } from '../data/catalog';
import { useProject } from '../store/useProject';
import { openTechnicalPdf } from '../lib/pdf';
import { supabase } from '../lib/supabase';

export default function Step4({ user }: { user: any }) {
  const { project, setStep } = useProject();
  const panel = demoPanels.find(p => p.id === project.panelId) ?? null;

  async function saveProject() {
    if (!user) {
      alert('Autentifică-te pentru a salva proiectul.');
      return;
    }
    if (!panel) {
      alert('Selectați mai întâi un tablou.');
      return;
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: 'Configurare ' + new Date().toLocaleString('ro-RO'),
        phase_type: project.phaseType,
        installed_power_kw: project.installedPowerKw,
        panel_id: null,
        status: 'finalizata'
      })
      .select()
      .single();

    if (error || !data) {
      alert('Eroare la salvare: ' + (error?.message ?? 'necunoscută'));
      return;
    }

    for (const placed of project.devices) {
      const device = demoDevices.find(d => d.id === placed.deviceId);
      await supabase.from('project_devices').insert({
        project_id: data.id,
        device_id: null,
        row_index: placed.rowIndex,
        position: placed.position,
        modules: device?.modules ?? 1,
        circuit_name: placed.circuitName
      });
    }

    alert('Proiectul a fost salvat.');
  }

  return (
    <div className="card">
      <h2>Pasul 4 — Rezumat tehnic</h2>
      <button className="ghost" onClick={() => openTechnicalPdf(project, panel, demoDevices)}>
        Descarcă PDF tehnic
      </button>
      <button onClick={saveProject}>Salvează proiectul</button>
      <button className="ghost" onClick={() => setStep(3)}>Înapoi</button>
    </div>
  );
}
