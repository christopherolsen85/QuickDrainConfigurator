var zoomingIn = false;
var zoomingOut = false;
var renderWidth = 165;
var renderHeight = 248;
if(window.innerWidth >= 900)
{
	renderWidth = 465;
	renderHeight = 373;
}
var openingIncrement = Math.sin(Math.PI / 4);

//X is width, Z is length
var defaultShowerLength = 27;
var defaultShowerWidth = 27;
var wallHeight = 96;
var curbHeight = 6;

var drainEndpieceMesh = null;
var drainEndpieceMesh2 = null;

var previousDrainPlacement = "";

var currentShowerLength = defaultShowerLength;
var currentShowerWidth = defaultShowerWidth;
var currentShowerLayout = "1wall";
var currentIsOpposite = 0;
var currentNeoOpeningWidth = 15;
var openingLength = 0;
var currentAccessibility = "curbed";
var currentCoverPattern = "stream";
var currentMaterialName = "brushed";
var currentDrainPlacement = "right";
var currentDrainLength = currentShowerWidth;
var currentProductLine = "proline";
var currentDrainClass = new HorizontalDrain();
var currentDrainBodyMesh = new THREE.Mesh();
var currentDrainCoverMesh = new THREE.Mesh();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, renderWidth / renderHeight, 0.1, 1000);
var clock = new THREE.Clock();
var renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, antialias: true, alpha: true});
renderer.setClearColor(0x000000, 0);	
renderer.setSize(renderWidth, renderHeight);
$(".cjoVisualizerCell").append(renderer.domElement);
maxAnisotropy = renderer.getMaxAnisotropy();
if(maxAnisotropy > 4)
	maxAnisotropy = 4;


var loader = new THREE.JSONLoader();

var showerMaterial = new THREE.MeshLambertMaterial({color: 0xffffaa});
showerMaterial.side = THREE.DoubleSide;

var showerTileTexture = new THREE.ImageUtils.loadTexture("textures/Texture01.jpg");
showerTileTexture.minFilter = THREE.LinearFilter;
showerTileTexture.anisotropy = 1;
/*showerTileTexture.wrapS = THREE.RepeatWrapping;
showerTileTexture.wrapT = THREE.RepeatWrapping;
showerTileTexture.repeat.x = 1;
showerTileTexture.repeat.y = 1;*/
var showerTileMaterial = new THREE.MeshPhongMaterial({map: showerTileTexture});
showerTileMaterial.side = THREE.DoubleSide;

var floorGeometry = new THREE.Geometry();
floorGeometry.vertices.push(
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(defaultShowerWidth, 0, 0),
	new THREE.Vector3(0, 0, defaultShowerLength),
	new THREE.Vector3(defaultShowerWidth, 0, defaultShowerLength),
	new THREE.Vector3(defaultShowerWidth, 0, defaultShowerLength)
);
floorGeometry.faces.push(
	new THREE.Face3(0, 2, 1),
	new THREE.Face3(2, 3, 1),
	new THREE.Face3(3, 2, 4)
);
floorGeometry.computeBoundingSphere();
floorGeometry.computeFaceNormals();
floorGeometry.faceVertexUvs[0] = showerFloorUVMap;
var floorMesh = new THREE.Mesh(floorGeometry, showerTileMaterial);
floorMesh.frustumCulled = false;
floorMesh.matrixAutoUpdate = false;
scene.add(floorMesh);

		
		
		


var leftWallGeometry = new THREE.Geometry();
leftWallGeometry.vertices.push(
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, 0, defaultShowerLength),
	new THREE.Vector3(0, wallHeight, defaultShowerLength),
	new THREE.Vector3(0, wallHeight, 0)
);
leftWallGeometry.faces.push(
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(2, 0, 1)
);
leftWallGeometry.computeBoundingSphere();
leftWallGeometry.computeFaceNormals();
leftWallGeometry.faceVertexUvs[0] = showerWallUVMap;
var leftWallMesh = new THREE.Mesh(leftWallGeometry, showerTileMaterial);
leftWallMesh.matrixAutoUpdate = false;
leftWallMesh.frustumCulled = false;


