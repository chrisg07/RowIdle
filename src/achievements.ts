import { state } from './state'
import { V_ESCAPE, V_LIFTOFF, V_ORBIT } from './physics'

type AchievementType = 'speed' | 'distance' | 'upgrade'

const logSection = document.getElementById('log-section') as HTMLDivElement
const logList = document.getElementById('log-list') as HTMLUListElement

export interface Achievement {
  id: string
  type: AchievementType
  threshold: number
  message: string
}

export const ACHIEVEMENTS = [
  {
    id: 'first-row',
    type: 'distance',
    threshold: 1,
    message: 'You begin moving.',
  },
  {
    id: 'constant-motion',
    type: 'distance',
    threshold: 20 * 1000,
    message: 'You can no longer remember what it felt like to be stationary.',
  },
  {
    id: '40k meters',
    type: 'distance',
    threshold: 40 * 1000,
    message: 'Congrats, you circumnavigated the globe. But why are you still here?',
  },
  {
    id: 'liftoff',
    type: 'speed',
    threshold: V_LIFTOFF,
    message: 'You tear free of the water spray. You are now flying.',
  },
  {
    id: 'orbit',
    type: 'speed',
    threshold: V_ORBIT,
    message: 'You stabilize into a shaky orbit, still rowing in vacuum.',
  },
  {
    id: 'escape',
    type: 'speed',
    threshold: V_ESCAPE,
    message: 'Your strokes no longer belong to Earth. You have reached escape velocity.',
  },
] as const satisfies ReadonlyArray<Achievement>

export type AchievementId = (typeof ACHIEVEMENTS)[number]['id']
export type AchievementState = Record<AchievementId, boolean>

export function createDefaultAchievementState(): AchievementState {
  return Object.fromEntries(ACHIEVEMENTS.map(m => [m.id, false])) as AchievementState
}

export function updateAchievements(speed: number, distance: number) {
  for (const achievement of ACHIEVEMENTS) {
    if (state.achievements[achievement.id]) continue

    const achieved =
      (achievement.type === 'speed' && speed >= achievement.threshold) ||
      (achievement.type === 'distance' && distance >= achievement.threshold) ||
      (achievement.type === 'upgrade' && state.rowLevel >= achievement.threshold)

    if (achieved) {
      addAchievement(achievement.id)
    }
  }
}

export function addAchievement(id: AchievementId): void {
  if (state.achievements[id]) return
  const achievement = ACHIEVEMENTS.find(m => m.id === id)
  if (!achievement) return

  state.achievements[id] = true
  const li = document.createElement('li')
  li.textContent = achievement.message
  logList.appendChild(li)
  logSection.classList.remove('hidden')
}
