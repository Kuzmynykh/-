const budget = [780, 230];
const incomes = [250, 220];
const losses = [-60, -60];
const probability = [0.8, 0.2, 0.8, 0.2, 0.75, 0.25, 0.9, 0.1];
const BGE = [budget[0], budget[1], budget[0], budget[1]];
let OGO = [];
let result = [];

console.log(`\t\t\t ______________________________________`);
console.log(`\t\t\t|                                      |`);
console.log(`\t\t\t|Таблиці вхідних умов для вузлів 1-4 |`);
console.log(`\t\t\t|______________________________________|`);
console.log();
console.log();

console.log(`Вузол 1. Побудова великого заводу негайно.`);
console.log();
console.log(`            |` + `Великий попит` + `  Низький попит`);
console.log(`____________ ` + `_____________` + `  _____________`);
console.log(`Дохід       |      ` + incomes[0] + `           ` + losses[0]);
console.log(`Ймовірність |      ` + probability[0] + `          ` + probability[1]);
OGO[0] = count_ogo(1, probability[0], incomes[0], probability[1], losses[0], 5);
result[0] = OGO[0] - budget[0];
console.log(`__________________________________________`);
console.log();

console.log(`Вузол 2. Побудова малого заводу негайно.`);
console.log();
console.log(`            |` + `Великий попит` + `  Низький попит`);
console.log(`____________ ` + `_____________` + `  _____________`);
console.log(`Дохід       |      ` + incomes[1] + `           ` + losses[1]);
console.log(`Ймовірність |      ` + probability[2] + `          ` + probability[3]);
console.log();
OGO[1] = count_ogo(1, probability[2], incomes[1], probability[3], losses[1], 5);
result[1] = OGO[1] - budget[1];
console.log(`__________________________________________`);
console.log();

console.log(`Вузол 3. Побудова великого заводу через 1 рік. Ймовірність - ` + probability[4]);
console.log();
console.log(`            |` + `Великий попит` + `  Низький попит`);
console.log(`____________ ` + `_____________` + `  _____________`);
console.log(`Дохід      |      ` + incomes[0] + `           ` + losses[0]);
console.log(`Ймовірність|      ` + probability[6] + `          ` + probability[7]);
console.log();
OGO[2] = count_ogo(probability[4], probability[6], incomes[0], probability[7], losses[0], 4);
result[2] = OGO[2] - budget[0];
console.log(`__________________________________________`);
console.log();

console.log(`Вузол 4. Побудова малого заводу через 1 рік. Ймовірність - ` + probability[5]);
console.log();
console.log(`            |` + `Великий попит` + `  Низький попит`);
console.log(`____________ ` + `_____________` + `  _____________`);
console.log(`Дохід      |      ` + incomes[1] + `           ` + losses[1]);
console.log(`Ймовірність|      ` + probability[6] + `          ` + probability[7]);
console.log();
OGO[3] = count_ogo(probability[5], probability[6], incomes[1], probability[7], losses[1], 4);
result[3] = OGO[3] - budget[1];
console.log(`__________________________________________`);
console.log();

console.log(`\t\t\t ______________________________________`);
console.log(`\t\t\t|                                      |`);
console.log(`\t\t\t|    Таблиця очікуваних доходів     |`);
console.log(`\t\t\t|______________________________________|`);
console.log();
console.log();
console.log();
console.log(`  `, `Вузол`, ` ОГО`, `БГЕ`, `  Очікувані доходи`);
console.log(`  `, `_____`, `______`, `___`, `  ________________`);
let max = 0;
let min = result[0];
let index1 = 0;
let index2 = 0;
for (let i = 0; i < 4; i++)
{
    if (result[i] > max)
    {
        max = result[i];
        index1 = i + 1;
    }
    if (result[i] < min)
    {
        min = result[i];
        index2 = i + 1;
    }
    console.log(`    ${(i + 1)}      ${round(OGO[i], 1)}      ${BGE[i]}      ${round(result[i], 2)}`);
}

console.log();
console.log(`Найефективніше рішення - ${index1} з доходом ${max} тис.`);
console.log(`Найменш ефективне рішення - ${index2} зі збитками ${(min * -1)} тис.`);

function count_ogo(prob, income_prob, income, loss_prob, loss, years) {
    return prob * (income_prob * income + loss_prob * loss) * years;
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
