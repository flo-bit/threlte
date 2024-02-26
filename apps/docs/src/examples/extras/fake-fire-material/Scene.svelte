<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, FakeFireMaterial, FakeGlowMaterial } from '@threlte/extras'
</script>

<T.Mesh rotation.x={Math.PI} position.y={4}>
  <FakeFireMaterial />
  <T.CylinderGeometry args={[0.5, 2, 5, 32, 10, true]} />
</T.Mesh>


<!-- <T.Mesh rotation.x={Math.PI} position.y={0}>
  <FakeFireMaterial />
  <T.IcosahedronGeometry args={[1, 5]} />
</T.Mesh>


<T.Mesh>
  <FakeGlowMaterial glowColor={'red'} opacity={0.4}/>
  <T.IcosahedronGeometry args={[3, 5]} />
</T.Mesh> -->

<T.PerspectiveCamera
  makeDefault
  position.y={8}
  position.z={8}
  fov={90}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
>
  <OrbitControls
    enableDamping
    enablePan={false}
    enableZoom={true}
  />
</T.PerspectiveCamera>

