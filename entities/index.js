import Matter from "matter-js"
import { Dimensions } from 'react-native'
import Background from "../Components/Background"
import Wall from "../Components/Wall"
import Zombie from "../Components/Zombie"
import Ball from "../Components/Ball"
import Target from "../Components/Target"
import Commander from "../Components/Commander"

// import Ball from "../components/Ball";
// import Zombie, { zombie } from "../components/Zombie";
// import Target from "../components/Target";
// import Commander from "../components/Commander";
// import BoxBomb from "../components/BoxBomb";
// import { Box } from "../components/Box";
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
function getZombie(world) {
    return { Zombie4: Zombie(world, { x: windowWidth / 2 + 53, y: windowHeight / 2 - 53 }, { width: 75, height: 70 }, '4') }
}
export default restart => {
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
        physics: { engine: engine, world: world, constraint: constraint},
        MidFloor: Wall(world, "black", { x: windowWidth / 2, y: windowHeight / 2 }, { height: 20, width: 150 }, false, false),
        Wall1: Wall(world, 'red', { x: windowWidth / 2, y: windowHeight + 100}, { width: windowWidth, height: 250 }, false),
        Wall2: Wall(world, 'red', { x: -100, y: windowHeight / 2 }, { width: 250, height: windowHeight }, true),
        Wall3: Wall(world, 'red', { x: windowWidth / 2, y: -100 }, { width: windowWidth, height: 250 }, false),
        Wall4: Wall(world, 'red', { x: windowWidth + 100, y: windowHeight / 2 }, { width: 250, height: windowHeight }, true),
        ...getZombie(world),
        Zombie1: Zombie(world, { x: windowWidth / 2, y: windowHeight / 2 - 53 }, { width: 75, height: 70 }, '1'),
        Zombie2: Zombie(world, { x: windowWidth / 2 + 20, y: windowHeight - 70 }, { width: 75, height: 70 }, '2'),
        Zombie3: Zombie(world, { x: windowWidth / 2 + 200, y: windowHeight - 70 }, { width: 75, height: 70 }, '3'),
        Bullet: Ball(world, 'yellow', { x: 110, y: 300 }, 10, 1, 'ball'),
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
        Commander: Commander(world, { x: 95, y: 300}, { width: 75, height: 70 }),
    }
}






