// ==UserScript==
// @name         添加解密摩尔斯密码选项
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  添加右键点击页面时的解密摩尔斯密码选项
// @author       您的名字
// @match        *://*/*
// @include      *
// @grant        none
// @run-at       document-end
// ==/UserScript==


(function() {
    'use strict';

    // 解密摩尔斯密码
    function decodeMorseCode(morseCode) {
        const morseCodeMap = {
            ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
            "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
            "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
            ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
            "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
            "--..": "Z"
        };

        return morseCode.split(" ").map(code => morseCodeMap[code] || "").join("").replace(/\s+/g, '');
    }

    // 解密选中文本中的摩尔斯密码
    function decryptSelectedText() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText !== '') {
            const morseCodeRegex = /[.-]+/g;
            let updatedText = selectedText.replace(morseCodeRegex, morseCode => decodeMorseCode(morseCode));
            range.deleteContents();
            range.insertNode(document.createTextNode(updatedText));
        }
    }

    // 在右键菜单中添加解密选项
    document.addEventListener('contextmenu', function(event) {
        const selection = window.getSelection();
        if (selection.toString() !== '') {
            decryptSelectedText();
            event.preventDefault();
        }
    });
})();