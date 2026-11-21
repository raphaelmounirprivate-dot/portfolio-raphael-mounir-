import {
  type DemoKind,
  type QuizQuestion,
  mathQuestions,
  telecomQuestions,
  declicQuestions,
} from "./data/demo-content";
import {
  budgetAvailable,
  initialBudget,
  payBill,
} from "./demo-models";

const euro = (cents: number): string =>
  new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
const find = <T extends HTMLElement>(root: HTMLElement, selector: string): T =>
  root.querySelector<T>(selector)!;

function initSport(root: HTMLElement): void {
  const modeButtons = root.querySelectorAll<HTMLButtonElement>("[data-sport-mode]");
  const practiceButton = find<HTMLButtonElement>(root, '[data-sport-mode="practice"]');
  let inviteVisible = false;
  const syncInvite = (): void => {
    practiceButton.style.animationPlayState = inviteVisible && !document.hidden ? "running" : "paused";
  };
  const inviteObserver = new IntersectionObserver(([entry]) => {
    inviteVisible = entry.isIntersecting;
    syncInvite();
  });
  inviteObserver.observe(practiceButton);
  document.addEventListener("visibilitychange", syncInvite);
  const stopInvite = (): void => {
    practiceButton.classList.remove("sport-invite");
    practiceButton.style.removeProperty("animation-play-state");
    inviteObserver.disconnect();
    document.removeEventListener("visibilitychange", syncInvite);
  };
  modeButtons.forEach(button => button.addEventListener("click", () => {
    const technique = button.dataset.sportMode === "technique";
    if (!technique) stopInvite();
    find(root, "#sport-practice").hidden = technique;
    find(root, "#sport-technique").hidden = !technique;
    modeButtons.forEach(control => control.setAttribute("aria-pressed", String(control === button)));
  }));
  let completed = 0;
  let remaining = 120;
  let deadline = 0;
  let interval: ReturnType<typeof setInterval> | undefined;
  const timer = find<HTMLOutputElement>(root, "[data-timer]");
  const pause = find<HTMLButtonElement>(root, "[data-pause]");
  const validate = find<HTMLButtonElement>(root, "[data-validate]");
  const feedback = find(root, "[data-feedback]");
  const paintTime = (): void => {
    timer.value = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  };
  const stop = (): void => {
    clearInterval(interval);
    interval = undefined;
  };
  const start = (): void => {
    stop();
    deadline = Date.now() + remaining * 1000;
    pause.disabled = false;
    pause.textContent = "Pause";
    interval = setInterval(() => {
      remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      paintTime();
      if (remaining === 0) {
        stop();
        pause.disabled = true;
        feedback.textContent = "Repos terminé. Vous pouvez continuer.";
      }
    }, 250);
  };
  validate.addEventListener("click", () => {
    const weight = find<HTMLInputElement>(root, "[data-weight]");
    const reps = find<HTMLInputElement>(root, "[data-reps]");
    if (
      !weight.reportValidity() ||
      !reps.reportValidity() ||
      weight.value === "" ||
      reps.value === ""
    ) {
      feedback.textContent =
        "Renseignez une charge de 0 à 500 kg et de 1 à 100 répétitions.";
      return;
    }
    if (completed >= 2) return;
    completed++;
    find(root, `[data-set="${completed}"]`).lastElementChild!.textContent =
      `${weight.value} kg × ${reps.value} rép. · validée`;
    find(root, `[data-set="${completed}"]`).classList.add("completed");
    remaining = 120;
    paintTime();
    start();
    feedback.textContent =
      completed === 2
        ? "Les deux séries sont validées. Votre repos reste disponible."
        : "Série enregistrée pour cette démo. Le repos démarre.";
    validate.disabled = completed === 2;
    if (completed === 2) validate.textContent = "Deux séries validées";
  });
  pause.addEventListener("click", () => {
    if (interval) {
      remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      stop();
      paintTime();
      pause.textContent = "Reprendre";
    } else start();
  });
  find(root, "[data-reset]").addEventListener("click", () => {
    stop();
    completed = 0;
    remaining = 120;
    paintTime();
    pause.disabled = true;
    pause.textContent = "Pause";
    validate.disabled = false;
    validate.textContent = "Valider une série";
    find<HTMLInputElement>(root, "[data-weight]").value = "40";
    find<HTMLInputElement>(root, "[data-reps]").value = "12";
    root.querySelectorAll("[data-set]").forEach((row) => {
      row.classList.remove("completed");
      row.lastElementChild!.textContent = "À faire";
    });
    feedback.textContent = "Séance réinitialisée. À vous de jouer.";
  });
  addEventListener("pagehide", stop);
}

function initBudget(root: HTMLElement): void {
  let state = initialBudget();
  const update = (): void => {
    find<HTMLOutputElement>(root, "[data-available]").value = euro(
      budgetAvailable(state),
    );
    find(root, "[data-balance]").textContent = euro(state.balance);
    find(root, "[data-bill]").textContent = state.unpaidBill
      ? `−${euro(state.unpaidBill)}`
      : euro(0);
    const pay = find<HTMLButtonElement>(root, "[data-pay]");
    pay.disabled = state.unpaidBill === 0;
    pay.textContent = state.unpaidBill === 0 ? "Payée" : "Marquer payée";
    find<HTMLButtonElement>(root, "[data-expense]").disabled =
      state.expenseAdded;
  };
  find(root, "[data-pay]").addEventListener("click", () => {
    if (!state.unpaidBill) return;
    state = payBill(state);
    update();
    find(root, "[data-feedback]").textContent =
      "Le solde baisse de 80 €, la facture à prévoir disparaît. Le disponible ne change pas : aucune double déduction.";
  });
  find(root, "[data-expense]").addEventListener("click", () => {
    if (state.expenseAdded) return;
    state = { ...state, balance: state.balance - 2500, expenseAdded: true };
    update();
    find(root, "[data-feedback]").textContent =
      "Dépense fictive de 25 € ajoutée une fois. Le disponible baisse de 25 €.";
  });
  find(root, "[data-reset]").addEventListener("click", () => {
    state = initialBudget();
    update();
    find(root, "[data-feedback]").textContent =
      "Budget réinitialisé. La facture reste à prévoir.";
  });
  update();
}

