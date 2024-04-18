import Matter from "matter-js"
import { Dimensions } from 'react-native'
import Background from "../Components/Background"
import Wall from "../Components/Wall"
import Zombie from "../Components/Zombie"
import Ball from "../Components/Ball"
import Target from "../Components/Target"
import Commander from "../Components/Commander"
import Bg from "../Components/Bg"
import BoxBomb from "../Components/BoxBomb"
import MidFloor from "../Components/MidFloor"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

function getZombie(world) {
    return { Zombie4: Zombie(world, { x: windowWidth / 2 + 270, y: windowHeight / 2 + 15 }, { width: 75, height: 70 }, '4') }
}

function defaultSetup(world) {
    return {
        Wall1: Wall(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false, true, `1`),
        Wall2: Wall(world, 'red', { x: 0, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `2`),
        Wall3: Wall(world, 'red', { x: windowWidth / 2, y: 0 }, { width: windowWidth, height: 50 }, false, true, `3`),
        Wall4: Wall(world, 'red', { x: windowWidth, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `4`),

        WallEnforcer1: Wall(world, 'yellow', { x: windowWidth / 2, y: windowHeight + 250 }, { width: windowWidth, height: 500 }, false, true, `1`),
        WallEnforcer2: Wall(world, 'yellow', { x: -250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `2`),
        WallEnforcer3: Wall(world, 'yellow', { x: windowWidth / 2, y: -250 }, { width: windowWidth, height: 500 }, false, true, `3`),
        WallEnforcer4: Wall(world, 'yellow', { x: windowWidth + 250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `4`),

        Bullet: Ball(world, 'yellow', { x: 95 + 75 / 2, y: windowHeight - 120 }, 10, 1, 'ball'),
        Ball1: Ball(world, 'red', { x: -10, y: -10 }, 9, 2, 'notBall'),
        Ball2: Ball(world, 'red', { x: -10, y: -10 }, 8.5, 2.5, 'notBall'),
        Ball3: Ball(world, 'red', { x: -10, y: -10 }, 8, 3, 'notBall'),
        Ball4: Ball(world, 'red', { x: -10, y: -10 }, 7.5, 3.5, 'notBall'),
        Ball5: Ball(world, 'red', { x: -10, y: -10 }, 7, 4, 'notBall'),
        Ball6: Ball(world, 'red', { x: -10, y: -10 }, 6.5, 4.5, 'notBall'),
        Ball7: Ball(world, 'red', { x: -10, y: -10 }, 6, 5, 'notBall'),
        Ball8: Ball(world, 'red', { x: -10, y: -10 }, 5.5, 5.5, 'notBall'),
        Ball9: Ball(world, 'red', { x: -10, y: -10 }, 5, 6, 'notBall'),
        Ball10: Ball(world, 'red', { x: -10, y: -10 }, 4.5, 6.5, 'notBall'),
        Ball11: Ball(world, 'red', { x: -10, y: -10 }, 4, 7, 'notBall'),
        
        Target: Target(world, 'black', { x: -20, y: -20 }, 20),
        Bg: Bg(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false),
        Commander: Commander(world, { x: 95, y: windowHeight - 90 }, { width: 75, height: 70 }),
    }
}

function setLevel(level) {
    if (level === `1`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.gravity.y = 0
        let world = engine.world
        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });
        const body = Matter.Bodies.rectangle(windowWidth / 2, -1000, 100, { frictionAir: 0.021 });
        Matter.World.add(world, body);
        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint },
            MidFloor: Wall(world, "black", { x: windowWidth / 2, y: windowHeight / 2 }, { height: 20, width: 150 }, false, false),
            Wall1: Wall(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false, true, `1`),
            Wall2: Wall(world, 'red', { x: 0, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `2`),
            Wall3: Wall(world, 'red', { x: windowWidth / 2, y: 0 }, { width: windowWidth, height: 50 }, false, true, `3`),
            Wall4: Wall(world, 'red', { x: windowWidth, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `4`),

            WallEnforcer1: Wall(world, 'yellow', { x: windowWidth / 2, y: windowHeight + 250 }, { width: windowWidth, height: 500 }, false, true, `1`),
            WallEnforcer2: Wall(world, 'yellow', { x: -250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `2`),
            WallEnforcer3: Wall(world, 'yellow', { x: windowWidth / 2, y: -250 }, { width: windowWidth, height: 500 }, false, true, `3`),
            WallEnforcer4: Wall(world, 'yellow', { x: windowWidth + 250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `4`),


            ...getZombie(world),
            Zombie1: Zombie(world, { x: windowWidth / 2, y: windowHeight / 2 - 53 }, { width: 75, height: 70 }, '1'),
            Zombie2: Zombie(world, { x: windowWidth / 2 + 20, y: windowHeight - 70 }, { width: 75, height: 70 }, '2'),
            Zombie3: Zombie(world, { x: windowWidth / 2 + 200, y: windowHeight - 70 }, { width: 75, height: 70 }, '3'),
            Bullet: Ball(world, 'yellow', { x: 95 + 75 / 2, y: windowHeight - 120 }, 10, 1, 'ball'),
            // Bullet2: Ball(world, 'yellow', { x: 100, y: 300 }, 10, 1, 'ball'),
            // Bullet3: Ball(world, 'yellow', { x: 100, y: 300 }, 10, 1, 'ball'),
            // Bullet4: Ball(world, 'yellow', { x: 100, y: 300 }, 10, 1, 'ball'),
            // Bullet5: Ball(world, 'yellow', { x: 100, y: 300 }, 10, 1, 'ball'),
            // Ball: Ball(world, 'yellow', { x: 95 + 75 / 2, y: 310 + 35 }, 10, 1, 'ball'),
            Ball1: Ball(world, 'red', { x: -10, y: -10 }, 9, 2, 'notBall'),
            Ball2: Ball(world, 'red', { x: -10, y: -10 }, 8.5, 2.5, 'notBall'),
            Ball3: Ball(world, 'red', { x: -10, y: -10 }, 8, 3, 'notBall'),
            Ball4: Ball(world, 'red', { x: -10, y: -10 }, 7.5, 3.5, 'notBall'),
            Ball5: Ball(world, 'red', { x: -10, y: -10 }, 7, 4, 'notBall'),
            Ball6: Ball(world, 'red', { x: -10, y: -10 }, 6.5, 4.5, 'notBall'),
            Ball7: Ball(world, 'red', { x: -10, y: -10 }, 6, 5, 'notBall'),
            Ball8: Ball(world, 'red', { x: -10, y: -10 }, 5.5, 5.5, 'notBall'),
            Ball9: Ball(world, 'red', { x: -10, y: -10 }, 5, 6, 'notBall'),
            Ball10: Ball(world, 'red', { x: -10, y: -10 }, 4.5, 6.5, 'notBall'),
            Ball11: Ball(world, 'red', { x: -10, y: -10 }, 4, 7, 'notBall'),
            // Bomb : BoxBomb(world, 'red', { x: windowWidth / 2, y: 50 }, { width: 100, height: 100 }),
            // // Box: { body: body, size: [0, 0], color: "pink", renderer: Box },
            Target: Target(world, 'black', { x: -20, y: -20 }, 20),
            Bg: Background(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false),
            Commander: Commander(world, { x: 95, y: windowHeight - 90 }, { width: 75, height: 70 }),
        }
    }

    if (level === `2`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.gravity.y = 0
        let world = engine.world

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });

        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint, level: level },
            MidFloor: MidFloor(world, "black", { x: windowWidth / 2, y: windowHeight / 2 }, { height: 20, width: 150 }, false, false, `0`),
            // MidFloor2: Wall(world, "black", { x: windowWidth / 2, y: 350 }, { height: 20, width: 150 }, false, false),

            Wall1: Wall(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false, true, `1`),
            Wall2: Wall(world, 'red', { x: 0, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `2`),
            Wall3: Wall(world, 'red', { x: windowWidth / 2, y: 0 }, { width: windowWidth, height: 50 }, false, true, `3`),
            Wall4: Wall(world, 'red', { x: windowWidth, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `4`),

            WallEnforcer1: Wall(world, 'yellow', { x: windowWidth / 2, y: windowHeight + 250 }, { width: windowWidth, height: 500 }, false, true, `1`),
            WallEnforcer2: Wall(world, 'yellow', { x: -250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `2`),
            WallEnforcer3: Wall(world, 'yellow', { x: windowWidth / 2, y: -250 }, { width: windowWidth, height: 500 }, false, true, `3`),
            WallEnforcer4: Wall(world, 'yellow', { x: windowWidth + 250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `4`),

            // Wall5: Wall(world, "black", { x: windowWidth / 2, y: windowHeight / 2 }, { height: 150, width: 20 }, true, false, `5`),
            // Wall6: Wall(world, "black", { x: windowWidth / 2  - 85, y:  windowHeight / 2 - 63 }, { height: 50, width: 20 }, true, true, `6`),
            // ...getZombie(world, level),

            Zombie1: Zombie(world, { x: windowWidth / 2 - 20, y: windowHeight / 2 - 53 }, { width: 75, height: 70 }, '1', level),
            Zombie2: Zombie(world, { x: windowWidth / 2 + 20, y: windowHeight - 70 }, { width: 75, height: 70 }, '2', level),
            // Zombie3: Zombie(world, { x: windowWidth / 2 + 200, y: windowHeight - 70 }, { width: 75, height: 70 }, '3', level),

            Bullet: Ball(world, 'yellow', { x: 95 + 75 / 2, y: windowHeight - 80 }, 10, 1, 'ball'),
            Ball1: Ball(world, 'red', { x: -10, y: -10 }, 9, 2, 'notBall'),
            Ball2: Ball(world, 'red', { x: -10, y: -10 }, 8.5, 2.5, 'notBall'),
            Ball3: Ball(world, 'red', { x: -10, y: -10 }, 8, 3, 'notBall'),
            Ball4: Ball(world, 'red', { x: -10, y: -10 }, 7.5, 3.5, 'notBall'),
            Ball5: Ball(world, 'red', { x: -10, y: -10 }, 7, 4, 'notBall'),
            Ball6: Ball(world, 'red', { x: -10, y: -10 }, 6.5, 4.5, 'notBall'),
            Ball7: Ball(world, 'red', { x: -10, y: -10 }, 6, 5, 'notBall'),
            Ball8: Ball(world, 'red', { x: -10, y: -10 }, 5.5, 5.5, 'notBall'),
            Ball9: Ball(world, 'red', { x: -10, y: -10 }, 5, 6, 'notBall'),
            Ball10: Ball(world, 'red', { x: -10, y: -10 }, 4.5, 6.5, 'notBall'),
            Ball11: Ball(world, 'red', { x: -10, y: -10 }, 4, 7, 'notBall'),

            // Balls: Ball(world, 'pink', { x: 95 + 75 / 2, y: windowHeight - 80 }, 11, 10, 'balls'),

            Target: Target(world, 'black', { x: -20, y: -20 }, 20),
            Bg: Bg(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false),
            Commander: Commander(world, { x: 95, y: windowHeight - 90 }, { width: 75, height: 70 }),
        }
    }

    if (level === `3`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.gravity.y = 0
        let world = engine.world

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });

        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint, level: level },
            MidFloor: MidFloor(world, "grey", { x: windowWidth / 2, y: windowHeight / 2 }, { height: 20, width: 150 }, false, `0`),
            // MidFloor2: Wall(world, "black", { x: windowWidth / 2, y: 350 }, { height: 20, width: 150 }, false, false),

            Wall1: Wall(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false, true, `1`),
            Wall2: Wall(world, 'red', { x: 0, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `2`),
            Wall3: Wall(world, 'red', { x: windowWidth / 2, y: 0 }, { width: windowWidth, height: 50 }, false, true, `3`),
            Wall4: Wall(world, 'red', { x: windowWidth, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `4`),

            WallEnforcer1: Wall(world, 'yellow', { x: windowWidth / 2, y: windowHeight + 250 }, { width: windowWidth, height: 500 }, false, true, `1`),
            WallEnforcer2: Wall(world, 'yellow', { x: -250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `2`),
            WallEnforcer3: Wall(world, 'yellow', { x: windowWidth / 2, y: -250 }, { width: windowWidth, height: 500 }, false, true, `3`),
            WallEnforcer4: Wall(world, 'yellow', { x: windowWidth + 250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `4`),

            Wall5: MidFloor(world, "grey", { x: windowWidth / 2, y: windowHeight / 2 }, { height: 150, width: 20 }, true, false, `5`),
            Wall6: MidFloor(world, "grey", { x: windowWidth / 2 - 85, y: windowHeight / 2 - 63 }, { height: 50, width: 20 }, true, false, `6`),


            Zombie1: Zombie(world, { x: windowWidth / 2 - 20, y: windowHeight / 2 - 53 }, { width: 75, height: 70 }, '1', level),
            Zombie2: Zombie(world, { x: windowWidth / 2 + 20, y: windowHeight - 70 }, { width: 75, height: 70 }, '2', level),
            Zombie3: Zombie(world, { x: windowWidth / 2 + 200, y: windowHeight - 70 }, { width: 75, height: 70 }, '3', level),
            Zombie4: Zombie(world, { x: windowWidth / 2 + 270, y: windowHeight / 2 + 15 }, { width: 75, height: 70 }, '4'),


            Bullet: Ball(world, 'yellow', { x: 95 + 75 / 2, y: windowHeight - 120 }, 10, 1, 'ball'),
            Ball1: Ball(world, 'red', { x: -10, y: -10 }, 9, 2, 'notBall'),
            Ball2: Ball(world, 'red', { x: -10, y: -10 }, 8.5, 2.5, 'notBall'),
            Ball3: Ball(world, 'red', { x: -10, y: -10 }, 8, 3, 'notBall'),
            Ball4: Ball(world, 'red', { x: -10, y: -10 }, 7.5, 3.5, 'notBall'),
            Ball5: Ball(world, 'red', { x: -10, y: -10 }, 7, 4, 'notBall'),
            Ball6: Ball(world, 'red', { x: -10, y: -10 }, 6.5, 4.5, 'notBall'),
            Ball7: Ball(world, 'red', { x: -10, y: -10 }, 6, 5, 'notBall'),
            Ball8: Ball(world, 'red', { x: -10, y: -10 }, 5.5, 5.5, 'notBall'),
            Ball9: Ball(world, 'red', { x: -10, y: -10 }, 5, 6, 'notBall'),
            Ball10: Ball(world, 'red', { x: -10, y: -10 }, 4.5, 6.5, 'notBall'),
            Ball11: Ball(world, 'red', { x: -10, y: -10 }, 4, 7, 'notBall'),

            // Balls: Ball(world, 'pink', { x: 95 + 75 / 2, y: windowHeight - 80 }, 11, 10, 'balls'),

            Target: Target(world, 'black', { x: -20, y: -20 }, 20),
            Bg: Bg(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false),
            Commander: Commander(world, { x: 95, y: windowHeight - 90 }, { width: 75, height: 70 }),
        }
    }

    if (level === `4`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.gravity.y = 0
        let world = engine.world

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });

        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint, level: level },
            MidFloor: MidFloor(world, "grey", { x: windowWidth - 125, y: windowHeight / 2 + 70 }, { height: 20, width: 250 }, false, `0`),
            // MidFloor2: Wall(world, "black", { x: windowWidth / 2, y: 350 }, { height: 20, width: 150 }, false, false),

            Wall1: Wall(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false, true, `1`),
            Wall2: Wall(world, 'red', { x: 0, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `2`),
            Wall3: Wall(world, 'red', { x: windowWidth / 2, y: 0 }, { width: windowWidth, height: 50 }, false, true, `3`),
            Wall4: Wall(world, 'red', { x: windowWidth, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `4`),

            WallEnforcer1: Wall(world, 'yellow', { x: windowWidth / 2, y: windowHeight + 250 }, { width: windowWidth, height: 500 }, false, true, `1`),
            WallEnforcer2: Wall(world, 'yellow', { x: -250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `2`),
            WallEnforcer3: Wall(world, 'yellow', { x: windowWidth / 2, y: -250 }, { width: windowWidth, height: 500 }, false, true, `3`),
            WallEnforcer4: Wall(world, 'yellow', { x: windowWidth + 250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `4`),

            Wall5: MidFloor(world, "grey", { x: windowWidth - 180, y: windowHeight / 3 }, { height: 20, width: 153 }, true, false, `5`),
            Wall6: MidFloor(world, "grey", { x: windowWidth / 2, y: windowHeight / 3 }, { height: 20, width: 150 }, true, false, `6`),

            Wall7: MidFloor(world, "grey", { x: windowWidth / 1.4, y: windowHeight / 2 + 10 }, { height: 140, width: 20 }, false, `0`),

            ...getZombie(world, level),

            Zombie1: Zombie(world, { x: windowWidth / 2 + 30, y: windowHeight / 4 - 20 }, { width: 75, height: 70 }, '1', level),
            Zombie2: Zombie(world, { x: windowWidth / 2 + 30, y: windowHeight / 2 + 120 }, { width: 75, height: 70 }, '2', level),
            Zombie3: Zombie(world, { x: windowWidth / 2 + 370, y: windowHeight / 2 + 15 }, { width: 75, height: 70 }, '3', level),


            Bullet: Ball(world, 'yellow', { x: 95 + 75 / 2, y: windowHeight - 120 }, 10, 1, 'ball'),
            Ball1: Ball(world, 'red', { x: -10, y: -10 }, 9, 2, 'notBall'),
            Ball2: Ball(world, 'red', { x: -10, y: -10 }, 8.5, 2.5, 'notBall'),
            Ball3: Ball(world, 'red', { x: -10, y: -10 }, 8, 3, 'notBall'),
            Ball4: Ball(world, 'red', { x: -10, y: -10 }, 7.5, 3.5, 'notBall'),
            Ball5: Ball(world, 'red', { x: -10, y: -10 }, 7, 4, 'notBall'),
            Ball6: Ball(world, 'red', { x: -10, y: -10 }, 6.5, 4.5, 'notBall'),
            Ball7: Ball(world, 'red', { x: -10, y: -10 }, 6, 5, 'notBall'),
            Ball8: Ball(world, 'red', { x: -10, y: -10 }, 5.5, 5.5, 'notBall'),
            Ball9: Ball(world, 'red', { x: -10, y: -10 }, 5, 6, 'notBall'),
            Ball10: Ball(world, 'red', { x: -10, y: -10 }, 4.5, 6.5, 'notBall'),
            Ball11: Ball(world, 'red', { x: -10, y: -10 }, 4, 7, 'notBall'),

            // Balls: Ball(world, 'pink', { x: 95 + 75 / 2, y: windowHeight - 80 }, 11, 10, 'balls'),

            Target: Target(world, 'black', { x: -20, y: -20 }, 20),
            Bg: Bg(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false),
            Commander: Commander(world, { x: 95, y: windowHeight - 90 }, { width: 75, height: 70 }),
        }
    }

    if (level === `5`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.gravity.y = 0
        let world = engine.world

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });

        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint, level: level },
            MidFloor: MidFloor(world, "black", { x: windowWidth / 2 + 5, y: windowHeight / 2 }, { height: 20, width: 200 }, false, false, `0`),
            // MidFloor2: Wall(world, "black", { x: windowWidth / 2, y: 350 }, { height: 20, width: 150 }, false, false),

            Wall1: Wall(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false, true, `1`),
            Wall2: Wall(world, 'red', { x: 0, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `2`),
            Wall3: Wall(world, 'red', { x: windowWidth / 2, y: 0 }, { width: windowWidth, height: 50 }, false, true, `3`),
            Wall4: Wall(world, 'red', { x: windowWidth, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `4`),

            WallEnforcer1: Wall(world, 'yellow', { x: windowWidth / 2, y: windowHeight + 250 }, { width: windowWidth, height: 500 }, false, true, `1`),
            WallEnforcer2: Wall(world, 'yellow', { x: -250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `2`),
            WallEnforcer3: Wall(world, 'yellow', { x: windowWidth / 2, y: -250 }, { width: windowWidth, height: 500 }, false, true, `3`),
            WallEnforcer4: Wall(world, 'yellow', { x: windowWidth + 250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `4`),

            Wall5: MidFloor(world, "pink", { x: windowWidth / 2, y: windowHeight / 2 - 39 }, { height: 100, width: 20 }, true, false, `5`),
            Wall6: MidFloor(world, "red", { x: windowWidth / 2 - 85, y: windowHeight / 2 - 39.5 }, { height: 100, width: 20 }, true, false, `6`),
            Wall7: MidFloor(world, "purple", { x: windowWidth / 2 + 5, y: windowHeight / 2 - 93 }, { height: 20, width: 200 }, false, false, `7`),
            Wall8: MidFloor(world, "yellow", { x: windowWidth / 2 + 95, y: windowHeight / 2 - 39.5 }, { height: 100, width: 20 }, false, false, `8`),

            ...getZombie(world, level),

            Zombie1: Zombie(world, { x: windowWidth / 2 - 20, y: windowHeight / 2 - 53 }, { width: 75, height: 70 }, '1', level),
            Zombie2: Zombie(world, { x: windowWidth / 2 + 20, y: windowHeight - 70 }, { width: 75, height: 70 }, '2', level),
            Zombie3: Zombie(world, { x: windowWidth / 2 + 200, y: windowHeight - 70 }, { width: 75, height: 70 }, '3', level),


            Bullet: Ball(world, 'yellow', { x: 95 + 35 / 2, y: windowHeight - 60 }, 10, 1, 'ball'),
            Ball1: Ball(world, 'red', { x: -10, y: -10 }, 9, 2, 'notBall'),
            Ball2: Ball(world, 'red', { x: -10, y: -10 }, 8.5, 2.5, 'notBall'),
            Ball3: Ball(world, 'red', { x: -10, y: -10 }, 8, 3, 'notBall'),
            Ball4: Ball(world, 'red', { x: -10, y: -10 }, 7.5, 3.5, 'notBall'),
            Ball5: Ball(world, 'red', { x: -10, y: -10 }, 7, 4, 'notBall'),
            Ball6: Ball(world, 'red', { x: -10, y: -10 }, 6.5, 4.5, 'notBall'),
            Ball7: Ball(world, 'red', { x: -10, y: -10 }, 6, 5, 'notBall'),
            Ball8: Ball(world, 'red', { x: -10, y: -10 }, 5.5, 5.5, 'notBall'),
            Ball9: Ball(world, 'red', { x: -10, y: -10 }, 5, 6, 'notBall'),
            Ball10: Ball(world, 'red', { x: -10, y: -10 }, 4.5, 6.5, 'notBall'),
            Ball11: Ball(world, 'red', { x: -10, y: -10 }, 4, 7, 'notBall'),

            Bomb: BoxBomb(world, 'pink', { x: windowWidth / 2, y: 50 }, { height: 100, width: 100 }),
            // Balls: Ball(world, 'pink', { x: 95 + 75 / 2, y: windowHeight - 80 }, 11, 10, 'balls'),

            Target: Target(world, 'black', { x: -20, y: -20 }, 20),
            Bg: Bg(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false),
            Commander: Commander(world, { x: 95, y: windowHeight - 90 }, { width: 75, height: 70 }),
        }
    }

    if (level === `6`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.gravity.y = 0
        let world = engine.world

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });

        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint, level: level },
            MidFloor: MidFloor(world, "black", { x: windowWidth / 2 + 5, y: windowHeight / 2 }, { height: 20, width: 200 }, false, false, `0`),
            // MidFloor2: Wall(world, "black", { x: windowWidth / 2, y: 350 }, { height: 20, width: 150 }, false, false),

            Wall1: Wall(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false, true, `1`),
            Wall2: Wall(world, 'red', { x: 0, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `2`),
            Wall3: Wall(world, 'red', { x: windowWidth / 2, y: 0 }, { width: windowWidth, height: 50 }, false, true, `3`),
            Wall4: Wall(world, 'red', { x: windowWidth, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `4`),

            WallEnforcer1: Wall(world, 'yellow', { x: windowWidth / 2, y: windowHeight + 250 }, { width: windowWidth, height: 500 }, false, true, `1`),
            WallEnforcer2: Wall(world, 'yellow', { x: -250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `2`),
            WallEnforcer3: Wall(world, 'yellow', { x: windowWidth / 2, y: -250 }, { width: windowWidth, height: 500 }, false, true, `3`),
            WallEnforcer4: Wall(world, 'yellow', { x: windowWidth + 250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `4`),

            // Wall5: MidFloor(world, "pink", { x: windowWidth / 2, y: windowHeight / 2 - 39 }, { height: 100, width: 20 }, true, false, `5`),
            Wall6: MidFloor(world, "red", { x: windowWidth / 2 - 85, y: windowHeight / 2 - 39.5 }, { height: 100, width: 20 }, true, false, `6`),
            Wall7: MidFloor(world, "purple", { x: windowWidth / 2 + 5, y: windowHeight / 2 - 93 }, { height: 20, width: 200 }, false, false, `7`),
            Wall8: MidFloor(world, "yellow", { x: windowWidth / 2 + 95, y: windowHeight / 2 - 27 }, { height: 72, width: 20 }, false, false, `8`),

            // ...getZombie(world, level),

            Zombie1: Zombie(world, { x: windowWidth / 2 - 20, y: windowHeight / 2 - 53 }, { width: 75, height: 70 }, '1', level),
            // Zombie2: Zombie(world, { x: windowWidth / 2 + 20, y: windowHeight - 70 }, { width: 75, height: 70 }, '2', level),
            // Zombie3: Zombie(world, { x: windowWidth / 2 + 200, y: windowHeight - 70 }, { width: 75, height: 70 }, '3', level),


            Bullet: Ball(world, 'yellow', { x: 95 + 35 / 2, y: windowHeight - 60 }, 10, 1, 'ball'),
            Ball1: Ball(world, 'red', { x: -10, y: -10 }, 9, 2, 'notBall'),
            Ball2: Ball(world, 'red', { x: -10, y: -10 }, 8.5, 2.5, 'notBall'),
            Ball3: Ball(world, 'red', { x: -10, y: -10 }, 8, 3, 'notBall'),
            Ball4: Ball(world, 'red', { x: -10, y: -10 }, 7.5, 3.5, 'notBall'),
            Ball5: Ball(world, 'red', { x: -10, y: -10 }, 7, 4, 'notBall'),
            Ball6: Ball(world, 'red', { x: -10, y: -10 }, 6.5, 4.5, 'notBall'),
            Ball7: Ball(world, 'red', { x: -10, y: -10 }, 6, 5, 'notBall'),
            Ball8: Ball(world, 'red', { x: -10, y: -10 }, 5.5, 5.5, 'notBall'),
            Ball9: Ball(world, 'red', { x: -10, y: -10 }, 5, 6, 'notBall'),
            Ball10: Ball(world, 'red', { x: -10, y: -10 }, 4.5, 6.5, 'notBall'),
            Ball11: Ball(world, 'red', { x: -10, y: -10 }, 4, 7, 'notBall'),

            // Bomb: BoxBomb(world, 'pink', { x: windowWidth / 2, y:  50 }, { height: 100, width: 100 }),
            // Balls: Ball(world, 'pink', { x: 95 + 75 / 2, y: windowHeight - 80 }, 11, 10, 'balls'),

            Target: Target(world, 'black', { x: -20, y: -20 }, 20),
            Bg: Bg(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false),
            Commander: Commander(world, { x: 95, y: windowHeight - 90 }, { width: 75, height: 70 }),
        }
    }

    if (level === `7`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.gravity.y = 0
        let world = engine.world

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });

        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint, level: level },
            MidFloor: MidFloor(world, "black", { x: windowWidth / 2 + 5, y: windowHeight / 2 }, { height: 20, width: 200 }, false, false, `0`),
            // MidFloor2: Wall(world, "black", { x: windowWidth / 2, y: 350 }, { height: 20, width: 150 }, false, false),

            Wall1: Wall(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false, true, `1`),
            Wall2: Wall(world, 'red', { x: 0, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `2`),
            Wall3: Wall(world, 'red', { x: windowWidth / 2, y: 0 }, { width: windowWidth, height: 50 }, false, true, `3`),
            Wall4: Wall(world, 'red', { x: windowWidth, y: windowHeight / 2 }, { width: 50, height: windowHeight }, true, true, `4`),

            WallEnforcer1: Wall(world, 'yellow', { x: windowWidth / 2, y: windowHeight + 250 }, { width: windowWidth, height: 500 }, false, true, `1`),
            WallEnforcer2: Wall(world, 'yellow', { x: -250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `2`),
            WallEnforcer3: Wall(world, 'yellow', { x: windowWidth / 2, y: -250 }, { width: windowWidth, height: 500 }, false, true, `3`),
            WallEnforcer4: Wall(world, 'yellow', { x: windowWidth + 250, y: windowHeight / 2 }, { width: 500, height: windowHeight }, true, true, `4`),

            // Wall5: MidFloor(world, "pink", { x: windowWidth / 2, y: windowHeight / 2 - 39 }, { height: 100, width: 20 }, true, false, `5`),
            Wall6: MidFloor(world, "red", { x: windowWidth / 2 - 85, y: windowHeight / 2 - 47 }, { height: 112, width: 20 }, true, false, `6`),
            Wall7: MidFloor(world, "purple", { x: windowWidth / 2 - 30, y: windowHeight / 2 - 93 }, { height: 20, width: 130 }, false, false, `7`),
            Wall8: MidFloor(world, "yellow", { x: windowWidth / 2 + 95, y: windowHeight / 2 - 39.5 }, { height: 100, width: 20 }, false, false, `8`),

            // ...getZombie(world, level),

            Zombie1: Zombie(world, { x: windowWidth / 2 - 20, y: windowHeight / 2 - 53 }, { width: 75, height: 70 }, '1', level),
            // Zombie2: Zombie(world, { x: windowWidth / 2 + 20, y: windowHeight - 70 }, { width: 75, height: 70 }, '2', level),
            // Zombie3: Zombie(world, { x: windowWidth / 2 + 200, y: windowHeight - 70 }, { width: 75, height: 70 }, '3', level),


            Bullet: Ball(world, 'yellow', { x: 95 + 35 / 2, y: windowHeight - 60 }, 10, 1, 'ball'),
            Ball1: Ball(world, 'red', { x: -10, y: -10 }, 9, 2, 'notBall'),
            Ball2: Ball(world, 'red', { x: -10, y: -10 }, 8.5, 2.5, 'notBall'),
            Ball3: Ball(world, 'red', { x: -10, y: -10 }, 8, 3, 'notBall'),
            Ball4: Ball(world, 'red', { x: -10, y: -10 }, 7.5, 3.5, 'notBall'),
            Ball5: Ball(world, 'red', { x: -10, y: -10 }, 7, 4, 'notBall'),
            Ball6: Ball(world, 'red', { x: -10, y: -10 }, 6.5, 4.5, 'notBall'),
            Ball7: Ball(world, 'red', { x: -10, y: -10 }, 6, 5, 'notBall'),
            Ball8: Ball(world, 'red', { x: -10, y: -10 }, 5.5, 5.5, 'notBall'),
            Ball9: Ball(world, 'red', { x: -10, y: -10 }, 5, 6, 'notBall'),
            Ball10: Ball(world, 'red', { x: -10, y: -10 }, 4.5, 6.5, 'notBall'),
            Ball11: Ball(world, 'red', { x: -10, y: -10 }, 4, 7, 'notBall'),

            // Bomb: BoxBomb(world, 'pink', { x: windowWidth / 2, y:  50 }, { height: 100, width: 100 }),
            // Balls: Ball(world, 'pink', { x: 95 + 75 / 2, y: windowHeight - 80 }, 11, 10, 'balls'),

            Target: Target(world, 'black', { x: -20, y: -20 }, 20),
            Bg: Bg(world, 'red', { x: windowWidth / 2, y: windowHeight }, { width: windowWidth, height: 50 }, false),
            Commander: Commander(world, { x: 95, y: windowHeight - 90 }, { width: 75, height: 70 }),

            Circle: Ball(world, 'yellow', { x: windowWidth / 2 + 95, y: windowHeight / 2 - 39.5 - 45 }, 20, 1, 'ball'),
        }
    }

    if (level === `8`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.gravity.y = 0
        let world = engine.world

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });

        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint, level: level },

            ...defaultSetup(world),
            MidFloor: MidFloor(world, "grey", { x: windowWidth / 2 - 10, y: windowHeight / 2 + 70 }, { height: 20, width: 130 }, false, `0`),       

            Wall5: MidFloor(world, "grey", { x: windowWidth / 2 - 65, y: windowHeight / 2 + 120 }, { height: 110, width: 20 }, true, false, `5`),
            Wall6: MidFloor(world, "grey", { x: windowWidth / 2 + 100, y:  windowHeight / 2 - 20 }, { height: 20, width: 130 }, false, `6`),
            Wall7: MidFloor(world, "grey", { x: windowWidth / 1.3 + 45, y: windowHeight / 2 + 40 }, { height: 20, width: 130 }, true, false, `7`),

            Zombie1: Zombie(world, { x: windowWidth / 1.55 , y: windowHeight / 2 - 75 }, { width: 75, height: 70 }, '1', level),
            Zombie2: Zombie(world, { x: windowWidth / 2 + 15, y: windowHeight - 70 }, { width: 75, height: 70 }, '2', level),
            Zombie3: Zombie(world, { x: windowWidth / 2 + 350, y: windowHeight - 70 }, { width: 75, height: 70 }, '3', level),
        }
    }

    if (level === `9`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.gravity.y = 0
        let world = engine.world

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });

        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint, level: level },
            MidFloor: MidFloor(world, "gray", { x: windowWidth / 2.5 , y: windowHeight / 2.3 }, { height: 20, width: 150 }, false, false, `0`),

            ...defaultSetup(world),
            Wall5: MidFloor(world, "gray", { x: windowWidth / 1.35, y: windowHeight -70 }, { height: 100, width: 20 }, true, false, `6`),
            Wall6: MidFloor(world, "gray", { x:  windowWidth / 1.37 , y:windowHeight / 2.3 }, { height: 20, width: 150 }, false, false, `7`),
            Wall8: MidFloor(world, "gray", { x: windowWidth / 1.8, y: windowHeight -70 }, { height: 100, width: 20 }, true, false, `6`),

            Zombie1: Zombie(world, { x: windowWidth / 2 - 55, y: windowHeight / 2 - 80 }, { width: 75, height: 70 }, '1', level),
            Zombie2: Zombie(world, { x: windowWidth / 2 + 230, y: windowHeight / 2 - 80}, { width: 75, height: 70 }, '2', level),
            Zombie3: Zombie(world, { x: windowWidth / 2 + 150, y: windowHeight - 70 }, { width: 75, height: 70 }, '3', level),
            Zombie4: Zombie(world, { x: windowWidth / 2 + 300, y: windowHeight - 70 }, { width: 75, height: 70 }, '3', level),
        }
    }

    if (level === `10`) {
        let engine = Matter.Engine.create({ enableSleeping: false })
        engine.positionIterations = 100
    engine.velocityIterations = 100
        engine.gravity.y = 0
        let world = engine.world

        const constraint = Matter.Constraint.create({
            label: "Drag Constraint",
            pointA: { x: 0, y: 0 },
            pointB: { x: 0, y: 0 },
            length: 100,
            stiffness: 0.01,
            angularStiffness: 1,
        });

        Matter.World.addConstraint(world, constraint);
        return {
            physics: { engine: engine, world: world, constraint: constraint, level: level },

            ...defaultSetup(world),
            MidFloor: MidFloor(world, "gray", { x: windowWidth / 2 - 50, y: windowHeight / 2 + 108 }, { height: 120, width: 20 }, true, false, `6`),
    
            // Wall6: MidFloor(world, "red", { x: windowWidth / 2 - 85, y: windowHeight / 2 - 47 }, { height: 112, width: 20 }, true, false, `6`),
            // Wall7: MidFloor(world, "purple", { x: windowWidth / 2 - 30, y: windowHeight / 2 - 93 }, { height: 20, width: 130 }, false, false, `7`),
            Wall8: MidFloor(world, "gray", { x: windowWidth / 2 + 95, y: windowHeight / 2 + 48  }, { height: 240, width: 20 }, false, false, `8`),

            Zombie1: Zombie(world, { x: windowWidth / 2 + 310, y: windowHeight - 70 }, { width: 75, height: 70 }, '1', level),
            Zombie2: Zombie(world, { x: windowWidth / 2 + 35, y: windowHeight - 70 }, { width: 75, height: 70 }, '2', level),
            Zombie3: Zombie(world, { x: windowWidth / 2 + 200, y: windowHeight - 70 }, { width: 75, height: 70 }, '3', level),

            Circle: Ball(world, 'yellow', { x: windowWidth / 2 + 95, y: windowHeight / 2 - 39.5 - 45 }, 20, 1, 'ball'),
        }
    }

}

export default restart => {
    return {
        ...setLevel('10')
    }
}






