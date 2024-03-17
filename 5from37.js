var GAME = (quantityRandomTickets) => {
    const quantityNumbers = 5;
    const quantityCells = 37;
    const tickets = [];
    const goal = 0;
    let randomTickets = [];
    let win = 0;

    const winnings = {
        5: 1000000,
        4: 2000,
        3: 100,
        2: 20,
    };

    document.querySelectorAll(`td[data-label="Выпавшие числа"]`)
        .forEach((el) => {
            const ticket = new Set();
            el.querySelectorAll('div > div > div').forEach((num) => {
                if (!isNaN(num.textContent)) {
                    ticket.add(Number(num.textContent));
                }
            });

            if (ticket.size === quantityNumbers) {
                tickets.push([...ticket]);
            }
        });


    // console.log('history -> ', tickets);

    const generateRandomNumbers = (length, maxNumber) => {
        const numbers = [];

        while (numbers.length < length) {
            const randomNumber = Math.ceil(Math.random() * maxNumber);
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }

        return numbers;
    };

    while (randomTickets.length < quantityRandomTickets) {
        const _ticket = generateRandomNumbers(quantityNumbers, quantityCells).sort((a, b) => a - b);
        if (!randomTickets.some((el) => _ticket.join('') === el.join(''))) {
            randomTickets.push(_ticket);
        }
    }

    const findCoin = (ticket, num) => {
        return num.filter(n => ticket.some(t => t === n));
    };
    // console.log('Tickets', randomTickets);
    // console.log('Goal', tickets[goal]);
    let dj = false;

    randomTickets.forEach((el) => {
        const find = findCoin(tickets[goal], el);

        if (winnings[find.length]) {
            win = win + winnings[find.length];
            console.log(`!!! Выйгрыш: ${winnings[find.length]}, Билет: ${find.join(', ')} `);

            if (!dj && find.length === 5) {
                dj = true;
            }
        }
    });


    console.log(`Сумма выйгрыша : ${win}, Пострачено: ${quantityRandomTickets * 10}р.`);
    if (dj) {
        console.log('!!!!!!ДЖЕКПОТ!!!!!');
    }
};
