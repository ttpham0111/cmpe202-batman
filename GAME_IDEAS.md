# Jessie

## Game idea 

* Game description: Our version of plants vs. zombies, defend our house by strategically growing different types of plants. Survival mode: if any zombie reaches our house, the player loses. Increasing difficulties in increasing levels. More plants will be unlocked throughout the game.
* Game engine: Unity
* User input: mouse/keyboard
* Key features: sunflower, two types of plants and two types of zombies.
* Add-on features: more types of plants and zombies.
* List of Objects: sunflower/resource provider, shooting plants(basic, double, fire, ice), nuts, bombs, 3 types of zombies(weak, medium, strong).
* Comments: we can think of our own plants later, to make the game more fun. 

# Aman

## Car Park

* Game description: The objective of the game will be to park a car or truck at a specific parking spot. The level of difficulty will increase as per levels. We can add income traffic, tight parking spots, time limit, low visibility etc. according to our levels. The game will be physics based where the level will restart if our car or truck will touch any other object. We can give points based on the time taken, coins collected etc.
* Game engine: Whichever is easy
* User input: Keyboard
* Key features: We can have improved graphics as the game concept is not complicated.
* Add-on features: N/A
* List of Objects: Car, road, incoming traffic, other parked cars etc.
* Comments: N/A


# Ankit

## BatHunt

* The another version of the classic DuckHunt game with bats instead of ducks. Set in night mode in the park, bats come around from any direction on the screen. These bats will come in a wave, a wave will have a group of bats coming from any direction. There will be multiple levels starting from the easiest. Each level will consist of 6 waves. To win each level, the user will have to kill more bats than they let go. The number of bats in each wave and their speed keep on increasing as level increases. Killing a bat will earn user 100 points. Killing all the bats in a wave will earn user 500 point bonus.
* Game Engine - Phaser/Pixi
* User input - mouse
* Key features - Here we can focus on graphics more. Spotting bats in the night scene can be a bit challenging for users.
* Add-on features - Nothing as of now. We can think of more we decide to go ahead with this.
* List of objects - Bats, stone shooter stick, stones
* Comments - None



# Palash

## Game - Rescuer Rambo
*  The building has caught fire and some people are still stuck in the building, Here's where our hero Rambo comes for their survival, now lets see if Rambo can successfully save them and finish the game or he himself becomes victim of the fire and games over.
*  Technology - Phaser
*  Keyboard
*  Multiple levels/difficulty can be added and some supernatural powers can also be given to Rambo to succeed.
*  Enemies would be off-course fire, water leakage at some place, broken areas, construction damage.

# Tuan

## Coding RPG
### Description
This game is meant to target young gamers who would like to learn to code. There are already many examples of gamifying the learning experience:
- [https://www.playcodemonkey.com](https://www.playcodemonkey.com): A simple game where the player types code to maneuver a monkey to bananas.
- [https://codecombat.com/play](https://codecombat.com/play): A more complex game with many levels, character, and  an object-oriented approach.

The game follows one (or many) hero(es) and the player leads them on an (still unknown) adventure. The character is controlled via simple functions that increasingly get more complex. The goal of the game is to make learning to code fun and provide a seamless introduction to many programming ideas.

- **Game Engine**: PhaserJS

- **User Input**: Keyboard

### Key Features
- Code editor with simple compilation, the editor should include available functions.
- Game map with characters, monsters, classes (warrior, mage, assassin, etc...), items, skills, spells, etc...
- Most importantly, **command hierarchy**:
  - This is the ability to encapsulate certain logic into a function, which can be used inside other functions. For example, given the ability to turn with a range of (-360, 360), `turn_left` can be created by macro-ing `turn -90`. From there, `turn left` can be used with other abilities like `attack` to create `left_attack`.
  - This should come with the ability to go back improve upon implemented functions.

![CodeRPG Wireframe](https://github.com/nguyensjsu/cmpe202-batman/blob/master/wiki/assets/CodeRPG_wireframe_v1.png)
[[Link](https://drive.google.com/file/d/0Bz4DaV2pUn4CYW1mcTRiWW5HdVE/view?usp=sharing)]

### Additional Features
- Community for sharing code of more complex functions and getting help.
- More adventures, story, items, and character (content+)

### Sample Objects
- Weapons (swords, wands, etc...): Has stats and comes with predefined commands.
  - Ex:
    - Damascus Dagger comes with: `stab`, `cut`. Advanced weapons can come with strong predefined commands that include hidden bonuses. For example, this dagger is a high tier dagger which comes with `backstab`. This backstab might have extra animations or is stronger than a player implemented `backstab`. Players can use the ability via `DamascusDagger.backstab`.
      ```
        move_behind_enemy:
          turn_right    # turn 90
          step_forward  # step 1
          turn_left     # turn -90
          step 2
          turn_left
          step_forward
          turn_left

        backstab:
          move_behind_enemy
          stab
      ```
    - Short Bow might have: `shoot`, `swing`.
- Enemies might move after the player moves.
  - The player can only do so many things in a turn, move `x` spaces, attack `n` times, etc...
  - Enemies drop loot when killed, player gains EXP, etc.

### Comments
This game will definitely take more work from everyone, but I am truly excited about this idea and would love for people to begin playing and learning from this.
