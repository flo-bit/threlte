import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Group } from 'three'

export type BackdropProps = Props<Group>
export type BackdropEvents = Events<Group>
export type BackdropSlots = Slots<Group>

export default class Backdrop extends SvelteComponent<
  BackdropProps,
  BackdropEvents,
  BackdropSlots
> {}
