function getDrainBodyMatrix()
{
	if(currentProductLine != "walldrain")
	{
		if(currentDrainPlacement == "right")
			return getBodyRightTransformMatrix();
		if(currentDrainPlacement == "back")
			return getBodyBackTransformMatrix();
		if(currentDrainPlacement == "centerHoriz")
			return getBodyCenterHorizTransformMatrix();
		if(currentDrainPlacement == "front")
			return getBodyFrontTransformMatrix();
		if(currentDrainPlacement == "left")
			return getBodyLeftTransformMatrix();
		if(currentDrainPlacement == "center")
			return getBodyCenterTransformMatrix();
		if(currentDrainPlacement == "neoAngle")
			return getBodyNeoTransformMatrix();
	}
	else
	{
		if(currentDrainPlacement == "back")
			return getWalldrainBackTransformMatrix();
		if(currentDrainPlacement == "right")
			return getWalldrainRightTransformMatrix();
		if(currentDrainPlacement == "front")
			return getWalldrainFrontTransformMatrix();
		if(currentDrainPlacement == "left")
			return getWalldrainLeftTransformMatrix();
	}
	return new THREE.Matrix4();
}

function getDrainCoverMatrix()
{
	if(currentProductLine != "walldrain")
	{
		if(currentDrainPlacement == "right")
			return getCoverRightTransformMatrix();
		if(currentDrainPlacement == "back")
			return getCoverBackTransformMatrix();
		if(currentDrainPlacement == "centerHoriz")
			return getCoverCenterHorizTransformMatrix();
		if(currentDrainPlacement == "front")
			return getCoverFrontTransformMatrix();
		if(currentDrainPlacement == "left")
			return getCoverLeftTransformMatrix();
		if(currentDrainPlacement == "center")
			return getCoverCenterTransformMatrix();
		if(currentDrainPlacement == "neoAngle")
			return getCoverNeoTransformMatrix();
	}

	return new THREE.Matrix4();
}

function getEndpieceMatrix(endpiece)
{
	if(currentProductLine != "walldrain")
	{
		if(currentDrainPlacement == "right")
			return getEndpieceRightTransformMatrix(endpiece);
		if(currentDrainPlacement == "back")
			return getEndpieceBackTransformMatrix(endpiece);
		if(currentDrainPlacement == "centerHoriz")
			return getEndpieceCenterHorizTransformMatrix(endpiece);
		if(currentDrainPlacement == "front")
			return getEndpieceFrontTransformMatrix(endpiece);
		if(currentDrainPlacement == "left")
			return getEndpieceLeftTransformMatrix(endpiece);
		if(currentDrainPlacement == "center")
			return getEndpieceCenterTransformMatrix(endpiece);
		if(currentDrainPlacement == "neoAngle")
			return getEndpieceNeoTransformMatrix(endpiece);
	}
	
	return new THREE.Matrix4();
}


//"right" drain placement
function getBodyRightTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentDrainLength / 2, currentDrainClass.yOffset, currentDrainClass.drainWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainClass.bodyLengthScale * currentDrainLength,1, currentDrainClass.drainWidth * currentDrainClass.bodyWidthScale);
	matrix.multiplyMatrices(translationMatrix, scaleMatrix);
	return matrix;
}

function getCoverRightTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentDrainLength / 2, currentDrainClass.yOffset, currentDrainClass.drainWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength - (currentDrainClass.endpieceLength * 2), 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(translationMatrix, scaleMatrix);
	return matrix;
}

function getEndpieceRightTransformMatrix(endpiece)
{
	if(endpiece == 1)
		xFactor = currentDrainClass.endpieceLength / 2;
	else
		xFactor = currentDrainLength - currentDrainClass.endpieceLength / 2;
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(xFactor, currentDrainClass.yOffset, currentDrainClass.drainWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainClass.endpieceLength, 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(translationMatrix, scaleMatrix);
	return matrix;
}

//"back" drain placement
function getBodyBackTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(-currentDrainLength / 2, currentDrainClass.yOffset, currentDrainClass.drainWidth / 2);
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainClass.bodyLengthScale * currentDrainLength, 1, 1);
	matrix.multiplyMatrices(rotationMatrix, translationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}

function getCoverBackTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(-currentDrainLength / 2, currentDrainClass.yOffset, currentDrainClass.drainWidth / 2);
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength - (currentDrainClass.endpieceLength * 2), 1, currentDrainClass.drainWidth);
	
	matrix.multiplyMatrices(rotationMatrix, translationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}

