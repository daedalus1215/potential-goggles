export const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
        return (str.substr(0, maxLength)).trim() + "...";
    }
    return str;
}