var maxAnisotropy = 1;

var horizontalDrainGeo = new THREE.Geometry();
var streamDrainGeo = new THREE.Geometry();
var tileinDrainGeo = new THREE.Geometry();

var currentDrainGeo = horizontalDrainGeo;

var cosmoDrainTexture = THREE.ImageUtils.loadTexture("textures/cosmo_brushed.png");
cosmoDrainTexture.minFilter = THREE.LinearFilter;
cosmoDrainTexture.wrapS = THREE.RepeatWrapping;
cosmoDrainTexture.wrapT = THREE.RepeatWrapping;
cosmoDrainTexture.repeat.x = 1;
cosmoDrainTexture.repeat.y = 1;
cosmoDrainMaterial = new THREE.MeshLambertMaterial({map: cosmoDrainTexture});
cosmoDrainMaterial.side = THREE.DoubleSide;

var cosmoPolishedTexture = THREE.ImageUtils.loadTexture("textures/cosmo_polished.png");
cosmoPolishedTexture.minFilter = THREE.LinearFilter;
cosmoPolishedTexture.wrapS = THREE.RepeatWrapping;
cosmoPolishedTexture.wrapT = THREE.RepeatWrapping;
cosmoPolishedTexture.repeat.x = 1;
cosmoPolishedTexture.repeat.y = 1;
cosmoPolishedMaterial = new THREE.MeshLambertMaterial({map: cosmoPolishedTexture});

var linesBrushedTexture = THREE.ImageUtils.loadTexture("textures/lines_brushed.png");
linesBrushedTexture.minFilter = THREE.LinearFilter;
linesBrushedTexture.wrapS = THREE.RepeatWrapping;
linesBrushedTexture.wrapT = THREE.RepeatWrapping;
linesBrushedTexture.repeat.x = 1;
linesBrushedTexture.repeat.y = 1;
linesBrushedDrainMaterial = new THREE.MeshLambertMaterial({map: linesBrushedTexture});
linesBrushedDrainMaterial.side = THREE.DoubleSide;

var linesPolishedTexture = THREE.ImageUtils.loadTexture("textures/lines_polished.png");
linesPolishedTexture.minFilter = THREE.LinearFilter;
linesPolishedTexture.wrapS = THREE.RepeatWrapping;
linesPolishedTexture.wrapT = THREE.RepeatWrapping;
linesPolishedTexture.repeat.x = 1;
linesPolishedTexture.repeat.y = 1;
linesPolishedMaterial = new THREE.MeshLambertMaterial({map: linesPolishedTexture});
linesPolishedMaterial.side = THREE.DoubleSide;

var horizontalDrainTexture = THREE.ImageUtils.loadTexture("textures/horizontal_brushed.png");
horizontalDrainTexture.minFilter = THREE.LinearFilter;
horizontalDrainTexture.wrapS = THREE.RepeatWrapping;
horizontalDrainTexture.wrapT = THREE.RepeatWrapping;
horizontalDrainTexture.repeat.x = 1;
horizontalDrainTexture.repeat.y = 1;//this is the one that should be changed based on drain length
horizontalDrainMaterial = new THREE.MeshLambertMaterial({map: horizontalDrainTexture});
horizontalDrainMaterial.side = THREE.DoubleSide;

var horizontalPolishedTexture = THREE.ImageUtils.loadTexture("textures/horizontal_polished.png");
horizontalPolishedTexture.minFilter = THREE.LinearFilter;
horizontalPolishedTexture.wrapS = THREE.RepeatWrapping;
horizontalPolishedTexture.wrapT = THREE.RepeatWrapping;
horizontalPolishedTexture.repeat.x = 1;
horizontalPolishedTexture.repeat.y = 1;//this is the one that should be changed based on drain length
horizontalPolishedMaterial = new THREE.MeshLambertMaterial({map: horizontalPolishedTexture});
horizontalPolishedMaterial.side = THREE.DoubleSide;

var streamDrainTexture = THREE.ImageUtils.loadTexture("textures/stream_brushed.png");
streamDrainTexture.minFilter = THREE.LinearFilter;
streamDrainTexture.wrapS = THREE.RepeatWrapping;
streamDrainTexture.wrapT = THREE.RepeatWrapping;
streamDrainTexture.repeat.x = 1;
streamDrainTexture.repeat.y = 1;//this is the one that should be changed based on drain length
streamDrainMaterial = new THREE.MeshLambertMaterial({map: streamDrainTexture});
streamDrainMaterial.side = THREE.DoubleSide;

