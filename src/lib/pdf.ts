import type { Device, Panel, Project } from '../types';

export function openTechnicalPdf(project: Project, panel: Panel | null, devices: Device[]) {
  if (!panel) {
    alert('Selectați mai întâi un tablou.');
    return;
  }

  const rowsHtml = project.devices.map(placed => {
    const device = devices.find(d => d.id === placed.deviceId);
    return `<tr><td>${device?.name ?? ''}</td><td>${device?.sku ?? ''}</td><td>${device?.modules ?? ''}</td><td>${placed.circuitName}</td></tr>`;
  }).join('');

  const railHtml = Array.from({ length: panel.rows }).map((_, row) => {
    const slots = Array.from({ length: panel.modulesPerRow }).map((_, pos) => {
      const item = project.devices.find(p => {
        const device = devices.find(d => d.id === p.deviceId);
        return device && p.rowIndex === row && pos >= p.position && pos < p.position + device.modules;
      });
      const device = item ? devices.find(d => d.id === item.deviceId) : null;
      return `<div class="slot">${item ? device?.sku : ''}</div>`;
    }).join('');
    return `<div class="row">${slots}</div>`;
  }).join('');

  const html = `
    <html>
      <head><title>Configurare tehnică</title>
      <style>
        body{font-family:Arial;padding:24px}
        table{width:100%;border-collapse:collapse;font-size:12px;margin-top:16px}
        th,td{border:1px solid #ccc;padding:6px;text-align:left}
        .rail{display:flex;flex-direction:column;gap:8px;margin:16px 0}
        .row{display:flex;gap:2px}
        .slot{width:22px;height:30px;border:1px solid #999;display:flex;align-items:center;justify-content:center;font-size:7px}
      </style></head>
      <body>
        <h1>Configurare tehnică — fără prețuri</h1>
        <p><b>Branșament:</b> ${project.phaseType}</p>
        <p><b>Putere instalată:</b> ${project.installedPowerKw} kW</p>
        <p><b>Tablou:</b> ${panel.name} (${panel.sku})</p>
        <div class="rail">${railHtml}</div>
        <h2>Listă materiale</h2>
        <table>
          <thead><tr><th>Produs</th><th>SKU</th><th>Module</th><th>Circuit</th></tr></thead>
          <tbody>
            <tr><td>${panel.name}</td><td>${panel.sku}</td><td>${panel.rows * panel.modulesPerRow}</td><td>Tablou</td></tr>
            ${rowsHtml}
          </tbody>
        </table>
        <p><b>Observație:</b> Configurare orientativă. Execuția finală trebuie verificată conform I7 de către personal autorizat.</p>
      </body>
    </html>
  `;

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.print();
}
