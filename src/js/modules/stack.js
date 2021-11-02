export function Stack() {

    var items = [];

    this.push = (element) => {
        items.push(element);
    };

    this.pop = () => {
        return items.pop();
    };

    this.top = () => {
        return items[items.length - 1];
    };

    this.isEmpty = () => {
        return items.length == 0;
    };

    this.size = () => {
        return items.length;
    };

    this.clear = () => {
        items = [];
    };

    this.print = () => {
        console.log(items.toString());
    };

    this.toString = () => {
        return items.toString();
    };

    this.contain = (element) => {
        return items.includes(element);
    };

    this.snapshot = () => {
        return [...items];
    };
}