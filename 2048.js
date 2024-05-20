(() => {
    const field = [
        [0, 2, 4, 8],
        [0, 0, 0, 0],
        [0, 2, 2, 8],
        [0, 2, 2, 2],
    ];

    const moves = 'U';

    const moveByIndex = (first, second) => {
        if (!first && !second) {
            return [first, second];
        }

        if (first && !second) {
            return [first, second];
        }

        if (!first && second) {
            return [second, first];
        }

        if (first === second) {
            return [first + second, 0];
        }

        return [first, second];
    };

    function solution(field, moves) {
        // U, D, R, L

        moves.split(' ').forEach(move => {
            switch (move) {
                case 'U':
                    let vertically = Array(field.length).fill([Array(field.length).fill(0)]);

                    for (let i = 0; i < field.length; i++) {
                        const t = Array(field.length).fill(0);
                        for (let j = 0; j < field[i].length; j++) {
                            t[j] = field[j][i];
                        }
                        vertically[i] = t;
                    }

                    console.log('vertically -> ', vertically);
                    break;
                case 'D':
                    let verticallyD = Array(field[0].length).fill(0);
                    for (let i = 1; i < verticallyD.length; i++) {
                        // verticallyD[]
                    }
                    break;
                case 'R':
                    for (let i = 0; i < field.length; i++) {
                        let horizontally = field[i].filter((e) => e !== 0);
                        for (let j = 1; j < horizontally.length; j++) {
                            const [first, second] = moveByIndex(horizontally[j - 1], horizontally[j]);
                            horizontally[j - 1] = first;
                            horizontally[j] = second;
                        }

                        horizontally = horizontally.filter((e) => e !== 0);
                        const newField = Array(field[i].length).fill(0);
                        newField.splice(field[i].length - horizontally.length, field[i].length, ...horizontally);

                        field[i] = newField;
                    }
                    break;
                case 'L':
                    for (let i = 0; i < field.length; i++) {
                        let horizontally = field[i].filter((e) => e !== 0);

                        for (let j = horizontally.length - 1; j > 0; j--) {
                            const [first, second] = moveByIndex(horizontally[j - 1], horizontally[j]);
                            horizontally[j - 1] = first;
                            horizontally[j] = second;
                        }

                        horizontally = horizontally.filter((e) => e !== 0);

                        const newField = Array(field[i].length).fill(0);
                        newField.splice(0, horizontally.length, ...horizontally);

                        field[i] = newField;
                    }
                    break;
            }
        });


        console.log(field);
        return field;
    }

    solution(field, moves);
})();
