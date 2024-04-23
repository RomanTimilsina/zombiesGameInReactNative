import Matter from "matter-js";
import { zombieHit } from "./Components/Zombie";
import { Box } from "./Components/Box";
// import { Box } from "./Components/Box";
const getAngle = (pointerX, pointerY, objectX, objectY) => {
    let angle = Math.atan2((pointerX - objectX), (pointerY - objectY)) * (180 / Math.PI) * -1 + 90;
    return angle
};
export let prevLevel = ``
export let levels = ''
let bombId = 100
export var boomHit = false
let boxIds = 0
export let ballMove = false
export let angle = 0
export let ballPos = { x: 100, y: 320 }
export let bulletPos = { x: 100, y: 320 }
let runOnce = true
export let bulletCount = 1
export let explosion = 1
let count = 1
let balls = []
let deactivate = false
let zombieCount = 0
let falling = false
let pressTimer;
// let now = Date.now();
// setInterval(() => {
//     Matter.Engine.update(engine, Date.now() - now);
//     now = Date.now();
// }, 0);
const Physics = (entities, { touches, time, dispatch, events }) => {
    let engine = entities.physics.engine

    levels = entities.physics.level
    if (entities.physics.level !== prevLevel) {
        ballMove = false
        //  console.log('level: ',entities.physics.level)

        angle = 0
        ballPos = { x: 100, y: 320 }
        opacity = 1
        count = 1
        balls = []
        prevLevel = ``
        //  ballPosArr = []
        prevLevel = entities.physics.level
    }




    // entities.Circle.body.force.x = 0.1 / 200;

    touches.filter(t => t.type === "move")
        .forEach(t => {
            console.log(" moved ")
            let x = t.event.pageX
            let y = t.event.pageY
            Matter.Body.setPosition(entities.Target.body, { x: x, y: y })
            angle = getAngle(t.event.pageX, t.event.pageXY, 95 + 75 / 2, 310 + 35)
        });

    touches.filter(t => t.type === "press")
        .forEach(t => {
            // pressTimer = setTimeout(() => {
                console.log("release")
                let x = t.event.pageX
                let y = t.event.pageY
                Matter.Body.setPosition(entities.Target.body, { x: x, y: y });
                // angle = getAngle(t.event.pageX, t.event.pageXY, 95 + 75 / 2, 310 + 35)
            // }, 1000);
            
        });


    // touches.filter(t => t.type === "move")
    //     .forEach(t => {
    //         console.log("move ")
    //         angle = getAngle(t.event.pageX, t.event.pageY, 95 + 75 / 2, 310 + 35)
    //     });

    touches.filter(t => t.type === "end")
        .forEach(t => {
            console.log("end ")
            Matter.Body.setPosition(entities.Target.body, { x: -40, y: -40 })
            angle = 0
            // console.log(bulletCount)
            if (bulletCount > 40) {
                deactivate = true
                bulletCount = 1
            } else {
                bulletCount++
            }
            if ((count == 1) || (count <= 11)) {
                if (ballMove == false) {
                    // Matter.Body.setVelocity(entities.Ball.body, {
                    //     x: t.event.pageX - ballPos.x,
                    //     y: t.event.pageY - ballPos.y
                    // })
                    // if (bulletCount != 1) {
                    //     bulletCount++
                    // }
                    // if (runOnce) {
                    //     runOnce = false
                    // }
                    if (!deactivate) {
                        Matter.Body.setVelocity(entities.Bullet.body, {
                            x: t.event.pageX - ballPos.x,
                            y: t.event.pageY - ballPos.y,
                        })
                        ballMove = true
                    }
                }
            }
        })
    if (ballMove) {
        balls.unshift({ x: entities.Bullet.body.position.x, y: entities.Bullet.body.position.y })
        if (!deactivate) {
            // Matter.Body.setSpeed(entities.Bullet.body, 25)
        }
        if (balls.length > 13) {
            balls.pop()
        }
    }

    for (let i = 1; i <= 10; i++) {
        Object.keys(entities)
            .filter(key => entities[key].body)
            .forEach(key => {
                if (key.includes(`Wall${i}`)) {
                    if ((Matter.Collision.collides(entities.Bullet.body, entities[`Wall${i}`].body) != null)) {
                        if (count >= 10) {
                            for (let j = 1; j < 6; j++) {
                                Matter.Body.setSpeed(entities.Bullet.body, 0)
                                Matter.Body.setPosition(entities.Bullet.body, { x: 100, y: 300 })
                            }
                            ballMove = false
                            count = 1
                            balls = []
                        } else {
                            count++
                            // console.log(count)
                        }
                    }
                    //

                    // if ((Matter.Collision.collides(entities.OuterBall.body, entities[`Wall${i}`].body) != null)) {
                    //     Matter.Body.setSpeed(entities[`Bullet`].body, 5)
                    // } else {
                       
                    // }
                }
            })
    }
    if (count > 10) {
        count = 1
        balls = []
    }
    if (Matter.Collision.collides(entities.Bullet.body, entities.MidFloor.body) != null) {
        if (count == 10) {
            // for ( let j = 1; j < 6; j++) {
            // Matter.Body.setSpeed(entities.Bullet.body, 0)
            // Matter.Body.setPosition(entities.Bullet.body, { x: 100, y: 300 })
            // }
            // ballMove = false
            // count = 1
        } else {
            count++
            dispatch({ type: 'WallHit' })
        }
    }

    Matter.Body.setSpeed(entities[`Bullet`].body, 10)
    // Matter.Body.setPosition(entities[`Ball1`].body, entities[`Bullet`].body.position)

    for (let i = 1; i < 11; i++) {
        if (ballMove && balls[i - 1] != null) {
            // if (i === 1) {
            //     Matter.Body.setPosition(entities[`Ball${i}`].body, balls[i - 1])
            // }
            Matter.Body.setPosition(entities[`Ball${i}`].body, balls[i - 1])
            Matter.Body.setSpeed(entities[`Ball${i}`].body, 5)
            // ballMove = !ballMove
        }
        if (!ballMove) {
            Matter.Body.setPosition(entities[`Ball${i}`].body, { x: -30, y: -49 })
        }
    }

    for ( let j = 1; j < 4; j++) {
            // Matter.Body.setSpeed(entities.Bullet.body, 10)
            // Matter.Body.setPosition(entities[`Bullet${bulletCount}`].body, { x: 100, y: 300 })
    }

    

    Object.keys(entities)
        .filter(key => entities[key].body)
        .forEach(key => {
            if (key.includes('Circle')) {
                if (Matter.Collision.collides(entities.Bullet.body, entities.Circle.body) != null) {
                    falling = true
                }
            }
            // if (falling) {
            //     Matter.Body.applyForce(entities.Circle.body, {
            //         x: -1,
            //         y: 2
            //     },3)
            // }
        })

    for (let i = 1; i <= 4; i++) {
        Object.keys(entities)
            .filter(key => entities[key].body)
            .forEach(key => {
                if (key.includes('Zombie') && key.includes(i)) {
                    if (i <= 5) {
                        // console.log(key)
                    }

                    if (zombieCount < i) {
                        zombieCount++
                    }

                    if (Matter.Collision.collides(entities.Ball2.body, entities[`Zombie${i}`].body) != null) {
                        if (!zombieHit.includes(i)) {
                            zombieHit.push(i)
                            switch (i) {
                                case 1:
                                    dispatch({ type: '1' })
                                    break
                                case 2:
                                    dispatch({ type: '2' })
                                    break
                                case 3:
                                    dispatch({ type: '3' })
                                    break
                                case 4:
                                    dispatch({ type: '4' })
                                    break
                            }
                        }


                        console.log('zombie:', zombieCount, zombieHit.length)
                        if (zombieHit.length === zombieCount) {
                            zombieCount = 0
                            dispatch({ type: '5' })

                            // if (zombieCount == 3) {
                            //     dispatch({type: '6'})
                            // } else {

                            // }

                            // zombieHit = []

                        }
                    }

                    Object.keys(entities)
                        .filter(key => entities[key].body)
                        .forEach(key => {
                            if (key.includes('Circle')) {

                                Matter.Events.on(engine, 'beforeUpdate', function () {
                                    var gravity = engine.gravity;
                                    let body = entities.Circle.body
                                    if (falling) {
                                        Matter.Body.applyForce(body, body.position, {
                                            x: -gravity.x * gravity.scale * body.mass,
                                            y: -gravity.y * gravity.scale * body.mass
                                        });
                                    }
                                });



                                if (falling) {
                                    entities.Circle.body.force.y = 0.3 / 200;
                                    Matter.Body.setSpeed(entities.Circle.body, 3)
                                
                                }

                                if ((Matter.Collision.collides(entities.Bullet.body, entities[`Circle`].body) != null)) {
                                    falling = true
                                }
                                //
                                if (Matter.Collision.collides(entities.Circle.body, entities[`Zombie${i}`].body) != null) {
                                    if (!zombieHit.includes(i)) {
                                        dispatch({ type: "ZombieHit" })
                                        zombieHit.push(i)
                                    }
                                }
                            }
                            //
                        })
                }
            }
            )
    }

    Object.keys(entities)
        .filter(key => entities[key].body)
        .forEach(key => {
            if (key.includes('Bomb')) {
                if (Matter.Collision.collides(entities.Bomb.body, entities.Bullet.body) != null) {
                    explosion = 0
                    let body = Matter.Bodies.circle(
                        entities.Bomb.body.position.x,
                        entities.Bomb.body.position.y,
                        200,
                        {
                            frictionAir: 0.021,
                        }
                    );
                    body.collisionFilter = {
                        'group': -1,
                        'category': 2,
                        'mask': 0,
                    };
                    Matter.World.add(engine.world, [body]);
                    bombId++
                    entities[bombId] = {
                        body: body,
                        size: [200, 200],
                        renderer: Box
                    };
                    zombieHit.push(5)
                    zombieHit.push(6)
                    for (let i = 1; i <= 4; i++) {
                        if (entities[bombId].body) {
                            if (Matter.Collision.collides(entities[bombId].body, entities[`Zombie${i}`].body) != null) {
                                if (!zombieHit.includes(i)) {
                                    dispatch({ type: "ZombieHit" })
                                    zombieHit.push(i)
                                }
                            }
                        }
                    }

                    // boomHit = true
                }
            }
        })

    // Object.keys(entities)
    //     .filter(key => entities[key].body)
    //     .forEach(key => {
    //         if (key.includes('Circle')) {
    //             if (Matter.Collision.collides(entities.Circle.body, entities.Bullet.body) != null) {
    //                 if (!zombieHit.includes(i)) {
    //                     dispatch({ type: "ZombieHit" })
    //                     zombieHit.push(i)
    //                 }
    //             }
    //         }
    //     })
    Matter.Engine.update(engine, time.delta)

    // Matter.Runner.run(engine)

    // var runner = Matter.Runner.create({
    //     delta: 1000, // 600Hz delta = 1.666ms = 10upf @ 60fps (10x default precision)
    //     maxFrameTime: 1 // performance budget
    // });

    // Matter.Runner.run(runner, engine);

    

    // Matter.Body.setPosition(entities[`OuterBall`].body, entities.Bullet.body.position)

    return entities;
}
export default Physics
