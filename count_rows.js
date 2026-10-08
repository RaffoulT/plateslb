const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\Users\\Raffoul\\lebanon_plates_images\\CARS NUMBER 05-05-2026 (1).mdb;');

async function getCount() {
    try {
        const results = await connection.query('SELECT COUNT(*) AS total FROM CARMDI');
        console.log("Total rows in CARMDI:", results[0].total);
    } catch (e) {
        console.error(e);
    }
}
getCount();
