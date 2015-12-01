var configLoadedIn = null;

var selectedProductLine = "proline";
var selectedShowerLayout = "1wall";
var selectedAccessibility = "curbed";
var selectedWidth = 40;
var selectedLength = 40;
var selectedOpeningWidth = 10;
var selectedDrainPlacement = "back";
var selectedCoverPattern = "stream";
var selectedCoverFinish = "brushed";
var selectedWastelineConfig = '2"-down';
var selectedWaterproofing = "Topical Liquid Waterproofing";
var selectedKitOption = "Whole Shower Pan";
var selectedFormatOptions = ["revit", "autocad", "jpg"];

var selectedIsOppositeWalls = 0;

var currentDrainPlacementGroup = 1;

var widthSpinner = null;
var rendererXOffset = 0;
var rendererYOffset = 0;

$(document).ready(
	function()
	{
		adjustRendererElementOffset();
		$(".cjoVisualizerCell").mousedown(adjustRendererElementOffset());
		$(window).mousedown(adjustRendererElementOffset());
		
		
		$("#cjoZoomInButton").mousedown(
			function()
			{
				zoomingIn = true;
				zoomingOut = false;
			}
		);
		$("#cjoZoomOutButton").mousedown(
			function()
			{
				zoomingIn = false;
				zoomingOut = true;
			}
		);
		$(document).mouseup(
			function()
			{
				zoomingOut = false;
				zoomingIn = false;
			}
		);
		$(".cjoSwapFormsLink").click(
			function(ev)
			{
				ev.preventDefault();
				$(".cjoLoginForm").toggle();
				$(".cjoSignupForm").toggle();
			}
		);
		$(".cjoProductLineButtonInner").hover(
			function()
			{
				$(this).find(".cjoProductLineDropdown").show();
				$(this).addClass("cjoProductLineHighlighted");
			},
			function()
			{
				$(this).find(".cjoProductLineDropdown").hide();;
				$(this).removeClass("cjoProductLineHighlighted");
			}
		);
		
		$(".cjoDropdownMenu").click(
			function()
			{
				$(this).find(".cjoDropdownMenuDropdown").toggle();
			}
		);
		$(".cjoDropdownMenu").hover(
			function()
			{
				$(this).find(".cjoDropdownMenuDropdown").show();
			},
			function()
			{
				$(this).find(".cjoDropdownMenuDropdown").hide();
			}
		);
		$(".cjoDropdownMenuOption").click(
			function()
			{
				$(this).parent().siblings().filter(".cjoDropdownMenuChosen").text($(this).text());
			}
		);
		$(".cjoProductLineButtonInner").click(
			function()
			{
				selectProductLine($(this).data("productline"));
			}
		);
		$(".cjoFormatImage").click(
			function()
			{
				isSelected = parseInt($(this).data("selected"));
				if(isSelected == 0) $(this).attr("src", $(this).attr("src").replace("inactive", "active"));
				else $(this).attr("src", $(this).attr("src").replace("active", "inactive"));;
				$(this).data("selected", isSelected ^ 1);
				updateFormatOptions();
			}
		);
		
		$(".cjoAccessibilityButton").click(
			function()
			{
				selectAccessibility($(this).data("accessibility"));
			}
		);

		
		$("#cjoWidth").change(
			function()
			{
				selectWidth(parseInt($(this).val()));
			}
		);
		$("#cjoLength").change(
			function()
			{
				selectLength(parseInt($(this).val()));
			}
		);
		$("#cjoOpeningWidth").change(
			function()
			{
				selectOpeningWidth(parseInt($(this).val()));
			}
		);
		
		
		$(".cjoShowerLayoutButton").click(
			function()
			{
				selectShowerLayout($(this).data("showerlayout"));
			}
		);
		
		$(".cjoDrainPlacementOption").click(
			function()
			{
				if(!$(this).hasClass("cjoUnavailableOptionCell"))
				{
					selectDrainPlacement($(this));
				}
			}
		);

		$(".cjoCoverPatternOption").click(
			function()
			{
				visualSelectCoverPattern($(this).data("coverpattern"), $(this).data("coverfinish"));
				selectedCoverPattern = $(this).data("coverpattern");
			}
		);
		$(".cjoWaterproofingOption").click(
			function()
			{
				selectWaterproofing($(this).data("waterproofing"));
			}
		);
		$(".cjoKitOptionOption").click(
			function()
			{
				selectKitOption($(this).data("kitoption"));
			}
		);
		var scrollbar = document.getElementById("scrollbar1"), scrollbarTiny = tinyscrollbar(scrollbar);
		scrollbar.addEventListener("move", function()
		{
		}, false);
		var scrollbar = document.getElementById("scrollbar1")
		,   scrollbar  = tinyscrollbar(scrollbar)
		;
		var scrollbar2 = document.getElementById("scrollbar2"), scrollbarTiny2 = tinyscrollbar(scrollbar2);
		scrollbar2.addEventListener("move", function(){}, false);
		
	
		updateShowerModel(buildShowerObject());
		var testObject = buildConfigurationObject();
		var testy = 1;
	}
);

