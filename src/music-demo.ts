const samples = [
  { file: "sub_clair-social-media-634730.mp3", title: "Social Media", tone: "violet" },
  { file: "wave-clear-koro.mp3", title: "Wave Clear Koro", tone: "blue" },
];
const audioPath = `${import.meta.env.BASE_URL}audio/`;

export function renderMusic(): string {
  return `<div class="music-player">
    <div class="music-progress" aria-hidden="true">
      <div class="music-disc" data-tone="${samples[0].tone}"><span>Pulse</span></div>
    </div>
    <div class="music-controls">
      <p class="music-title" data-music-title>${samples[0].title}</p>
      <audio controls preload="none" src="${audioPath}${samples[0].file}" aria-label="Lecture audio"></audio>
      <label class="music-loop"><input type="checkbox" data-music-loop /> Boucler le titre</label>
      <label for="music-file">Choisir mes fichiers audio</label>
      <input type="file" id="music-file" accept="audio/*" multiple />
      <label data-music-library hidden>Mes morceaux
        <select id="music-track"></select>
      </label>
      <div class="music-queue">
        <p id="music-queue-title">Morceaux de démo</p>
        <ul aria-labelledby="music-queue-title">
          ${samples.map(({ title, tone }, index) => `<li>
            <button type="button" data-music-sample="${index}" aria-current="${index === 0}">
              <span class="music-track-disc" data-tone="${tone}" aria-hidden="true"></span>
              <span>${title}</span>
              <span class="music-track-icon" aria-hidden="true"></span>
            </button>
          </li>`).join("")}
        </ul>
      </div>
      <p data-music-error role="status" hidden></p>
    </div>
  </div>`;
}

export function initMusic(demo: HTMLElement): void {
  const player = demo.querySelector("audio")!;
  const progress = demo.querySelector<HTMLElement>(".music-progress")!;
  const disc = progress.querySelector<HTMLElement>(".music-disc")!;
  const loop = demo.querySelector<HTMLInputElement>("[data-music-loop]")!;
  const fileInput = demo.querySelector<HTMLInputElement>("#music-file")!;
  const library = demo.querySelector<HTMLLabelElement>("[data-music-library]")!;
  const trackSelect = demo.querySelector<HTMLSelectElement>("#music-track")!;
  const sampleButtons = demo.querySelectorAll<HTMLButtonElement>("[data-music-sample]");
  const title = demo.querySelector<HTMLElement>("[data-music-title]")!;
  const error = demo.querySelector<HTMLElement>("[data-music-error]")!;
  let fileUrl: string | undefined;
  let files: File[] = [];

  function setTrack(src: string, name: string, tone = "violet"): void {
    player.src = src;
    disc.dataset.tone = tone;
    for (const button of sampleButtons) {
      const sample = samples[Number(button.dataset.musicSample)];
      button.setAttribute("aria-current", String(src === audioPath + sample.file));
    }
    progress.style.removeProperty("--music-position");
    progress.style.removeProperty("--music-angle");
    progress.classList.remove("is-playing");
    title.textContent = name;
    error.hidden = true;
    if (fileUrl) URL.revokeObjectURL(fileUrl);
  }

  function updateProgress(): void {
    const position = player.duration > 0 ? player.currentTime / player.duration : 0;
    progress.style.setProperty("--music-position", `${position * 100}%`);
    progress.style.setProperty("--music-angle", `${position}turn`);
  }

  progress.addEventListener("click", (event) => {
    if (event.target !== progress || !Number.isFinite(player.duration) || player.duration <= 0) return;
    const { left, top, width, height } = progress.getBoundingClientRect();
    const x = event.clientX - left - width / 2;
    const y = event.clientY - top - height / 2;
    const position = (Math.atan2(x, -y) / (2 * Math.PI) + 1) % 1;
    player.currentTime = position * player.duration;
    updateProgress();
  });

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

  for (const button of sampleButtons) {
    button.addEventListener("click", () => {
      const sample = samples[Number(button.dataset.musicSample)];
      const src = audioPath + sample.file;
      if (player.getAttribute("src") !== src) {
        setTrack(src, sample.title, sample.tone);
        fileUrl = undefined;
        trackSelect.value = "";
        library.hidden = !files.length;
      }
      void player.play().catch(() => {
        if (player.error) error.hidden = false;
      });
    });
  }

  player.addEventListener("error", () => {
    error.textContent = "Ce son ne peut pas être lu. Essayez un autre fichier ou revenez au morceau de démo.";
    error.hidden = false;
  });
}
