<script lang="ts">
	import type {
		ShaderMaterialEvents,
		ShaderMaterialProps,
		ShaderMaterialSlots
	} from './ShaderMaterial.svelte'
	import { T, useThrelte, forwardEventHandlers } from '@threlte/core'

	import { shaderMaterial, type ShaderMaterialUniforms } from './ShaderMaterial'

	type $$Props = Required<ShaderMaterialProps>
	type $$Events = ShaderMaterialEvents
	type $$Slots = ShaderMaterialSlots

	let { invalidate, size } = useThrelte()

	export let vertexShader: $$Props['vertexShader'];
	export let fragmentShader: $$Props['fragmentShader'];
	export let uniforms: $$Props['uniforms'] = {};

	const material = shaderMaterial(uniforms, vertexShader, fragmentShader);

	const component = forwardEventHandlers()

	$: if (uniforms) {
		for(let key in uniforms) {
			// @ts-ignore
			material[key] = uniforms[key]
		}
		invalidate();
	}
</script>

<T
	is={material}
	bind:this={$component}
	{...$$restProps}
	{fragmentShader}
	{vertexShader}
/>
