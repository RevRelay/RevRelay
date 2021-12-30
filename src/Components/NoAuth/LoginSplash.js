import ReactDOM from 'react-dom'
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
import { useTheme } from "@mui/material";
import { SphereGeometry } from 'three';

var colorTheme

function LoginSplash() {
	useEffect(Pretty,[])
	colorTheme = useTheme();
  return (
	<div className="LoginSplash">
	</div>
  );
}

function GenerateQuad(left,right,bot,top,edge){
	let lem = 0;
	let rem = 0;
	if (Math.abs(left) > edge) lem = 20;
	if (Math.abs(right) > edge) rem = 20;
	return(
	[
		left ,  bot,  (LandscapeGen.get(left ,bot)*lem+lem),
		right,  bot,  (LandscapeGen.get(right,bot)*rem+rem),
		right,  top,  (LandscapeGen.get(right,top)*rem+rem),

		right,  top,  (LandscapeGen.get(right,top)*rem+rem),
		left ,  top,  (LandscapeGen.get(left ,top)*lem+lem),
		left ,  bot,  (LandscapeGen.get(left ,bot)*lem+lem)
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
		if(document.childNodes[1].childNodes[2].childNodes[node].nodeName=="CANVAS"){
			document.childNodes[1].childNodes[2].childNodes[node].remove();  
		}
	}
	//.palette.primary.{dark,light,main}
	LandscapeGen.seed()
	const renderer = new WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	const camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight,.1,2000);
	camera.position.set( 0, 0, 100 );
	camera.lookAt( 0, 0, 0 );
	const scene = new Scene();
	scene.fog = new Fog(colorTheme.palette.primary.light,150,250);

	const geometryplane = new PlaneGeometry( 500, 100 );
	const materialplane = new MeshBasicMaterial( {color: colorTheme.palette.primary.dark, side: DoubleSide, fog:false} );
	const plane = new Mesh( geometryplane, materialplane );
	scene.add( plane )
	plane.translateY(81)
	plane.translateZ(-200)



	const geometry = new BufferGeometry();
	let Quads = []
	let QuadsM = []
	let Colors = []

	let yOffset = -100;
	for(yOffset; yOffset < 200; yOffset+=5.05){
		for (let x = -151.5;x<151.5;x+=5.05){

			Quads.push(...GenerateQuad(x,x+5,yOffset,yOffset+5,40))
			QuadsM.push(...GenerateQuad(x,x+5.05,yOffset,yOffset+5.05,40))
			Colors.push(...GenerateColor(x,x+5,40))
		}

	}

	var vertices = new Float32Array( Quads );
	var colors = new Float32Array( Colors );

	geometry.setAttribute( 'position', new BufferAttribute( vertices, 3 ) );
	geometry.setAttribute( 'color', new BufferAttribute( colors, 3 ) );
	
	var edges = new WireframeGeometry( geometry );
	var line = new LineSegments( edges, new LineBasicMaterial( { vertexColors: VertexColors, fog:true} ) );
	
	
	var materialMesh = new MeshPhongMaterial( {
		color: 0xff0000,
		polygonOffset: true,
		polygonOffsetFactor: 1, // positive value pushes polygon further away
		polygonOffsetUnits: 1,
		fog:false
	} );

	var mesh = new Mesh(geometry,materialMesh);
	line.rotateX(30);

	
	scene.add(mesh);
	mesh.rotateX(30);
	scene.add(line);
	mesh.renderOrder = 1;
	line.renderOrder = 0;
	let verticesM = new Float32Array( QuadsM );

	edges.setAttribute( 'position', new BufferAttribute( vertices, 3 ) );
	
	line.geometry = edges
	line.geometry.setAttribute( 'color', new BufferAttribute( colors, 3 ) );
	mesh.geometry.setAttribute( 'position', new BufferAttribute( verticesM, 3 ) );
	
	line.geometry.attributes.position.needsUpdate = true;
	line.geometry.computeBoundingBox();
	line.geometry.computeBoundingSphere();
	const sphereGeometry = new SphereGeometry(10);
	const sphereMaterial = new MeshBasicMaterial({color: colorTheme.palette.secondary.light,
													fog: false});
	const sphere = new Mesh(sphereGeometry, sphereMaterial);
	scene.add( sphere );
	sphere.translateY(30)

	function render() {
		renderer.render(scene, camera)
	}
	render();
	return <></>
  

}
export default LoginSplash;