var backWallGeometry = new THREE.Geometry();
backWallGeometry.vertices.push(
	new THREE.Vector3(0, 0, defaultShowerLength),
	new THREE.Vector3(defaultShowerWidth, 0, defaultShowerLength),
	new THREE.Vector3(defaultShowerWidth, wallHeight, defaultShowerLength),
	new THREE.Vector3(0, wallHeight, defaultShowerLength)
);
backWallGeometry.faces.push(
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(2, 0, 1)
);
backWallGeometry.computeBoundingSphere();
backWallGeometry.computeFaceNormals();
backWallGeometry.faceVertexUvs[0] = showerWallUVMap;
var backWallMesh = new THREE.Mesh(backWallGeometry, showerTileMaterial);
backWallMesh.matrixAutoUpdate = false;
backWallMesh.frustumCulled = false;


var rightWallGeometry = new THREE.Geometry();
rightWallGeometry.vertices.push(
	new THREE.Vector3(defaultShowerWidth, 0, defaultShowerLength),
	new THREE.Vector3(defaultShowerWidth, 0, 0),
	new THREE.Vector3(defaultShowerWidth, wallHeight, 0),
	new THREE.Vector3(defaultShowerWidth, wallHeight, defaultShowerLength)
);
rightWallGeometry.faces.push(
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(2, 0, 1)
);
rightWallGeometry.computeBoundingSphere();
rightWallGeometry.computeFaceNormals();
rightWallGeometry.faceVertexUvs[0] = showerWallUVMap;
var rightWallMesh = new THREE.Mesh(rightWallGeometry, showerTileMaterial);
rightWallMesh.matrixAutoUpdate = false;
rightWallMesh.frustumCulled = false;


var frontWallGeometry = new THREE.Geometry();
frontWallGeometry.vertices.push(
	new THREE.Vector3(defaultShowerWidth, 0, 0),
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, wallHeight, 0),
	new THREE.Vector3(defaultShowerWidth, wallHeight, 0)
);
frontWallGeometry.faces.push(
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(2, 0, 1)
);
frontWallGeometry.computeBoundingSphere();
frontWallGeometry.computeFaceNormals();
frontWallGeometry.faceVertexUvs[0] = showerWallUVMap;
var frontWallMesh = new THREE.Mesh(frontWallGeometry, showerTileMaterial);
frontWallMesh.matrixAutoUpdate = false;
frontWallMesh.frustumCulled = false;


var leftCurbGeometry = new THREE.Geometry();
leftCurbGeometry.vertices.push(
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, 0, defaultShowerLength),
	new THREE.Vector3(0, curbHeight, defaultShowerLength),
	new THREE.Vector3(0, curbHeight, 0)
);
leftCurbGeometry.faces.push(
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(2, 0, 1)
);
leftCurbGeometry.computeBoundingSphere();
leftCurbGeometry.computeFaceNormals();
leftCurbGeometry.faceVertexUvs[0] = showerWallUVMap;
var leftCurbMesh = new THREE.Mesh(leftCurbGeometry, showerTileMaterial);
leftCurbMesh.matrixAutoUpdate = false;
leftCurbMesh.frustumCulled = false;



var backCurbGeometry = new THREE.Geometry();
backCurbGeometry.vertices.push(
	new THREE.Vector3(0, 0, defaultShowerLength),
	new THREE.Vector3(defaultShowerWidth, 0, defaultShowerLength),
	new THREE.Vector3(defaultShowerWidth, curbHeight, defaultShowerLength),
	new THREE.Vector3(0, curbHeight, defaultShowerLength)
);
backCurbGeometry.faces.push(
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(2, 0, 1)
);
backCurbGeometry.computeBoundingSphere();
backCurbGeometry.computeFaceNormals();
backCurbGeometry.faceVertexUvs[0] = showerWallUVMap;
var backCurbMesh = new THREE.Mesh(backCurbGeometry, showerTileMaterial);
backCurbMesh.matrixAutoUpdate = false;
backCurbMesh.frustumCulled = false;



