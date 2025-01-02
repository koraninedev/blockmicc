/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/buttons_functions.js":
/*!*********************************!*\
  !*** ./js/buttons_functions.js ***!
  \*********************************/
/***/ (() => {

eval("/**\r\n * @license\r\n * Copyright 2020 Sébastien CANET\r\n * SPDX-License-Identifier: BSD-3-Clause\r\n */\n\n/**\r\n * @fileoverview Helper functions for buttons visible in UI.\r\n * @author scanet@libreduc.cc (SebCanet)\r\n */\n\n/*\r\n * auto save and restore blocks\r\n */\nfunction auto_save_and_restore_blocks() {\n  // Store the blocks for the duration of the reload.\n  // MSIE 11 does not support sessionStorage on file:// URLs.\n  if (window.sessionStorage) {\n    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());\n    var text = Blockly.Xml.domToText(xml);\n    window.sessionStorage.loadOnceBlocks = text;\n  }\n}\n;\nvar fullScreen_ = false;\n\n/**\r\n * Full screen, thanks to HTML5 API\r\n * @argument {type} _element \r\n */\nfunction fullScreen(_element) {\n  var elementClicked = _element || document.documentElement;\n  // HTML5\n  if (document.fullscreenEnabled) {\n    if (!document.fullscreenElement) {\n      elementClicked.requestFullscreen();\n      document.addEventListener('fullscreenchange', exitFullScreen, false);\n    } else {\n      exitFullScreen();\n      document.exitFullscreen();\n      document.removeEventListener('fullscreenchange', exitFullScreen, false);\n    }\n  } else\n    // Chrome, Safari and Opera\n    if (document.webkitFullscreenEnabled) {\n      if (!document.webkitFullscreenElement) {\n        elementClicked.webkitRequestFullscreen();\n        document.addEventListener('webkitfullscreenchange', exitFullScreen, false);\n      } else {\n        exitFullScreen();\n        document.webkitExitFullscreen();\n        document.removeEventListener('webkitfullscreenchange', exitFullScreen, false);\n      }\n    } else\n      // IE/Edge\n      if (document.msFullscreenEnabled) {\n        if (!document.msFullscreenElement) {\n          elementClicked.msRequestFullscreen();\n          document.addEventListener('MSFullscreenChange', exitFullScreen, false);\n        } else {\n          exitFullScreen();\n          document.msExitFullscreen();\n          document.removeEventListener('MSFullscreenChange', exitFullScreen, false);\n        }\n      }\n}\n;\nfunction exitFullScreen() {\n  if (fullScreen_ === false) {\n    fullScreenButton.className = 'iconButtonsClicked';\n    fullScreen_ = true;\n  } else {\n    fullScreenButton.className = 'iconButtons';\n    fullScreen_ = false;\n  }\n}\n;\n\n/**\r\n * Copy code from div code_peek in clipboard system\r\n */\nCode.copyToClipboard = function () {\n  if (document.selection) {\n    // IE\n    var range = document.body.createTextRange();\n    range.moveToElementText(document.getElementsByClassName(\"ace_content\")[0]);\n    range.select();\n    document.execCommand(\"copy\");\n  } else if (window.getSelection) {\n    // var range = document.createRange();\n    // range.selectNode(document.getElementsByClassName(\"ace_content\")[0]);\n    // window.getSelection().removeAllRanges();\n    // window.getSelection().addRange(range);\n    // }\n    // document.execCommand(\"copy\");\n    navigator.clipboard.writeText(document.getElementsByClassName(\"ace_content\")[0].innerText).then(() => {\n      console.log('Code copied!');\n    }).catch(error => {\n      console.log('Copy failed! ${error}');\n    });\n  }\n};\n\n/**\r\n * modal controllers\r\n */\nCode.boardsListModalShow = function () {\n  document.getElementById('overlayForModals').style.display = \"block\";\n  document.getElementById('boardListModal').classList.add('show');\n  for (var i = 0; i < document.getElementById(\"boardDescriptionSelector\").length; i++) document.getElementById(\"boardDescriptionSelector\").options[i].style.backgroundColor = 'white';\n  var boardValue = document.getElementById(\"boardMenu\").value;\n  if (boardValue !== 'none') {\n    document.getElementById(\"boardDescriptionSelector\").selectedIndex = boardValue;\n    document.getElementById(\"boardDescriptionSelector\").value = boardValue;\n    document.getElementById(\"boardDescriptionSelector\").options[document.getElementById(\"boardDescriptionSelector\").selectedIndex].style.backgroundColor = 'yellow';\n  }\n  window.addEventListener('click', Code.boardsListModalHide, 'once');\n  Code.boardDescription();\n};\nCode.portsListModalShow = function () {\n  document.getElementById('overlayForModals').style.display = \"block\";\n  document.getElementById('portListModal').classList.add('show');\n  var portValue = document.getElementById(\"serialMenu\").value;\n  if (portValue !== 'none') {\n    document.getElementById(\"serialMenu\").selectedIndex = portValue;\n    document.getElementById(\"serialMenu\").value = portValue;\n  }\n  window.addEventListener('click', Code.portsListModalHide, 'once');\n};\ndocument.getElementById(\"closeModalBoards\").onclick = function () {\n  document.getElementById('overlayForModals').style.display = \"none\";\n  document.getElementById('boardListModal').classList.remove('show');\n};\ndocument.getElementById(\"closeModalPorts\").onclick = function () {\n  document.getElementById('overlayForModals').style.display = \"none\";\n  document.getElementById('portListModal').classList.remove('show');\n};\n// When the user clicks anywhere outside of the modal, close it\nCode.boardsListModalHide = function (event) {\n  if (!document.getElementById('boardListModal').contains(event.target)) {\n    document.getElementById('overlayForModals').style.display = \"none\";\n    document.getElementById('boardListModal').classList.remove('show');\n  }\n};\nCode.portsListModalHide = function (event) {\n  if (!document.getElementById('portListModal').contains(event.target)) {\n    document.getElementById('overlayForModals').style.display = \"none\";\n    document.getElementById('portListModal').classList.remove('show');\n  }\n};\n\n/**\r\n * change information in the boards modal\r\n **/\nCode.boardDescription = function () {\n  var boardValue = document.getElementById(\"boardDescriptionSelector\").value;\n  if (boardValue === '') boardValue = 'none';\n  document.getElementById(\"board_mini_picture\").setAttribute(\"src\", profile[boardValue][0]['picture']);\n  document.getElementById(\"board_connect\").textContent = profile[boardValue][0]['usb'];\n  document.getElementById(\"board_cpu\").textContent = profile[boardValue][0]['cpu'];\n  document.getElementById(\"board_voltage\").textContent = profile[boardValue][0]['voltage'];\n  document.getElementById(\"board_inout\").textContent = profile[boardValue][0]['inout'];\n};\n\n/**\r\n * Undo/redo functions\r\n */\nCode.Undo = function () {\n  Blockly.getMainWorkspace().undo(0);\n};\nCode.Redo = function () {\n  Blockly.getMainWorkspace().undo(1);\n};\n\n/**\r\n * Luanch blockFatcory with language argument\r\n */\nCode.BlockFactory = function () {\n  var lang = Code.getStringParamFromUrl('lang', '');\n  if (!lang) {\n    lang = \"en\";\n  }\n  parent.open('tools/blockFactory/blockFactory.html?lang=' + lang);\n};\n\n/**\r\n * Creates an INO file containing the Arduino code from the Blockly workspace and\r\n * prompts the users to save it into their local file system.\r\n */\nCode.newProject = function () {\n  var count = Code.workspace.getAllBlocks().length;\n  if (count > 0) {\n    Blockly.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count), function (confirm) {\n      if (confirm) Code.workspace.clear();\n      return true;\n    });\n  }\n};\n\n/**\r\n * Creates an INO file containing the Arduino code from the Blockly workspace and\r\n * prompts the users to save it into their local file system.\r\n */\nCode.saveCodeFile = function () {\n  var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '_');\n  var dataToSave = Blockly.Arduino.workspaceToCode(Code.workspace);\n  var blob = new Blob([dataToSave], {\n    type: 'text/plain;charset=utf-8'\n  });\n  Blockly.prompt(MSG['save_span'], 'code', function (fileNameSave) {\n    if (fileNameSave) {\n      var fakeDownloadLink = document.createElement(\"a\");\n      fakeDownloadLink.download = fileNameSave + \".ino\";\n      fakeDownloadLink.href = window.URL.createObjectURL(blob);\n      fakeDownloadLink.onclick = function destroyClickedElement(event) {\n        document.body.removeChild(event.target);\n      };\n      fakeDownloadLink.style.display = \"none\";\n      document.body.appendChild(fakeDownloadLink);\n      fakeDownloadLink.click();\n    }\n  });\n};\n\n/**\r\n  * Creats an INO file containing the Arduino code from the Blockly workspace\r\n  * and posts it to http://127.0.0.1/verify/ which will pass it to the \r\n  * Arduino IDE with the --verify flag.\r\n  */\n\nCode.verifyCodeFile = function () {\n  var code = Blockly.Arduino.workspaceToCode(Code.workspace);\n  var boardId = Code.getStringParamFromUrl('board', '');\n  alert(\"Ready to verify to Arduino.\");\n  Code.uploadCode(code, boardId, 'verify', function (status, response, errorInfo) {\n    var element = document.getElementById(\"content_serial\");\n    element.innerHTML = response;\n    if (status == 200) {\n      alert(\"Program verified ok\");\n    } else {\n      alert(\"Error verifying program: \" + errorInfo);\n    }\n  });\n};\n\n/**\r\n  * Creats an INO file containing the Arduino code from the Blockly workspace\r\n  * and posts it to http://127.0.0.1/upload/ which will pass it to the \r\n  * Arduino IDE with the --verify flag.\r\n  */\n\n//const { exec } = require('child_process')\n\nCode.uploadCodeFile = function () {\n  // const fs = require('fs');\n  // const tmpFile = '/path/to/temp/arduino_code.ino';\n  // fs.writeFileSync(tmpFile, code);\n\n  // // ใช้ Arduino CLI คอมไพล์และอัปโหลดโค้ด\n  // exec(`arduino-cli compile --fqbn arduino:avr:uno ${tmpFile} && arduino-cli upload -p /dev/ttyUSB0 --fqbn arduino:avr:uno ${tmpFile}`, (error, stdout, stderr) => {\n  //     if (error) {\n  //         console.error(`Error: ${stderr || error.message}`);\n  //         return;\n  //     }\n  //     console.log(stdout);\n  // });\n\n  // var code = Blockly.Arduino.workspaceToCode(Code.workspace);\n  // var boardId = Code.getStringParamFromUrl('board', '');\n\n  // alert(\"Ready to upload to Arduino.\");\n\n  // Code.uploadCode(code, boardId, 'upload', \n  //                 function(status, response, errorInfo) {\n  //                     var element = document.getElementById(\"content_serial\");\n  //                     element.innerHTML = response;\n  //                     if (status == 200) {\n  //                         alert(\"Program uploaded ok\");\n  //                     } else {\n  //                         alert(\"Error uploading program: \" + errorInfo);\n  //                     }\n  //                 });\n};\nCode.uploadCode = function (code, boardId, mode, callback) {\n  //var spinner = new Spinner().spin(target);\n\n  var boardSpecs = {\n    \"arduino_leonardo\": \"arduino:avr:leonardo\",\n    \"arduino_mega\": \"arduino:avr:mega\",\n    \"arduino_micro\": \"arduino:avr:micro\",\n    \"arduino_mini\": \"arduino:avr:mini\",\n    \"arduino_nano\": \"arduino:avr:nano\",\n    \"arduino_pro8\": \"arduino:avr:pro\",\n    \"arduino_pro16\": \"arduino:avr:pro\",\n    \"arduino_uno\": \"arduino:avr:uno\",\n    \"arduino_yun\": \"arduino:avr:yun\",\n    \"lilypad\": \"arduino:avr:lilypad\"\n  };\n  var url = \"http://127.0.0.1:8080/\" + mode + \"/\";\n  var method = \"POST\";\n  var async = true;\n  var request = new XMLHttpRequest();\n  var comma = \"\";\n  if (boardId != '') {\n    url += \"board=\" + boardSpecs[boardId];\n    comma = \",\";\n  }\n  if (document.getElementById(\"detailedCompilation\").checked) {\n    url += comma + \"verbose=\";\n  }\n  request.onreadystatechange = function () {\n    if (request.readyState != 4) {\n      return;\n    }\n\n    //spinner.stop();\n\n    var status = parseInt(request.status); // HTTP response status, e.g., 200 for \"200 OK\"\n    var errorInfo = null;\n    var response = request.response;\n    switch (status) {\n      case 200:\n        break;\n      case 0:\n        errorInfo = \"code 0\\n\\nCould not connect to server at \" + url + \".  Is the local web server running?\";\n        break;\n      case 400:\n        errorInfo = \"code 400\\n\\nBuild failed - probably due to invalid source code.  Make sure that there are no missing connections in the blocks.\";\n        break;\n      case 500:\n        errorInfo = \"code 500\\n\\nUpload failed.  Is the Arduino connected to USB port?\";\n        break;\n      case 501:\n        errorInfo = \"code 501\\n\\nUpload failed.  Is 'ino' installed and in your path?  This only works on Mac OS X and Linux at this time.\";\n        break;\n      default:\n        errorInfo = \"code \" + status + \"\\n\\nUnknown error.\";\n        break;\n    }\n    ;\n    callback(status, response, errorInfo);\n  };\n  request.open(method, url, async);\n  request.setRequestHeader(\"Content-Type\", \"text/plain;charset=UTF-8\");\n  request.send(code);\n};\n\n/**\r\n * Creates an XML file containing the blocks from the Blockly workspace and\r\n * prompts the users to save it into their local file system.\r\n */\nfunction formatDateToThailandTimezone(date) {\n  return date.toLocaleString(\"en-GB\", {\n    timeZone: \"Asia/Bangkok\",\n    year: \"numeric\",\n    month: \"2-digit\",\n    day: \"2-digit\"\n  });\n}\nCode.saveXmlBlocklyFile = function () {\n  var xmlData = Blockly.Xml.workspaceToDom(Code.workspace);\n  var dataToSave = Blockly.Xml.domToPrettyText(xmlData);\n  var blob = new Blob([dataToSave], {\n    type: 'text/xml;charset=utf-8'\n  });\n  Blockly.prompt(MSG['save_span'], 'blockmicc' + formatDateToThailandTimezone(new Date()), function (fileNameSave) {\n    if (fileNameSave) {\n      var fakeDownloadLink = document.createElement(\"a\");\n      fakeDownloadLink.download = fileNameSave + \".vsc\";\n      fakeDownloadLink.href = window.URL.createObjectURL(blob);\n      fakeDownloadLink.onclick = function destroyClickedElement(event) {\n        document.body.removeChild(event.target);\n      };\n      fakeDownloadLink.style.display = \"none\";\n      document.body.appendChild(fakeDownloadLink);\n      fakeDownloadLink.click();\n    }\n  });\n};\n\n/**\r\n * Load blocks from local file.\r\n */\nCode.loadXmlBlocklyFile = function () {\n  // Create event listener function\n  var parseInputXMLfile = function (e) {\n    var files = e.target.files;\n    var reader = new FileReader();\n    reader.onloadend = function () {\n      var success = false;\n      if (reader.result != null) {\n        Code.loadBlocksfromXml(reader.result);\n        success = true;\n      }\n      if (success) {\n        Code.workspace.render();\n      } else {\n        Blockly.alert(MSG['badXml'], callback);\n      }\n    };\n    reader.readAsText(files[0]);\n  };\n  // Create once invisible browse button with event listener, and click it\n  var selectFile = document.getElementById('select_file');\n  if (selectFile === null) {\n    var selectFileDom = document.createElement('INPUT');\n    selectFileDom.type = 'file';\n    selectFileDom.id = 'select_file';\n    selectFileDom.accept = '.bduino, .xml, .vsc';\n    selectFileDom.style.display = 'none';\n    document.body.appendChild(selectFileDom);\n    selectFile = document.getElementById('select_file');\n    selectFile.addEventListener('change', parseInputXMLfile, false);\n  }\n  selectFile.onclick = function destroyClickedElement(event) {\n    document.body.removeChild(event.target);\n  };\n  selectFile.click();\n};\n\n/**\r\n * Parses the XML from its input to generate and replace the blocks in the\r\n * Blockly workspace.\r\n * @param {!string} defaultXml String of XML code for the blocks.\r\n * @return {!boolean} Indicates if the XML into blocks parse was successful.\r\n */\nCode.loadBlocksfromXml = function (defaultXml) {\n  var count = Code.workspace.getAllBlocks().length;\n  var xml = Blockly.Xml.textToDom(defaultXml);\n  if (count > 0) {\n    Blockly.confirm(MSG['loadXML_span'], function (confirm) {\n      if (confirm) Code.workspace.clear();\n      Blockly.Xml.domToWorkspace(xml, Code.workspace);\n      return true;\n    });\n  } else {\n    Blockly.Xml.domToWorkspace(xml, Code.workspace);\n    return true;\n  }\n};\n\n/**\r\n * Add or replace a parameter to the URL.\r\n *\r\n * @param {string} name The name of the parameter.\r\n * @param {string} value Value to set\r\n * @return {string} The url completed with parameter and value\r\n */\nCode.addReplaceParamToUrl = function (url, param, value) {\n  var re = new RegExp(\"([?&])\" + param + \"=.*?(&|$)\", \"i\");\n  var separator = url.indexOf('?') !== -1 ? \"&\" : \"?\";\n  if (url.match(re)) {\n    return url.replace(re, '$1' + param + \"=\" + value + '$2');\n  } else {\n    return url + separator + param + \"=\" + value;\n  }\n};\n\n/**\r\n * Reset workspace and parameters\r\n */\nCode.ResetWorkspace = function () {\n  var count = Blockly.mainWorkspace.getAllBlocks(false).length;\n  Blockly.confirm(MSG['resetQuestion_span'] + ' ' + Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count), function (answer) {\n    if (answer) {\n      Blockly.Events.disable();\n      Blockly.getMainWorkspace().clear();\n      Blockly.getMainWorkspace().trashcan.contents_ = [];\n      Blockly.getMainWorkspace().trashcan.setLidOpen('false');\n      window.removeEventListener('unload', auto_save_and_restore_blocks, false);\n      localStorage.clear();\n      sessionStorage.clear();\n      Code.renderContent();\n      Blockly.Events.enable();\n      if (window.location.hash) {\n        window.location.hash = '';\n      }\n      window.location = window.location.protocol + '//' + window.location.host + window.location.pathname;\n    }\n  });\n};\n\n/**\r\n * Change font size in blocks in all workspace\r\n */\nCode.changeRenderingConstant = function (value) {\n  var type = document.getElementById('rendering-constant-selector').value;\n  switch (type) {\n    case 'fontSizeBlocks':\n      var fontStyle = {\n        'size': value\n      };\n      Blockly.getMainWorkspace().getTheme().setFontStyle(fontStyle);\n      editor.setOptions({\n        fontSize: value + \"pt\"\n      });\n    case 'fontSizePage':\n    // fontSizePageModify('access', value);\n    case 'fontSpacingPage':\n    // document.body.style.fontSize = value + 'px';\n  }\n  // Refresh theme.\n  Blockly.getMainWorkspace().setTheme(Blockly.getMainWorkspace().getTheme());\n};\n\n/**\r\n * Hide/show the help modal.\r\n * @param {boolean} state The state of the checkbox. True if checked, false\r\n *     otherwise.\r\n */\nvar HelpModalDisplay_ = false;\nfunction toggleDisplayHelpModal() {\n  if (!HelpModalDisplay_) {\n    document.getElementById('helpModal').style.display = 'block';\n    document.getElementById('helpModal').classList.add('show');\n    document.getElementById('helpModal').style.left = (top.innerWidth - document.getElementById('helpModal').offsetWidth) / 2 + \"px\";\n    document.getElementById('helpModal').style.top = (top.innerHeight - document.getElementById('helpModal').offsetHeight) / 2 + \"px\";\n    helpButton.className = 'iconButtonsClicked';\n  } else {\n    document.getElementById('helpModal').style.display = 'none';\n    document.getElementById('helpModal').classList.remove('show');\n    helpButton.className = 'iconButtons';\n  }\n  HelpModalDisplay_ = !HelpModalDisplay_;\n}\n\n//# sourceURL=webpack://my-project/./js/buttons_functions.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/buttons_functions.js"]();
/******/ 	
/******/ })()
;