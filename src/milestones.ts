import { state, milestonesList, milestonesSection } from './main'
import { V_ESCAPE, V_LIFTOFF, V_ORBIT } from './physics'

type MilestoneType = 'speed' | 'distance' | 'upgrade'

export interface Milestone {
  id: string
  type: MilestoneType
  threshold: number
  message: string
}

export const MILESTONES = [
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
    id: 'first-upgrade',
    type: 'upgrade',
    threshold: 1,
    message: 'Your arms burn, but the stroke is cleaner. First upgrade purchased.',
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
] as const satisfies ReadonlyArray<Milestone>

export type MilestoneId = (typeof MILESTONES)[number]['id']
export type MilestoneState = Record<MilestoneId, boolean>

export function createDefaultMilestoneState(): MilestoneState {
  return Object.fromEntries(MILESTONES.map(m => [m.id, false])) as MilestoneState
}
export function updateMilestones(speed: number, distance: number) {
  for (const milestone of MILESTONES) {
    if (state.milestones[milestone.id]) continue

    const achieved =
      (milestone.type === 'speed' && speed >= milestone.threshold) ||
      (milestone.type === 'distance' && distance >= milestone.threshold) ||
      (milestone.type === 'upgrade' && state.rowLevel >= milestone.threshold)

    if (achieved) {
      addMilestone(milestone.id)
    }
  }
}
export function addMilestone(id: MilestoneId): void {
  if (state.milestones[id]) return
  const milestone = MILESTONES.find(m => m.id === id)
  if (!milestone) return

  state.milestones[id] = true
  const li = document.createElement('li')
  li.textContent = milestone.message
  milestonesList.appendChild(li)
  milestonesSection.classList.remove('hidden')
}
