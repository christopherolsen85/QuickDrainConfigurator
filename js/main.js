


function initializeModel()
{
	
	currentShowerLength = $("#cjoShowerLength").val();
	currentShowerWidth = $("#cjoShowerWidth").val();
	currentShowerLayout = $("#cjoShowerLayout").val();
	currentNeoOpeningWidth = $("#cjoNeoOpeningWidth").val();
	currentAccessibility = $("#cjoAccessibility").val();
	currentCoverPattern = $("#cjoCoverPattern").val();
	currentMaterialName = $("#cjoCoverFinish").val();
	currentDrainPlacement = $("#cjoDrainPlacement").val();
	currentProductLine = $("#cjoProductLine").val();
	updateShower();
}

function updateShowerModel(config)
{
	previousDrainPlacement = currentDrainPlacement;
	
	var newShowerLength = config.showerLength;
	var newShowerWidth = config.showerWidth;
	var newShowerLayout = config.showerLayout;
	var newAccessibility = config.accessibility;
	var newCoverPattern = config.coverPattern;
	var newCoverFinish = config.coverFinish;
	var newProductLine = config.productLine;
	var newDrainPlacement = config.drainPlacement;
	var newOpeningWidth = config.openingWidth;
	
	
	
	currentShowerLength = parseInt(newShowerLength);
	currentShowerWidth = parseInt(newShowerWidth);
	currentNeoOpeningWidth = parseInt(newOpeningWidth);
	currentShowerLayout = newShowerLayout;
	currentAccessibility = newAccessibility;
	currentCoverPattern = newCoverPattern;
	currentMaterialName = newCoverFinish;
	currentDrainPlacement = newDrainPlacement;
	currentProductLine = newProductLine;
	currentIsOpposite = config.oppositeWalls;
	updateShower();
}










