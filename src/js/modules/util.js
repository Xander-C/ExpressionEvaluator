import {
    Result
} from "./cmpOpResult.js"

const operators = "()+-*/^#[]{}logsqrtabs";
const legalChar = "()+-*/^#[]{}0123456789lsa";
const unary = "logsqrtabs"
const numbers = "1234567890";
const smallerThanPlus = "#([{";
const biggerThanTimes = "^logsqrtabs)]}";
const biggerThanPower = "logsqrtabs)]}";
const biggerThanUnary = ")]}";

const seq = "#{[(+-*/^)]}"

export const isLegalChar = (char) => {
    return legalChar.indexOf(char) != -1;
}

export const isOperator = (char) => {
    return operators.indexOf(char) != -1;
}

export const isUnary = (char) => {
    return unary.indexOf(char) != -1;
}

export const isNumber = (char) => {
    return numbers.indexOf(char) != -1;
}

export const bracketValid = (char, opStack) => {
    return (char == ')' && !opStack.contain('(')) || ((char == ']' && !opStack.contain('['))) || ((char == '}' && !opStack.contain('{')));
}

export const calculate = (fst, op, scd) => {
    switch (op) {
        case '+':
            return fst + scd;
        case '-':
            return fst - scd;
        case '*':
            return fst * scd;
        case '/':
            return fst / scd;
        case '^':
            return fst ** scd;
        default:
            alert("calculate() illegal arg: " + op);
            break;
    }
}

export const calculateUnary = (op, num) => {
    switch (op) {
        case 'log':
            return Math.log(num);
        case 'sqrt':
            return Math.sqrt(num);
        case 'abs':
            return Math.abs(num);
        default:
            alert("calculateUnary() illegal arg: " + op);
            break;
    }
}

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

export const showMsg = (msg) => {
    layer.alert(msg, {
        skin: 'layui-layer-lan',
        closeBtn: 0,
        anim: 4
    });
}