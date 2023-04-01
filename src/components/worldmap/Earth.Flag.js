import * as THREE from 'three';

export default class Flag{

	constructor(ob){
		this.size = ob.size || 0.7;
		this.space = ob.space || 1.07;
		this.name = ob.name;
		this.location = ob.location || [0,0,0];
	}

	render(){

		const path = require("../../assets/earth/flags/"+this.name.toLowerCase()+".png");
		const texture = new THREE.TextureLoader().load(path);

		const material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			map:texture,
			transparent:true
		});

		const geometry = new THREE.CircleGeometry( this.size, 8 );
		const flag = new THREE.Mesh(geometry, material);
		flag.position.set(
			this.location[0] * this.space,
			this.location[1] * this.space,
			this.location[2] * this.space
		);

		return {mesh: flag, material:material};
	}

}