	

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
    console.log(rows)
    return rows;
}

async function insertPolicy(policy) {
    const conn = await connect();
    const sql = 'INSERT INTO policy(policy1, policy2, policy3, policyID) VALUES (?,?,?,?);';
    const values = [
        
        element.Date, parseFloat(element.Open),
        parseFloat(element.High), parseFloat(element.Low), 
        parseFloat(element.Close), parseFloat(element.Volume), 1
        
    ];
    return await conn.query(sql, values);

    
}

async function insertProducts(pet) {
    const conn = await connect();
    var valuesF = [];
    for (let size = 0; size < pet.length; size++) {
        const element = pet[size];
        console.log(element.Date)
        const sql = 'INSERT INTO pet(dataP, openP, high, lowP, closeP, volume, itemID, statusID,) VALUES (?,?,?,?,?,?,?,?);';
        const addingID = await conn.query('SELECT itemID FROM pet ORDER BY itemID DESC LIMIT 1')
        console.log(addingID[0][0].itemID)
        const values = [
            
            element.Date, parseFloat(element.Open),
            parseFloat(element.High), parseFloat(element.Low), 
            parseFloat(element.Close), parseFloat(element.Volume),addingID[0][0].itemID+1 , 1
            
        ];
        valuesF.push(conn.query(sql, values));

    }
    console.log(valuesF)
    return await valuesF;
  
}

connect();
module.exports = {selectAllProducts, insertProducts}