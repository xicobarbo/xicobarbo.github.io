var MESSAGE_WINDOW_ID="messageWindow";var PROGRESS_METER_ID="progressMeterWindow";var PROGRESS_METER_ACTIVE_CELLS=20;var PROGRESS_METER_CELLS=70;var PROGRESS_METER_WAIT=40;var progressMeterCellIndex=PROGRESS_METER_CELLS;var progressMeterColor=null;var progressMeterRunning=false;
function closeMessageWindow(windowId){divId=MESSAGE_WINDOW_ID;if(windowId)divId=windowId;var divToClose=document.getElementById(divId);if(divToClose==null&&divId!=PROGRESS_METER_ID)divToClose=document.getElementById(MESSAGE_WINDOW_ID);if(divToClose!=null){$("#"+divId).stop(false,false).stop(false,false);$("#"+divId).animate({opacity:1});divToClose.style.width=0;divToClose.style.display="none"}if(document.forms[0]!=null)setDefaultFocus(document.forms[0]);if(progressMeterRunning){progressMeterRunning=
false;setDetailButtonSet()}}function fadeHex(startColor,endColor,ratio){var r=startColor>>16;var g=startColor>>8&255;var b=startColor&255;r+=((endColor>>16)-r)*ratio;g+=((endColor>>8&255)-g)*ratio;b+=((endColor&255)-b)*ratio;return"#"+(r<<16|g<<8|b).toString(16).pad("0",6,true)}
function getMessageWindowHTML(messageText,error,extraInfo,extraInfoHeight,width){var icon='<i class="fa fa-check fa-4x" style="color:#6dad69"/>';if(error)icon='<i class="fa fa-times fa-4x" style="color:#cb2428"/>';var html=getCommonMessageBoxHTML(icon,error?"errorMessageH1":"messageBoxH1",messageText,extraInfo);var buttonResourceID="button.ok";var buttonIcon=getButtonFontIconHTML(buttonResourceID);html+="<tr>"+'<td colspan="2" align="center">'+'<button style="margin-left: 10px;" type="button" class="button" id="closeButton" tabindex="0" name="closeButton" onclick="closeMessageWindow();">'+
buttonIcon+'&nbsp;<span class="button-text">'+grabResource(buttonResourceID)+"</span></button>"+"</td>"+"</tr>"+"</table>";return html}
function getCommonMessageBoxHTML(icon,headerBarStyle,messageText,extraInfo){var html='<table width="100%" cellpadding="4" cellspacing="0" border="0">'+'<tr><td colspan="2" style="padding: 0px;"> <h1 class="'+headerBarStyle+'"></h1> </td></tr>'+"<tr>"+'<td colspan="2">'+'<img src="images/spacer.gif" height="5" alt=" ">'+"</td>"+"</tr>"+'<tr valign="middle"  >'+'<td width="1" valign="top" style="padding-left:15px">'+icon+"</td>"+'<td width="*" valign="middle">'+'<div tabindex="0" class="messageText">'+
messageText+"</div>"+"</td>"+"</tr>"+"<tr>"+'<td colspan="2">'+'<img src="images/spacer.gif" height="5" alt=" ">'+"</td>"+"</tr>";if(extraInfo!=null)html+="<tr>"+'<td colspan="2">'+'<hr class="horizontalRule messageRule">'+"</td>"+"</tr>"+"<tr>"+'<td colspan="2"  align="center"><textarea class="messageExtraInfo" rows="10" readonly>'+extraInfo+"</textarea></td>"+"</tr>"+"<tr>"+'<td colspan="2"><img src="images/spacer.gif" height="5" alt=" "></td>'+"</tr>";return html}
function getProgressMeterCell(index){var indexToGet=progressMeterCellIndex+index;if(indexToGet>PROGRESS_METER_CELLS)indexToGet=indexToGet-PROGRESS_METER_CELLS;return document.getElementById("meterCell"+indexToGet)}
function getProgressMeterHTML(messageText){var progressMessage=messageText;if(progressMessage==null)progressMessage=grabResource("message.progressMeter.defaultMessage");var html='<div id="progressMessage" class="messageText c3Color" style="padding-top:10px; text-align: center">'+progressMessage+"</div>"+'<div style="padding-bottom: 10px; padding-top: 15px;" >'+"<center>"+'<table border="0" cellpadding="0" cellspacing="0">'+"<tr>";for(var i=1;i<=PROGRESS_METER_CELLS;i++){var borderStyle="border-top: solid black 1px; border-bottom: solid black 1px";
if(i==1)borderStyle+="; border-left: solid black 1px;";else if(i==PROGRESS_METER_CELLS)borderStyle+="; border-right: solid black 1px;";html+='<td id="meterCell'+i+'" style="'+borderStyle+'"><img src="images/spacer.gif" height="15" width="4" alt=" "></td>'}html+="</tr>"+"</table>"+"</center>"+"</div>";return html}
function getPromptWindowHTML(messageText,icon,width,button1Label,button1Action,button2Label,button2Action,button3Label,button3Action,extraInfo){var html=getCommonMessageBoxHTML(icon,"warningMessageH1",messageText,extraInfo);html+="<tr>"+'<td colspan="2" align="center">'+'<table border="0" cellpadding="0" cellspacing="0">'+"<tr>";if(button1Action==null)button1Action="";var button1Icon=getButtonFontIconHTML(button1Label);html+="<td>"+'<button type="button" class="button" id="msgbutton1" tabindex="0" name="closeButton" onclick="closeMessageWindow(\'promptWindow\');EmbeddedPopup.popupManager.closeCover();'+
button1Action+'">'+button1Icon+'&nbsp;<span class="button-text">'+grabResource(button1Label)+"</span></button>"+"</td>";if(button2Label!=null){var button2Icon=getButtonFontIconHTML(button2Label);if(button2Action==null)button2Action="";html+="<td>"+'<img src="images/spacer.gif" width="2" alt=" ">'+"</td>"+"<td>"+'<button type="button" class="button" tabindex="1" name="closeButton" onclick="closeMessageWindow(\'promptWindow\');EmbeddedPopup.popupManager.closeCover();'+button2Action+'">'+button2Icon+
'&nbsp;<span class="button-text">'+grabResource(button2Label)+"</span></button>"+"</td>"}if(button3Label!=null){var button3Icon=getButtonFontIconHTML(button3Label);if(button3Action==null)button3Action="";html+="<td>"+'<img src="images/spacer.gif" width="2" alt=" ">'+"</td>"+"<td>"+'<button type="button" class="button" tabindex="2" name="closeButton" onclick="closeMessageWindow(\'promptWindow\');EmbeddedPopup.popupManager.closeCover();'+button3Action+'">'+button3Icon+'&nbsp;<span class="button-text">'+
grabResource(button3Label)+"</span></button>"+"</td>"}html+="</tr>"+"</table>"+"</td>"+"</tr>"+"</table>";return html}
function getButtonFontIconHTML(buttonLabel){var buttonFontIconHTML="";if(buttonLabel==="button.yes")buttonFontIconHTML='<i class="fa fa-thumbs-o-up fa-lg"></i>';else if(buttonLabel==="button.ok")buttonFontIconHTML='<i class="fa fa-check-square-o fa-lg"></i>';else if(buttonLabel==="button.no")buttonFontIconHTML='<i class="fa fa-thumbs-o-down fa-lg"></i>';else if(buttonLabel==="button.cancel")buttonFontIconHTML='<i class="fa fa-close fa-lg"></i>';else if(buttonLabel==="button.continue")buttonFontIconHTML=
'<i class="fa fa-caret-square-o-right fa-lg"></i>';else if(buttonLabel==="button.save")buttonFontIconHTML='<i class="fa fa-save fa-lg"></i>';return buttonFontIconHTML}
function getWindowDiv(extraInfo,width,top,backgroundStyle,windowId){if(extraInfo!=null)width=width+50;var divId=MESSAGE_WINDOW_ID;if(windowId)divId=windowId;closeMessageWindow(divId);var windowWidth=getWindowWidth();if(width>windowWidth-50)width=windowWidth-50;var div=document.getElementById(divId);if(div==null){div=document.createElement("DIV");div.id=divId;document.body.appendChild(div)}if(backgroundStyle==null)backgroundStyle="";div.className="messageBox "+backgroundStyle;div.style.display="block";
div.style.width=""+width+"px";div.style.zIndex=1E6;div.style.position="absolute";if(document.forms[0]!=null){div.style.top=top+$(document.forms[0]).scrollTop()+"px";div.style.left=parseInt(windowWidth)/2+parseInt($(document.forms[0]).scrollLeft())-parseInt(width)/2+"px"}else{div.style.top=top+"px";div.style.left=parseInt(windowWidth)/2-parseInt(width)/2+"px"}return div}
function incrementProgressMeter(){var lastCell=getProgressMeterCell(0);if(lastCell!=null){lastCell.style.backgroundColor="#FFFFFF";progressMeterCellIndex++;if(progressMeterCellIndex>PROGRESS_METER_CELLS)progressMeterCellIndex=1;for(var i=0;i<PROGRESS_METER_ACTIVE_CELLS;i++){var fadeRatio=1-i/PROGRESS_METER_ACTIVE_CELLS;getProgressMeterCell(i).style.backgroundColor=fadeHex(progressMeterColor,16777215,fadeRatio)}if(progressMeterRunning)window.setTimeout(function(){incrementProgressMeter()},PROGRESS_METER_WAIT)}}
function isErrorPopup(){var isErrorPopup=false;var messageWindow=$("#"+MESSAGE_WINDOW_ID+"[class*='errorBackground']");if(messageWindow&&messageWindow.css("display")=="block")isErrorPopup=true;return isErrorPopup}
function rgbConvert(str){str=str.replace(/rgb\(|\)/g,"").split(",");str[0]=parseInt(str[0],10).toString(16).toLowerCase();str[1]=parseInt(str[1],10).toString(16).toLowerCase();str[2]=parseInt(str[2],10).toString(16).toLowerCase();str[0]=str[0].length==1?"0"+str[0]:str[0];str[1]=str[1].length==1?"0"+str[1]:str[1];str[2]=str[2].length==1?"0"+str[2]:str[2];return"0x"+str.join("")}
function setDetailButtonSet(){var saveButton=$("button[name='saveButton']");if(saveButton&&!progressMeterRunning)saveButton.prop("disabled",false);else saveButton.prop("disabled",true);var cancelButton=$("button[name='closeButton']");if(cancelButton&&!progressMeterRunning)cancelButton.prop("disabled",false);else cancelButton.prop("disabled",true)}
function showAlertWindow(messageText,isPopup,width,button1Label,button1Action,button2Label,button2Action,button3Label,button3Action){showPromptWindowExt(messageText,"alertBackground",'<i class="fa fa-exclamation-triangle fa-4x warningColor" />',isPopup,width,button1Label,button1Action,button2Label,button2Action,button3Label,button3Action)}
function showMessageWindow(messageText,error,isPopup,width,extraInfo,extraInfoHeight){var top=50;if(isPopup)top=25;var div=getWindowDiv(extraInfo,width,top,error?"errorBackground":"successBackground");div.innerHTML=getMessageWindowHTML(messageText,error,extraInfo,extraInfoHeight,width);$("button[name='closeButton']").blur();setTimeout(function(){$("div.messageText").focus()},0);$("html, body").scrollTop($(div).offset().top)}
function showPlainMessageWindow(messageText,isPopup,width,button1Label,button1Action,button2Label,button2Action,button3Label,button3Action){showPromptWindowExt(messageText,"","",isPopup,width,button1Label,button1Action,button2Label,button2Action,button3Label,button3Action)}
function showPromptWindow(messageText,isPopup,width,button1Label,button1Action,button2Label,button2Action,button3Label,button3Action,extraInfo){showPromptWindowExt(messageText,"alertBackground",'<i class="fa fa-question-circle fa-4x warningColor" />',isPopup,width,button1Label,button1Action,button2Label,button2Action,button3Label,button3Action,extraInfo)}
function showPromptWindowExt(messageText,background,image,isPopup,width,button1Label,button1Action,button2Label,button2Action,button3Label,button3Action,extraInfo){var windowScrollY=$(window).scrollTop();if(width==null)width=324;var top=175;if(isPopup)top=75;EmbeddedPopup.popupManager.openCover();var div=getWindowDiv(extraInfo,width,top,background);if(div!=null){div.innerHTML=getPromptWindowHTML(messageText,image,width,button1Label,button1Action,button2Label,button2Action,button3Label,button3Action,
extraInfo);document.getElementById("msgbutton1").focus()}else;$(window).scrollTop(windowScrollY);verticallyCenterDiv(div);$(window).scroll(function(){verticallyCenterDiv(div)})}
function startProgressMeter(messageText,isPopup){progressMeterColor=$("#c2colorRef").css("color");if(!isInternetExplorer())progressMeterColor=rgbConvert(progressMeterColor);else progressMeterColor="0x"+progressMeterColor.substring(1);var width=400;var top=50;if(isPopup)top=25;var div=getWindowDiv(null,width,top,null,PROGRESS_METER_ID);div.innerHTML=getProgressMeterHTML(messageText);progressMeterRunning=true;setDetailButtonSet();incrementProgressMeter()}
function stopProgressMeter(){closeMessageWindow(PROGRESS_METER_ID)}function verticallyCenterDiv(div){var windowScrollY=$(window).scrollTop();$(div).offset({left:$(div).offset().left,top:(getWindowHeight()-$(div).height())/2+windowScrollY})};