function calculator(string) {  

    const operands = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "I", "II", "III", "IV", "V" , "VI", "VII", "VIII", "IX", "X"]; 
        // Допустимые операторы

    let numbers = string.trim().split(/[\+\-\*\/\s]+/); // Разделение строки на числа

    let operator = string.match(/[\+\-\*\/]/); // Поиск оператора

    if (operator == null) throw new Error('неверный оператор');

    if (isNaN(+numbers[0]) !== isNaN(+numbers[1])) throw new Error('используются одновременно разные системы счисления');

    if (numbers.length !== 2) throw new Error('формат математической операции не удовлетворяет заданию (a,b)');

    function romanToArabic(roman) { // Функция римские => арабские
        const romanNumerals = {
            'I': 1,
            'V': 5, 
            'X': 10,
            'L': 50,
            'C': 100,
        };
        let arabic = 0;
        for (let i = 0; i < roman.length; i++) {
            if (romanNumerals[roman[i]] < romanNumerals[roman[i + 1]]) {
                arabic -= romanNumerals[roman[i]];
            } else {
                arabic += romanNumerals[roman[i]];
            }
        }
        return arabic;
    };

    function arabicToRoman(arabic) { // Функция арабские => римские
        const decimalValue = [100, 90, 50, 40, 10, 9, 5, 4, 1];
        const romanValue = ["C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        let roman = '';
        decimalValue.map( (item, index) => {
            while (item <= arabic) {
                roman += romanValue[index];
                arabic = arabic - item;
            }
        });
        return roman;
    }

    let num1 = numbers[0]; // Первый операнд

    let num2 = numbers[1]; // Второй операнд

    if ((operands.includes(num1) && operands.includes(num2)) == false) throw new Error('формат математической операции не удовлетворяет заданию (a,b)');

    if (isNaN(+num1) || isNaN(+num2)) { // Преобразование строки в число
        num1 = romanToArabic(num1);
        num2 = romanToArabic(num2);
    } else {
        num1 = Number(num1);
        num2 = Number(num2);
    };

    let result = 0; // Результат

    switch (operator[0]) { // Выполнение операции
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            return "Invalid operator";
    }
    
    result = Math.floor(result); // Округление

    if (isNaN(+numbers[0]) || isNaN(+numbers[1])) { // Преобразование числа в строку
        result = arabicToRoman(result);
    } else if ((isNaN(+numbers[0]) || isNaN(+numbers[1])) && result <= 0) {
        result = "";
    } else {
        result = result + "";
    };
    
    return result;
    
}

 module.exports = calculator; // Не трогайте эту строчку