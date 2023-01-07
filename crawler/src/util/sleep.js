module.exports = () => {
    // use random
    return new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (6000 - 3000 + 1) + 3000)));
}  