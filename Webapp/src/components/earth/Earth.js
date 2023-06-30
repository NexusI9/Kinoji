import { gsap } from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Label from './Label';
import FresnelShader from './FresnelShader';
import MouseRaycaster from './MouseRaycaster';

import earthModel from '../../assets/earth/globe.gltf';
import earthTexture from '../../assets/earth/texture.png';
import earthAlpha from '../../assets/earth/alpha_texture.png';

import auraTexture from '../../assets/earth/aura.png';
import auraAlpha from '../../assets/earth/alpha_aura.png';

const globe = {
	model: earthModel,
	texture: earthTexture,
	alpha: earthAlpha
}

const aura = {
	texture: auraTexture,
	alpha: auraAlpha
}

const getCountryFromUUID = (countries, uuid) => {
	const filtered = countries.filter(country => country.geo.flag.mesh.uuid === uuid);
	return filtered.length > 0 ? filtered[0] : null;
}


export default class Earth {

	constructor({ countries, onMouseDown = () => 0, onMouseUp = () => 0, onFlagClick = () => 0, onUnfocus = () => 0 }) {

		//bin
		this.renderer = null;
		this.scene = null;
		this.camera = null;
		this.controls = null;


		this.width = document.getElementById('Earth').getBoundingClientRect().width;
		this.height = document.getElementById('Earth').getBoundingClientRect().height;

		//meshes
		this.countries = countries;
		this.earth = null;
		this.plane = null;
		this.circle = null;
		this.loader = new GLTFLoader();
		this.group = new THREE.Group();
		this.lastCountry = null;
		this.newPosition = new THREE.Vector3(15, 0, 0);

		//animation
		this.show = true;
		this.speed = 0.001;
		this.showFlag = true;
		this.locked = false;

		//flags
		this.rotate = true;
		this.reqCountry = null;

		//events
		this.mousePos = { x: 0, y: 0 }

		this.customMouseUp = onMouseUp;
		this.customMouseDown = onMouseDown;
		this.onFlagClick = onFlagClick;
		this.onUnfocus = onUnfocus;

	}


	//DOM

	init() {

		if (document.getElementById("Earth") == null || document.querySelectorAll('#Earth canvas').length > 0) { return; }
		this._init_();
		this._render_();
		this.events();

	}
	events() {

		//-)window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
		//document.getElementById('Earth').addEventListener('mousemove', this.onMouseMove.bind(this) );
		document.getElementById('Earth').addEventListener('mousedown', this.onMouseDown.bind(this));
		document.getElementById('Earth').addEventListener('mouseup', this.onMouseUp.bind(this));
		document.getElementById('Earth').addEventListener('click', this.onClick.bind(this));

	}

	_init_() {

		this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		//this.renderer.setPixelRatio( window.devicePixelRatio/2 );
		this.renderer.setPixelRatio(1);
		this.renderer.setClearColor(0x000000, 0)
		this.renderer.setSize(this.width, this.height);

		document.getElementById("Earth").appendChild(this.renderer.domElement);

		this.scene = new THREE.Scene();
		//this.scene.background = new THREE.Color(BACKGROUND);

		this.camera = new THREE.PerspectiveCamera(16, this.width / this.height, 0.1, 1000);
		this.camera.focalLength = 125;
		this.camera.setViewOffset(this.width, this.height, -200,0, this.width, this.height);

		const light = new THREE.AmbientLight(0xFFFFFF, 1);
		this.scene.add(light);

		this.addModel();
		this.addAura();
		this.group.renderOrder = 3;
		this.scene.add(this.group);
		//this.addLines();
		this.addMask();


		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.update();

		// to disable zoom
		this.controls.enableZoom = false;
		// to disable pan
		this.controls.enablePan = false;
		this.controls.enableDamping = true;


		this.camera.position.z = 130;
		this.camera.position.y = 10;
		this.events();

	}

	addRaycast() {

		/* returns object on hover, then use UUID of hovered flag to get country name and set this.lastCountry */
		this.mrc = new MouseRaycaster({
			camera: this.camera,
			targets: this.countries.map(country => country.geo.flag.mesh),
			getUuid: (f) => f.object.uuid,
			onDetect: (flag) => {
				this.stopRotate();
				this.lastCountry = null;
				this.lastCountry = getCountryFromUUID(this.countries, flag.object.uuid);

				gsap.to(flag.object.scale, {
					duration: 0.2,
					x: 1.3,
					y: 1.3,
					z: 1.3
				});

			},
			onRelease: () => {
				if (!this.locked) { this.startRotate(); }
				this.lastCountry = null;
			}
		});

	}

