import Matter from "matter-js"
import { View, Image, Dimensions } from "react-native"
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
let i = 0
const Wall = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2
    const isVertical = props.isVertical
    const imageComponents = [];
    const isWall = props.isWall
    // Condition for inverting vertically
    id = props.body.id
    let iterations;
    if (!isVertical) {
        iterations = Math.ceil(widthBody / 50)
    } else {
        iterations = Math.ceil(heightBody / 50)
    }
    if (!isWall) {
        iterations = Math.ceil(widthBody / 50)
    }
    for (let i = 0; i < iterations; i++) {
        imageComponents.push(
            <Image
                key={i}
                style={{ width: !isWall ? 20 : 250, height: !isWall ? 20 : 250 }}
                source={require('../assets/wall.jpg')}
            />
        );
    }
    const color = props.color;
    return (
        <View style={{
            backgroundColor: color,
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            flexDirection: isVertical ? "column" : 'row',
            height: heightBody,
        }}>
            {imageComponents}
        </View>
    )
}
export default (world, color, pos, size, isVertical, isWall = true) => {
    const initialWall = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: 'Wall',
            isStatic: true
        }
    )
    Matter.World.add(world, initialWall)
    return {
        body: initialWall,
        color,
        pos,
        isVertical,
        isWall,
        renderer: <Wall />
    }
}
