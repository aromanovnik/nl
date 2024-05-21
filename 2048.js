(() => {
    const field = [
        [0, 2, 4, 8],
        [0, 0, 0, 0],
        [0, 2, 2, 8],
        [0, 2, 2, 2],
    ];

    const moves = 'U U U';

    function solution(field, moves) {
        // U, D, R, L

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

        const shufflingLeft = (line) => {
            console.log('LINE', line)
            let horizontally = line.filter((e) => e !== 0);

            for (let j = 0; j < horizontally.length - 1; j++) {

                const [first, second] = moveByIndex(horizontally[j], horizontally[j + 1]);
                horizontally[j] = first;
                horizontally[j + 1] = second;


                horizontally = horizontally.filter((e) => e !== 0);
            }


            const newField = Array(line.length).fill(0);
            newField.splice(0, horizontally.length, ...horizontally);
            line = newField;

            return line;
        }

        let newField = JSON.parse(JSON.stringify(field));

        const navs = moves.split(' ');
        for (let i = 0; i < navs.length; i++) {
            const move = navs[i]

            switch (move) {
                case 'U':
                    for (let j = 0; j < newField.length; j++) {
                        let col = [];
                        for (let i = 0; i < 4; i++) {
                            col.push(newField[i][j]);
                        }
                        col = shufflingLeft(col);
                        for (let i = 0; i < newField.length; i++) {
                            newField[i][j] = col[i];
                        }
                    }
                    break;
                case 'D':
                    for (let j = 0; j < newField.length; j++) {
                        let col = [];
                        for (let i = 0; i < newField.length; i++) {
                            col.push(newField[i][j]);
                        }
                        col = shufflingLeft(col.slice().reverse()).reverse();
                        for (let i = 0; i < 4; i++) {
                            newField[i][j] = col[i];
                        }
                    }
                    break;
                case 'R':
                    console.log('111', JSON.parse(JSON.stringify(newField)))
                    for (let i = 0; i < newField.length; i++) {
                        newField[i] = shufflingLeft(newField[i].reverse()).reverse()
                    }
                    break;
                case 'L':
                    for (let i = 0; i < newField.length; i++) {
                        newField[i] = shufflingLeft(newField[i])
                    }
                    break;
            }

            console.log(JSON.parse(JSON.stringify(newField)))

        }

        console.log(newField)
        return newField;
    }


    solution(field, moves);
})();
