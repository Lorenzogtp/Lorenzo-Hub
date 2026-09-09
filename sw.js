const CACHE = 'lorenzo-hub-simple-2026-09-09-v3-actv-github';
const CORE = ['./', './index.html', './pensione.html'];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(()=>{}));
});
self.addEventListener('activate', e => {
  e.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const r=e.request;
  if(r.method!=='GET') return;
  if(r.mode==='navigate'){
    e.respondWith((async()=>{
      try {
        const fresh=await fetch(r,{cache:'no-store'});
        const c=await caches.open(CACHE);
        c.put(r,fresh.clone()).catch(()=>{});
        return fresh;
      } catch(_) {
        return (await caches.match(r)) || (await caches.match('./index.html'));
      }
    })());
    return;
  }
  e.respondWith((async()=>{
    try {
      const fresh=await fetch(r,{cache:'no-cache'});
      const c=await caches.open(CACHE);
      c.put(r,fresh.clone()).catch(()=>{});
      return fresh;
    } catch(_) {
      return (await caches.match(r)) || Response.error();
    }
  })());
});