var streamPolishedTexture = THREE.ImageUtils.loadTexture("textures/stream_polished.png");
streamPolishedTexture.minFilter = THREE.LinearFilter;
streamPolishedTexture.wrapS = THREE.RepeatWrapping;
streamPolishedTexture.wrapT = THREE.RepeatWrapping;
streamPolishedTexture.repeat.x = 1;
streamPolishedTexture.repeat.y = 1;//this is the one that should be changed based on drain length
streamPolishedMaterial = new THREE.MeshLambertMaterial({map: streamPolishedTexture});
streamPolishedMaterial.side = THREE.DoubleSide;

var verticalDrainTexture = THREE.ImageUtils.loadTexture("textures/vertical_brushed.png");
//verticalDrainTexture.minFilter = THREE.LinearFilter;
verticalDrainTexture.wrapS = THREE.RepeatWrapping;
verticalDrainTexture.wrapT = THREE.RepeatWrapping;
verticalDrainTexture.repeat.x = 1;
verticalDrainTexture.repeat.y = 1;
verticalDrainTexture.minFilter = THREE.LinearFilter;
verticalDrainMaterial = new THREE.MeshLambertMaterial({map: verticalDrainTexture});
verticalDrainMaterial.side = THREE.DoubleSide;

var verticalPolishedTexture = THREE.ImageUtils.loadTexture("textures/vertical_polished.png");
//verticalPolishedTexture.minFilter = THREE.LinearFilter;
verticalPolishedTexture.wrapS = THREE.RepeatWrapping;
verticalPolishedTexture.wrapT = THREE.RepeatWrapping;
verticalPolishedTexture.repeat.x = 1;
verticalPolishedTexture.repeat.y = 1;
verticalPolishedTexture.minFilter = THREE.LinearFilter;
verticalPolishedMaterial = new THREE.MeshLambertMaterial({map: verticalPolishedTexture});
verticalPolishedMaterial.side = THREE.DoubleSide;

var endpieceBrushedTexture = THREE.ImageUtils.loadTexture("textures/endpiece_brushed.png");
endpieceBrushedTexture.minFilter = THREE.LinearFilter;
endpieceBrushedTexture.wrapS = THREE.RepeatWrapping;
endpieceBrushedTexture.wrapT = THREE.RepeatWrapping;
endpieceBrushedTexture.repeat.x = 1;
endpieceBrushedTexture.repeat.y = 1;
endpieceBrushedMaterial = new THREE.MeshLambertMaterial({map: endpieceBrushedTexture});
endpieceBrushedMaterial.side = THREE.DoubleSide;

var endpiecePolishedTexture = THREE.ImageUtils.loadTexture("textures/endpiece_polished.png");
endpiecePolishedTexture.minFilter = THREE.LinearFilter;
endpiecePolishedTexture.wrapS = THREE.RepeatWrapping;
endpiecePolishedTexture.wrapT = THREE.RepeatWrapping;
endpiecePolishedTexture.repeat.x = 1;
endpiecePolishedTexture.repeat.y = 1;
endpiecePolishedMaterial = new THREE.MeshLambertMaterial({map: endpiecePolishedTexture});
endpiecePolishedMaterial.side = THREE.DoubleSide;

var drainbodyMaterialBrushed = new THREE.MeshLambertMaterial({color: 0xc3c3c3});
drainbodyMaterialBrushed.side = THREE.DoubleSide;

var tileinDrainBodyMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
tileinDrainBodyMaterial.side = THREE.DoubleSide;

var currentDrainBodyMaterial = drainbodyMaterialBrushed;