var rightCurbGeometry = new THREE.Geometry();
rightCurbGeometry.vertices.push(
	new THREE.Vector3(defaultShowerWidth, 0, defaultShowerLength),
	new THREE.Vector3(defaultShowerWidth, 0, 0),
	new THREE.Vector3(defaultShowerWidth, curbHeight, 0),
	new THREE.Vector3(defaultShowerWidth, curbHeight, defaultShowerLength)
);
rightCurbGeometry.faces.push(
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(2, 0, 1)
);
rightCurbGeometry.computeBoundingSphere();
rightCurbGeometry.computeFaceNormals();
rightCurbGeometry.faceVertexUvs[0] = showerWallUVMap;
var rightCurbMesh = new THREE.Mesh(rightCurbGeometry, showerTileMaterial);
rightCurbMesh.matrixAutoUpdate = false;
rightCurbMesh.frustumCulled = false;


var frontCurbGeometry = new THREE.Geometry();
frontCurbGeometry.vertices.push(
	new THREE.Vector3(defaultShowerWidth, 0, 0),
	new THREE.Vector3(0, 0, 0),
	new THREE.Vector3(0, curbHeight, 0),
	new THREE.Vector3(defaultShowerWidth, curbHeight, 0)
);
frontCurbGeometry.faces.push(
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(2, 0, 1)
);
frontCurbGeometry.computeBoundingSphere();
frontCurbGeometry.computeFaceNormals();
frontCurbGeometry.faceVertexUvs[0] = showerWallUVMap;
var frontCurbMesh = new THREE.Mesh(frontCurbGeometry, showerTileMaterial);
frontCurbMesh.matrixAutoUpdate = false;
frontCurbMesh.frustumCulled = false;


var neoCurbGeometry = new THREE.Geometry();
neoCurbGeometry.vertices.push(
	new THREE.Vector3(defaultShowerWidth, 0, 0),
	new THREE.Vector3(0, 0, defaultShowerLength),
	new THREE.Vector3(0, curbHeight, defaultShowerLength),
	new THREE.Vector3(defaultShowerWidth, curbHeight, 0)
);
neoCurbGeometry.faces.push(
	new THREE.Face3(0, 2, 3),
	new THREE.Face3(2, 0, 1)
);
neoCurbGeometry.computeBoundingSphere();
neoCurbGeometry.computeFaceNormals();
neoCurbGeometry.faceVertexUvs[0] = showerWallUVMap;
var neoCurbMesh = new THREE.Mesh(neoCurbGeometry, showerTileMaterial);
neoCurbMesh.matrixAutoUpdate = false;
neoCurbMesh.frustumCulled = false;






var pointLight = new THREE.PointLight(0xffffff, 0.5, 1000);
	pointLight.position.set(15, wallHeight, 15);
	scene.add(pointLight);

var ambientLight = new THREE.AmbientLight(0x666666);
scene.add(ambientLight);

camera.position.x = 10;
camera.position.y = 50;
camera.position.z = 10;

//controls = new THREE.OrbitControls( camera, renderer.domElement );
controls = new THREE.FirstPersonControls(camera, renderer.domElement);


function render()
{
	controls.update(clock.getDelta());
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}




render();




function updateShower()
{
	updateShowerFloor();
	updateWalls();
	updateCurbs();
	currentDrainLength = getDrainLength();
	updateDrain();
	
}

