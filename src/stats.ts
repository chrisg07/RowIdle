import { StatDisplay } from './interface'
import { statDisplays } from './main'
import { getCurrentSPM, state } from './state'

export function createStatDisplays(): void {
  statDisplays['energy'] = new StatDisplay('energy-display', 'Energy', 'kcal', () =>
    state.energy.toFixed(0)
  )
  statDisplays['row-level'] = new StatDisplay('row-level-display', 'Row Level', '', () =>
    state.rowLevel.toString()
  )
  statDisplays['max-spm'] = new StatDisplay('max-spm-display', 'Max SPM', '', () =>
    state.maxSPM.toFixed(0)
  )
  statDisplays['current-spm'] = new StatDisplay('current-spm-display', 'Current SPM', '', () =>
    getCurrentSPM().toFixed(0)
  )
  statDisplays['speed'] = new StatDisplay('speed-display', 'Speed', 'm/s', () =>
    state.speed.toFixed(2)
  )
  statDisplays['drag'] = new StatDisplay('drag-display', 'Drag', '%', () =>
    (state.drag * 100).toFixed(0)
  )
  statDisplays['distance'] = new StatDisplay('distance-display', 'Distance', 'm', () =>
    state.distance.toFixed(2)
  )
}
