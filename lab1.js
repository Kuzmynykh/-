const matrix = read_matrix();
const probabilities =  [0.5, 0.35, 0.15];

show_results();

function show_results() {
    console.log("Назва критерію | Оптимальнi рiшення");
    console.log("___________________________________")

    process.stdout.write("Ваальда        | ");
    show_solutions(vaald_criteria());

    process.stdout.write("Гурвiца        | ");
    show_solutions(gurwitz_criteria());

    process.stdout.write("Байєса-Лапласа | ");
    show_solutions(bayesa_laplasa_criteria());

    process.stdout.write("Модальний      | ");
    show_solutions(modal_criteria());
}

function show_solutions(array) {

    array.forEach((elem, ind) => {
        if (ind == 0 && elem == 1)
            process.stdout.write("1, ");
        else if (ind == 0 && elem != 1) process.stdout.write("3, ");
        process.stdout.write((1 + elem) + " ");
    });

    console.log();
    console.log("‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾");
}

function vaald_criteria() {
    var vaald_array = min_in_row();

    return max_index(vaald_array);

}

function savage_criteria() {
    var savage_array = max_in_row();

    var max_differences_array = max_difference(savage_array);   
    max_differences_array.forEach(console.log)
    
    return min_index(max_differences_array);
}

function gurwitz_criteria() {
    const alpha = 0.5;

    var gurwitz_array = [];

    var max_array = max_in_row();
    var min_array = min_in_row();

    for (var i = 0; i < max_array.length; i++) {
        gurwitz_array.push(
            (alpha * max_array[i]) + ((1 - alpha) * min_array[i])
        );
    }

    return max_index(gurwitz_array);
}


function bayesa_laplasa_criteria() {
    var row_sums_with_probabilities = [];
    var sum = 0;

    matrix.forEach((row) => {
        for (var i = 0; i < row.length; i++) {
            sum += row[i] * probabilities[i];
        }
        row_sums_with_probabilities.push(sum);
        sum = 0;
    });

    return max_index(row_sums_with_probabilities);
}

function modal_criteria() {
    var most_likely_index = max_index(probabilities);
    var most_likely_alternatives = [];

    matrix.forEach((row) => {
        most_likely_alternatives
        .push(row[most_likely_index]);
    });

    return max_index(most_likely_alternatives);
}



function max_difference(array) {
    var min_array = [];
    var max_differences_array = [];
    var counter = 0;

    matrix.forEach((row) => {
        min_array.push(min(row));
    });

    min_array.forEach((elem) => {
        max_differences_array.push(array[counter] - elem);
        counter++;
    });

    return max_differences_array;
}

function max_index(array) {
    var max_ = array[0];
    var max_indices = [];

    for (var i = 1; i < array.length; i++) {
        if (array[i] > max_) {
            max_ = array[i];
        }
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i] === max_) {
            max_indices.push(i);
        }
    }

    return max_indices;
}

function min_index(array) {
    var min_ = array[0];
    var min_indices = [];

    for (var i = 1; i < array.length; i++) {
        if (array[i] < min_) {
            min_ = array[i];
        }
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i] === min_) {
            min_indices.push(i);
        }
    }

    return min_indices;
}

function max(array) {
    return Math.max(...array);
}

function min(array) {
    return Math.min(...array);
}

function min_in_row() {
    var min_array = [];

    matrix.forEach((arr) => {
         min_array.push(Math.min(...arr));
    });

    return min_array;
}

function max_in_row() {
    var max_array = [];

    matrix.forEach((arr) => {
        max_array.push(Math.max(...arr));
    });

    return max_array;
}