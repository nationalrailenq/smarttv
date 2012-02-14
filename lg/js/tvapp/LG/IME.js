var IME = {
    originalValue: "",
    keyArray: null,
    xCoord: 0,
    yCoord: 0,
    letterTimeout: null,
    voidLetter: false,
    letterIndex: 0,
    keyIndex: 0,
    activePanel: 1,
    maxPanel: 4,
    inputBox: null,
    inputID: null
};
IME.pane1 = {
    key1: [".", ",", "-", "/"],
    key2: ["a", "b", "c"],
    key3: ["d", "e", "f"],
    key4: ["g", "h", "i"],
    key5: ["j", "k", "l"],
    key6: ["m", "n", "o"],
    key7: ["p", "q", "r", "s"],
    key8: ["t", "u", "v"],
    key9: ["w", "x", "y", "z"],
    key0: ["space"]
};
IME.pane2 = {
    key1: [".", ",", "-", "/"],
    key2: ["A", "B", "C"],
    key3: ["D", "E", "F"],
    key4: ["G", "H", "I"],
    key5: ["J", "K", "L"],
    key6: ["M", "N", "O"],
    key7: ["P", "Q", "R", "S"],
    key8: ["T", "U", "V"],
    key9: ["W", "X", "Y", "Z"],
    key0: ["space"]
};
IME.pane3 = {
    key1: ["1"],
    key2: ["2"],
    key3: ["3"],
    key4: ["4"],
    key5: ["5"],
    key6: ["6"],
    key7: ["7"],
    key8: ["8"],
    key9: ["9"],
    key0: ["0"]
};
IME.pane4 = {
    key1: ["+", "-", "*", "/", ":"],
    key2: ["!", ";", "<"],
    key3: ["%", "[", "="],
    key4: ["(", "\\", ">"],
    key5: [")", "]", "^"],
    key6: ["@", "_", "`"],
    key7: ["{", "|"],
    key8: [",", "}", "~"],
    key9: ["&", '"'],
    key0: ["#", "$", ".", "?"]
};
IME.newIME = function (a, b) {
    if (SS.activeIME) {
        IME.exitEditing()
    }
    SS.activeIME = true;
    this.inputBox = document.getElementById(a);
    this.inputID = a;
    IME.originalValue = this.inputBox.value;
    var c = document.getElementById(a);
    var d = document.getElementById(SS.onFocus);
    if (d) {
        if ($(d).hasClass("focus")) {
            $(d).removeClass("focus")
        }
    }
    $(c).addClass("focus");
    $(c).focus();
    SS.onFocus = a;
    if (b && b.xPosition && b.yPosition) {
        IME.xCoord = b.xPosition;
        IME.yCoord = b.yPosition
    }
    if (b && b.clear && b.clear == true) {
        this.inputBox.value = ""
    }
    if (b && b.inputType) {
        if (b.inputType == "numeric") {
            IME.activePanel = 3
        } else if (b.inputType == "symbol") {
            IME.activePanel = 4
        } else {
            IME.activePanel = 1
        }
    } else {
        IME.activePanel = 1
    }
    IME.draw(IME.activePanel)
};
IME.setPosition = function (a, b) {
    IME.draw(IME.activePanel, a, b)
};
IME.onChar = function () {
    if (typeof onCharacter == "function") {
        onCharacter(this.inputBox.value)
    }
};
IME.draw = function (a, b, c) {
    IME.newChar();
    IME.activePanel = a;
    var d, e;
    var f = [];
    if (b) {
        IME.xCoord = b
    }
    if (c) {
        IME.yCoord = c
    }
    switch (a) {
    case 1:
        d = IME.pane1;
        break;
    case 2:
        d = IME.pane2;
        break;
    case 3:
        d = IME.pane3;
        break;
    case 4:
        d = IME.pane4;
        break;
    default:
        d = IME.pane1;
        break
    }
    var g = document.createElement("div");
    g.className = "SSkeypad";
    g.id = "SSkeypad";
    g.style.top = IME.yCoord + "px";
    g.style.left = IME.xCoord + "px";
    f[0] = document.createElement("a");
    f[0].textContent = IME.getKeyString(d.key0);
    f[1] = document.createElement("a");
    f[1].textContent = IME.getKeyString(d.key1);
    f[2] = document.createElement("a");
    f[2].textContent = IME.getKeyString(d.key2);
    f[3] = document.createElement("a");
    f[3].textContent = IME.getKeyString(d.key3);
    f[4] = document.createElement("a");
    f[4].textContent = IME.getKeyString(d.key4);
    f[5] = document.createElement("a");
    f[5].textContent = IME.getKeyString(d.key5);
    f[6] = document.createElement("a");
    f[6].textContent = IME.getKeyString(d.key6);
    f[7] = document.createElement("a");
    f[7].textContent = IME.getKeyString(d.key7);
    f[8] = document.createElement("a");
    f[8].textContent = IME.getKeyString(d.key8);
    f[9] = document.createElement("a");
    f[9].textContent = IME.getKeyString(d.key9);
    f[10] = document.createElement("a");
    f[10].innerHTML = ' <div id="redChangeButton"> </div><div id="redChangeText">change</div>';
    f[11] = document.createElement("a");
    f[11].innerHTML = ' <div id="leftDeleteButton"><-</div><div id="leftDeleteText">delete</div>';
    f[12] = document.createElement("a");
    f[12].innerHTML = "BACK";
    f[13] = document.createElement("a");
    f[13].innerHTML = "ENTER";
    for (var h = 0; h < 10; h++) {
        f[h].className = "SSkeypadButton";
        f[h].id = "SSkeypad" + h;
        f[h].onclick = function () {
            IME.keyClick(this.id)
        }
    }
    for (var h = 1; h < 10; h++) {
        g.appendChild(f[h])
    }
    f[10].className = "SSkeypadButtonX";
    f[10].id = "SSkeypad" + 10;
    f[10].onclick = function () {
        IME.keyClick(this.id)
    };
    g.appendChild(f[10]);
    g.appendChild(f[0]);
    f[11].className = "SSkeypadButtonX";
    f[11].id = "SSkeypad" + 11;
    f[11].onclick = function () {
        IME.keyClick(this.id)
    };
    g.appendChild(f[11]);
    f[12].className = "SSkeypadButtonY";
    f[12].id = "SSkeypad" + 12;
    f[12].onclick = function () {
        IME.keyClick(this.id)
    };
    g.appendChild(f[12]);
    f[13].className = "SSkeypadButtonY";
    f[13].id = "SSkeypad" + 13;
    f[13].onclick = function () {
        IME.keyClick(this.id)
    };
    g.appendChild(f[13]);
    IME.keyArray = d;
    document.getElementById("body").appendChild(g)
};
IME.getKeyString = function (a) {
    var b = "";
    for (var c = 0; c < a.length; c++) {
        b = b + a[c]
    }
    return b
};
IME.isActive = function () {
    return SS.activeIME
};
IME.keyClick = function (a) {
    switch (a) {
    case "SSkeypad1":
        IME.processKey(49);
        break;
    case "SSkeypad2":
        IME.processKey(50);
        break;
    case "SSkeypad3":
        IME.processKey(51);
        break;
    case "SSkeypad4":
        IME.processKey(52);
        break;
    case "SSkeypad5":
        IME.processKey(53);
        break;
    case "SSkeypad6":
        IME.processKey(54);
        break;
    case "SSkeypad7":
        IME.processKey(55);
        break;
    case "SSkeypad8":
        IME.processKey(56);
        break;
    case "SSkeypad9":
        IME.processKey(57);
        break;
    case "SSkeypad0":
        IME.processKey(48);
        break;
    case "SSkeypad10":
        IME.processKey(403);
        break;
    case "SSkeypad11":
        IME.processKey(37);
        break;
    case "SSkeypad12":
        IME.processKey(461);
        break;
    case "SSkeypad13":
        IME.processKey(13);
        break
    }
};
IME.changePanel = function (a) {
    var b;
    if (a) {
        b = a
    } else {
        if (IME.activePanel == IME.maxPanel) {
            b = 1;
            IME.activePanel = 1
        } else {
            b = IME.activePanel + 1;
            IME.activePanel = IME.activePanel + 1
        }
    }
    IME.draw(b)
};
IME.processKey = function (a) {
    IME.voidLetter = true;
    if (IME.letterTimeout) {
        window.clearTimeout(IME.letterTimeout)
    }
    IME.letterTimeout = window.setTimeout("IME.newChar();", 1e3);
    var b = null;
    var c = "";
    switch (a) {
    case 49:
        b = IME.keyArray.key1;
        if (IME.keyIndex == 1) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }
        } else {
            IME.newChar();
            IME.keyIndex = 1;
            IME.letterIndex = 0
        }
        break;
    case 50:
        b = IME.keyArray.key2;
        if (IME.keyIndex == 2) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }

        } else {
            IME.newChar();
            IME.keyIndex = 2;
            IME.letterIndex = 0
        }
        break;
    case 51:
        b = IME.keyArray.key3;
        if (IME.keyIndex == 3) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }
        } else {
            IME.newChar();
            IME.keyIndex = 3;
            IME.letterIndex = 0
        }
        break;
    case 52:
        b = IME.keyArray.key4;
        if (IME.keyIndex == 4) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }
        } else {
            IME.newChar();
            IME.keyIndex = 4;
            IME.letterIndex = 0
        }
        break;
    case 53:
        b = IME.keyArray.key5;
        if (IME.keyIndex == 5) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }
        } else {
            IME.newChar();
            IME.keyIndex = 5;
            IME.letterIndex = 0
        }
        break;
    case 54:
        b = IME.keyArray.key6;
        if (IME.keyIndex == 6) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }
        } else {
            IME.newChar();
            IME.keyIndex = 6;
            IME.letterIndex = 0
        }
        break;
    case 55:
        b = IME.keyArray.key7;
        if (IME.keyIndex == 7) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }
        } else {
            IME.newChar();
            IME.keyIndex = 7;
            IME.letterIndex = 0
        }
        break;
    case 56:
        b = IME.keyArray.key8;
        if (IME.keyIndex == 8) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }
        } else {
            IME.newChar();
            IME.keyIndex = 8;
            IME.letterIndex = 0
        }
        break;
    case 57:
        b = IME.keyArray.key9;
        if (IME.keyIndex == 9) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }
        } else {
            IME.newChar();
            IME.keyIndex = 9;
            IME.letterIndex = 0
        }
        break;
    case 48:
        b = IME.keyArray.key0;
        if (IME.keyIndex == 0) {
            if (IME.letterIndex == b.length - 1) {
                IME.letterIndex = 0
            } else {
                IME.letterIndex = IME.letterIndex + 1
            }
        } else {
            IME.newChar();
            IME.keyIndex = 0;
            IME.letterIndex = 0
        }
        break;
    case 39:
        b = [""];
        IME.letterIndex = 0;
        IME.newChar();
        break;
    case 37:
        b = [""];
        IME.letterIndex = 0;
        IME.delChar();
        break;
    case 13:
        IME.finEditing(true);
        break;
    case 461:
        IME.exitEditing(true);
        break;
    case 403:
        IME.changePanel();
        break
    }
    if (a != 13 && a != 461 && a != 403) {
		if(b)
		{
			c = b[IME.letterIndex];
			if(c) IME.addChar(c)
		}
    }
    Main.keyDown(a);
};
IME.newChar = function () {
    if (IME.letterTimeout) {
        window.clearTimeout(IME.letterTimeout)
    }
    IME.voidLetter = false;
    IME.keyIndex = -1
};
IME.delChar = function () {
    var a = IME.inputBox.value;
    IME.inputBox.value = a.slice(0, -1);
    IME.newChar()
};
IME.addChar = function (a) {
    if (a === "space") {
        a = " "
    }
    var b = IME.inputBox.value;
    var c = "";
    if (IME.voidLetter) {
        c = b.slice(0, -1) + a
    } else {
        c = b + a
    }
    IME.inputBox.value = c;
    IME.onChar()
};
IME.finEditing = function (a) {
    if (IME.letterTimeout) {
        window.clearTimeout(IME.letterTimeout)
    }
    IME.voidLetter = false;
    IME.keyIndex = -1;
    if (a) {
        SS.offFocus(IME.inputID);
        SS.setHover(IME.inputID)
    }
    $("#SSkeypad").remove();
    SS.activeIME = false;
    if (typeof onFinishedEditing == "function") {
        onFinishedEditing(this.inputBox.value)
    }
};
IME.exitEditing = function (a) {
    if (IME.letterTimeout) {
        window.clearTimeout(IME.letterTimeout)
    }
    IME.voidLetter = false;
    IME.keyIndex = -1;
    this.inputBox.value = IME.originalValue;
    if (a) {
        SS.offFocus(IME.inputID);
        SS.setHover(IME.inputID)
    }
    $("#SSkeypad").remove();
    SS.activeIME = false;
    if (typeof onExitEditing == "function") {
        onExitEditing()
    }
}