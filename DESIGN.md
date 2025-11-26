## Core Idea

An incremental game centered around a rower gaining speed and other various benefits until they are able to lift off. Eventually escaping the Earth's atmosphere and journeying out into space.

## Systems

- `Energy` is gained passively. `Energy` can be spent to perform actions such as `Row`. The player is unable to perform certain actions if they do not have the required `Energy`.
- `Speed` is how fast the rower is moving. Starting out `Speed` will be gained when rowing and eventually return back to rest. Upgrades will eventually allow for the minimum speed to be increased so that distance can be gained while the player is idle.
- `Distance` is how far the player has traveled. This will be the main stat used to judge a players progression throughout the game.

## Progression

- Initially start at rest
- Player is required to manually click `Row` button, spending `Energy` to gain `Speed` and `Distance`. `Speed` eventually drops to zero while the player is not rowing so the player is required to continously interact with the `Row` mechanic.
- Player reaches early `Distance` milestones that unlock some of the various upgrades in order to allow them to begin scaling their progression

## Upgrades

- Passive `Energy` gain rate
- `Distance` and `Speed` gained per `Row`
- Minimum `Speed`
- Maximum `Speed`
- Passive `Row` rate (SPM): A meaningful progression point. The player now passively `Row`s every so often to further scale their idle progression

## Interface

- ASCII art representation of a rower that rotates through frames at a rate tied to the current speed of the player
- Minimal styling on top of plain HTML elements
- UI elements are placed within mobile width columns, even on desktop, so that the same interface can be used on mobile and desktop. On mobile they would collapse under one another to form a single column.
- A simple reveal animation will be used when new UI elements are exposed at various progression points of the game.
- A scrolling list of `Milestone`s is updated whenever the player reaches a various progression points like unlocking upgrades, reaching certain `Distance`s, etc.
