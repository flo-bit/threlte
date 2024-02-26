import { ShaderChunk } from 'three'

export const fragmentShader = `
uniform vec3 glowColor;
uniform float falloffAmount;
uniform float glowSharpness;
uniform float glowInternalRadius;
uniform float time;

varying vec2 vUv;

vec2 hash( vec2 p )
{
	p = vec2( dot(p,vec2(127.1,311.7)),
			dot(p,vec2(269.5,183.3)) );
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p )
{
	const float K1 = 0.366025404; // (sqrt(3)-1)/2;
	const float K2 = 0.211324865; // (3-sqrt(3))/6;

	vec2 i = floor( p + (p.x+p.y)*K1 );

	vec2 a = p - i + (i.x+i.y)*K2;
	vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
	vec2 b = a - o + K2;
	vec2 c = a - 1.0 + 2.0*K2;

	vec3 h = max( 0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );

	vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));

	return dot( n, vec3(70.0) );
}

float fbm(vec2 uv)
{
	float f;
	mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
	f  = 0.5000*noise( uv ); uv = m*uv;
	f += 0.2500*noise( uv ); uv = m*uv;
	// f += 0.1250*noise( uv ); uv = m*uv;
	// f += 0.0625*noise( uv ); uv = m*uv;
	f = 0.5 + 0.5*f;
	return f;
}

// #define BLUE_FLAME
// #define GREEN_FLAME

void main()
{
	vec2 q = vUv * 2.0 - 1.0;
	float x = q.x;
	q.x = sin(x * 3.14159);
	//q.y = q.y + cos(x * 3.14159);

	q.x *= 2.;
	q.y *= 2.;
	float strength = floor(q.y+1.5);
	float T3 = max(2.,2.25)*time * 2.0;
	//q.x = mod(q.x,1.)-0.5;
	q.y -= 0.05;
	float n = fbm(q + vec2(0,T3));
	float c = 0.7 - 0.01 * pow( max( 0., length(q*vec2(1.8+q.y*1.5,.75) ) - n * max( 0., q.y+.25 ) ),.2 );
	// float c1 = n * c * fract((1.9-pow(0.15*vUv.y,2.))) * 2.;
	float c1 = n * c * (pow(1.90*vUv.y,2.));
	c1=clamp(c1,0.,1.);

	vec3 col = smoothstep(0.1, 0.8, vec3(c1, c1*c1*c1, c1*c1*c1*c1*c1*c1));

	#ifdef BLUE_FLAME
		col = col.zyx;
	#endif
	#ifdef GREEN_FLAME
		col = 0.85*col.yxz;
	#endif

	gl_FragColor = vec4(col, c1);
	${ShaderChunk.tonemapping_fragment}
	${ShaderChunk.colorspace_fragment}
}`
