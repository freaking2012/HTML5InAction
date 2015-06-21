
  $(document).ready( function() {
	
	$("#addEditScreen").hide();
	$("#displayScreen").hide();
	$('#myModal').css({'position':'fixed','height':'100%','top': '30%'});
	$('#myModalDlt').css({'position':'fixed','height':'100%','top': '30%'});
	
	
	//Check if any newspaper is added
	if(localStorage.length==0)
	{
			$("#popUpMsg").text(" Add newspapers to the list using the Add button !! ");		
			$("#closeDelete").text("Close");
			$("#deleteItems").hide();		
			$("#myModal").modal();
	}
	
//selectScreen Code starts//	
var d = new Date();
var weekday = new Array(7);
weekday[0]=  "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";
if(d.getDay()<=5)
var day = d.getDay()+1;
else
var day = 0;


var n = weekday[d.getDay()];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
var fullDate = new Date();
var month = monthNames[fullDate.getMonth()];
var twoDigitDate = fullDate.getDate()+1+"";if(twoDigitDate.length==1) twoDigitDate="0" +twoDigitDate;
var currentDate = weekday[day]+" "+twoDigitDate + "/" + month + "/" + fullDate.getFullYear();console.log(currentDate);

$(".currentDate").text(currentDate);
	

  if (typeof(Storage) != "undefined") {  
  
	
	
    for(var i=0;i<localStorage.length;i++)
	{
	var str=localStorage.getItem(localStorage.key(i)).split("|");	
	var todaysDay = new Date().getDay();
	if(todaysDay<=5)
	todaysDay++;
	else
	todaysDay=0;
	var newItem = '<li class="list-group-item selectItemList" id = listId_'+ localStorage.key(i) +' ><span id=itemId_'+localStorage.key(i)+'> '+str[0]+'</span><span class="label label-default" style="float:right; font-size:15px"  id =priceId_'+ localStorage.key(i) +'  >'+str[todaysDay+1]+'</span></li>';	
	
	$('#listGroup').append(newItem);		
	}
} else {
    alert("Sorry, your browser does not support Web Storage...");
}
  
  
  
  $('.list-group.checked-list-box .selectItemList').each(makeList);  
  $.mobile.loading().hide();  
});

