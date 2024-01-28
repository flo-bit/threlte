// almost complete copy from
// https://github.com/pmndrs/drei/blob/master/src/core/shaderMaterial.tsx
import {
  CubeTexture,
  Texture,
  Matrix4,
  Matrix3,
  Quaternion,
  Vector4,
  Vector3,
  Vector2,
  Color,
  ShaderMaterial,
  UniformsUtils,
  MathUtils
} from 'three'

export type ShaderMaterialUniforms = {
  [name: string]:
    | CubeTexture
    | Texture
    | Int32Array
    | Float32Array
    | Matrix4
    | Matrix3
    | Quaternion
    | Vector4
    | Vector3
    | Vector2
    | Color
    | number
    | boolean
    | Array<any>
    | null
}

export function shaderMaterial(
  uniforms: ShaderMaterialUniforms,
  vertexShader: string,
  fragmentShader: string,
  onInit?: (material?: ShaderMaterial) => void
) {
  const material = class extends ShaderMaterial {
    public key = ''
    constructor(parameters = {}) {
      const entries = Object.entries(uniforms)
      // Create unforms and shaders
      super({
        uniforms: entries.reduce((acc, [name, value]) => {
          const uniform = UniformsUtils.clone({ [name]: { value } })
          return {
            ...acc,
            ...uniform
          }
        }, {}),
        vertexShader,
        fragmentShader
      })
      // Create getter/setters
      entries.forEach(([name]) =>
        Object.defineProperty(this, name, {
          get: () => this.uniforms[name].value,
          set: (v) => (this.uniforms[name].value = v)
        })
      )

      // Assign parameters, this might include uniforms
      Object.assign(this, parameters)
      // Call onInit
      if (onInit) onInit(this)
    }
    updateUniforms(newUniforms: ShaderMaterialUniforms) {
      Object.entries(newUniforms).forEach(([name, value]) => {
        if (this.uniforms[name]) {
          this.uniforms[name].value = value
        }
      })
    }
  } as unknown as typeof ShaderMaterial & { key: string }
  material.key = MathUtils.generateUUID()
  return material
}
