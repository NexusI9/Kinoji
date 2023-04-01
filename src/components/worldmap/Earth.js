import { gsap } from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Label from './Earth.label';

const globe = {
	model: require('../../assets/earth/globe.gltf'),
	texture: require('../../assets/earth/texture.png'),
	alpha: require('../../assets/earth/alpha_texture.png')
}

const aura = {
	texure: require('../../assets/earth/aura.png'),
	alpha: require('../../assets/earth/alpha_aura.png')
}

const getCountryFromUUID = (countries, uuid) => {
	const filtered = countries.filter( country => country.geo.flag.mesh.uuid === uuid);
	return filtered.length > 0 ? filtered[0] : null;
}

const BACKGROUND = 0x000000;
const INIT_WIDTH =  window.innerWidth;
const INIT_HEIGHT = window.innerHeight;


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


class MouseRaycaster{

	constructor({targets, camera, onDetect=()=>0, onRelease=()=>0, getUuid}){
		this.targets = targets;
		this.camera = camera;
		this.onDetect = onDetect;
		this.onRelease = onRelease;

		this.getUuid = getUuid || this.defaultGetUuid;  //so triggers only once when hover
		this.lastUuid = null;

		this.released = true;

	}

	defaultGetUuid(obj){ return obj; }

	ray(e){

		let mouse = new THREE.Vector2();
		mouse.x = (e.clientX / INIT_WIDTH) * 2 - 1 ;
		mouse.y =  - (e.clientY / INIT_HEIGHT) * 2 + 1 ;

		let raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( mouse, this.camera );
		var intersects = raycaster.intersectObjects( this.targets );

		if(intersects.length === 1 && this.onDetect &&  this.lastUuid != this.getUuid(intersects[0]) ){
				this.released = false;
				this.lastUuid = this.getUuid(intersects[0]);
				this.onDetect(intersects[0]);
			}

		if(intersects.length === 0 && this.onRelease && !this.released){ this.released=true; this.onRelease(); }

		return raycaster;
	}

}

export default class Earth{

  constructor({countries, onMouseDown=()=>0, onMouseUp=()=>0, onFlagClick=()=>0, onUnfocus=()=>0}){

		//bin
    this.renderer = null;
	this.scene = null;
	this.camera = null;
	this.controls = null;


	this.width = INIT_WIDTH;
	this.height = INIT_HEIGHT;

	//meshes
	this.countries = countries;
    this.earth = null;
    this.plane = null;
	this.circle = null;
	this.loader = new GLTFLoader();
	this.group = new THREE.Group();
	this.lastCountry = null;

	//animation
	this.show = true;
	this.speed = 0.001;
	this.showFlag = true;
	this.locked = false;

	//flags
	this.rotate = true;
	this.reqCountry = null;

	//events
	this.mousePos = {x:0,y:0}

	this.customMouseUp = onMouseUp;
	this.customMouseDown = onMouseDown;
	this.onFlagClick = onFlagClick;
	this.onUnfocus = onUnfocus;

  }


//DOM

  init(){

      if( document.getElementById("Earth") == null || document.querySelectorAll('#Earth canvas').length > 0){ return; }
      this._init_();
      this._render_();
      this.events();

  }
  events(){
      //window.addEventListener( 'scroll', this.onScroll.bind(this) );
      window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
      document.getElementById('Earth').addEventListener('mousemove', this.onMouseMove.bind(this) );
			document.getElementById('Earth').addEventListener('mousedown', this.onMouseDown.bind(this));
			document.getElementById('Earth').addEventListener('mouseup', this.onMouseUp.bind(this));
			document.getElementById('Earth').addEventListener('click', this.onClick.bind(this));
  }

