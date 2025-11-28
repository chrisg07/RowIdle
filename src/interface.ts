import { GameState } from './state'

export interface IStatDisplay {
    statElement: HTMLSpanElement
    update(state: GameState): void
    getHTML(): HTMLParagraphElement
}

export class StatDisplay implements IStatDisplay {
    public statElement: HTMLSpanElement

    constructor(private id: string, private displayString: string, private suffix: string, private getUpdatedValue: () => string) {
        const html = this.getHTML()
        document.getElementById('stats')?.append(html)
        this.statElement = document.getElementById(id) as HTMLSpanElement
        this.getUpdatedValue = getUpdatedValue
        this.update()
    }

    update(): void {
        this.statElement.innerText = this.getUpdatedValue()
    }

    getHTML(): HTMLParagraphElement {
        let spanEl = document.createElement("span")
        spanEl.id = this.id
        
        let baseEl = document.createElement("p")
        baseEl.append(`${this.displayString}: `, spanEl, this.suffix ? " " + this.suffix : "")

        return baseEl
    }
}