function adjustRendererElementOffset()
{
	rendererXOffset = $(".cjoVisualizerCell").offset().left;
	rendererYOffset = $(".cjoVisualizerCell").offset().top;
}
function buildConfigurationObject()
{
	config = {};
	config.productLine = selectedProductLine;
	config.showerLayout = selectedShowerLayout;
	config.accessibility = selectedAccessibility;
	config.width = selectedWidth;
	config.length = selectedLength;
	config.openingWidth = selectedOpeningWidth;
	config.drainLength = getDrainLength();
	config.drainPlacement = selectedDrainPlacement;
	config.coverPattern = selectedCoverPattern;
	config.drainCoverMaterial = selectedCoverFinish;
	config.sanitaryDiameter = selectedWastelineConfig;
	config.waterproofing = selectedWaterproofing;
	config.kitOption = selectedKitOption;
	config.configDataType = 1;
	if(configLoadedIn != null)
	{
		config.id = configLoadedIn.id;
	}
	//HOW DO WE GET THE USER ID?!
	config.manufacturerId = "e1a42ba5-c8f6-40d2-a1a7-323125e726db";
	config.modelName = "";
	config.category = "Drain";
	config.segment = "";
	config.description = "";
	config.previewImageHref = getScreenshot();
	config.exportRequest = getFormatOptionsForConfig();
	return config;
}
function buildShowerObject()
{
	var configuration = {productLine: selectedProductLine, showerLayout: selectedShowerLayout, oppositeWalls: selectedIsOppositeWalls, accessibility: selectedAccessibility, drainPlacement: selectedDrainPlacement, coverPattern: selectedCoverPattern, coverFinish: selectedCoverFinish, showerLength: selectedLength, showerWidth: selectedWidth, openingWidth: selectedOpeningWidth};
	return configuration;
}
function buildXML()
{
	var xmlstring = "<ARCApp>";
	xmlstring += "<Manufacturer>Quickdrain</Manufacturer>";
	xmlstring += "<Drain>";
	xmlstring += "<ProductLine>" + selectedProductLine + "</ProductLine>";
	xmlstring += "<ShowerLayout>" + selectedShowerLayout + "</ShowerLayout>";
	xmlstring += "<Accessibility>" + selectedAccessibility + "</Accessibility>";
	xmlstring += "<Width>" + selectedWidth + "</Width>";
	xmlstring += "<Length>" + selectedLength + "</Length>";
	xmlstring += "<OpeningWidth>" + selectedOpeningWidth + "</OpeningWidth>";
	xmlstring += "<DrainLength>" + getDrainLength() + "</DrainLength>";
	xmlstring += "<DrainPlacement>" + selectedDrainPlacement + "</DrainPlacement>";
	xmlstring += "<CoverPattern>" + selectedCoverPattern + "</CoverPattern>";
	xmlstring += "<DrainCoverMaterial>" + selectedCoverFinish + "</DrainCoverMaterial>";
	xmlstring += "<SanitaryDiameter>" + selectedWastelineConfig + "</SanitaryDiameter>";
	xmlstring += "<Waterproofing>" + selectedWaterproofing + "</Waterproofing>";
	xmlstring += "<KitOption>" + selectedKitOption + "</KitOption>";
	xmlstring += "</Drain>";
	xmlstring += "<RequestInfo><OutputFormats>";
	xmlstring += "</OutputFormats></RequestInfo>";
	xmlstring += "</ARCApp>";
	return xmlstring;
}
function getFormatOptionsForConfig()
{
	formatOptionsForConfig = [];
	for(var x = 0; x < selectedFormatOptions.length; x++)
	{
		formatOptionsForConfig.push(formatOptionsEnum[formatOptionsStrings.indexOf(selectedFormatOptions[x])]);
	}
	return formatOptionsForConfig;
}
function initializeChoices(config)
{
	if(config != null)
	{
		configLoadedIn = config;
		selectProductLine(config.productLine);
		selectShowerLayout(config.showerLayout);
		selectAccessibility(config.accessibility);
		selectWidth(config.width);
		selectLength(config.length);
		selectOpeningWidth(config.openingWidth);
		
		chosenDrainPlacementElement = $(".cjoDrainPlacementOption[data-drainplacement='" + config.drainPlacement + "']").not(".cjoUnavailableOptionCell");
		selectDrainPlacement(chosenDrainPlacementElement);
		
		visualSelectCoverPattern(config.coverPattern, config.drainCoverMaterial);
		selectWaterproofing(config.waterproofing);
		selectKitOption(config.kitOption);
	}
}

