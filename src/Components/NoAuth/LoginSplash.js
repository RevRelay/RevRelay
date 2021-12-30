import React, {useEffect } from 'react'
import { BufferGeometry, DoubleSide } from 'three';
import { BufferAttribute } from 'three';
import { VertexColors } from 'three';
import { Fog } from 'three';
import { MeshBasicMaterial } from 'three';
import { Mesh } from 'three';
import { PlaneGeometry } from 'three';
import { FogExp2 } from 'three';
import { LineBasicMaterial } from 'three';
import { LineSegments } from 'three';
import { EdgesGeometry } from 'three';
import { PerspectiveCamera,  Scene, WebGLRenderer } from 'three';
import LandscapeGen from './LandscapeGen';
import { WireframeGeometry } from 'three';
import { MeshPhongMaterial } from 'three';



function LoginSplash() {
	useEffect(Pretty,[])
	
  return (
	<div className="LoginSplash">
	</div>
  );
}

function GenerateQuad(left,right,bot,top,edge){
	let lem = 0;
	let rem = 0;
	if (Math.abs(left) > edge) lem = 10;
	if (Math.abs(right) > edge) rem = 10;
	return(
	[
		left ,  bot,  (LandscapeGen.get(left ,bot)*lem+lem)*.5,
		right,  bot,  (LandscapeGen.get(right,bot)*rem+rem)*.5,
		right,  top,  (LandscapeGen.get(right,top)*rem+rem)*.5,

		right,  top,  (LandscapeGen.get(right,top)*rem+rem)*.5,
		left ,  top,  (LandscapeGen.get(left ,top)*lem+lem)*.5,
		left ,  bot,  (LandscapeGen.get(left ,bot)*lem+lem)*.5
	])
}
function GenerateColor(left,right,edge){
	let lec = [0.549, 0.117, 1]; 
	let rec = [0.549, 0.117, 1];
	if (Math.abs(left) > edge) lec = [1, 0.160, 0.458];
	if (Math.abs(right) > edge) rec = [1, 0.160, 0.458];
	return [...lec,...rec,...rec,...rec,...lec,...lec]
}

function Pretty(props) {
	for (let node = 0; node < document.childNodes[1].childNodes[2].childNodes.length;node++){
		if(document.childNodes[1].childNodes[2].childNodes[node].nodeName==="CANVAS"){
			document.childNodes[1].childNodes[2].childNodes[node].remove();  
		}
	}

	LandscapeGen.seed()
	const renderer = new WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	const camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight,.1,2000);
	camera.position.set( 0, 0, 100 );
	camera.lookAt( 0, 0, 0 );
	const scene = new Scene();
	scene.fog = new Fog( 0xff0000,150,250);

	const geometryplane = new PlaneGeometry( 500, 100 );
	const materialplane = new MeshBasicMaterial( {color: 0xffff00, side: DoubleSide, fog:false} );
	const plane = new Mesh( geometryplane, materialplane );
	scene.add( plane )
	plane.translateY(81)
	plane.translateZ(-200)



	const geometry = new BufferGeometry();
	let Quads = []
	let QuadsM = []
	let Colors = []
	var vertices = new Float32Array( Quads );
	var colors = new Float32Array( Colors );

	geometry.setAttribute( 'position', new BufferAttribute( vertices, 3 ) );
	geometry.setAttribute( 'color', new BufferAttribute( colors, 3 ) );
	
	var edges = new WireframeGeometry( geometry );
	var line = new LineSegments( edges, new LineBasicMaterial( { vertexColors: VertexColors, fog:true} ) );
	
	
	var materialMesh = new MeshPhongMaterial( {
		color: 0xff0000,
		polygonOffset: true,
		polygonOffsetFactor: 0, // positive value pushes polygon further away
		polygonOffsetUnits: 1,
		fog:false
	} );

	var mesh = new Mesh(geometry,materialMesh)
	line.rotateX(30)

	
	scene.add(mesh)
	mesh.rotateX(30)
	scene.add(line)
	mesh.renderOrder = 1
	line.renderOrder = 0;
	let yOffset = -100;
	function animate() {
		requestAnimationFrame(animate)


		for (let x = -150;x<150;x+=5.05){

			Quads.push(...GenerateQuad(x,x+5,yOffset,yOffset+5,40))
			QuadsM.push(...GenerateQuad(x,x+5.05,yOffset,yOffset+5.05,40))
			Colors.push(...GenerateColor(x,x+5,40))
			if (yOffset > 200) for(let del = 0; del < 18; del++){
				Quads.shift();
				Colors.shift();
				QuadsM.shift();
			}
		}
		if (yOffset > 200) line.translateY(-5.05)
		if (yOffset > 200) mesh.translateY(-5.05)
		vertices = new Float32Array( Quads );
		let verticesM = new Float32Array( QuadsM );
		colors = new Float32Array( Colors );

		edges.setAttribute( 'position', new BufferAttribute( vertices, 3 ) );
		
		line.geometry = edges
		line.geometry.setAttribute( 'color', new BufferAttribute( colors, 3 ) );
		mesh.geometry.setAttribute( 'position', new BufferAttribute( verticesM, 3 ) );
		
		line.geometry.attributes.position.needsUpdate = true;
		line.geometry.computeBoundingBox();
		line.geometry.computeBoundingSphere();
		

		mesh.geometry.attributes.position.needsUpdate = true;
		mesh.geometry.computeBoundingBox();
		mesh.geometry.computeBoundingSphere();
	

		yOffset+=5.05
		render()
	}
	function render() {
		renderer.render(scene, camera)
	}
	animate()
	return <></>
  

}
export default LoginSplash;