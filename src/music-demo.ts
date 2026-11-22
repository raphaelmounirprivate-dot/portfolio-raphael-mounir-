const samples = [
  { file: "sub_clair-social-media-634730.mp3", title: "Social Media" },
  { file: "wave-clear-koro.mp3", title: "Wave Clear Koro" },
];
const audioPath = `${import.meta.env.BASE_URL}audio/`;

export function renderMusic(): string {
  return `<div class="music-player">
    <div class="music-progress" aria-hidden="true"><div class="music-disc"></div></div>
    <div class="music-controls">
      <p class="music-title" data-music-title>${samples[0].title}</p>
      <audio controls preload="none" src="${audioPath}${samples[0].file}" aria-label="Lecture audio"></audio>
      <label class="music-loop"><input type="checkbox" data-music-loop /> Boucler le titre</label>
      <label for="music-file">Choisir mes fichiers audio</label>
      <input type="file" id="music-file" accept="audio/*" multiple />
      <label data-music-library hidden>Mes morceaux
        <select id="music-track"></select>
      </label>
      <label for="music-sample">Morceau de démo</label>
      <select id="music-sample">
        ${samples.map(({ title }, index) => `<option value="${index}">${title}</option>`).join("")}
      </select>
      <button type="button" class="demo-primary" data-music-sample>Écouter le morceau de démo</button>
      <p data-music-error role="status" hidden></p>
    </div>
  </div>`;
}

export function initMusic(demo: HTMLElement): void {
  const player = demo.querySelector("audio")!;
  const progress = demo.querySelector<HTMLElement>(".music-progress")!;
  const loop = demo.querySelector<HTMLInputElement>("[data-music-loop]")!;
  const fileInput = demo.querySelector<HTMLInputElement>("#music-file")!;
  const library = demo.querySelector<HTMLLabelElement>("[data-music-library]")!;
  const trackSelect = demo.querySelector<HTMLSelectElement>("#music-track")!;
  const sampleSelect = demo.querySelector<HTMLSelectElement>("#music-sample")!;
  const title = demo.querySelector<HTMLElement>("[data-music-title]")!;
  const error = demo.querySelector<HTMLElement>("[data-music-error]")!;
  let fileUrl: string | undefined;
  let files: File[] = [];

  function setTrack(src: string, name: string): void {
    player.src = src;
    progress.style.removeProperty("--music-position");
    progress.classList.remove("is-playing");
    title.textContent = name;
    error.hidden = true;
    if (fileUrl) URL.revokeObjectURL(fileUrl);
  }

  function updateProgress(): void {
    const position = player.duration > 0 ? player.currentTime / player.duration : 0;
    progress.style.setProperty("--music-position", `${position * 100}%`);
  }

  player.addEventListener("timeupdate", updateProgress);
  player.addEventListener("playing", () => progress.classList.add("is-playing"));
  for (const event of ["pause", "ended", "waiting", "error"]) {
    player.addEventListener(event, () => progress.classList.remove("is-playing"));
  }
  loop.addEventListener("change", () => { player.loop = loop.checked; });

  function loadFile(file: File): void {
    const nextUrl = URL.createObjectURL(file);
    setTrack(nextUrl, file.name);
    fileUrl = nextUrl;
    player.load();
  }

  fileInput.addEventListener("change", () => {
    const selection = Array.from(fileInput.files ?? []);
    if (!selection.length) return;
    files = selection;
    const placeholder = new Option("Choisir un morceau", "");
    placeholder.disabled = true;
    const options = files.map((file, index) => new Option(file.name, String(index)));
    trackSelect.replaceChildren(placeholder, ...options);
    trackSelect.value = "0";
    library.hidden = files.length < 2;
    loadFile(files[0]);
    fileInput.value = "";
  });

  trackSelect.addEventListener("change", () => {
    if (trackSelect.value !== "") loadFile(files[Number(trackSelect.value)]);
  });

  function selectSample(): void {
    const sample = samples[sampleSelect.selectedIndex];
    const src = `${audioPath}${sample.file}`;
    if (player.getAttribute("src") === src) return;
    setTrack(src, sample.title);
    fileUrl = undefined;
    trackSelect.value = "";
    library.hidden = !files.length;
  }

  sampleSelect.addEventListener("change", selectSample);
  demo.querySelector("[data-music-sample]")!.addEventListener("click", () => {
    selectSample();
    void player.play().catch(() => {
      if (player.error) error.hidden = false;
    });
  });

  player.addEventListener("error", () => {
    error.textContent = "Ce son ne peut pas être lu. Essayez un autre fichier ou revenez au morceau de démo.";
    error.hidden = false;
  });
}
