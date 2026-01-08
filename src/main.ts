import { loadGame, saveGame } from './storage'
import { StatDisplay } from './interface'
import { createStatDisplays } from './stats'
import { getCurrentSPM, state } from './state'
import { createDefaultAchievementState, updateAchievements } from './achievements'
import { updateUpgrades } from './upgrades'

export const SAVE_KEY = 'orbital-rower-save-v1'

export let statDisplays: { [key: string]: StatDisplay } = {}
createStatDisplays()

const rowBtn = document.getElementById('row-button') as HTMLButtonElement
const saveBtn = document.getElementById('save-button') as HTMLButtonElement
const upgradesSection = document.getElementById('upgrades-section') as HTMLDivElement

const rowerVisualEl = document.getElementById('rower-visual') as HTMLPreElement | null

const ROW_FRAMES = ['~~~ \\o/ ~~~', '~~~ -o- ~~~', '~~~ /o\\ ~~~', '~~~ -o- ~~~']
let rowFrameIndex = 0

function updateRowerVisual(speed: number): void {
  if (!rowerVisualEl) return

  if (speed < 1) {
    rowerVisualEl.textContent = '~~~ |o| ~~~'
    return
  }

  rowFrameIndex = (rowFrameIndex + 1) % ROW_FRAMES.length
  rowerVisualEl.textContent = ROW_FRAMES[rowFrameIndex]
}

let isHolding = false;
let pointerX = 0;
let pointerY = 0;

window.addEventListener("pointermove", (e) => {
  pointerX = e.clientX;
  pointerY = e.clientY;
}, { passive: true });

let rafId: number | null = null;

function startTrackingPointerOverButton() {
  const tick = () => {
    if (!isHolding) return;

    const rect = rowBtn.getBoundingClientRect();
    const inside =
      pointerX >= rect.left &&
      pointerX <= rect.right &&
      pointerY >= rect.top &&
      pointerY <= rect.bottom;

    if (!inside) {
      endRow("exited");         // stops animation + logs
      isHolding = false;
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
}

function stopTrackingPointerOverButton() {
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
}


function updateUI(): void {
  for (const display of Object.values(statDisplays)) {
    display.update()
  }

  if (state.energy >= 5 || state.strength > 0) {
    upgradesSection.classList.remove('hidden')
  }

  updateUpgrades(state)
  updateAchievements(state.speed, state.distance)
  updateRowerVisual(state.speed)
}

let rowStart = 0;
let rowEnd = 0;

let rowAnim: Animation | null = null;
let strokeActive = false;
let activePointerId: number | null = null;
const START_TRANSFORM = "translateX(0px)";
const TRAVEL_PX = 220;

function startRowButtonAnim() {
  const strokeSeconds = 60 / state.maxSPM;
  const strokeMs = strokeSeconds * 1000;

  rowAnim?.cancel();
  rowBtn.style.transform = START_TRANSFORM;

  rowAnim = rowBtn.animate(
    [
      { transform: "translateX(0px)" },
      { transform: `translateX(${TRAVEL_PX}px)` }
    ],
    {
      duration: strokeMs / 2, 
      easing: "ease-in-out",
      iterations: 2,
      direction: "alternate",
      fill: "none"
    }
  );

  rowAnim.onfinish = () => {
    rowBtn.style.transform = START_TRANSFORM; 
    endRow("finish");
  };
}

function stopRowButtonAnim() {
  rowAnim?.cancel();
  rowAnim = null;
  rowBtn.style.transform = START_TRANSFORM;
}

rowBtn.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

rowBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  if (strokeActive) return;
  strokeActive = true;

  rowStart = performance.now();
  isHolding = true;

  pointerX = e.clientX;
  pointerY = e.clientY;

  rowBtn.setPointerCapture(e.pointerId);

  startRowButtonAnim();
  startTrackingPointerOverButton();
});

function endRow(reason: "finish" | "up" | "cancel" | "blur" | "exited" = "finish") {
  if (!strokeActive) return;
  strokeActive = false;

  rowEnd = performance.now();
  console.log(`Row ended (${reason}):`, Math.round(rowEnd - rowStart), "ms");

  if (activePointerId !== null && rowBtn.hasPointerCapture(activePointerId)) {
    rowBtn.releasePointerCapture(activePointerId);
  }
  activePointerId = null;

  isHolding = false;
  stopTrackingPointerOverButton();
  stopRowButtonAnim();
}

rowBtn.addEventListener("pointerup", () => endRow("up"));
rowBtn.addEventListener("pointercancel", () => endRow("cancel"));
window.addEventListener("blur", () => endRow("blur"));


rowBtn.addEventListener("click", function () {
  const rowCost = state.strength;
  const rowDate = Date.now();
  state.strokes.push(rowDate);

  if (state.energy > rowCost) {
    state.energy -= rowCost;
    state.speed += 3 * state.strength;
  }

  updateUI();
});

saveBtn.addEventListener('click', () => {
  saveGame()
})

function tick(): void {
  state.energyGain = state.strength * 0.5
  state.energy += state.energyGain
  state.distance += state.speed
  state.speed = state.speed * state.drag

  updateUI()
}

function initialize(): void {
  state.achievements = createDefaultAchievementState()
  loadGame()
  updateUI()

  setInterval(() => {
    tick()
  }, 1000)

  setInterval(() => {
    saveGame()
  }, 1000 * 60)
}

initialize()
