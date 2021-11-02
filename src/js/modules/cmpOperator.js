import {
    Result
} from "./cmpOpResult.js"

const smallerThanPlus = "#([{";
const biggerThanTimes = "^logsqrtabs)]}";
const biggerThanPower = "logsqrtabs)]}";
const biggerThanUnary = ")]}";

const seq = "#{[(+-*/^)]}"

export const cmpOperator = (inStack, char) => {
    console.log("comparing: " + inStack + " and " + char);
    switch (char) {
        case '+':
        case '-':
            return smallerThanPlus.indexOf(inStack) != -1 ? Result.CHAR : Result.STACK;
        case '*':
        case '/':
            return biggerThanTimes.indexOf(inStack) != -1 ? Result.STACK : Result.CHAR;
        case '^':
            return biggerThanPower.indexOf(inStack) != -1 ? Result.STACK : Result.CHAR;
        case 'log':
        case 'sqrt':
        case 'abs':
            return biggerThanUnary.indexOf(inStack) != -1 ? Result.STACK : Result.CHAR;
        case '(':
            return Result.CHAR;
        case ')':
            return inStack == '(' ? Result.CLOSE_BRACKET : Result.STACK;
        case '#':
            return inStack == '#' ? Result.CLOSE_BRACKET : Result.STACK;
        case '[':
            return inStack == ')' ? Result.STACK : Result.CHAR;
        case ']':
            return inStack == '[' ? Result.CLOSE_BRACKET : Result.STACK;
        case '{':
            return (inStack == ')' || inStack == ']') ? Result.STACK : Result.CHAR;
        case '}':
            return inStack == '{' ? Result.CLOSE_BRACKET : Result.STACK;
        default:
            alert("character error");
            break;
    }
}