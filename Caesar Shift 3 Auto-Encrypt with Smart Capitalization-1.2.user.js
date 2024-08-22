// ==UserScript==
// @name         Caesar Shift 3 Auto-Encrypt with Smart Capitalization
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Automatically encrypt each character with a Caesar shift of 3 with smart capitalization
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Caesar shift encoding function with smart capitalization
    function textToCaesarShift3(text, capitalizeFirst) {
        const alphabet1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const alphabet2 = 'abcdefghijklmnopqrstuvwxyz';

        return text.split('').map((char, index) => {
            let resultChar = char;

            if (alphabet1.includes(char)) {
                const indexInAlphabet = alphabet1.indexOf(char);
                const shiftedIndex = (indexInAlphabet + 3) % 26;
                resultChar = alphabet1[shiftedIndex];
            } else if (alphabet2.includes(char)) {
                const indexInAlphabet = alphabet2.indexOf(char);
                const shiftedIndex = (indexInAlphabet + 3) % 26;
                resultChar = alphabet2[shiftedIndex];
            }

            if (capitalizeFirst && index === 0) {
                return resultChar.toUpperCase(); // Capitalize the first letter
            }
            return resultChar;
        }).join('');
    }

    // Function to handle input event
    function handleInput(event) {
        const textarea = event.target;
        const currentText = textarea.value;
        const isFirstCharacter = currentText.length === 1;
        const lastChar = currentText.slice(-1);
        const caesarChar = textToCaesarShift3(lastChar, isFirstCharacter);
        textarea.value = currentText.slice(0, -1) + caesarChar;
    }

    // Find all textareas and input elements with role="textbox"
    const textareas = document.querySelectorAll('textarea, [role="textbox"]');

    textareas.forEach(textarea => {
        // Add input event listener to each textarea
        textarea.addEventListener('input', handleInput);
    });

})();
