<script lang="ts">
  import { T } from '@threlte/core'
  import type { Texture } from 'three'
  import { revision } from '../../lib/revision'
  import { writable } from 'svelte/store'

  export let envMap: Texture

  // Define a store to hold the dynamically imported component
  const skyboxComponent = writable<unknown>(null)

  ;(async () => {
    const module = await import(
      '../../../../node_modules/three/examples/jsm/objects/' +
        (revision >= 161 ? 'GroundedSkybox' : 'GroundProjectedSkybox') +
        '.js'
    )
		console.log(module)
    skyboxComponent.set(module.GroundProjectedSkybox)
  })()

	$:console.log($skyboxComponent)
</script>

{#if envMap}
  {#await $skyboxComponent then component}
    <T
      is={component}
      args={[envMap]}
      {...$$restProps}
    />
  {/await}
{/if}
