const sample = `${import.meta.env.BASE_URL}audio/pulse-extrait.wav`;
const sampleTitle = "Écouter l’extrait";

export function renderMusic(): string {
  return `<div class="music-player">
    <div class="music-disc" aria-hidden="true"></div>
    <div class="music-controls">
      <p class="music-title" data-music-title>Extrait de démonstration</p>
      <audio controls preload="none" src="${sample}" aria-label="Lecture audio"></audio>
      <label for="music-file">Choisir un fichier audio</label>
      <input type="file" id="music-file" accept="audio/*" />
      <button type="button" class="demo-primary" data-music-sample>${sampleTitle}</button>
      <p data-music-error role="status" hidden></p>
    </div>
  </div>`;
}

export function initMusic(demo: HTMLElement): void {
  const player = demo.querySelector("audio")!;
  const fileInput = demo.querySelector<HTMLInputElement>("#music-file")!;
  const title = demo.querySelector<HTMLElement>("[data-music-title]")!;
  const error = demo.querySelector<HTMLElement>("[data-music-error]")!;
  let fileUrl: string | undefined;

  function setTrack(src: string, name: string): void {
    player.src = src;
    title.textContent = name;
    error.hidden = true;
    if (fileUrl) URL.revokeObjectURL(fileUrl);
  }

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    setTrack(nextUrl, file.name);
    fileUrl = nextUrl;
    player.load();
  });

  demo.querySelector("[data-music-sample]")!.addEventListener("click", () => {
    if (fileUrl) {
      setTrack(sample, "Extrait de démonstration");
      fileUrl = undefined;
      fileInput.value = "";
    }
    void player.play().catch(() => {
      if (player.error) error.hidden = false;
    });
  });

  player.addEventListener("error", () => {
    error.textContent = "Ce son ne peut pas être lu. Essayez un autre fichier ou revenez à l’extrait.";
    error.hidden = false;
  });
}