function getEndpieceBackTransformMatrix(endpiece)
{
	if(endpiece == 1)
		xFactor = currentDrainClass.endpieceLength / 2;
	else 
		xFactor = currentDrainLength - currentDrainClass.endpieceLength / 2;
	
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(-currentDrainClass.drainWidth / 2, currentDrainClass.yOffset, -xFactor);
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainClass.drainWidth, 1, currentDrainClass.endpieceLength);
	matrix.multiplyMatrices(rotationMatrix, translationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}

//"centerHoriz" placement
function getBodyCenterHorizTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);
	var translationMatrix = new THREE.Matrix4().makeTranslation(-currentShowerLength / 2, currentDrainClass.yOffset, currentShowerWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength * currentDrainClass.bodyLengthScale, 1, 1);
	matrix.multiplyMatrices(rotationMatrix, translationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}

function getCoverCenterHorizTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);
	var translationMatrix = new THREE.Matrix4().makeTranslation(-currentShowerLength / 2, currentDrainClass.yOffset, currentShowerWidth /2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength - (currentDrainClass.endpieceLength * 2), 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(rotationMatrix, translationMatrix)
	matrix.multiply(scaleMatrix);
	return matrix;
}

function getEndpieceCenterHorizTransformMatrix(endpiece)
{
	if(endpiece == 1)
		xFactor = currentDrainClass.endpieceLength / 2;
	else 
		xFactor = currentDrainLength - currentDrainClass.endpieceLength / 2;
	var matrix = new THREE.Matrix4();
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);
	var translationMatrix = new THREE.Matrix4().makeTranslation(-xFactor, currentDrainClass.yOffset, currentShowerWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainClass.endpieceLength, 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(rotationMatrix, translationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}

//"front" placement
function getBodyFrontTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI/2);
	var translationMatrix = new THREE.Matrix4().makeTranslation(-currentDrainLength / 2, currentDrainClass.yOffset, currentShowerWidth - currentDrainClass.drainWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength * currentDrainClass.bodyLengthScale, 1,1 );
	matrix.multiplyMatrices(rotationMatrix, translationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}
function getCoverFrontTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);
	var translationMatrix = new THREE.Matrix4().makeTranslation(-currentDrainLength / 2, currentDrainClass.yOffset, currentShowerWidth - currentDrainClass.drainWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength - (currentDrainClass.endpieceLength * 2), 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(rotationMatrix, translationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}
function getEndpieceFrontTransformMatrix(endpiece)
{
	if(endpiece == 1)
		xFactor = currentDrainClass.endpieceLength / 2;
	else 
		xFactor = currentDrainLength - currentDrainClass.endpieceLength / 2;
	var matrix = new THREE.Matrix4();
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);
	var translationMatrix = new THREE.Matrix4().makeTranslation(-xFactor, currentDrainClass.yOffset, currentShowerWidth - currentDrainClass.drainWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainClass.endpieceLength, 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(rotationMatrix, translationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}

//"left" placement
function getBodyLeftTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentDrainLength / 2, currentDrainClass.yOffset, currentShowerLength - currentDrainClass.drainWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength * currentDrainClass.bodyLengthScale,1, currentDrainClass.bodyWidthScale * currentDrainClass.drainWidth);
	matrix.multiplyMatrices(translationMatrix, scaleMatrix);
	return matrix;
}
function getCoverLeftTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentDrainLength / 2, currentDrainClass.yOffset, currentShowerLength - currentDrainClass.drainWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength - (currentDrainClass.endpieceLength * 2), 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(translationMatrix, scaleMatrix);
	return matrix;
}
function getEndpieceLeftTransformMatrix(endpiece)
{
	if(endpiece == 1)
		xFactor = currentDrainClass.endpieceLength / 2;
	else 
		xFactor = currentDrainLength - currentDrainClass.endpieceLength / 2;
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(xFactor, currentDrainClass.yOffset, currentShowerLength - currentDrainClass.drainWidth / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainClass.endpieceLength,1,currentDrainClass.drainWidth);
	matrix.multiplyMatrices(translationMatrix, scaleMatrix);
	return matrix;
}