var drainCoverGeo = new THREE.Geometry();
drainCoverGeo.vertices.push(
	new THREE.Vector3(-0.5, 0, -0.5),
	new THREE.Vector3(0.5, 0, -0.5),
	new THREE.Vector3(0.5, 0, 0.5),
	new THREE.Vector3(-0.5, 0, 0.5)
);
drainCoverGeo.faces.push(
	new THREE.Face3(0, 3, 1),
	new THREE.Face3(3, 2, 1)
);
drainCoverUVs = [
	new THREE.Vector2(0, 0),
	new THREE.Vector2(0, 1),
	new THREE.Vector2(1, 1),
	new THREE.Vector2(1, 0)
];
drainCoverGeo.faceVertexUvs[0][0] = [drainCoverUVs[0], drainCoverUVs[3], drainCoverUVs[1]];
drainCoverGeo.faceVertexUvs[0][1] = [drainCoverUVs[3], drainCoverUVs[2], drainCoverUVs[1]];
drainCoverGeo.computeBoundingSphere();
drainCoverGeo.computeFaceNormals();

/*
drainEndpieceMesh = new THREE.Mesh(drainCoverGeo, currentDrainBodyMaterial);
drainEndpieceMesh.matrixAutoUpdate = false;
drainEndpieceMesh2 = new THREE.Mesh(drainCoverGeo, currentDrainBodyMaterial);
drainEndpieceMesh2.matrixAutoUpdate = false;
*/

var loader = new THREE.JSONLoader();
loader.load("meshes/final/horizontal.json",
	function(geometry)
	{
		horizontalDrainGeo = geometry;
		
	}
);
loader.load("meshes/final/stream.json",
	function(geometry)
	{
		streamDrainGeo = geometry;
	}
);
loader.load("meshes/final/tilein.json",
	function(geometry)
	{
		tileinDrainGeo = geometry;
	}
);

function CosmoDrain()
{
	this.drainWidth = 1.5;
	this.drainPieceLength = 1.5;
	this.bodyGeo = horizontalDrainGeo;
	this.yOffset = 0.1;
	this.bodyLengthScale = 0.252;
	this.bodyWidthScale = 0.71;
	this.coverMaterial = cosmoDrainMaterial;
	this.polishedMaterial = cosmoPolishedMaterial;
	this.hasEndpieces = false;
	this.endpieceLength = 0;
}

function HorizontalDrain()
{
	this.drainWidth = 1.5;
	this.drainPieceLength = 3.875;
	this.bodyGeo = horizontalDrainGeo;
	this.yOffset = 0.1;
	this.bodyLengthScale = 0.252;
	this.bodyWidthScale = 0.71;
	this.coverMaterial = horizontalDrainMaterial;
	this.polishedMaterial = horizontalPolishedMaterial;
	this.hasEndpieces = true;
	this.endpieceLength = 5;
}

function LinesDrain()
{
	this.drainWidth = 1.5;
	this.drainPieceLength = 3;
	this.bodyGeo = horizontalDrainGeo;
	this.yOffset = 0.1;
	this.bodyLengthScale = this.bodyLengthScale = 0.252;
	this.bodyWidthScale = 0.71;
	this.coverMaterial = linesBrushedDrainMaterial;
	this.polishedMaterial = linesPolishedMaterial;
	this.hasEndpieces = false;
	this.endpieceLength = 0;
}

function StreamDrain()
{
	this.drainWidth = 1.5;
	this.drainPieceLength = 4.0625;
	this.bodyGeo = streamDrainGeo;
	this.yOffset = 0.1;
	this.bodyLengthScale = 0.3305;
	this.bodyWidthScale = 0.695;
	this.coverMaterial = streamDrainMaterial;
	this.polishedMaterial = streamDrainMaterial;
	this.hasEndpieces = false;
	this.endpieceLength = 0;
}

function TileinDrain()
{
	this.drainWidth = 1.5;
	this.drainPieceLength = 1.5;
	this.bodyGeo = horizontalDrainGeo;
	this.yOffset = 0.04;
	this.bodyLengthScale = 0.252;
	this.bodyWidthScale = 0.71;
	this.coverMaterial = cosmoDrainMaterial;
	this.polishedMaterial = cosmoDrainMaterial;
	this.hasEndpieces = false;
	this.endpieceLength = 0;
}

function VerticalDrain()
{
	this.drainWidth = 1.5;
	this.drainPieceLength = 0.5;
	this.bodyGeo = horizontalDrainGeo;
	this.yOffset = 0.1;
	this.bodyLengthScale = 0.252;
	this.bodyWidthScale = 0.71;
	this.coverMaterial = verticalDrainMaterial;
	this.polishedMaterial = verticalPolishedMaterial;
	this.hasEndpieces = false;
	this.endpieceLength = 0;
}