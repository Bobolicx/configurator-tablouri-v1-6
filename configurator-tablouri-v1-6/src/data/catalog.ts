import type { Device, Panel } from '../types';

export const demoPanels: Panel[] = [
  { id:'p12', sku:'TAB-12A', name:'Tablou aplicat 12 module', manufacturer:'Demo', mounting:'aplicat', rows:1, modulesPerRow:12, price:180, stock:8 },
  { id:'p24', sku:'TAB-24I', name:'Tablou incastrabil 24 module', manufacturer:'Demo', mounting:'incasabil', rows:2, modulesPerRow:12, price:320, stock:5 },
  { id:'p36', sku:'TAB-36A', name:'Tablou aplicat 36 module', manufacturer:'Demo', mounting:'aplicat', rows:2, modulesPerRow:18, price:450, stock:3 },
  { id:'p48', sku:'TAB-48I', name:'Tablou incastrabil 48 module', manufacturer:'Demo', mounting:'incasabil', rows:4, modulesPerRow:12, price:680, stock:2 }
];

export const demoDevices: Device[] = [
  { id:'d-gen-1p', sku:'IG-1P-40', name:'Intrerupator general 1P 40 A', manufacturer:'Demo', category:'general', poles:1, ratedCurrentA:40, modules:2, price:95, stock:10 },
  { id:'d-gen-3p', sku:'IG-3P-63', name:'Intrerupator general 3P 63 A', manufacturer:'Demo', category:'general', poles:3, ratedCurrentA:63, modules:3, price:240, stock:6 },
  { id:'d-mcb-10', sku:'MCB-1P-10', name:'Automat 1P 10 A', manufacturer:'Demo', category:'mcb', poles:1, ratedCurrentA:10, modules:1, price:28, stock:50 },
  { id:'d-mcb-16', sku:'MCB-1P-16', name:'Automat 1P 16 A', manufacturer:'Demo', category:'mcb', poles:1, ratedCurrentA:16, modules:1, price:32, stock:50 },
  { id:'d-mcb-20', sku:'MCB-1P-20', name:'Automat 1P 20 A', manufacturer:'Demo', category:'mcb', poles:1, ratedCurrentA:20, modules:1, price:34, stock:40 },
  { id:'d-rcd-2p', sku:'RCD-2P-40', name:'Diferential 2P 40 A 30 mA', manufacturer:'Demo', category:'rcd', poles:2, ratedCurrentA:40, modules:2, price:150, stock:12 },
  { id:'d-rcd-4p', sku:'RCD-4P-63', name:'Diferential 4P 63 A 30 mA', manufacturer:'Demo', category:'rcd', poles:4, ratedCurrentA:63, modules:4, price:320, stock:4 },
  { id:'d-rcbo', sku:'RCBO-1PN-16', name:'Comutator diferential 1P+N 16 A', manufacturer:'Demo', category:'rcbo', poles:2, ratedCurrentA:16, modules:2, price:180, stock:15 },
  { id:'d-spd', sku:'SPD-T2', name:'Parafulnere tip 2', manufacturer:'Demo', category:'spd', poles:2, modules:2, price:260, stock:5 }
];
