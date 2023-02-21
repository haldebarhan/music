const generateOPT = (): string => {
    var digits = '0123456789'
    let OPT = ''
    for (let i = 0; i < 6; i++) {
        OPT += digits[Math.floor(Math.random() * 10)]
    }
    return OPT
}

export default generateOPT