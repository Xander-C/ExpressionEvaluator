import {
    Result
} from "./cmpOpResult.js"

const priorityMap = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
    "^": 3,
    "log": 4,
    "sqrt": 4,
    "abs": 4,
};

export const cmpOperator = (inStack, char) => {
    console.log("comparing: " + inStack + " and " + char);
    switch (char) {
        case '(':
        case '[':
        case '{':
            return Result.CHAR;
        case ')':
            return inStack == '(' ? Result.CLOSE_BRACKET : Result.STACK;
        case ']':
            return inStack == '[' ? Result.CLOSE_BRACKET : Result.STACK;
        case '}':
            return inStack == '{' ? Result.CLOSE_BRACKET : Result.STACK;
        case '#':
            return inStack == '#' ? Result.CLOSE_BRACKET : Result.STACK;
        default:
            return priorityMap[inStack] > priorityMap[char] ? Result.STACK : Result.CHAR;
    }
}