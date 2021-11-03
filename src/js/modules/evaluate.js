import {
    Stack
} from "./stack.js";
import {
    isLegalChar,
    isOperator,
    isNumber,
    isUnary,
    bracketValid,
    calculate,
    calculateUnary,
    showMsg
} from "./util.js"
import {
    cmpOperator
} from "./cmpOperator.js";
import {
    History
} from "./history.js";
import {
    Result
} from "./cmpOpResult.js";

const notBegin = ")]}+-*/"

export const evaluate = (str) => {
    let history = new History();
    if (str.indexOf('#') != 0) {
        showMsg("第一个字符需为'#'");
        return;
    }
    if (notBegin.indexOf(str.charAt(1)) != -1) {
        showMsg("初始字符不合法");
        return;
    }
    let opStack = new Stack();
    let numStack = new Stack();
    history.log(str, opStack, numStack, "Origin");
    let char = str.charAt(0);
    str = str.slice(1);
    console.log("str.slice(): " + str);
    opStack.push(char);
    history.log(str, opStack, numStack, "Init");
    char = str.charAt(0);
    str = str.slice(1);
    console.log("str.slice(): " + str);
    while (char != '#' || opStack.top() != '#') {
        let logType = "placeHolder";
        console.log("str: " + str);
        console.log("evaluating: " + char);
        if (!isLegalChar(char)) {
            showMsg("非法输入：" + char);
            return;

        }
        if (bracketValid(char, opStack)) {
            showMsg("括号匹配错误");
            return;
        }
        if (isNumber(char)) {
            console.log(char + " is a number");
            let sum = parseInt(char);
            while (isNumber(str.charAt(0))) {
                char = str.charAt(0);
                str = str.slice(1);
                sum = sum * 10 + parseInt(char);
                console.log(sum);
            }
            numStack.push(sum);
            logType = "Number"
        }
        if (isUnary(char)) {
            switch (char) {
                case 'l':
                    if (str.indexOf('og') != 0) {
                        showMsg("符号错误，是否在尝试输入log?");
                        return;
                    }
                    char = 'log';
                    str = str.slice(2);
                    break;
                case 's':
                    if (str.indexOf('qrt') != 0) {
                        showMsg("符号错误，是否在尝试输入sqrt?");
                        return;
                    }
                    char = 'sqrt';
                    str = str.slice(3);
                    break;
                case 'a':
                    if (str.indexOf('bs') != 0) {
                        showMsg("符号错误，是否在尝试输入abs?");
                        return;
                    }
                    char = 'abs';
                    str = str.slice(2);
                    break;
                default:
                    break;
            }
        }
        if (isOperator(char)) {
            switch (cmpOperator(opStack.top(), char)) {
                case Result.CHAR:
                    opStack.push(char);
                    logType = "Char";
                    break;
                case Result.STACK:
                    let op = opStack.pop();
                    if (!isUnary(op)) {
                        if (numStack.size() < 2) {
                            showMsg("运算符错误");
                            return;
                        }
                        let scd = numStack.pop();
                        let fst = numStack.pop();
                        if (op == '/' && scd == 0) {
                            showMsg("除零错误");
                            return;
                        }
                        numStack.push(calculate(fst, op, scd));
                        logType = "Binocular";
                    } else {
                        if (numStack.size() < 1) {
                            showMsg("运算符错误");
                            return;
                        }
                        let num = numStack.pop();
                        numStack.push(calculateUnary(op, num));
                        logType = "Unary";
                    }
                    history.log(str, opStack, numStack, logType);
                    continue;
                case Result.CLOSE_BRACKET:
                    opStack.pop();
                    logType = "Bracket";
            }
        }

        history.log(str, opStack, numStack, logType);
        char = str.charAt(0);
        str = str.slice(1);

        console.log("opStack: ");
        opStack.print();
        console.log("numStack: ");
        numStack.print();
    }
    history.print();
    return history.getHistory();
}