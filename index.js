function numberToAlbanianWords(num) {
    if (num === 0) return 'zero';

    const ones = [
        '', 'një', 'dy', 'tre', 'katër', 'pesë', 'gjashtë', 'shtatë', 'tetë', 'nëntë',
        'dhjetë', 'njëmbëdhjetë', 'dymbëdhjetë', 'trembëdhjetë', 'katërmbëdhjetë', 'pesëmbëdhjetë',
        'gjashtëmbëdhjetë', 'shtatëmbëdhjetë', 'tetëmbëdhjetë', 'nëntëmbëdhjetë'
    ];
    const tens = [
        '', '', 'njëzet', 'tridhjetë', 'katërdhjetë', 'pesëdhjetë',
        'gjashtëdhjetë', 'shtatëdhjetë', 'tetëdhjetë', 'nëntëdhjetë'
    ];

    function underThousand(n) {
        let result = '';
        if (n >= 100) {
            // special exactly 100 -> "njëqind"
            if (n === 100) return 'njëqind';
            const hundreds = Math.floor(n / 100);
            if (hundreds === 1) {
                result += 'njëqind';
            } else {
                result += ones[hundreds] + 'qind';
            }
            n = n % 100;
            if (n > 0) result += ' ';
        }
        if (n >= 20) {
            result += tens[Math.floor(n / 10)];
            if (n % 10 > 0) result += ' e ' + ones[n % 10];
        } else if (n > 0) {
            result += ones[n];
        }
        return result;
    }

    let result = '';

    // special 1 000 000 000 -> "njëmiliard"
    if (num === 1000000000) {
        return 'njëmiliard';
    }
    // miliard (for > 1e9, if e.g. extended later)
    if (num >= 1000000000) {
        let milliards = Math.floor(num / 1000000000);
        if (milliards === 1) {
            result += 'një miliard';
        } else {
            result += numberToAlbanianWords(milliards) + ' miliard';
        }
        num = num % 1000000000;
        if (num > 0) result += ' ';
    }

    // special 1 000 000 -> "njëmilion"
    if (num === 1000000) {
        return 'njëmilion';
    }
    if (num >= 1000000) {
        let millions = Math.floor(num / 1000000);
        if (millions === 1) {
            result += 'një milion';
        } else {
            result += numberToAlbanianWords(millions) + ' milion';
        }
        num = num % 1000000;
        if (num > 0) result += ' ';
    }

    // special 1 000 -> "njëmijë"
    if (num === 1000) {
        return 'njëmijë';
    }
    if (num >= 1000) {
        let thousands = Math.floor(num / 1000);
        if (thousands === 1) {
            result += 'një mijë';
        } else {
            result += numberToAlbanianWords(thousands) + ' mijë';
        }
        num = num % 1000;
        if (num > 0) result += ' ';
    }

    if (num > 0) {
        result += underThousand(num);
    }

    return result.trim();
}
