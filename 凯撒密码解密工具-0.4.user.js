// ==UserScript==
// @name         凯撒密码解密工具
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  解密选中文本中的凯撒密码
// @author       您的名字
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 凯撒密码解密函数
    function decodeCaesarCipher(cipherText, shift) {
        const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz';
        shift = (shift % 26 + 26) % 26; // 确保偏移量在0-25之间

        return cipherText.replace(/[A-Za-z]/g, char => {
            const isLowercase = char === char.toLowerCase();
            const alphabet = isLowercase ? lowercaseAlphabet : uppercaseAlphabet;
            const index = alphabet.indexOf(char);
            const decodedIndex = (index - shift + 26) % 26;
            return alphabet[decodedIndex];
        });
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
            const decodedText = decodeCaesarCipher(selectedText, 3); // 使用偏移量为3解密凯撒密码
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