try {
    let inputFile = process.argv[2];    
    if (!inputFile.endsWith('.txt'))
        throw new Error("Укажите файл с расширением .txt");
    
    let input = require('fs').readFileSync(inputFile, 'utf8');
    let entropy = 0;
    let alph = {};

    //Подсчет частот символов
    for (let i = 0; i < input.length; i++)
        alph[input[i]] = (alph[input[i]] || 0) + 1;

    //Нормализация частот символов в соответствии с длинной текста
    for (let char in alph)
        alph[char] /= input.length;
    
    //Вычисление энтропии
    let alphPower = Object.keys(alph).length
    if (alphPower > 1)
        for (let char in alph)
            entropy -= alph[char] * (Math.log(alph[char]) / Math.log(alphPower));

    console.log(`Энтропия текста: ${entropy}`);
    console.log(`Алфавит с частотами:`, alph);
} catch (err) {
    console.error("Ошибка:", err.message);
}