function updateShowerFloor()
{
	if(currentShowerLayout == "1wall" || currentShowerLayout == "2wall" || currentShowerLayout == "3wall")
	{
		floorMesh.geometry.dynamic = true;
		floorMesh.geometry.vertices[3].z = currentShowerLength;
		floorMesh.geometry.vertices[4].z = currentShowerLength;
		floorMesh.geometry.vertices[3].x = currentShowerWidth;
		floorMesh.geometry.vertices[4].x = currentShowerWidth;
		
		floorMesh.geometry.vertices[1].x = currentShowerWidth;
		floorMesh.geometry.vertices[2].z = currentShowerLength;
		
		floorMesh.geometry.verticesNeedUpdate = true;
		
		floorMesh.geometry.faceVertexUvs[0][1][0].x = 1;
		floorMesh.geometry.faceVertexUvs[0][2][1].x = 1;
		floorMesh.geometry.faceVertexUvs[0][2][2].y = 1;
		floorMesh.geometry.uvsNeedUpdate = true;
		
	}
	
	else
	{
		openingLength = openingIncrement * currentNeoOpeningWidth;
		
		floorMesh.geometry.dynamic = true;
		
		floorMesh.geometry.vertices[4].x = currentShowerWidth - openingLength;
		floorMesh.geometry.vertices[4].z = currentShowerLength;
		floorMesh.geometry.vertices[3].x = currentShowerWidth;
		floorMesh.geometry.vertices[3].z = currentShowerLength - openingLength;
		
		floorMesh.geometry.vertices[1].x = currentShowerWidth;
		floorMesh.geometry.vertices[2].z = currentShowerLength;
		
		
		floorMesh.geometry.faceVertexUvs[0][1][0].x = (currentShowerLength - openingLength) / currentShowerLength;
		floorMesh.geometry.faceVertexUvs[0][2][1].x = (currentShowerLength - openingLength) / currentShowerLength;
		floorMesh.geometry.faceVertexUvs[0][2][2].y = (currentShowerWidth - openingLength) / currentShowerWidth;
		floorMesh.geometry.uvsNeedUpdate = true;
		
		for(var x = 0; x < floorMesh.geometry.faces.length; x++)
		{
			floorMesh.geometry.faces[x].normal.set(0, 1, 0);
		}
		
		floorMesh.geometry.verticesNeedUpdate = true;
		floorMesh.geometry.normalsNeedUpdate = true;
	}
}

function updateWalls()
{
	scene.remove(leftWallMesh);
	scene.remove(backWallMesh);
	scene.remove(rightWallMesh);
	scene.remove(frontWallMesh);
	
	updateWallGeometry();
	
	switch(currentShowerLayout)
	{
		case "1wall":
			scene.add(leftWallMesh);
			break;
		case "2wall":
			scene.add(leftWallMesh);
			if(currentIsOpposite == 0)
				scene.add(frontWallMesh);
			else scene.add(rightWallMesh);
			break;
		case "3wall":
			scene.add(leftWallMesh);
			scene.add(frontWallMesh);
			scene.add(rightWallMesh);
			break;
		case "neoAngle":
			scene.add(leftWallMesh);
			scene.add(backWallMesh);
			scene.add(rightWallMesh);
			scene.add(frontWallMesh);
			break;
	}
	
}

