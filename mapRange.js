/* usage

let v = 0.5; // example
let mapped = mapRange(v, -1, 1, -0.05, 0.05);
console.log(mapped); // 0.025

*/

function mapRange(value, inMin, inMax, outMin, outMax) {
    return outMin + ( (value - inMin) * (outMax - outMin) ) / (inMax - inMin);
}