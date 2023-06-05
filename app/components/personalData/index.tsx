import { useSpring, animated } from '@react-spring/three'
import { useRef, useState } from "react";

  const PersonalData = (props:any) => {
    const [active, setActive] = useState<boolean>(false);
//    const { scale } = useSpring({ scale: active ? 1.5 : 1 })
    const myMesh = useRef()

    const [springs, api] = useSpring(
      () => ({
        scale: 1,
        position: [2, 2, 2],
        color: '#ff6d6d',
        config: key => {
          switch (key) {
            case 'scale':
              return {
                mass: 4,
                friction: 10,
              }
            case 'position':
              return { mass: 4, friction: 220 }
            default:
              return {}
          }
        },
      }),
      []
    )
  
    const handlePress = () =>{
      setActive(!active);
     if (active) {
      api.start({
        scale: 1.5,
        position: [3,3,3]
      });
      props && props?.onPress && props.onPress()
     }else{
      api.start({
        scale: 1,
        position: [2,2,2]
      })
     }
      
 
    }

    return <animated.mesh 
    // {...props}
    scale={springs.scale}
    position={springs.position}
    onClick={handlePress} ref={myMesh}>
    <boxGeometry />
    <meshPhongMaterial color="royalblue" />
  </animated.mesh>
  }

export default PersonalData