function visualSelectCoverPattern(coverPatternName, coverFinishName)
{
	$(".cjoCoverPatternOption").not(".cjoUnavailableOptionCell").each(
		function()
		{
			if($(this).data("coverpattern") == coverPatternName && $(this).data("coverfinish") == coverFinishName)
			{
				$(this).parent().find($(".cjoBorders")).removeClass("cjoAddBorders");
				$(this).find($(".cjoBorders")).addClass("cjoAddBorders");
			}
		}
	);
	selectedCoverFinish = coverFinishName;
	selectedCoverPattern = coverPatternName;
	updateShowerModel(buildShowerObject());
}
function resetDrainPlacementOptionSelected()
{
	var newDefaultDrainPlacement = $(".cjoDrainPlacementOption[data-group='" + currentDrainPlacementGroup + "']").not(".cjoUnavailableOptionCell").first();
	selectDrainPlacement(newDefaultDrainPlacement);

}
function resetCoverPatternScrollbar()
{
	var scrollbar2 = document.getElementById("scrollbar2"), scrollbarTiny2 = tinyscrollbar(scrollbar2);
		scrollbar2.addEventListener("move", function(){}, false);
}
function resetDrainPlacementScrollbar()
{
	var scrollbar = document.getElementById("scrollbar1"), scrollbarTiny = tinyscrollbar(scrollbar);
		scrollbar.addEventListener("move", function()
		{
		}, false);
}

