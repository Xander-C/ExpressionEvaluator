const operators = "()+-*/^#[]{}logsqrtabs";
const legalChar = "()+-*/^#[]{}0123456789lsa";
const unary = "logsqrtabs"
const numbers = "1234567890";

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

export const showMsg = (msg) => {
    layer.alert(msg, {
        skin: 'layui-layer-lan',
        closeBtn: 0,
        anim: 4
    });
}