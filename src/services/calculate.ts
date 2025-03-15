export function calculate(expression: string): string {
  const numbers: number[] = [];
  const operators: string[] = [];
  let currentNumber = "";

  if (
    expression.length === 0 ||
    (!expression.includes("*") && !expression.includes("/"))
  ) {
    return expression;
  }

  for (const char of expression) {
    if ("0123456789".includes(char)) {
      currentNumber += char;
    } else if ("*/".includes(char)) {
      if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
        currentNumber = "";
      }
      operators.push(char);
    }
  }

  if (currentNumber) numbers.push(parseFloat(currentNumber));

  if (numbers.length === 0) return "0";

  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "*") {
      result *= numbers[i + 1];
    } else if (operators[i] === "/") {
      if (numbers[i + 1] === 0) return "Error";
      result /= numbers[i + 1];
    }
  }

  return result.toString();
}
