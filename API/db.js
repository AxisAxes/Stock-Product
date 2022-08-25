	

async function connect(){
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://ProductManager:Product12345@localhost:3306/product");
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
async function selectAllProducts(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM pet;');
    return rows;
}

async function insertProducts(pet) {
    const conn = await connect();
    const sql = 'INSERT INTO pet(dataP, openP, high, lowP, closeP, volume, status) VALUES (?,?,?,?,?,?,?);';
    const addingID = 'SELECT itemID FROM pet ORDER BY itemID DESC LIMIT 1'
    const values = [
        Integer.parseInt(addingID)+1,
        pet.dataP, pet.openP,
        pet.high, pet.lowP, 
        pet.closeP, pet.volume, pet.status
    ];
    return await conn.query(sql, values);
}

connect();
module.exports = {selectAllProducts, insertProducts}