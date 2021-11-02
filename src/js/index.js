import {
    Stack
} from "./modules/stack.js";
import {
    isLegalChar,
    isOperator,
    isNumber,
    isUnary,
    bracketValid,
    calculate,
    calculateUnary,
    showMsg
} from "./modules/util.js"
import {
    cmpOperator
} from "./modules/cmpOperator.js";
import {
    History
} from "./modules/history.js";
import {
    Result
} from "./modules/cmpOpResult.js";

const notBegin = ")]}+-*/"

document.querySelector("#eval-btn").addEventListener("click", () => {
    let str = document.querySelector("#eval-input").value;
    console.log(str);
    let history = evaluate(str);
    let ans = history[history.length - 1][2][0];
    if (ans != null && history[history.length - 1][2].length == 1) {
        alert("结果为：" + ans);
    }
})

const evaluate = (str) => {
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
    history.log(str, opStack, numStack, "origin");
    let char = str.charAt(0);
    str = str.slice(1);
    console.log("str.slice(): " + str);
    opStack.push(char);
    history.log(str, opStack, numStack, "init");
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
                        numStack.push(calculate(fst, op, scd));
                    } else {
                        if (numStack.size() < 1) {
                            showMsg("运算符错误");
                            return;
                        }
                        let num = numStack.pop();
                        numStack.push(calculateUnary(op, num));
                    }
                    history.log(str, opStack, numStack, "Stack");
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