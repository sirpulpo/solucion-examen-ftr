const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

let obj = {
    T: 0,
    N: [],
    M: [],
    target: ['U', 'R', 'D', 'L', ],
};


function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}


async function start() {

    // 1° leemos y validamos a T.
    let t = await ask('T: ');
    t = Number(t);
    if ((t < 1 || t > 5000) || !Number(t)) {
        do {
            t = await ask('Repite T: ');
            t = Number(t);
        } while ((t < 1 || t > 5000) || !Number(t));
    }
    obj.T = t;

    // 2° Leemos y validamos tantas N's y M's según el valor de T.
    for (let i = 1; i <= obj.T; i++) {
        let nm = await ask(`N${i} y M${i}: `);
        let n_m = nm.split(' ');
        let n = Number(n_m[0]);
        let m = Number(n_m[1]);

        if (n < 1 || !Number(n)) {
            do {
                n = await ask(`Repite N${i}: `);
                n = Number(n);
            } while (n < 1 || !Number(n));
        }

        if ((m < 1 || m > 10000000000) || !Number(m)) {
            do {
                m = await ask(`Repite M${i}: `);
                m = Number(m);
            } while ((m < 1 || m > 10000000000) || !Number(m));
        }

        obj.N.push(n);
        obj.M.push(m);
    }

    // 3° Comenzamos con los calculos.
    for (let i = 0; i < obj.T; i++) {
        let N = obj.N[i]
        let M = obj.M[i]
        let n_land = obj.N[i] * obj.M[i];
        let land = [];
        let x = 0;
        let y = 0;
        let direccion = 0;

        for (let n = 0; n < N; n++) {
            land[n] = [];
            for (let m = 0; m < M; m++) {
                land[n][m] = false;
            }
        }

        for (let j = 0; j < n_land; j++) {
            land[x][y] = true;
            // console.log(x, y);

            switch (direccion) {
                case 0:
                    if (y < M - 1 && land[x][y + 1] === false) {
                        y++;
                    } else {
                        direccion = 1;
                        x++;
                    }
                    break;

                case 1:
                    if (x < N - 1 && land[x + 1][y] === false) {
                        x++;
                    } else {
                        direccion = 2;
                        y--;
                    }
                    break;

                case 2:
                    if (y > 0 && land[x][y - 1] === false) {
                        y--;
                    } else {
                        direccion = 3;
                        x--;
                    }
                    break;

                case 3:
                    if (x > 0 && land[x - 1][y] === false) {
                        x--;
                    } else {
                        direccion = 0;
                        y++;
                    }
                    break;
            }
        }

        console.log(obj.target[direccion]);
    }

    process.exit();
}


start();