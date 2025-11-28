## Core Idea

An incremental game centered around a rower gaining speed and other various benefits until they are able to lift off. Eventually escaping the Earth's atmosphere and journeying out into space.

## Systems

- `Energy` is gained passively. `Energy` can be spent to perform actions such as `Row`. The player is unable to perform certain actions if they do not have the required `Energy`.
- `Speed` is how fast the rower is moving. Starting out `Speed` will be gained when rowing and eventually return back to rest. Upgrades will eventually allow for the minimum speed to be increased so that distance can be gained while the player is idle.
- `Distance` is how far the player has traveled. This will be the main stat used to judge a players progression throughout the game.

## Progression

### Rowing Across the Oceans
- Initially start at rest
- Player is required to manually click `Row` button, spending `Energy` to gain `Speed` and `Distance`. `Speed` eventually drops to zero while the player is not rowing so the player is required to continously interact with the `Row` mechanic.
- Player reaches early `Distance` milestones that unlock some of the various upgrades in order to allow them to begin scaling their progression
- Eventually the player will be able to purchaes the `Tempo` upgrade. this enables the display of the players SPM, which is based on how often they are choosing to `Row`. The `Distance` and `Speed` gains a multiplier based on the accuracy of the player's ability to match a certain.

### First Jumps

- The player starts getting air for the first time
- `Airtime` is tracked, similar to `Distance`, and is used for additional upgrades

### Sustained Flight

- The player now rarely touches the surface of the sea anymore

### Exiting the Atmosphere

- The player has overcome the exit velocity required in order to be able to exit the atmosphere
### Rowing Through Space

- Performing a `Row` in space is initially extremely unrewarding (due to the vacuum of space)
- The player is required to invest heavily in upgrades to begin moving at a reasonable pace. 

### Exiting the Solar System

- The players pace in space has increased to the point where they have progressed past the boundary of our Solar System

### Deep Space

- Here space gets so thin that it causes `Row` to be much less rewarding again

### End Game

- The player comes to the realization that if they continue to `Row` further into Deep Space they will no longer have anything to `Row` against. Which until now has been their only motivation.

## Upgrades

### General
- Passive `Energy` gain rate
- `Distance` and `Speed` gained per `Row`. Increases `Energy` spent per `Row`
- Reduce `Energy` spent per `Row`
- Increase maximum SPM (amount of times a player can `Row` per minute)
- Minimum `Speed`
- Maximum `Speed`
- Decrease `Drag` (`Speed` reduction per tick)
- Passive `Row` rate (SPM): A meaningful progression point. The player now passively `Row`s every so often to further scale their idle progression
- Reduced upgrade cost

### Surface Upgrades

### Flight Upgrades

- Increase `Altitude` gain per `Row`, reduces `Distance` gained per `Row`
- Reduce descent rate of `Altitude` while in the air

### Space Upgrades  

## Interface

- ASCII art representation of a rower that rotates through frames at a rate tied to the current speed of the player
- Minimal styling on top of plain HTML elements
- UI elements are placed within mobile width columns, even on desktop, so that the same interface can be used on mobile and desktop. On mobile they would collapse under one another to form a single column.
  - Columns will be 360px wide
- A simple reveal animation will be used when new UI elements are exposed at various progression points of the game.
- A scrolling list of `Milestone`s is updated whenever the player reaches a various progression points like unlocking upgrades, reaching certain `Distance`s, etc.