  _init_(){

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    //this.renderer.setPixelRatio( window.devicePixelRatio/2 );
    this.renderer.setPixelRatio( 1 );
    this.renderer.setClearColor( 0x000000, 0 )
    this.renderer.setSize(this.width,this.height);

    document.getElementById("Earth").appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(BACKGROUND);

    this.camera = new THREE.PerspectiveCamera(16, this.width / this.height, 0.1, 1000 );
    this.camera.focalLength = 125;

    const light = new THREE.AmbientLight(0xFFFFFF, 1);
    this.scene.add(light);

    this.addModel();
    this.addAura();
	this.group.renderOrder = 3;
	this.scene.add(this.group);
	this.addLines();
	this.addMask();

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.update();

    // to disable zoom
    this.controls.enableZoom = false;
    // to disable pan
    this.controls.enablePan = false;
		this.controls.enableDamping = true
    this.camera.position.z = 130;


		/* returns object on hover, then use UUID of hovered flag to get country name and set this.lastCountry */
		this.mrc = new MouseRaycaster({
			camera:this.camera,
			targets: this.countries.map( country => country.geo.flag.mesh ),
			getUuid: (f) => f.object.uuid,
			onDetect: (flag) => {
				this.stopRotate();
				this.lastCountry = null;
				this.lastCountry = getCountryFromUUID(this.countries, flag.object.uuid);

				gsap.to(flag.object.scale, {
					duration:0.2,
					x:1.3,
					y:1.3,
					z:1.3
				});

			},
			onRelease: () => {
				if(!this.locked){ this.startRotate(); }
				this.lastCountry = null;
			}
		});

		this.events();

  }

  addAura(){
    const geometry = new THREE.PlaneGeometry( 27, 27 );
    const texture = {
      base: new THREE.TextureLoader().load(aura.texture),
      alpha: new THREE.TextureLoader().load(aura.alpha)
    }
    const material = new THREE.MeshBasicMaterial({
			color:0xff0000,
      alphaMap: texture.alpha,
			transparent:true,
			depthTest:false
    });


    this.plane = new THREE.Mesh( geometry, material );
		this.plane.renderOrder = 0;
    this.scene.add( this.plane );
  }
	addGrid(){
		const size = 20;
		const divisions = 20;

		const gridHelper = {
			x: new THREE.GridHelper( size, divisions ),
			y: new THREE.GridHelper( size, divisions ),
			z: new THREE.GridHelper( size, divisions )
		}

		this.scene.add( gridHelper.z );

		gridHelper.x.rotateX(Math.PI / 2);
		this.scene.add( gridHelper.x );

		gridHelper.y.rotateZ(Math.PI / 2);
		this.scene.add( gridHelper.y );
	}
  addModel(){

    this.loader.load(
      globe.model,
      (gltf) => {

        const texture = new THREE.TextureLoader().load(globe.texture);
        texture.minFilter = THREE.NearestFilter;
        const alpha = new THREE.TextureLoader().load(globe.alpha);
        alpha.minFilter = THREE.NearestFilter;

        const material = new THREE.ShaderMaterial({
            uniforms:
            {
              texture1: { type:'t', value: texture },
              talpha: { type:'t', value: alpha }
            },
            vertexShader: FresnelShader.vertexShader,
            fragmentShader: FresnelShader.fragmentShader,
            transparent:true,
          });

        this.earth = gltf.scene.children[0];

        this.earth.material = material;
        this.earth.scale.set(0.1,-0.1,0.1);

        this.group.add(this.earth);

      },function(xhr){

      },function(error){
      }
    );


  }
	addLines(){

		this.countries.map( country => {
			const label = new Label({
				start:country.geo.location,
				country:country.name,
				parent:this.group,
				length:country.geo.length || 1.4
			});
      country.geo = Object.assign({},country.geo, label.render());
		});


	}
	addMask(){
		const geometry = new THREE.CircleGeometry( 9, 32 );
		const material = new THREE.MeshBasicMaterial({ color: 0xff0000, colorWrite:false});
		this.circle = new THREE.Mesh( geometry, material );
		this.circle.renderOrder = 0;
		this.scene.add( this.circle );
	}

