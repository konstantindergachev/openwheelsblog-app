const limitText = (text, limit = 400) => {
    const newText = [];
    if (text.length > limit) {
        text.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newText.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newText.join(' ')} ...`;
    }
    return text;
};
module.exports = limitText;