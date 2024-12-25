function boyerMoore(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length; 

    function buildBadCharTable(pattern) {
        const table = {};

        for (let i = 0; i < pattern.length; i++)
            table[pattern[i]] = i;  
        return table;
    }

    function buildGoodSuffixShift(pattern, suffixLenght) { 
        const suffix = pattern.slice(patternLength - suffixLenght); 

        // Ищем этот суффикс в левой части паттерна
        for (let i = patternLength - suffixLenght - 1; i >= 0; i--) {
            if (pattern.slice(i, i + suffixLenght) == suffix) {
                // Если нашли совпадение суффикса, возвращаем сдвиг
                return patternLength - suffixLenght - i;  
            }
        }

        // Если не нашли совпадений, сдвигаем паттерн на его полную длину
        return patternLength;
    }

    const badCharTable = buildBadCharTable(pattern); 
    let shift = 0;  // Начальное смещение (позиция паттерна в тексте)
    const result = []; 

    // Цикл, который выполняется до тех пор, пока паттерн может быть размещен в конце текста
    while (shift <= textLength - patternLength) {
        let pointer = patternLength - 1;

        // Сравниваем символы паттерна с символами текста справа налево
        while ((pointer >= 0) && (pattern[pointer] == text[shift + pointer]))
            pointer--;  // Если символы совпали, двигаем указатель на предыдущий символ

        // Если j == -1, значит, все символы паттерна совпали с текстом
        if (pointer == -1) {
            result.push(shift); 
            shift += patternLength;
        } else {
            // Если не совпало, вычисляем сдвиги по плохому символу и хорошему суффиксу
            const badCharShift = (badCharTable[text[pointer]] || pattern.length);
            const goodSuffixShift = buildGoodSuffixShift(pattern, patternLength - 1 - pointer);

            shift += Math.max(badCharShift, goodSuffixShift);
        }
    }

    return result;
}

// Пример использования
const text = "there is some example";  
const pattern = "example"; 
const result = boyerMoore(text, pattern);  
console.log("Позиции совпадений:", result);
