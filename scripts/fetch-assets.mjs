import { writeFile } from "node:fs/promises";

const commit = "77cdb91722109e80051a7cd99008b9cb47917e15";
const images = [
  ["refonte-accueil-sombre.png", "sport-accueil.png"],
  ["refonte-seance-repos.png", "sport-seance.png"],
  ["refonte-progression.png", "sport-progression.png"],
];
for (const [source, target] of images) {
  const response = await fetch(
    `https://raw.githubusercontent.com/raphaelmounirprivate-dot/full-body/${commit}/docs/screenshots/${source}`,
  );
  if (!response.ok)
    throw new Error(`Capture indisponible : ${source} (${response.status})`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(`public/images/${target}`, bytes);
  console.log(
    `${target}: ${bytes.readUInt32BE(16)} × ${bytes.readUInt32BE(20)}, ${bytes.length} octets`,
  );
}
