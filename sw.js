
const CACHE='lorenzo-hub-v1.13-cosa-e-cambiato-20260828';
const CORE=[
 './','./index.html','./manifest.webmanifest','./config.js','./links.js',
 './fenice-bridge.html','./pensione-ai.html','./normativa-pensioni.html','./pension-data.json','./docs/EcoCert_12-06-2025.pdf','./docs/Estratto_Conto_FPLS_18-06-2025.pdf','./docs/Estratto_Casellario_Attivi_18-06-2025.pdf','./docs/Studio_Miapensione_25-10-2023.pdf','./404.html','./version.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./favicon.png'
];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(u.origin!==location.origin){ e.respondWith(fetch(e.request)); return; }
 if(e.request.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('.js')){
   e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
 }else{
   e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
 }
});
