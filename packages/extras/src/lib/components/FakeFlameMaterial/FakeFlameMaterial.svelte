<script lang="ts">
  import { T, useThrelte, forwardEventHandlers, useTask } from '@threlte/core'
  import { Color, AdditiveBlending, ShaderMaterial, DoubleSide } from 'three'
  import type {
    FakeFireMaterialEvents,
    FakeFireMaterialProps,
    FakeFireMaterialSlots
  } from './FakeFlameMaterial.svelte'

  import { fragmentShader } from './fragment'
  import { vertexShader } from './vertex'

  type $$Props = Required<FakeFireMaterialProps>
  type $$Events = FakeFireMaterialEvents
  type $$Slots = FakeFireMaterialSlots

  export let falloff: $$Props['falloff'] = 0.1
  export let glowInternalRadius: $$Props['glowInternalRadius'] = 6.0
  export let glowColor: $$Props['glowColor'] = 'green'
  export let glowSharpness: $$Props['glowSharpness'] = 1.0

  let material = new ShaderMaterial({
    uniforms: {
      falloffAmount: { value: falloff },
      glowInternalRadius: { value: glowInternalRadius },
      glowColor: { value: new Color(glowColor) },
      glowSharpness: { value: glowSharpness },
			time: { value: 0 }
		}
  })

  let { invalidate } = useThrelte()

  $: {
    material.uniforms.falloffAmount.value = falloff
    material.uniforms.glowInternalRadius.value = glowInternalRadius
    material.uniforms.glowColor.value = new Color(glowColor)
    material.uniforms.glowSharpness.value = glowSharpness

    invalidate()
  }

  const component = forwardEventHandlers()

	useTask((dt) => {
		material.uniforms.time.value += dt
		invalidate()
	})
</script>

<T
  is={material}
  bind:this={$component}
  {fragmentShader}
  {vertexShader}
  transparent={true}
  blending={AdditiveBlending}
	depthWrite={false}
	side={DoubleSide}
  {...$$restProps}
>
  <slot ref={material} />
</T>

