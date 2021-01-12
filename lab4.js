const column = (arr, n) => arr.map(x => x[n]);
const order = (arr) => arr.map(el => arr.concat().sort((a,b) => b - a).indexOf(el) + 1);
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const competence_coefs = [0.67, 0.7, 0.545, 0.4];
const marks_ = [
    [10, 9, 10, 7, 9, 8],
    [9, 10, 6, 10, 7, 6],
    [7, 6, 8, 9, 8, 7],
    [8, 7, 9, 9, 8, 7]
];

const marks = [
    [15, 8, 12, 6, 23, 21],
    [13, 17, 11, 24, 4, 12],
    [18, 7, 19, 6, 23, 11],
    [14, 12, 17, 5, 18, 18]
];

const weights = [0.15, 0.25, 0.3, 0.2];


show_results();

function importance_precision(marks, coefs) {
    let precisions = new Array(marks[0].length).fill(0);
    

    precisions.forEach((elem, index, arr) => 
        arr[index] += column(marks, index)
        .map((el, i) => el * coefs[i])
        .reduce((acc, el) => acc + el)
         / coefs.length);

    return precisions;
}

function rank_function(ranks) {
    let liambdas = new Array(ranks.length).fill(0);

    liambdas.forEach((el, ind, arr) => 
      arr[ind] =  2.0 * Math.abs(
        ((ranks.length + 1.0) - ranks[ind]) /
        (ranks.length * (ranks.length + 1))));

    return liambdas;
}

function transposed(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

function sums_array(rows) { 
    let sums = [];
    rows.forEach(row => {
        sums.push(sum(row)); 
    });

    return sums;
}

function sums_r_array(rows) { 
    let sums = [];
    rows.forEach((row => {
        sums.push(sum(row.map((el, ind) => el * weights[ind]))) 
    }));

    return sums;
}

function show_results() {
    process.stdout.write("# | вага | f1   |  f2  |  f3   |  f4  |  f5  |  f6 \n");
    marks.forEach((row, ind) => {
        process.stdout.write((ind + 1) + " | " + weights[ind] + " | ");
        show_arr(row);
    });

    process.stdout.write("S | ");
    let sums = sums_array(transposed(marks));
    show_arr(sums);

    process.stdout.write("Sr | ");
    let sums_r = sums_r_array(transposed(marks));
    show_arr(sums_r);
    
    // process.stdout.write("Mi| ");
    // let importance_coefs = importance_precision(marks, competence_coefs);
    // show_arr(importance_coefs);

    // process.stdout.write("Ri|");
    // let ranks = order(importance_coefs)
    // show_arr(ranks);

    // process.stdout.write("λ |");
    // show_arr(rank_function(ranks));
}

function show_arr(array) {

    array.forEach((elem) => {
        process.stdout.write(new Number(elem).toFixed(2) + " | ");
    });

    console.log();
    console.log("‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾");
}



