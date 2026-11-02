const CACHE='pulse-github-shell-v1';
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('pulse-github-shell-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
// Cache only public interface assets. GitHub responses, tokens and plaintext
// records never pass through this cache.
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.endsWith('.apk'))return;event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(event.request);if(response.ok)await cache.put(event.request,response.clone());return response;}catch{const cached=await cache.match(event.request);return cached||Response.error();}})());});
