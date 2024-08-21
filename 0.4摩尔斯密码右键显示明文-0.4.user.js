// ==UserScript==
// @name         0.4摩尔斯密码右键显示明文
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  右键摩尔斯密码解密0.4
// @author       您的名字
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 摩尔斯密码到字母和符号的映射
    const morseToLetter = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
        '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
        '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
        '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
        '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
        '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
        '---..': '8', '----.': '9', '.-.-.-': '.', '--..--': ',', '..--..': '?',
        '.----.': "'", '-.-.--': '!', '-..-.': '/', '-.--.': '(', '-.--.-': ')',
        '.-...': '&', '---...': ':', '-.-.-.': ';', '-...-': '=', '.-.-.': '+',
        '-....-': '-', '..--.-': '_', '.-..-.': '"', '...-..-': '$', '.--.-.': '@',
        '...-.-': 'END', '....-': '4', '.----.': "'", '---...': ':', '-....-': '-',
        '..--.-': '_', '.-..-.': '"', '...-..-': '$', '.--.-.': '@', '----.': '9',
        '': ' ', '/': ' ', '-.-.-': ';'
    };

    // 解密摩尔斯密码
    function decodeMorseCode(morseCode) {
        return morseCode.split(' / ').map(word =>
            word.split(' ').map(letter =>
                morseToLetter[letter] || ''
            ).join('')
        ).join(' ');
    }

    // 创建输出框
    const outputBox = document.createElement("textarea");
    outputBox.setAttribute("id", "outputBox");
    outputBox.setAttribute("style", "position: fixed; top: 10px; right: 10px; width: 300px; height: 150px; font-size: 14px;");
    document.body.appendChild(outputBox);

    // 创建颜色选择框
    const colorInput = document.createElement("input");
    colorInput.setAttribute("type", "color");
    colorInput.setAttribute("id", "colorInput");
    colorInput.setAttribute("value", "#000000");
    colorInput.setAttribute("style", "position: fixed; top: 170px; right: 10px;");
    document.body.appendChild(colorInput);

    // 处理右键点击事件
    document.addEventListener('contextmenu', function(event) {
        const selection = window.getSelection();
        if (selection.toString().trim() !== '') {
            const selectedText = selection.toString().trim();
            const decodedText = decodeMorseCode(selectedText);
            outputBox.value = decodedText;
            outputBox.style.color = colorInput.value;
            event.preventDefault();
        }
    });

    // 更新颜色
    colorInput.addEventListener('input', function() {
        outputBox.style.color = colorInput.value;
    });

})();
