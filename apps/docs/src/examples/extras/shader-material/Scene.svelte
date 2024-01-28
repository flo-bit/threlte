<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Grid, ShaderMaterial } from '@threlte/extras'
  import { Color } from 'three'


	const color = new Color(1.0, 0.0, 0.0)

  const vertexShader = `
void main() {
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * viewMatrix * modelPosition;
}`

  const fragmentShader = `
uniform vec3 color;
void main()
{
  gl_FragColor = vec4(color, 1.0);
}`
</script>

<T.Mesh>
  <ShaderMaterial
    uniforms={{
      color
    }}
		{vertexShader}
		{fragmentShader}
  />
  <T.IcosahedronGeometry args={[4, 3]} />
</T.Mesh>

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
    enableZoom={false}
  />
</T.PerspectiveCamera>

<Grid
  position.y={0}
  sectionThickness={1}
  infiniteGrid
  cellColor="#dddddd"
  sectionColor="#ffffff"
  sectionSize={10}
  cellSize={2}
/>