function initQuiz(root: HTMLElement, questions: QuizQuestion[]): void {
  let index = 0;
  let score = 0;
  let attempted = false;
  const outcomes: (boolean | null)[] = questions.map(() => null);
  const learning = root.classList.contains("learning-world");
  const updateLearning = (message: string): void => {
    if (!learning) return;
    find(root, "[data-pixel-message]").textContent = message;
    find(root, "[data-learning-xp]").textContent = String(score * 10);
    const answered = outcomes.filter((result) => result !== null).length;
    find(root, "[data-learning-progress]").textContent =
      `${answered} / ${questions.length} défis essayés`;
    find<HTMLProgressElement>(root, "[data-learning-meter]").value = answered;
    root
      .querySelectorAll<HTMLElement>("[data-learning-step]")
      .forEach((step, i) => {
        const result = outcomes[i];
        step.dataset.state =
          result === null ? "waiting" : result ? "correct" : "retry";
        find(step, "[data-step-result]").textContent =
          result === null ? "" : result ? "Réussi" : "À revoir";
        if (i === index && root.dataset.learningState !== "finished")
          step.setAttribute("aria-current", "step");
        else step.removeAttribute("aria-current");
      });
  };
  const next = find<HTMLButtonElement>(root, "[data-next-question]");
  const paint = (): void => {
    const question = questions[index];
    attempted = false;
    root.dataset.learningState = "ready";
    find(root, "[data-question]").textContent = question.prompt;
    find(root, "[data-quiz-progress]").textContent =
      `Défi ${index + 1} / ${questions.length}`;
    find(root, "[data-score]").textContent =
      `${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""}`;
    const choices = find(root, "[data-choices]");
    choices.replaceChildren();
    question.choices.forEach((choice, i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = choice;
      button.setAttribute("aria-label", choice);
      button.addEventListener("click", () => {
        if (attempted) return;
        attempted = true;
        if (i === question.correct) score++;
        outcomes[index] = i === question.correct;
        root.dataset.learningState =
          i === question.correct ? "success" : "retry";
        updateLearning(
          i === question.correct
            ? "Bien joué ! Tu avances, un déclic à la fois."
            : "Les erreurs font partie du jeu. Lis l’explication, puis continue !",
        );
        choices.querySelectorAll("button").forEach((answer, j) => {
          answer.disabled = true;
          if (j === question.correct) answer.classList.add("correct");
          if (j === i && i !== question.correct)
            answer.classList.add("incorrect");
        });
        find(root, "[data-feedback]").textContent =
          `${i === question.correct ? "Bonne réponse." : "À retenir :"} ${question.explanation}`;
        find(root, "[data-score]").textContent =
          `${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""}`;
        next.disabled = false;
      });
      choices.append(button);
    });
    find(root, "[data-feedback]").textContent =
      "Choisissez une réponse pour découvrir l’explication.";
    find(root, "[data-hint-text]").hidden = true;
    find<HTMLButtonElement>(root, "[data-hint]").hidden = !question.hint;
    next.disabled = true;
    next.textContent =
      index === questions.length - 1 ? "Voir le bilan" : "Question suivante";
    updateLearning(
      root.dataset.demo === "math"
        ? "Pas besoin de tout savoir. On apprend en essayant !"
        : "Moi, c’est Pixel. On passe un niveau ensemble ?",
    );
  };
  find(root, "[data-hint]").addEventListener("click", () => {
    const hint = find(root, "[data-hint-text]");
    hint.hidden = false;
    hint.textContent = questions[index].hint ?? "";
    updateLearning("Un indice, c’est un coup de pouce. À toi d’essayer !");
  });
  next.addEventListener("click", () => {
    if (!attempted) return;
    if (index < questions.length - 1) {
      index++;
      paint();
      find(root, "[data-choices] button").focus();
    } else {
      next.disabled = true;
      root.dataset.learningState = "finished";
      updateLearning(
        `Mission terminée ! ${score * 10} XP de démo. On rejoue pour progresser ?`,
      );
      find(root, "[data-feedback]").textContent =
        `Démo terminée : ${score} / ${questions.length}. Les explications sont là pour apprendre. Vous pouvez recommencer.`;
    }
  });
  find(root, "[data-reset]").addEventListener("click", () => {
    index = 0;
    score = 0;
    outcomes.fill(null);
    paint();
  });
  paint();
}

export function initDemos(): void {
  document.querySelectorAll<HTMLElement>("[data-demo]").forEach((root) => {
    const kind = root.dataset.demo as DemoKind;
    if (kind === "sport") initSport(root);
    else if (kind === "simulation" || kind === "chess") return;
    else if (kind === "budget") initBudget(root);
    else
      initQuiz(
        root,
        kind === "math"
          ? mathQuestions
          : kind === "telecom"
            ? telecomQuestions
            : declicQuestions,
      );
  });
}