//"center" placement
function getBodyCenterTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentShowerWidth / 2, currentDrainClass.yOffset, currentShowerLength / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength * currentDrainClass.bodyLengthScale,1, currentDrainClass.drainWidth * currentDrainClass.bodyWidthScale);
	matrix.multiplyMatrices(translationMatrix, scaleMatrix);
	return matrix;
}
function getCoverCenterTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentShowerWidth / 2, currentDrainClass.yOffset, currentShowerLength / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentShowerWidth - (currentDrainClass.endpieceLength * 2), 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(translationMatrix, scaleMatrix);
	return matrix;
}
function getEndpieceCenterTransformMatrix(endpiece)
{
	if(endpiece == 1)
		xFactor = currentDrainClass.endpieceLength / 2;
	else 
		xFactor = currentDrainLength - currentDrainClass.endpieceLength / 2;
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(xFactor, currentDrainClass.yOffset, currentShowerLength / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainClass.endpieceLength, 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(translationMatrix, scaleMatrix);
	return matrix;
}

//"neoAngle" placement
function getBodyNeoTransformMatrix()
{
	neoOpening = openingIncrement * currentNeoOpeningWidth;
	widthCorrectionFactor = (currentDrainClass.drainWidth / 2) * openingIncrement;
	var matrix = new THREE.Matrix4();
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 4);
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentShowerWidth - (neoOpening / 2) - widthCorrectionFactor, currentDrainClass.yOffset, currentShowerLength - (neoOpening / 2) - widthCorrectionFactor);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentNeoOpeningWidth * currentDrainClass.bodyLengthScale, 1, currentDrainClass.drainWidth * currentDrainClass.bodyWidthScale);
	matrix.multiplyMatrices(translationMatrix, rotationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}
function getCoverNeoTransformMatrix()
{
	neoOpening = openingIncrement * currentNeoOpeningWidth;
	widthCorrectionFactor = (currentDrainClass.drainWidth / 2) * openingIncrement;
	var matrix = new THREE.Matrix4();
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 4);
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentShowerWidth - (neoOpening / 2) - widthCorrectionFactor, currentDrainClass.yOffset, currentShowerLength - (neoOpening / 2) - widthCorrectionFactor);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentNeoOpeningWidth - (currentDrainClass.endpieceLength * 2), 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(translationMatrix, rotationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}
function getEndpieceNeoTransformMatrix(endpiece)
{
	neoOpening = openingIncrement * currentNeoOpeningWidth;
	widthCorrectionFactor = (currentDrainClass.drainWidth / 2) * openingIncrement;
	if(endpiece == 1)
		xFactor = 0;
	else 
		xFactor = (currentDrainLength - currentDrainClass.endpieceLength) * openingIncrement;
	var matrix = new THREE.Matrix4();
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 4);
//	var translationMatrix = new THREE.Matrix4().makeTranslation(0, currentDrainClass.yOffset, 0);
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentShowerWidth - neoOpening -(openingIncrement * currentDrainClass.drainWidth / 2) + (openingIncrement * currentDrainClass.endpieceLength / 2) + xFactor, currentDrainClass.yOffset, currentShowerLength - (openingIncrement * currentDrainClass.drainWidth / 2) - (openingIncrement * currentDrainClass.endpieceLength / 2) - xFactor);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainClass.endpieceLength, 1, currentDrainClass.drainWidth);
	matrix.multiplyMatrices(translationMatrix, rotationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}

//WALLDRAIN
//"back" placement
function getWalldrainBackTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentDrainClass.yOffset, currentDrainClass.drainWidth / 2, currentShowerLength / 2);
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);
	rotationMatrix.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength * currentDrainClass.bodyLengthScale, 1, currentDrainClass.drainWidth * currentDrainClass.bodyWidthScale);
	matrix.multiplyMatrices(translationMatrix, rotationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}
function getWalldrainLeftTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentDrainLength / 2, currentDrainClass.drainWidth / 2, currentShowerLength - currentDrainClass.yOffset);
	var rotationMatrix = new THREE.Matrix4().makeRotationX(3 * Math.PI / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength * currentDrainClass.bodyLengthScale, 1, currentDrainClass.drainWidth * currentDrainClass.bodyWidthScale);
	matrix.multiplyMatrices(translationMatrix, rotationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}
function getWalldrainRightTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentShowerWidth / 2, currentDrainClass.drainWidth / 2, currentDrainClass.yOffset);
	var rotationMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 2);
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength * currentDrainClass.bodyLengthScale, 1, currentDrainClass.drainWidth * currentDrainClass.bodyWidthScale);
	matrix.multiplyMatrices(translationMatrix, rotationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}
function getWalldrainFrontTransformMatrix()
{
	var matrix = new THREE.Matrix4();
	var translationMatrix = new THREE.Matrix4().makeTranslation(currentShowerWidth - currentDrainClass.yOffset, currentDrainClass.drainWidth / 2, currentDrainLength / 2);
	var rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);
	rotationMatrix.multiply(new THREE.Matrix4().makeRotationX(3 * Math.PI / 2));
	var scaleMatrix = new THREE.Matrix4().makeScale(currentDrainLength * currentDrainClass.bodyLengthScale, 1, currentDrainClass.drainWidth * currentDrainClass.bodyWidthScale);
	matrix.multiplyMatrices(translationMatrix, rotationMatrix);
	matrix.multiply(scaleMatrix);
	return matrix;
}






