var showerWallUV = [
	new THREE.Vector2(0, 0),
	new THREE.Vector2(0, 1),
	new THREE.Vector2(1, 1),
	new THREE.Vector2(1, 0)
];

var showerFloorUV = [
	new THREE.Vector2(0, 0),
	new THREE.Vector2(0, 1),
	new THREE.Vector2(1, 1),
	new THREE.Vector2(1, 0),
	new THREE.Vector2(1, 1)
];

var showerWallUVMap = [];

showerWallUVMap[0] = [showerWallUV[0], showerWallUV[2], showerWallUV[1]];
showerWallUVMap[1] = [showerWallUV[2], showerWallUV[0], showerWallUV[3]];


var showerFloorUVMap = [];
showerFloorUVMap[0] = [showerFloorUV[0], showerFloorUV[3], showerFloorUV[1]];
showerFloorUVMap[1] = [showerFloorUV[3], showerFloorUV[2], showerFloorUV[1]];
showerFloorUVMap[2] = [showerFloorUV[2], showerFloorUV[3], showerFloorUV[4]];


