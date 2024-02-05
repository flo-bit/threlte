<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Backdrop, ContactShadows, Environment } from '@threlte/extras'
</script>

<Backdrop scale={[30, 10, 10]} floor={2} position.y={-0.05} position.z={-5}>
	<T.MeshStandardMaterial color="#efefef" roughness={1.0} />
</Backdrop>

<ContactShadows
  opacity={0.9}
  scale={10}
  blur={4}
  far={10}
  resolution={512}
  color="#000000"
	frames={1}
/>

<Environment
	files={"/hdr/equirect_ruined_room.jpg"}
/>

<T.Mesh position.y={1}>
	<T.IcosahedronGeometry args={[2, 2]} />
	<T.MeshStandardMaterial color="#ff0055" flatShading/>
</T.Mesh>

<T.AmbientLight intensity={0.1} />

<T.DirectionalLight
	position={[-3, 4, 0]}
	intensity={2}
	castShadow
	/>

<T.PerspectiveCamera
  makeDefault
  position.y={3}
  position.z={4}
  fov={90}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
>
  <OrbitControls
    enableDamping
    enablePan={false}
  />
</T.PerspectiveCamera>
