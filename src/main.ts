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
import { initDemos } from "./demos";
import "./demos.css";
import "@fontsource/nunito/latin-800.css";
import "@fontsource/nunito/latin-900.css";
import "./learning-world.css";
import { initLearningChapters } from "./learning-chapters";
import { initCisco } from "./cisco-demo";
import "./cisco.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = render(projects);
initTheme();
initGalleries(projects);
initNavigation();
initAnimations();
initDemos();
initLearningChapters();
initCisco();

import { initHorizon } from "./horizon-demo";
import "./horizon.css";
initHorizon();

import "./viewport-journey.css";
import { initWelcome } from "./welcome";
initWelcome();
