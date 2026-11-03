import "@fontsource/outfit/latin-300.css";
import "@fontsource/outfit/latin-400.css";
import "@fontsource/outfit/latin-500.css";
import "./style.css";
import { projects } from "./data/projects";
import { render } from "./render";
import { initTheme } from "./theme";
import { initGalleries } from "./gallery";
import { initNavigation } from "./navigation";
import { initAnimations } from "./animations";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = render(projects);
initTheme();
initGalleries(projects);
initNavigation();
initAnimations();
