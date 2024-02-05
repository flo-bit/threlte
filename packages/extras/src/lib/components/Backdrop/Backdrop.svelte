<script lang="ts">
  import { BufferAttribute, PlaneGeometry } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'
  import type { BackdropEvents, BackdropProps, BackdropSlots } from './Backdrop.svelte'
  import { onMount } from 'svelte'

  type $$Props = Required<BackdropProps>
  type $$Events = BackdropEvents
  type $$Slots = BackdropSlots

  export let floor: $$Props['floor'] = 0.25
  export let segments: $$Props['segments'] = 20
  export let receiveShadow: $$Props['receiveShadow'] = false

  const easeInExpo = (x: number) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10))

  let planeRef: PlaneGeometry

  $: if (planeRef) {
    let i = 0
    const offset = segments / segments / 2
    const position = planeRef.attributes.position as BufferAttribute
    for (let x = 0; x < segments + 1; x++) {
      for (let y = 0; y < segments + 1; y++) {
        position.setXYZ(
          i++,
          x / segments - offset + (x === 0 ? -floor : 0),
          y / segments - offset,
          easeInExpo(x / segments)
        )
      }
    }
    position.needsUpdate = true
    planeRef.computeVertexNormals()
  }
</script>

<T.Group
  let:ref
  {...$$restProps}
>
  <T.Mesh
    {receiveShadow}
    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
  >
    <T.PlaneGeometry
      bind:ref={planeRef}
      args={[1, 1, segments, segments]}
    />
    <slot {ref} />
  </T.Mesh>
</T.Group>
