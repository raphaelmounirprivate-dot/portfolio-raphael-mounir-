// Module autonome : aucune modification du body ou des styles de la page.
(() => {
const base = new URL('./', document.currentScript.src);
let mounted = false;
function mount() {
  const root = document.getElementById('terre-cv');
  if (!root || mounted) return;
  mounted = true;
  root.innerHTML = `<h3 class="tcv-title">Mon parcours</h3>
    <div class="tcv-stage"><button class="tcv-planet" type="button" aria-label="Découvrir mon CV" aria-haspopup="dialog"><span class="tcv-fallback" aria-hidden="true"></span></button><span class="tcv-ring" aria-hidden="true"></span></div>
    <p class="tcv-hint">Cliquez sur la planète pour découvrir mon CV</p><p class="tcv-help">Faites-la tourner à la souris ou au doigt.</p>
    <dialog class="tcv-dialog" aria-labelledby="tcv-dialog-title"><div class="tcv-toolbar"><h3 id="tcv-dialog-title">Le CV de Raphaël Mounir</h3><div class="tcv-actions"><a class="tcv-download" href="${new URL('documents/CV_Raphael_Mounir.pdf', base)}" download="CV_Raphael_Mounir.pdf">Télécharger mon CV (PDF)</a><button class="tcv-close" type="button">Fermer</button></div></div><img class="tcv-preview" src="${new URL('documents/cv-raphael-apercu.png', base)}" loading="lazy" width="990" height="1400" alt="CV de Raphaël Mounir : technicien télécom, réseaux et fibre. Le document complet est également téléchargeable en PDF." /></dialog>`;
  const button = root.querySelector('.tcv-planet');
  const stage = root.querySelector('.tcv-stage');
  const dialog = root.querySelector('dialog');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let renderer, scene, camera, earth, clouds, atmosphere, globe;
  let frame = 0, last = 0, interacted = 0, zoom = 0, hover = false;
  let pointer, dragged = false, loading = false, disposed = false;

  // Le dialogue natif gère Échap, le focus captif et l’inertie de l’arrière-plan.
  function open(event) {
    if (dragged && event.detail !== 0) { dragged = false; return; }
    if (!reduced.matches) {
      const ripple = document.createElement('span');
      ripple.className = 'tcv-ripple';
      const rect = stage.getBoundingClientRect();
      ripple.style.left = `${event.detail ? event.clientX - rect.left : rect.width / 2}px`;
      ripple.style.top = `${event.detail ? event.clientY - rect.top : rect.height / 2}px`;
      stage.append(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      zoom = .25;
    }
    root.querySelector('.tcv-preview').src = new URL('documents/cv-raphael-apercu.png', base);
    dialog.showModal();
    root.querySelector('.tcv-close').focus({ preventScroll: true });
  }
  button.addEventListener('click', open);
  root.querySelector('.tcv-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { zoom = 0; button.focus({ preventScroll: true }); wake(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  button.addEventListener('pointerdown', event => { pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY }; dragged = false; });
  button.addEventListener('pointermove', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    if (Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) > 7) {
      dragged = true;
      // Un geste vertical tactile reste réservé au défilement de la page.
      if (event.pointerType === 'touch' && Math.abs(event.clientY - pointer.startY) > Math.abs(event.clientX - pointer.startX)) return;
      button.setPointerCapture(event.pointerId);
      if (globe) { globe.rotation.y += dx * .008; globe.rotation.x = Math.max(-.7, Math.min(.7, globe.rotation.x + dy * .004)); }
      interacted = performance.now();
      wake();
    }
    pointer.x = event.clientX; pointer.y = event.clientY;
  });
  const release = () => { pointer = undefined; interacted = performance.now(); };
  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', () => { release(); dragged = false; });
  button.addEventListener('pointerenter', event => { hover = event.pointerType !== 'touch'; wake(); });
  button.addEventListener('pointerleave', () => { hover = false; wake(); });

  function draw(now) {
    frame = 0;
    if (!renderer || !visible || document.hidden || disposed) return;
    const dt = last ? Math.min((now - last) / 1000, .05) : 0;
    last = now;
    // Vue depuis le pôle Nord : rotation positive vers l’est, axe à 23,4°.
    if (!reduced.matches && !pointer && now - interacted > 2200) {
      earth.rotation.y += dt * .035;
      clouds.rotation.y += dt * .039;
    }
    camera.position.z += ((3.45 - zoom) - camera.position.z) * .12;
    atmosphere.material.uniforms.tcvStrength.value = hover ? .9 : .6;
    renderer.render(scene, camera);
    root.dataset.animation = reduced.matches ? 'static' : 'running';
    if (!reduced.matches || Math.abs(camera.position.z - (3.45 - zoom)) > .002) frame = requestAnimationFrame(draw);
  }
  function wake() {
    if (!frame && renderer && visible && !document.hidden && !disposed) { last = 0; frame = requestAnimationFrame(draw); }
  }
  function pause() { cancelAnimationFrame(frame); frame = 0; last = 0; root.dataset.animation = 'paused'; }
  const sync = () => { if (document.hidden || !visible) pause(); else wake(); root.dataset.visible = String(visible && !document.hidden); };
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => { pause(); wake(); });

  async function load() {
    if (loading) return;
    loading = true;
    try {
      const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      button.append(renderer.domElement);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
      camera.position.z = 3.45;
      globe = new THREE.Group(); scene.add(globe);
      const axis = new THREE.Group(); axis.rotation.z = THREE.MathUtils.degToRad(23.4); globe.add(axis);
      const loader = new THREE.TextureLoader();
      const names = ['earth_atmos_2048.jpg', 'earth_normal_2048.jpg', 'earth_specular_2048.jpg', 'earth_lights_2048.png', 'earth_clouds_1024.png'];
      const [day, normal, specular, night, cloud] = await Promise.all(names.map(name => loader.loadAsync(new URL(`textures/${name}`, base).href)));
      day.colorSpace = night.colorSpace = THREE.SRGBColorSpace;
      const sun = new THREE.Vector3(-3, 1.2, 3).normalize();
      const material = new THREE.MeshPhongMaterial({ map: day, normalMap: normal, normalScale: new THREE.Vector2(.6, .6), specularMap: specular, specular: new THREE.Color('#537c94'), shininess: 22, emissiveMap: night, emissive: new THREE.Color('#ffc777'), emissiveIntensity: 1.8 });
      // Les lumières urbaines sont visibles seulement sur l’hémisphère nocturne.
      material.onBeforeCompile = shader => {
        shader.uniforms.tcvSun = { value: sun };
        shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 tcvNormal;').replace('#include <beginnormal_vertex>', '#include <beginnormal_vertex>\ntcvNormal = normalize(mat3(modelMatrix) * objectNormal);');
        shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nuniform vec3 tcvSun; varying vec3 tcvNormal;').replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance *= 1.0 - smoothstep(-0.15, 0.2, dot(normalize(tcvNormal), tcvSun));');
      };
      const geometry = new THREE.SphereGeometry(1, 64, 40);
      earth = new THREE.Mesh(geometry, material); axis.add(earth);
      earth.rotation.y = .6;
      clouds = new THREE.Mesh(new THREE.SphereGeometry(1.012, 48, 32), new THREE.MeshPhongMaterial({ map: cloud, transparent: true, opacity: .7, depthWrite: false })); axis.add(clouds);
      atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.07, 48, 32), new THREE.ShaderMaterial({ transparent: true, side: THREE.BackSide, depthWrite: false, uniforms: { tcvStrength: { value: .6 } }, vertexShader: 'varying vec3 n; varying vec3 v; void main(){vec4 p=modelViewMatrix*vec4(position,1.0);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}', fragmentShader: 'uniform float tcvStrength; varying vec3 n; varying vec3 v; void main(){float a=pow(1.0-abs(dot(normalize(n),normalize(v))),2.5);gl_FragColor=vec4(0.25,0.62,1.0,a*tcvStrength);}' })); globe.add(atmosphere);
      const sunlight = new THREE.DirectionalLight('#fff5e5', 3); sunlight.position.copy(sun).multiplyScalar(5); scene.add(sunlight);
      scene.add(new THREE.AmbientLight('#7b9cce', .08));
      const resize = new ResizeObserver(() => { const size = button.clientWidth; renderer.setSize(size, button.clientHeight, false); camera.aspect = size / button.clientHeight; camera.updateProjectionMatrix(); wake(); });
      resize.observe(button);
      renderer.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); pause(); button.removeAttribute('data-ready'); root.dataset.renderer = 'fallback'; });
      button.dataset.ready = 'true'; root.dataset.renderer = 'webgl'; wake();
    } catch {
      // Le CV reste accessible même sans réseau CDN ou sans WebGL.
      root.dataset.renderer = 'fallback';
      renderer?.dispose(); renderer = undefined;
    }
  }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); if (visible) void load(); }, { threshold: .05 });
  observer.observe(root);
  addEventListener('pagehide', () => { pause(); disposed = true; }, { once: true });
  addEventListener('pageshow', () => { disposed = false; sync(); });
}
// Compatible avec le HTML rendu par Vite et avec un simple conteneur statique.
mount();
if (!mounted) { const observer = new MutationObserver(() => { mount(); if (mounted) observer.disconnect(); }); observer.observe(document.documentElement, { childList: true, subtree: true }); }
})();
