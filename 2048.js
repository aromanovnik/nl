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

    const shuffling = (fieldArr, nav) => {
        switch (nav) {
            case 'R':
                for (let i = 0; i < fieldArr.length; i++) {
                    let horizontally = fieldArr[i].filter((e) => e !== 0);
                    for (let j = 1; j < horizontally.length; j++) {
                        const [first, second] = moveByIndex(horizontally[j - 1], horizontally[j]);
                        horizontally[j - 1] = first;
                        horizontally[j] = second;
                    }

                    horizontally = horizontally.filter((e) => e !== 0);
                    const newField = Array(fieldArr[i].length).fill(0);
                    newField.splice(fieldArr[i].length - horizontally.length, fieldArr[i].length, ...horizontally);

                    fieldArr[i] = newField;
                }
                break;
            case 'L':
                for (let i = 0; i < fieldArr.length; i++) {
                    let horizontally = fieldArr[i].filter((e) => e !== 0);

                    for (let j = horizontally.length - 1; j > 0; j--) {
                        const [first, second] = moveByIndex(horizontally[j - 1], horizontally[j]);
                        horizontally[j - 1] = first;
                        horizontally[j] = second;
                    }

                    horizontally = horizontally.filter((e) => e !== 0);

                    const newField = Array(fieldArr[i].length).fill(0);
                    newField.splice(0, horizontally.length, ...horizontally);

                    fieldArr[i] = newField;
                }
                break;
        }

        return fieldArr;
    }

    const getVertically = (fieldArr) => {
        let vertically = Array(fieldArr.length).fill([Array(fieldArr.length).fill(0)]);
        for (let i = 0; i < fieldArr.length; i++) {
            const t = Array(fieldArr.length).fill(0);
            for (let j = 0; j < fieldArr[i].length; j++) {
                t[j] = fieldArr[j][i];
            }
            vertically[i] = t;
        }
    }

    function solution(field, moves) {
        // U, D, R, L

        moves.split(' ').forEach(move => {
            switch (move) {
                case 'U':
                    const verticallyU = shuffling(getVertically(field), move);
                    console.log('verticallyU -> ', verticallyU);

                    break;
                case 'D':
                    const verticallyD = shuffling(getVertically(field), move);
                    console.log('verticallyD -> ', verticallyD);


                    break;
                case 'R':
                case 'L':
                    field = shuffling(field, move)
                    break;
            }
        });


        console.log(field);
        return field;
    }

    solution(field, moves);
})();
