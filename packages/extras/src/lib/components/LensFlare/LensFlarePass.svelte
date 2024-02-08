<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import {
    BlendFunction,
    EffectComposer,
    EffectPass,
    OutlineEffect,
    RenderPass
  } from 'postprocessing'
  import { onMount } from 'svelte'


  const { scene, renderer, camera, size, autoRender, renderStage } = useThrelte()

	const composer = new EffectComposer(renderer)

	const setupEffectComposer = (camera: THREE.Camera) => {
    composer.removeAllPasses()
    composer.addPass(new RenderPass(scene, camera))

    composer.addPass(new EffectPass(camera, outlineEffect))
  }
  $: composer.setSize($size.width, $size.height)

  onMount(() => {
    let before = autoRender.current
    autoRender.set(false)
    return () => {
      autoRender.set(before)
    }
  })

  useTask(
    (delta) => {
      composer.render(delta)
    },
    { stage: renderStage, autoInvalidate: false }
  )
</script>
