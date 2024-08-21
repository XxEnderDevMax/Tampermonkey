// ==UserScript==
// @name         Morse Code Auto-Encrypt for Specific Textarea
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Automatically encrypt each word to Morse code in a specific textarea
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Morse code encoding function
    function textToMorse(text) {
        const morseCode = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
            '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
            '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.',
            '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
            ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
            '_': '..--.-', '"': '.-..-.', '@': '.--.-', ' ': '/'
        };

        return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
    }

    // Function to handle input event
    function handleInput(event) {
        const textarea = event.target;
        const currentText = textarea.value;
        const lastChar = currentText.slice(-1);
        const morseChar = textToMorse(lastChar);
        textarea.value = currentText.slice(0, -1) + morseChar + ' ';
    }

    // Find all textareas
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach(textarea => {
        // Add input event listener to each textarea
        textarea.addEventListener('input', handleInput);
    });

})();



