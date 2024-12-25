function boyerMoore(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length; 

    // Создание таблицы плохих символов
    function buildBadCharTable(pattern) {
        const table = {};

        for (let i = 0; i < pattern.length; i++)
            table[pattern[i]] = i;  
        return table;
    }

    // Функция для вычисления сдвига по хорошему суффиксу
    function goodSuffixShift(pattern, l) {
        const m = pattern.length; 
        const suffix = pattern.slice(m - l);  // Извлекаем суффикс длины l из конца паттерна
        // Ищем этот суффикс в левой части паттерна
        for (let i = m - l - 1; i >= 0; i--) {
            if (pattern.slice(i, i + l) == suffix) {
                // Если нашли совпадение суффикса, возвращаем сдвиг
                return m - l - i;  
            }
        }
        // Если не нашли совпадений, сдвигаем паттерн на его полную длину
        return m;
    }

    const badCharTable = buildBadCharTable(pattern); 
    let shift = 0;  // Начальное смещение (позиция паттерна в тексте)
    const result = []; 

    // Цикл, который выполняется до тех пор, пока паттерн может быть сопоставлен с текстом
    while (shift <= textLength - patternLength) {
        let j = patternLength - 1;  // Индекс для сравнения с последним символом паттерна
        // Сравниваем символы паттерна с символами текста справа налево
        while (j >= 0 && pattern[j] == text[shift + j]) {
            j--;  // Если символы совпали, двигаем указатель на предыдущий символ
        }

        // Если j < 0, значит, все символы паттерна совпали с текстом
        if (j < 0) {
            result.push(shift);  // Сохраняем позицию совпадения
            shift += patternLength;  // Переходим к следующей возможной позиции для поиска
        } else {
            // Если не совпало, вычисляем сдвиг по плохому символу
            const badCharShift = j - (badCharTable[text[shift + j]] || -1);
            // Вычисляем сдвиг по хорошему суффиксу (если совпали части паттерна)
            const goodSuffix = goodSuffixShift(pattern, patternLength - 1 - j);
            // Сдвигаем паттерн на максимальный сдвиг из двух вариантов
            shift += Math.max(badCharShift, goodSuffix);
        }
    }

    return result;
}

// Пример использования
const text = "abccabcbbccabcdabcdabc";  
const pattern = "abc"; 
const result = boyerMoore(text, pattern);  
console.log("Позиции совпадений:", result);
