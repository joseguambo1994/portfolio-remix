import React, { useRef, useLayoutEffect, useMemo } from "react";
import { Object3D } from "three";
const o = new Object3D()
function Particles({ length = 100000, size = [0.02, 0.02, 0.02], ...props }) {
  const ref = useRef()
  const outlines = useRef()
  //const colors = useMemo(() => new Float32Array(Array.from({ length }, () => c.set(niceColors[17][Math.floor(Math.random() * 5)]).toArray()).flat()), [length])
  useLayoutEffect(() => {
    let i = 0
    const root = Math.round(Math.pow(length, 1 / 3))
    const halfRoot = root / 2
    for (let x = 0; x < root; x++)
      for (let y = 0; y < root; y++)
        for (let z = 0; z < root; z++) {
          const id = i++
          o.rotation.set(Math.random(), Math.random(), Math.random())
          o.position.set(halfRoot - x + Math.random(), halfRoot - y + Math.random(), halfRoot - z + Math.random())
          o.updateMatrix()
          ref.current.setMatrixAt(id, o.matrix)
        }
    ref.current.instanceMatrix.needsUpdate = true
    // Re-use geometry + instance matrix
    // outlines.current.geometry = ref.current.geometry
    // outlines.current.instanceMatrix = ref.current.instanceMatrix
  }, [length])
  return (
    <group {...props}>
      <instancedMesh ref={ref} args={[null, null, length]}>
        <sphereGeometry args={[0.02,  0.02]} >
          {/* <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} /> */}
        </sphereGeometry >
        <meshStandardMaterial color={'white'} />
      </instancedMesh>
      {/* <instancedMesh ref={outlines} args={[null, null, length]}>
        <meshEdgesMaterial transparent polygonOffset polygonOffsetFactor={-10} size={size} color="black" thickness={0.001} smoothness={0.005} />
      </instancedMesh> */}
    </group>
  )
}

export default Particles