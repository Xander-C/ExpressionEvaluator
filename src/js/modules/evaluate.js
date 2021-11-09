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
    if (notBegin.indexOf(str.charAt(1)) != -1) { //判断表达式的开始不为+*/)]}等符号
        showMsg("初始字符不合法");
        return;
    }
    let opStack = new Stack();      //操作符栈
    let numStack = new Stack();     //数字栈
    history.log(str, opStack, numStack, "Origin", []);  //初始化，将#压入运算符栈
    let char = str.charAt(0);
    str = str.slice(1);
    console.log("str.slice(): " + str);
    opStack.push(char);
    history.log(str, opStack, numStack, "Init", []);    //读取第一个字符准备开始
    char = str.charAt(0);
    str = str.slice(1);
    console.log("str.slice(): " + str);
    while (char != '#' || opStack.top() != '#') {       //while循环执行到最后一个字符为#且操作符栈顶为#结束
        let logType = "placeHolder";
        let logList = [];
        console.log("str: " + str);
        console.log("evaluating: " + char);
        if (!isLegalChar(char)) {                       //判断输入字符是否合法
            showMsg("非法输入：" + char);
            return;

        }
        if (bracketValid(char, opStack)) {              //判断括号是否匹配正确
            showMsg("括号匹配错误");
            return;
        }
        if (isNumber(char)) {                           //处理数字
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
        if (isUnary(char)) {                            //单目运算符用单词表示，特殊处理
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
        if (isOperator(char)) {                     //处理运算符
            switch (cmpOperator(opStack.top(), char)) {
                case Result.CHAR:                   //当读取到运算符优先级更大时压栈
                    opStack.push(char);
                    logType = "Char";
                    break;
                case Result.STACK:                  //当读取到栈的运算符更大时弹出计算
                    let op = opStack.pop();
                    if (!isUnary(op)) {             //计算双目运算符
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
                        logList = [fst, op, scd];
                        logType = "Binocular";
                    } else {                        //计算单目运算符
                        if (numStack.size() < 1) {
                            showMsg("运算符错误");
                            return;
                        }
                        let num = numStack.pop();
                        numStack.push(calculateUnary(op, num));
                        logList = [op, num];
                        logType = "Unary";
                    }
                    history.log(str, opStack, numStack, logType, logList);
                    continue;
                case Result.CLOSE_BRACKET:          //当需要括号闭合时对括号进行闭合
                    logList = [opStack.pop(), char];
                    logType = "Bracket";
            }
        }
        //记录本次操作并读取下一个字符
        history.log(str, opStack, numStack, logType, logList);
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