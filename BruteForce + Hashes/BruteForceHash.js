function bruteForceSearch(text, pattern) {
    const textLength = text.length; 
    const patternLength = pattern.length;
    const positions = [];

    // Перебираем каждую позицию в text
    for (let i = 0; i <= textLength - patternLength; i++) {
        let isMatch = true;

        // Сравниваем каждый символ pattern с соответствующим символом text
        for (let j = 0; j < patternLength; j++) {
            if (text[i + j] != pattern[j]) {
                isMatch = false;
                break; 
            }
        }

        if (isMatch) positions.push(i);
    }

    return positions;
}

function hashSearch(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length;
    const positions = [];
    let patternHash = 0;
    let currentHash = 0;
    for (let i = 0; i < patternLength; i++) patternHash += pattern.charCodeAt(i);
    for (let i = 0; i < patternLength; i++) currentHash += text.charCodeAt(i);

    for (let i = 0; i <= textLength - patternLength; i++) {
        // Если хэши совпали, проверяем каждый символ
        if (currentHash == patternHash) {
            let isMatch = true;

            for (let j = 0; j < patternLength; j++) {
                if (text[i + j] != pattern[j]) {
                    isMatch = false;
                    break;
                }
            }

            if (isMatch) positions.push(i);
        }

        // Обновляем текущий хэш, сдвигая окно на символ
        if (i < textLength - patternLength) {
            currentHash -= text.charCodeAt(i);
            currentHash += text.charCodeAt(i + patternLength);
        }
    }

    return positions; 
}

//////////////// ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ //////////////////////////////
const text1 = "abcabdecab"; 
const pattern1 = "cab";
console.log(bruteForceSearch(text1, pattern1)); // [ 2, 7 ]
console.log(hashSearch(text1, pattern1)); // [ 2, 7 ]

const text2 = "abababacaba"; 
const pattern2 = "aba";
console.log(bruteForceSearch(text2, pattern2)); // [ 0, 2, 4, 8 ]
console.log(hashSearch(text2, pattern2)); // [ 0, 2, 4, 8 ]
