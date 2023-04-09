import * as THREE from 'three';


export default class MouseRaycaster{

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
		mouse.x = (e.clientX / window.innerWidth) * 2 - 1 ;
		mouse.y =  - (e.clientY / window.innerHeight) * 2 + 1 ;

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