function selectAccessibility(newAccessibility)
{
	var accessibilityElement = $(".cjoAccessibilityButton[data-accessibility='" + newAccessibility + "']");
	accessibilityElement.parent().find($(".cjoBorders")).removeClass("cjoAddBorders");
	accessibilityElement.find($(".cjoBorders")).addClass("cjoAddBorders");
	accessibilityElement.siblings().removeClass("cjoSelected");
	accessibilityElement.addClass("cjoSelected");
	selectedAccessibility = accessibilityElement.data("accessibility");
	
	if(selectedAccessibility == "curbless" && selectedProductLine != "walldrain")
	{
		$(".cjoCoverPatternOption").not(".cjoUnavailableOptionCell").each(
			function()
			{
				if(coverPatternsForCurbless.indexOf($(this).data("coverpattern")) == -1)
					$(this).hide();
			}
		);
		$(".cjoCoverPatternOption").filter(".cjoUnavailableOptionCell").each(
			function()
			{
				if(coverPatternsForCurbless.indexOf($(this).data("coverpattern")) == -1)
					$(this).show();
			}
		);
		if(coverPatternsForCurbless.indexOf(selectedCoverPattern) == -1)
		{
			window.alert("That cover pattern is not available for curbless showers");
			visualSelectCoverPattern(coverPatternsForCurbless[0]);
		}
	}
	else if(selectedAccessibility == "curbed" && selectedProductLine != "walldrain")
	{
		showAllCoverPatterns();
	}
	resetCoverPatternScrollbar();
	showAndHideDrainPlacementGroups();
	updateShowerModel(buildShowerObject());
}