	addAura() {

		const geometry = new THREE.PlaneGeometry(27, 27);

		const texture = {
			base: new THREE.TextureLoader().load(aura.texture.src),
			alpha: new THREE.TextureLoader().load(aura.alpha.src)
		}
		const material = new THREE.MeshBasicMaterial({
			color: 0xff0000,
			alphaMap: texture.alpha,
			transparent: true,
			depthTest: false
		});


		this.plane = new THREE.Mesh(geometry, material);
		this.plane.renderOrder = 0;
		this.scene.add(this.plane);

	}
	addGrid() {
		const size = 20;
		const divisions = 20;

		const gridHelper = {
			x: new THREE.GridHelper(size, divisions),
			y: new THREE.GridHelper(size, divisions),
			z: new THREE.GridHelper(size, divisions)
		}

		this.scene.add(gridHelper.z);

		gridHelper.x.rotateX(Math.PI / 2);
		this.scene.add(gridHelper.x);

		gridHelper.y.rotateZ(Math.PI / 2);
		this.scene.add(gridHelper.y);
	}
	addModel() {

		this.loader.load(
			globe.model,
			(gltf) => {

				const texture = new THREE.TextureLoader().load(globe.texture.src);
				texture.minFilter = THREE.NearestFilter;
				const alpha = new THREE.TextureLoader().load(globe.alpha.src);
				alpha.minFilter = THREE.NearestFilter;

				const material = new THREE.ShaderMaterial({
					uniforms:
					{
						texture1: { type: 't', value: texture },
						talpha: { type: 't', value: alpha }
					},
					vertexShader: FresnelShader.vertexShader,
					fragmentShader: FresnelShader.fragmentShader,
					transparent: true,
				});

				this.earth = gltf.scene.children[0];

				this.earth.material = material;
				this.earth.scale.set(0.1, -0.1, 0.1);
				this.group.add(this.earth);

			}, function (xhr) {

			}, function (error) {
			}
		);


	}
	addLines() {

		this.countries.map(country => {
			const label = new Label({
				start: country.geo.location,
				country: country.name,
				parent: this.group,
				length: country.geo.length || 1.4
			});
			country.geo = Object.assign({}, country.geo, label.render());
		});


	}
	addMask() {
		const geometry = new THREE.CircleGeometry(9, 32);
		const material = new THREE.MeshBasicMaterial({ color: 0xff0000, colorWrite: false });
		this.circle = new THREE.Mesh(geometry, material);
		this.circle.renderOrder = 0;
		this.scene.add(this.circle);
	}

	_render_() {

		if (this.rotate && this.group) { this.group.rotation.set(this.group.rotation.x, this.group.rotation.y + this.speed, this.group.rotation.z); }

		if (this.plane && this.circle) {
			this.plane.lookAt(this.camera.position);
			this.circle.lookAt(this.camera.position);
		}

		this.countries.forEach((country) => {
			if (country.geo.flag && this.rotate) {
				country.geo.flag.mesh.lookAt(this.camera.position);
				const distance = 1 / (country.geo.flag.mesh.position.distanceTo(this.camera.position) / 100);
				country.geo.flag.mesh.scale.set(distance, distance, distance);
			}

		});


		this.controls.update();
		this.renderer.render(this.scene, this.camera);
		if (this.show) { requestAnimationFrame(this._render_.bind(this)); }

	}

	displayFlag(state) {

		this.countries?.forEach(country => {
			if (state) { country.geo.line.mesh.visible = state; }
			gsap.to(country.geo.flag.material, 0.3, { opacity: state ? 1 : 0 });
			gsap.to(country.geo.line.material, 0.3, { opacity: state ? 1 : 0 }).then(() => country.geo.line.mesh.visible = state);
		});


		this.showFlag = state;

	}

	//events

	onWindowResize() {

		if (document.getElementById("Earth") == null) { return; }

		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();


		this.renderer.setSize(this.width, this.height);
		this._render_();

	}

	onMouseMove(e) {
		this.mrc.ray(e);
	}

	onMouseDown() {

		if (this.locked) { this.reset(); }

		this.locked = false;
		this.rotate = false;

		if (!this.showFlag) { this.displayFlag(true); }

		this.customMouseDown();

	}

	onClick() {
		if (this.lastCountry) {
			this.locked = true;
			this.onFlagClick(this.lastCountry);
		} else {
			this.onUnfocus();
		}
	}

	onMouseUp() {
		this.rotate = true;
		this.customMouseUp();
	}

	onScroll() {

		/*if(  document.getElementById("Earth") == null ){ return; }
		if(window.innerHeight < lastDiv.getBoundingClientRect().top && this.show == true){ this.show = false; }
		else if(window.innerHeight > lastDiv.getBoundingClientRect().top && this.show == false){ this.show = true; this._render_(); }
			*/
	}

	touchMove(e) {
		e.preventDefault();
		this.mousePos.x = e.touches[0].clientX / window.innerWidth - 0.5;
		this.mousePos.y = e.touches[0].clientY / window.innerHeight - 1;

	}

	play() {
		this.show = true;
		this._render_();
	}

	stop() {
		this.show = false;
	}

	stopRotate() {
		this.rotate = false;
	}
	startRotate() {
		this.rotate = true;
	}

	reset() {
		gsap.to(this.camera.position, {
			duration: 1,
			z: 130,
			x: 0,
			y: 8,
			onComplete: () => {
				this.rotate = true;
				//this.displayFlag(true);
			}
		});
	}

	scaleUp(){

		this.locked = true;
		this.stopRotate();

		gsap.to(this.camera.position, {
			duration: 1,
			z: 30,
			x: 0,
			y: 8,
			onComplete: () => { this.rotate = false; }
		});

		gsap.to(this.group.rotation, {x: 0, y: 0, z: 0 });
	}

	goTo(country) {

		if (!country || !country.geo) { return; }
		this.locked = true;

		this.stopRotate();
		//this.displayFlag(false);

		gsap.to(this.camera.position, {
			x: country.geo.rotate.x,
			y: country.geo.rotate.y,
			z: country.geo.rotate.z
		});
		gsap.to(this.group.rotation, {
			x: 0,
			y: 0,
			z: 0
		});



	}

	displayCountry(dsp = true) {
		switch (dsp) {
			case true:
				break;

			case false:
				break;

			default:
		}
	}


}