  _render_(){
		if(this.rotate && this.group){ this.group.rotation.set(  this.group.rotation.x,  this.group.rotation.y + this.speed,  this.group.rotation.z ); }
    if(this.plane && this.circle){
			this.plane.lookAt(this.camera.position);
			this.circle.lookAt(this.camera.position);
		}

		this.countries.forEach((country) => {
			if(country.geo.flag && this.rotate){
				country.geo.flag.mesh.lookAt(this.camera.position);
				const distance = 1/(country.geo.flag.mesh.position.distanceTo(this.camera.position) / 100);
				country.geo.flag.mesh.scale.set(distance, distance, distance);
			}

		});


    this.controls.update();
    this.renderer.render( this.scene, this.camera );
    if(this.show){ requestAnimationFrame( this._render_.bind(this) ); }

  }

	displayFlag(state){

		this.countries.forEach( country => {
			if(state){ country.geo.line.mesh.visible = state; }
			gsap.to( country.geo.flag.material, 0.3, {opacity: state ? 1 : 0 });
			gsap.to( country.geo.line.material, 0.3, {opacity: state ? 1 : 0 }).then( () => country.geo.line.mesh.visible = state );
		});


		this.showFlag = state;

	}

  //events

  onWindowResize() {

    if(  document.getElementById("Earth") == null ){ return; }

    this.camera.aspect = this.width / this.height;
  	this.camera.updateProjectionMatrix();


    this.renderer.setSize( this.width, this.height );
    this._render_();

  }

  onMouseMove(e){
		this.mrc.ray(e);
  }

	onMouseDown(){

		if(this.locked){ this.reset(); }

		this.locked = false;
		this.rotate = false;

		if( !this.showFlag ){ this.displayFlag(true); }

		this.customMouseDown();

	}

	onClick(){
		if( this.lastCountry ){
			this.locked = true;
			this.onFlagClick(this.lastCountry);
		}else{ 
			this.onUnfocus();
		}
	}

	onMouseUp(){
		this.rotate = true;
		this.customMouseUp();
	}

  onScroll(){

    /*if(  document.getElementById("Earth") == null ){ return; }
    if(window.innerHeight < lastDiv.getBoundingClientRect().top && this.show == true){ this.show = false; }
    else if(window.innerHeight > lastDiv.getBoundingClientRect().top && this.show == false){ this.show = true; this._render_(); }
		*/
  }

  smallScreen(){
    if(!this.camera){ return; }
    this.width = window.innerWidth;
    this.height = window.innerHeight/1.7;
    this.camera.position.z = 0.6;
    this.onWindowResize();
  }

  largeScreen(){
    if(!this.camera){ return; }
    this.width = INIT_WIDTH;
    this.height = INIT_HEIGHT;
    this.camera.position.z = 0.5;
    this.onWindowResize();
  }

  touchMove(e){
    e.preventDefault();
    this.mousePos.x = e.touches[0].clientX / window.innerWidth - 0.5;
    this.mousePos.y = e.touches[0].clientY / window.innerHeight - 1;

  }

  play(){
    this.show = true;
    this._render_();
  }

  stop(){
    this.show = false;
  }

	stopRotate(){
		this.rotate = false;
	}
	startRotate(){
		this.rotate = true;
	}

	reset(){
		gsap.to(this.camera.position,{
			duration:1,
			z:130,
			x:0,
			y:8,
			onComplete: () => {
				this.rotate = true;
				this.displayFlag(true);
			}
		});
	}

	goTo(country){

		if(!country){ return; }
		this.locked = true;

		this.stopRotate();
		this.displayFlag(false);
		console.log(country);
		gsap.to( this.camera.position, {
			x: country.geo.rotate.x,
			y: country.geo.rotate.y,
			z: country.geo.rotate.z
		});
		gsap.to( this.group.rotation, {
			x:0,
			y:0,
			z:0
		});



	}

	displayCountry(dsp = true){
		switch(dsp){
			case true:
			break;

			case false:
			break;

			default:
		}
	}

	setTimelinePos(){

	}

}