function updateWallGeometry()
{
	leftWallMesh.geometry.dynamic = true;
	backWallMesh.geometry.dynamic = true;
	rightWallMesh.geometry.dynamic = true;
	frontWallMesh.geometry.dynamic = true;
	backCurbMesh.geometry.dynamic = true;
	rightCurbMesh.geometry.dynamic = true;
	frontCurbMesh.geometry.dynamic = true;
	neoCurbMesh.geometry.dynamic = true;
	
	leftWallMesh.geometry.vertices[1].z = currentShowerLength;
	leftWallMesh.geometry.vertices[2].z = currentShowerLength;
	
	backWallMesh.geometry.vertices[0].z = backCurbMesh.geometry.vertices[0].z = currentShowerLength;
	backWallMesh.geometry.vertices[3].z = backCurbMesh.geometry.vertices[3].z = currentShowerLength;
	backWallMesh.geometry.vertices[1].z = backCurbMesh.geometry.vertices[1].z = neoCurbMesh.geometry.vertices[1].z = currentShowerLength;
	backWallMesh.geometry.vertices[2].z = backCurbMesh.geometry.vertices[2].z = neoCurbMesh.geometry.vertices[2].z = currentShowerLength;
	backWallMesh.geometry.vertices[1].x = backCurbMesh.geometry.vertices[1].x = neoCurbMesh.geometry.vertices[1].x = currentShowerWidth;
	backWallMesh.geometry.vertices[2].x = backCurbMesh.geometry.vertices[2].x = neoCurbMesh.geometry.vertices[2].x = currentShowerWidth;
	
	rightWallMesh.geometry.vertices[0].x = rightCurbMesh.geometry.vertices[0].x = neoCurbMesh.geometry.vertices[0].x = currentShowerWidth;
	rightWallMesh.geometry.vertices[3].x = rightCurbMesh.geometry.vertices[3].x = neoCurbMesh.geometry.vertices[3].x = currentShowerWidth;
	rightWallMesh.geometry.vertices[1].x = rightCurbMesh.geometry.vertices[1].x = currentShowerWidth;
	rightWallMesh.geometry.vertices[2].x = rightCurbMesh.geometry.vertices[2].x = currentShowerWidth;
	rightWallMesh.geometry.vertices[0].z = rightCurbMesh.geometry.vertices[0].z = neoCurbMesh.geometry.vertices[0].z = currentShowerLength;
	rightWallMesh.geometry.vertices[3].z = rightCurbMesh.geometry.vertices[3].z = neoCurbMesh.geometry.vertices[3].z = currentShowerLength;
	
	frontWallMesh.geometry.vertices[0].x = frontCurbMesh.geometry.vertices[0].x = currentShowerWidth;
	frontWallMesh.geometry.vertices[3].x = frontCurbMesh.geometry.vertices[3].x = currentShowerWidth;
	
	if(currentShowerLayout == "neoAngle")
	{
		backWallMesh.geometry.vertices[1].x = backCurbMesh.geometry.vertices[1].x = neoCurbMesh.geometry.vertices[1].x = currentShowerWidth - openingLength;
		backWallMesh.geometry.vertices[2].x = backCurbMesh.geometry.vertices[2].x = neoCurbMesh.geometry.vertices[2].x = currentShowerWidth - openingLength;
		rightWallMesh.geometry.vertices[0].z = rightCurbMesh.geometry.vertices[0].z = neoCurbMesh.geometry.vertices[0].z = currentShowerLength - openingLength;
		rightWallMesh.geometry.vertices[3].z = rightCurbMesh.geometry.vertices[3].z = neoCurbMesh.geometry.vertices[3].z = currentShowerLength - openingLength;
	}
	
	leftWallMesh.geometry.verticesNeedUpdate = true;
	backWallMesh.geometry.verticesNeedUpdate = true;
	rightWallMesh.geometry.verticesNeedUpdate = true;
	frontWallMesh.geometry.verticesNeedUpdate = true;
	backCurbMesh.geometry.verticesNeedUpdate = true;
	rightCurbMesh.geometry.verticesNeedUpdate = true;
	frontCurbMesh.geometry.verticesNeedUpdate = true;
	neoCurbMesh.geometry.verticesNeedUpdate = true;
}

function updateCurbs()
{
	var isCurbed = false;
	if(currentAccessibility == "curbed")
		isCurbed = true;
	
	scene.remove(leftCurbMesh);
	scene.remove(backCurbMesh);
	scene.remove(rightCurbMesh);
	scene.remove(frontCurbMesh);
	scene.remove(neoCurbMesh);
	
	if(currentShowerLayout == "1wall" && isCurbed)
	{
		scene.add(backCurbMesh);
		scene.add(rightCurbMesh);
		scene.add(frontCurbMesh);
	}
	
	if(currentShowerLayout == "2wall" && isCurbed)
	{
		if(currentIsOpposite == 0)
		{
			scene.add(rightCurbMesh);
			scene.add(backCurbMesh);
		}
		else
		{
			scene.add(frontCurbMesh);
			scene.add(backCurbMesh);
		}
		
	}
	
	if(currentShowerLayout == "3wall" && isCurbed)
	{
		scene.add(backCurbMesh);
	}
	
	if(currentShowerLayout == "neoAngle" && isCurbed)
	{
		scene.add(neoCurbMesh);
	}
}



