module.exports = {
    getDate: getDateFunc,
    port: 3000
}

function getDateFunc() {
    return `Our date is -- ${new Date()}`;
}