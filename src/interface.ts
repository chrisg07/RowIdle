import { GameState } from './state'

export interface IDisplay {
    element: HTMLElement
    update(state: GameState): void
    getHTML(): HTMLElement
}

export class StatDisplay implements IDisplay {
    public element: HTMLSpanElement

    constructor(private id: string, private displayString: string, private suffix: string, private getUpdatedValue: () => string) {
        const html = this.getHTML()
        document.getElementById('stats')?.append(html)
        this.element = document.getElementById(id) as HTMLSpanElement
        this.getUpdatedValue = getUpdatedValue
        this.update()
    }

    update(): void {
        this.element.innerText = this.getUpdatedValue()
    }

    getHTML(): HTMLParagraphElement {
        let spanEl = document.createElement("span")
        spanEl.id = this.id
        
        let baseEl = document.createElement("p")
        baseEl.append(`${this.displayString}: `, spanEl, this.suffix ? " " + this.suffix : "")

        return baseEl
    }
}