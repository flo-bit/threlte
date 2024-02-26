export const vertexShader = `varying vec3 vNormal;
varying vec2 vUv;
uniform float time;

float random2D(vec2 value)
{
		return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
		// Position
		vec4 modelPosition = modelMatrix * vec4(position, 1.0);
		vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

		// Glitch
		float glitchTime = time + modelPosition.y;
		float glitchStrength = sin(glitchTime) + sin(glitchTime * .05) +  sin(glitchTime * .36);
		glitchStrength /= 2.0;
		glitchStrength = smoothstep(0.2, 0.8, glitchStrength);
		glitchStrength *= 0.;
		// modelPosition.x += (random2D(modelNormal.xx + time) - 0.5) * glitchStrength;
		// modelPosition.x += (random2D(modelNormal.xx - time) - 0.2) * glitchStrength;
		// modelPosition.y += sin(smoothstep(0.4, vUv.y - 2.5, position.y) * 2.) * sin(time * 48.);
		// modelPosition.z += sin(smoothstep(0., vUv.x - 1.8, position.z) * 2.) * sin(time * 24.);

		gl_Position = projectionMatrix * viewMatrix * modelPosition;

		vUv = uv;
}`
