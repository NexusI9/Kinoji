import * as THREE from 'three';
import Flag from './Flag';

export default class Label{

	constructor(ob){
		this.start = ob.start || [0,0,0];
		this.length = ob.length || 1.4;
		this.country = ob.country || "";
		this.content = ob.content || "";
		this.icon = ob.icon || "";
		this.color = ob.color || 0xffffff;
		this.parent = ob.parent || null;

		this.group = new THREE.Group();
		this.end = [
            this.start[0] * this.length,
            this.start[1] * this.length,
            this.start[2] * this.length
        ]
	}

	render(){

		// draw line
		const material = new THREE.LineBasicMaterial({
			color: this.color,
			transparent:true
		});

		const points = [];
		points.push( new THREE.Vector3( this.start[0], this.start[1], this.start[2] ));
		points.push( new THREE.Vector3( this.end[0], this.end[1], this.end[2] ));

		const geometry = new THREE.BufferGeometry().setFromPoints( points );
    //draw line
		this.line = new THREE.Line( geometry, material );
		this.parent.add(this.line);

		//draw flag
		const flag = new Flag({ name:this.country, location: this.end }).render();
        const line = {mesh: this.line, material: material};
		this.line.add( flag.mesh );

		return { line:line, flag:flag };

	}



}