function makeList() {
        
        // Settings
         var $widget = $(this),
            $checkbox = $('<input type="checkbox"  hidden/>'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };
            
        $widget.css('cursor', 'pointer');
		$widget.find('input[type=checkbox]').remove();
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
			
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });
          

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');
			
            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
				$('#btnSelected').removeAttr('disabled');
            } else {
                $widget.removeClass(style + color + ' active');
				
				var count=0;
				$('input[type=checkbox]').each(function (idx,chk)
				{
					if($(chk).is(':checked'))
					count++;
				});
				if(count==0)
				$('#btnSelected').prop("disabled",true);
				
            }
        }

        // Initialization
        function init() {
            
            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }
            
            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    }
   
    





	
	
	


	$("#btnEdit").click(function(){
	
		var count=0;
		//document.write($widget);
		$('input[type=checkbox]').each(function (idx,chk)
		{
			if($(chk).is(':checked'))
			{
			
			count++;
			}
			
			
		});
		
		if(count==0)
		{
			$("#popUpMsg").text("Hey! You did not select any newspaper to edit !!");				
			$("#myModal").modal();
			$("#closeDelete").text("Close");
			$("#deleteItems").hide();
		}
		else if(count>1)
		{
			$("#popUpMsg").text("Only one newspaper can be edited at a time. Please select one from the list.");				
			$("#myModal").modal();
			$("#closeDelete").text("Close");
			$("#deleteItems").hide();
		
		}
		else{
			$("#selectScreen").hide();
			$("#addEditScreen").show();
			$("#addBtnCancel").hide();
			$("#editBtnCancel").show();
			$("#btnAddMore").hide();
			$("#addBtnDone").hide();
			$("#editBtnDone").show();
			
			
			$("li.active").each(function(idx,li)
			{
				var id = $(li).attr('id');
				var idNum = id.split("_")[1];
				var itemStr;
				for(i=0;i<localStorage.length;i++)
				{
					
					if(localStorage.key(i)==idNum)
					{
					
						itemStr=localStorage.getItem(localStorage.key(i));
						//document.write(localStorage.getItem(localStorage.key(i)));
					}
				}
				
				$("#addScreenItemName").val(itemStr.split('|')[0]);
				$("#day0Price").val(itemStr.split('|')[1]);
				$("#day1Price").val(itemStr.split('|')[2]);
				$("#day2Price").val(itemStr.split('|')[3]);
				$("#day3Price").val(itemStr.split('|')[4]);
				$("#day4Price").val(itemStr.split('|')[5]);
				$("#day5Price").val(itemStr.split('|')[6]);
				$("#day6Price").val(itemStr.split('|')[7]);
				$("#addScreenItemName").select();
				
			});
			
		}
	
	});
	
	$("#btnAdd").click(
	
	function(){	
	$("#selectScreen").hide();
	
	$("#addEditScreen").show();
	$("#editBtnCancel").hide();
	$("#addBtnCancel").show();
	$("#addBtnDone").show();
	$("#editBtnDone").hide();
	$("#btnAddMore").show();
	
	});
	
	$("#btnDelete").click(
	
		function(){
		//localStorage.clear();
		var count=0;
		//document.write($widget);
		$('input[type=checkbox]').each(function (idx,chk)
		{
			if($(chk).is(':checked'))
			count++;
		});
		
		
		
		if(count>0)
		{
		$("#popUpMsg").text("Do you really want to delete selected NewsPapers?? ");		
		$("#myModal").modal();
		$("#deleteItems").show();
		$("#deleteItems").text("Oh Yes!!");
		$("#closeDelete").text("I am Consfused!!");
		}
		else
		{
			$("#popUpMsg").text("Hey! You did not select any newspaper !!");
			$("#myModal").modal();
			$("#closeDelete").text("Close");
			$("#deleteItems").hide();
		}
		
		
		}
	);
	
	$("#deleteItems").click(function()
	{
		$("li.active").each(function(idx,li)
		{
			var listIdStr=$(li).attr('id').split("_");			
			
			localStorage.removeItem(listIdStr[1]);
			$(li).remove();
			
			
		});
		$(this).makeList;
		$("#popUpMsgDlt").text("NewsPapers deleted successfully.");
			$("#myModalDlt").modal();
			
	});
	
	
	//selectScreen Code ends//	
	
	//addEditScreen Code starts
	$(".addScreenPrice").blur(function(){
	
		if($(this).val()=='')
		{
			$("#popUpMsg").text('Invalid Price entered !!');
			$("#myModal").modal();
			$("#closeDelete").text("Close");
			$("#deleteItems").hide();
		}
		else
		{
			$(this).val(parseFloat($(this).val()).toFixed(2))
		}
	
	
	});
	
	
	
	$(".addEditNewspaper#addBtnDone,.addEditNewspaper#btnAddMore").click(function(){
		
		if($("#addScreenItemName").val()!='')
		{
		var nextId = localStorage.length+1;
		var itemStr;
		var flag=false;
		var todaysPrice = "#day"+new Date().getDay()+"Price";
				for(i=0;i<localStorage.length;i++)
				{
					var itemStr = localStorage.getItem(localStorage.key(i));
					if($("#addScreenItemName").val()==itemStr.split('|')[0])
					{	nextId = localStorage.key(i);					
						flag=true;
						break;
					}
				}
		
		if(flag==true)
		{
						
									
					$("#listId_"+nextId).text($("#addScreenItemName").val());					
					$("#priceId_"+nextId).text($(todaysPrice).val());
		
					
			
		}
		
		
		
		
		if(flag==false)
		{
			var newItem = '<li class="list-group-item" id = listId_'+ nextId +'><span id=itemId_'+nextId+'> '+$("#addScreenItemName").val()+'</span><span class="label label-default" style="float:right; font-size:15px" id =priceId_'+ nextId +'>'+$(todaysPrice).val()+'</span></li>';
			
			$('#listGroup').append(newItem);
		}
		$('.list-group.checked-list-box .list-group-item').each(makeList); 
		$("#listId_"+ nextId).addClass('list-group-item-info');
		
		
	
		if (typeof(Storage) != "undefined") {
    // Store
				
			
			localStorage.setItem(nextId,$("#addScreenItemName").val()+"|"+$("#day0Price").val()+"|"+$("#day1Price").val()+"|"+$("#day2Price").val()+"|"+$("#day3Price").val()+"|"+$("#day4Price").val()+"|"+$("#day5Price").val()+"|"+$("#day6Price").val());    
		}

				else {
				alert("Sorry, your browser does not support Web Storage...");
		}
		
		$(".addScreenPrice").val('');
		$("#addScreenItemName").val('');
		setTimeout(function(){
      $("#listId_"+ nextId).removeClass('list-group-item-info');}, 3000);
		
		if($(this).attr('id')=='addBtnDone')
		{
			
		$("#addEditScreen").hide();
		$("#selectScreen").show();
		}
		
			if(flag==true)
			{
				$("#popUpMsg").text("Newspaper edited successfully. Well Done!!");		
				$("#closeDelete").text("Close");
				$("#deleteItems").hide();		
				$("#myModal").modal();
			
			}
			else
			{
				$("#popUpMsg").text("Newspaper added successfully. Well Done!!");		
				$("#closeDelete").text("Close");
				$("#deleteItems").hide();		
				$("#myModal").modal();
			}
		}else{
			
			
			$("#popUpMsg").text("Hey, Newspaper name cannot be blank!! ");		
			$("#closeDelete").text("Close");
			$("#deleteItems").hide();		
			$("#myModal").modal();
		
		}
		
		
		
		
	
	});
	
	
	
	$(".addEditNewspaper#editBtnDone").click(function(){
		
		
		if($("#addScreenItemName").val()!='')
		{
		
		var itemStr;
		var nextId;
		var day=new Date().getDay();
		if(day<=5)
		day++;
		else if(day==6)
		day=0;
		var todaysPrice = "#day"+day+"Price";
				$("li.active").each(function(idx, li) {
				
					var items=$(li).attr('id').split("_");	
				
					nextId=items[1];
				
				});
								
					$("#itemId_"+nextId).text($("#addScreenItemName").val());					
					$("#priceId_"+nextId).text($(todaysPrice).val());
		
					
		
		$('.list-group.checked-list-box .list-group-item').each(makeList); 
		$("#listId_"+ nextId).addClass('list-group-item-info');
		
		$('input[type=checkbox]').each(function(idx,chk){
			if($(chk).is(':checked'))
			{
				alert("hey");
				$(chk).prop('checked',false);
			}
		});
	
		if (typeof(Storage) != "undefined") {
    // Store
				
			
			localStorage.setItem(nextId,$("#addScreenItemName").val()+"|"+$("#day0Price").val()+"|"+$("#day1Price").val()+"|"+$("#day2Price").val()+"|"+$("#day3Price").val()+"|"+$("#day4Price").val()+"|"+$("#day5Price").val()+"|"+$("#day6Price").val());    
		}

				else {
				alert("Sorry, your browser does not support Web Storage...");
		}
		
		$(".addScreenPrice").val('');
		$("#addScreenItemName").val('');
		setTimeout(function(){
      $("#listId_"+ nextId).removeClass('list-group-item-info');}, 3000);
		
		
			
		$("#addEditScreen").hide();
		$("#selectScreen").show();
		
		
			
				$("#popUpMsg").text("Newspaper edited successfully. Well Done!!");		
				$("#closeDelete").text("Close");
				$("#deleteItems").hide();		
				$("#myModal").modal();
			
			
		}else{
			
			
			$("#popUpMsg").text("Hey, Newspaper name cannot be blank!! ");		
			$("#closeDelete").text("Close");
			$("#deleteItems").hide();		
			$("#myModal").modal();
		
		}
		
		
		
		
	
	});
	
	
	
	
	
	$(".addEditNewspaper#addBtnCancel").click(function()
	{
		
		$(".addScreenPrice").val('');
		$("#addScreenItemName").val('');		
		$("#addEditScreen").hide();
		$("#selectScreen").show();
		
		$("#popUpMsg").text("Argh!! NewsPaper addition was cancelled !! ");		
		$("#closeDelete").text("Close");
		$("#deleteItems").hide();		
		$("#myModal").modal();
	
	
	});
	
	$(".addEditNewspaper#editBtnCancel").click(function()
	{
		
		$(".addScreenPrice").val('');
		$("#addScreenItemName").val('');		
		$("#addEditScreen").hide();
		$("#selectScreen").show();
		
		$("#popUpMsg").text(" NewsPaper details are same as before !! ");		
		$("#closeDelete").text("Close");
		$("#deleteItems").hide();		
		$("#myModal").modal();
	
	
	});
	//addEditScreen Code ends
	//displayScreen code starts
	var totalNewspapers=0;