function selectDrainPlacement(drainPlacementElement)
{
	drainPlacementElement.parent().find($(".cjoBorders")).removeClass("cjoAddBorders");
	drainPlacementElement.find($(".cjoBorders")).addClass("cjoAddBorders");
	drainPlacementElement.siblings().removeClass("cjoSelected");
	drainPlacementElement.addClass("cjoSelected");
	selectedDrainPlacement = drainPlacementElement.data("drainplacement");
	if(parseInt(drainPlacementElement.data("oppositewalls")) == 1)
		selectedIsOppositeWalls = 1;
	else selectedIsOppositeWalls = 0;
	updateShowerModel(buildShowerObject());
}
function selectKitOption(newKitOption)
{
	var kitOptionElement = $(".cjoKitOptionOption[data-kitoption='" + newKitOption + "']");
	selectedKitOption = kitOptionElement.data("kitoption");
	$(".cjoKitOptionChosen").text(kitOptionElement.text());
}
function selectProductLine(productLineChoice)
{
	var productLineElement = $(".cjoProductLineButtonInner[data-productline='" + productLineChoice + "']");
	productLineElement.parent().siblings().find(".cjoProductLineButtonInner").removeClass("cjoProductLineSelected");//deselect (un-highlight) all product line buttons
	$(".cjoProductLineLogo").each(
		function()
		{
			$(this).attr("src", $(this).attr("src").replace("BLACK", ""));
		}
	);
	productLineElement.addClass("cjoProductLineSelected");//highlight the selected product line button
	productLineElement.find(".cjoProductLineLogo").attr("src", productLineElement.find(".cjoProductLineLogo").attr("src").replace(".png", "BLACK.png"));
	selectedProductLine = productLineElement.data("productline");
	showAndHideDrainPlacementGroups();
	if(selectedProductLine == "walldrain")
	{
		$(".cjoCoverPatternOption").not(".cjoUnavailableOptionCell").each(
			function()
			{
				if(coverPatternsForWalldrain.indexOf($(this).data("coverpattern")) == -1)
					$(this).hide();
				else $(this).show();
			}
		);
		$(".cjoCoverPatternOption").filter(".cjoUnavailableOptionCell").each(
			function()
			{
				if(coverPatternsForWalldrain.indexOf($(this).data("coverpattern")) == -1)
					$(this).show();
				else $(this).hide();
			}
		);
		if(coverPatternsForWalldrain.indexOf(selectedCoverPattern))
		{
			window.alert("That cover pattern is not available with Walldrain");
			visualSelectCoverPattern(coverPatternsForWalldrain[0]);
		}
		if(selectedAccessibility == "curbless" && selectedShowerLayout == "neoAngle")
		{
			window.alert("Curbless is not available with the combination of Walldrain and NeoAngle");
			selectAccessibility("curbed");
		}
	}
	else
	{
		showAllCoverPatterns();
	}
	showOrHideCurbless();
	resetCoverPatternScrollbar();
	updateShowerModel(buildShowerObject());
	//window.alert(buildXML());
}
function selectWidth(newWidth)
{
	selectedWidth = newWidth;
	updateShowerModel(buildShowerObject());
}
function selectLength(newLength)
{
	selectedLength = newLength;
	updateShowerModel(buildShowerObject());
}
function selectOpeningWidth(newOpeningWidth)
{
	selectedOpeningWidth = newOpeningWidth;
	updateShowerModel(buildShowerObject());
}
function selectShowerLayout(newShowerLayout)
{
	var showerLayoutElement = $(".cjoShowerLayoutButton[data-showerlayout='" + newShowerLayout + "']")
	showerLayoutElement.parent().find($(".cjoBorders")).removeClass("cjoAddBorders");	
	showerLayoutElement.find($(".cjoBorders")).addClass("cjoAddBorders");			
	showerLayoutElement.siblings().find($(".cjoShowerLayoutButtonInner")).removeClass("cjoSelected");					
	showerLayoutElement.find($(".cjoShowerLayoutButtonInner")).addClass("cjoSelected");	
	selectedShowerLayout = showerLayoutElement.data("showerlayout");
	if(selectedShowerLayout == "neoAngle" && selectedAccessibility == "curbless" && selectedProductLine == "walldrain")
	{
		window.alert("Curbless is not available with NeoAngle and Walldrain");
		selectAccessibility("curbed");
	}
	showOrHideCurbless();
	showAndHideDrainPlacementGroups();
	updateShowerModel(buildShowerObject());
}
function selectWaterproofing(newWaterproofing)
{
	var waterproofingElement = $(".cjoWaterproofingOption[data-waterproofing='" + newWaterproofing + "']");
	selectedWaterproofing = waterproofingElement.data("waterproofing");
	$(".cjoWaterproofingChosen").text(waterproofingElement.text());
}
function showAllCoverPatterns()
{
	$(".cjoCoverPatternOption").not(".cjoUnavailableOptionCell").show();
	$(".cjoCoverPatternOption").filter(".cjoUnavailableOptionCell").hide();
}
function showAndHideDrainPlacementGroups()
{
	var productlineForTesting = selectedProductLine;
	if(selectedProductLine == "showerline")
		productlineForTesting = "proline";
	for(var x = 0; x < drainPlacementGroups.length; x++)
	{
		if(selectedAccessibility == drainPlacementGroups[x].accessibility && productlineForTesting == drainPlacementGroups[x].productLine && selectedShowerLayout == drainPlacementGroups[x].showerLayout)
		{
			var groupToShow = x + 1;
			currentDrainPlacementGroup = groupToShow;
			$(".cjoDrainPlacementOption").filter(".cjoDrainPlacementOption").each(function(){$(this).hide();});
			$(".cjoDrainPlacementOption").each(
				function()
				{
					if(parseInt($(this).data("group")) == groupToShow)
					{
						$(this).show();
					}
				}
			);
			$(".cjoUnavailableOptionCell").filter(".cjoDrainPlacementOption").each(function(){$(this).show();});
			$(".cjoUnavailableOptionCell").filter(".cjoDrainPlacementOption").each(
				function()
				{
					if(parseInt($(this).data("group")) == groupToShow)
						$(this).hide();
				}
			);
		}
	}
	resetDrainPlacementOptionSelected();
}
function showOrHideCurbless()
{
	if(selectedProductLine == "walldrain" && selectedShowerLayout == "neoAngle")
	{
		$(".cjoAccessibilityButton[data-accessibility='curbless']").hide();
	}
	else $(".cjoAccessibilityButton[data-accessibility='curbless']").show();
}
function updateFormatOptions()
{
	selectedFormatOptions = [];
	$(".cjoFormatImage").each(
		function()
		{
			if(parseInt($(this).data("selected")) == 1)
				selectedFormatOptions.push($(this).data("format"));
		}
	);
}