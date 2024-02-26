import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ShaderMaterial, ColorRepresentation } from 'three'

export type FakeFireMaterialProps = Props<ShaderMaterial> & {
  falloff?: number
  glowInternalRadius?: number
  glowColor?: ColorRepresentation
  glowSharpness?: number
}

export type FakeFireMaterialEvents = Events<ShaderMaterial>
export type FakeFireMaterialSlots = Slots<ShaderMaterial>

export default class FakeFireMaterial extends SvelteComponent<
  FakeFireMaterialProps,
  FakeFireMaterialEvents,
  FakeFireMaterialSlots
> {}