$("#btnSelected").click(function()
	{
		$("#popUpMsg").text("NewsPapers have been selected successfully");
		$("#myModal").modal();
		$("#closeDelete").text("Close");
		$("#deleteItems").hide();
		$("#selectScreen").hide();		
		$("#displayScreen").show();
		
		$("li.active").each(function(idx,li){
		
			var itemsId = $(li).attr('id').split("_")[1];
			
			var newspaperName = $("#itemId_"+itemsId).text();
			var newspaperPrice = $("#priceId_"+itemsId).text();
			$("#displaylistGroup").append('<div class="row" ><div class="col-xs-6 newspaperList" style="padding-right:1px;" id=newspaperName_'+itemsId+'>'+newspaperName+'</div><div class="col-xs-3"  style="padding-left:1px; padding-right:1px; "><input type="number" class="form-control quantity"  style="padding:2px;"  id=quantity_'+itemsId+' placeholder="0"/></div><div class="col-xs-3" style="padding-right:15px;padding-left:0px;"><input type="number" class="form-control newspaperPrice"   style="padding:2px;margin-right:-5px;" value='+newspaperPrice+' id=newspaperPrice_'+itemsId+' placeholder="00.00"/></div></div>');
			totalNewspapers++;
		});
		
		
		
	});
	
	$("#btnCalculate").click(function(){
		
		var result=0;
		var flag=true;
		$(".newspaperList").each(function(idx,newspaper){
			
			var id = $(newspaper).attr('id').split('_')[1];
			
			var quantity = $("#quantity_"+id).val();
			var price = $("#newspaperPrice_"+id).val();
			if(quantity==''||price=='')
			{
				flag=false;
				
			}
		});
		if(flag==true)
		{
		
			
		$(".newspaperList").each(function(idx,newspaper){
			
			var id = $(newspaper).attr('id').split('_')[1];
			
			var quantity = $("#quantity_"+id).val();
			var price = $("#newspaperPrice_"+id).val();
			result = result + (price*quantity);
		});
		result = parseFloat(result).toFixed(2);
		$("#totalAmount").val(result);
		}
		else{
		
			$("#popUpMsg").text(" Quantity or Price is incorrect !! ");		
			$("#closeDelete").text("Close");
			$("#deleteItems").hide();		
			$("#myModal").modal();
		
		
		}
	
	});
	
	
	$("#btnBack").click(function(){
	
	
	$("#displaylistGroup").empty();
	
	$("#displayScreen").hide();
	$("#selectScreen").show();
	
	});
	
	
	
	
	
	
	
	
	//displayScreen code ends
