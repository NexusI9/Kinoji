const FresnelShader = {

	uniforms: {},

	vertexShader: `
    varying vec3 vPositionW;
		varying vec3 vNormalW;
    varying vec2 vUv;

		void main() {

     vUv = uv;

		 vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);
		 vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: `
    varying vec3 vPositionW;
		varying vec3 vNormalW;
    uniform sampler2D texture1;
    uniform sampler2D talpha;

    varying vec2 vUv;

		void main() {

			vec3 color = vec3(1., 0.2, 0.2);
			vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
			float fresnelTerm = dot(viewDirectionW, vNormalW);
			fresnelTerm = clamp(0.4 - fresnelTerm, 0., 1.);

      vec4 tex = texture2D(texture1, vUv).rgba;
			//gl_FragColor =  vec4(tex.r, tex.g, tex.b, 1.) *  vec4( color * fresnelTerm, 1.);
			gl_FragColor =  vec4(tex.r, tex.g, tex.b, tex.a);


		}`

};


export default FresnelShader;