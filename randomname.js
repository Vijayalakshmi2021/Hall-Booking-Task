const createRandomString = () => {
    const chars =
        "AELRST"; //ABCDEFGHIJKLMNOPQRSTUVWXYZ
    let result = "";
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export default createRandomString;