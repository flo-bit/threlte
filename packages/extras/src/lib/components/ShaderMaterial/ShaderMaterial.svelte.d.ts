import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ShaderMaterial as Material } from 'three'
import type { ShaderMaterialUniforms } from './ShaderMaterial'

type CustomShaderMaterialProps = Omit<Props<Material>, 'uniforms'> & {
  uniforms?: ShaderMaterialUniforms
  // Add any other properties specific to your shader material here
}

export type ShaderMaterialProps = Props<CustomShaderMaterialProps> & {
  uniforms?: ShaderMaterialUniforms
  vertexShader?: string
  fragmentShader?: string
}

export type ShaderMaterialEvents = Events<Material>
export type ShaderMaterialSlots = Slots<Material>

export default class ShaderMaterial extends SvelteComponent<
  ShaderMaterialProps,
  ShaderMaterialEvents,
  ShaderMaterialSlots
> {}