function getDrainLength()
{
	if(currentDrainPlacement == "right" || currentDrainPlacement == "center")
		return currentShowerWidth;
	if(currentDrainPlacement == "left")
	{
		if(currentShowerLayout == "neoAngle")
			return currentShowerWidth - openingLength;
		else return currentShowerWidth;
	}
	if(currentDrainPlacement == "front")
	{
		if(currentShowerLayout == "neoAngle")
			return currentShowerLength - openingLength;
		else return currentShowerLength;
	}
	if(currentDrainPlacement == "back" || currentDrainPlacement == "centerHoriz")
		return currentShowerLength;
	if(currentDrainPlacement == "neoAngle")
		return currentNeoOpeningWidth;
}

function updateDrain()
{
	scene.remove(currentDrainBodyMesh);
	scene.remove(currentDrainCoverMesh);
	scene.remove(drainEndpieceMesh);
	scene.remove(drainEndpieceMesh2);
	updateDrainFinish();
	updateDrainCover();
	currentDrainBodyMesh = new THREE.Mesh(currentDrainClass.bodyGeo, currentDrainBodyMaterial);
	currentDrainBodyMesh.matrixAutoUpdate = false;
	currentDrainBodyMesh.matrix = getDrainBodyMatrix();
	scene.add(currentDrainBodyMesh);
	if(currentMaterialName == "brushed")
		currentDrainCoverMesh = new THREE.Mesh(drainCoverGeo, currentDrainClass.coverMaterial);
	else currentDrainCoverMesh = new THREE.Mesh(drainCoverGeo, currentDrainClass.polishedMaterial);
	currentDrainCoverMesh.matrixAutoUpdate = false;
	currentDrainCoverMesh.matrix = getDrainCoverMatrix();
	adjustDrainCoverTexture();
	if(currentCoverPattern!= "tilein")
		scene.add(currentDrainCoverMesh);
	if(currentDrainClass.hasEndpieces)
	{
		if(currentMaterialName == "polished")
			currentEndpieceMaterial = endpiecePolishedMaterial;
		else currentEndpieceMaterial = endpieceBrushedMaterial;
		drainEndpieceMesh = new THREE.Mesh(drainCoverGeo, currentEndpieceMaterial);
		drainEndpieceMesh2 = new THREE.Mesh(drainCoverGeo, currentEndpieceMaterial);
		drainEndpieceMesh.matrixAutoUpdate = false;
		drainEndpieceMesh2.matrixAutoUpdate = false;
		drainEndpieceMesh.matrix = getEndpieceMatrix(1);
		drainEndpieceMesh2.matrix = getEndpieceMatrix(2);
		scene.add(drainEndpieceMesh);
		scene.add(drainEndpieceMesh2);	
	}
	
	
}

function updateDrainCover()
{
	if(currentCoverPattern == "stream")
	{
		currentDrainGeo = streamDrainGeo;
		currentDrainClass = new StreamDrain();
	}
	else if(currentCoverPattern == "lines")
	{
		currentDrainGeo = horizontalDrainGeo;
		currentDrainClass = new LinesDrain();
	}
	else if(currentCoverPattern == "vertical")
	{
		currentDrainGeo = horizontalDrainGeo;
		currentDrainClass = new VerticalDrain();
	}
	else if(currentCoverPattern == "cosmo")
	{
		currentDrainGeo = horizontalDrainGeo;
		currentDrainClass = new CosmoDrain();
	}
	else if(currentCoverPattern == "tilein")
	{
		currentDrainGeo = tileinDrainGeo;
		currentDrainClass = new TileinDrain();
	}
	else
	{
		currentDrainGeo = horizontalDrainGeo;
		currentDrainClass = new HorizontalDrain();
	}
}

function updateDrainFinish()
{
	currentDrainBodyMaterial = drainbodyMaterialBrushed;
	if(currentCoverPattern == "tilein")
		currentDrainBodyMaterial = tileinDrainBodyMaterial;
}

function adjustDrainCoverTexture()
{
	currentDrainCoverMesh.material.map.repeat.x = 1;
	currentDrainCoverMesh.material.map.repeat.y = currentDrainLength / currentDrainClass.drainPieceLength;
}

function showScreenshot()
{
	var imgData;
	imgData = renderer.domElement.toDataURL("image/png");
	$("#cjoPreviewImage").attr("src", imgData);
}

function getScreenshot()
{
	return renderer.domElement.toDataURL("image/jpeg");
}













