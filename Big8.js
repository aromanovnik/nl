var GAME = (quantityRandomTickets) => {
  const quantityNumbers = 8;
  const quantityNumbers2 = 1;
  const quantityCells = 20;
  const quantityCells2 = 4;

  const tickets = [];
  const goal = 0;
  let randomTickets = [];
  let win = 0;

  const winnings = {
    '81': 5000000,
    '80': 450000,
    '71': 75000,
    '70': 15000,
    '61': 5000,
    '60': 2500,
    '51': 1200,
    '50': 600,
    '41': 600,
  };


  document.querySelectorAll(`td[data-label="Выпавшие числа"]`)
    .forEach((el) => {
      const ticket = [new Set(), new Set()];
      el.querySelectorAll('div > div > div > div > div').forEach((num) => {
        if (ticket[1].size > 0) {
          return;
        }

        if (!isNaN(num.textContent)) {
          if (ticket[0].size < 8) {
            ticket[0].add(Number(num.textContent));
          } else {
            ticket[1].add(Number(num.textContent));
          }
        }
      });

      tickets.push([[...ticket[0]], [...ticket[1]]]);
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
    const _ticket1 = generateRandomNumbers(quantityNumbers, quantityCells).sort((a, b) => a - b);
    const _ticket2 = generateRandomNumbers(quantityNumbers2, quantityCells2).sort((a, b) => a - b);

    if (!randomTickets.some((el) => _ticket1.join('') === el[0].join(''))) {
      randomTickets.push([_ticket1, _ticket2]);
    }
  }

  // console.log('randomTickets -> ', randomTickets);

  const findCoin = (ticket, num) => {
    return num.filter(n => ticket.some(t => t === n));
  };

  let dj = undefined;

  randomTickets.forEach((el) => {
    const find1 = findCoin(tickets[goal][0], el[0]);
    const find2 = findCoin(tickets[goal][1], el[1]);

    const w = winnings[`${find1.length}${find2.length}`];

    if (w) {
      win = win + w;
      console.log(`!!! Выйгрыш: ${w}, Билет: ${el} `);

      if (!dj && `${find1.length}${find2.length}` === '81') {
        dj = el;
      }
    }
  });

  console.log(`Сумма выйгрыша : ${win}, Пострачено: ${quantityRandomTickets * 300}р.`);
  console.log(`Итог: ${win - (quantityRandomTickets * 300)}`);
  if (dj) {
    console.log('!!!!!!ДЖЕКПОТ!!!!!', dj);
  }

};
GAME(1);
