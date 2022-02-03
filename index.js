const mongoose = require("mongoose");
const Amad = require("./Amad");
mongoose.connect("mongodb://localhost/testdb");
const ADODB = require("node-adodb");
const AMAD =
  "SELECT AMADNO,DATE,PARTY,VILL,COMM ,KISM ,MARK1 ,YR,Room ,chatta,gulla from amad";

run();

async function run() {
  try {
    const connection = ADODB.open(
      `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:/Users/pankaj/Desktop/cold_storage/data/inbound/papgudcs.2019.2.mdb;Jet OLEDB:Database Password=state;Persist Security Info=False;`
    );
    // Query the DB
    const data = await connection.query(AMAD);
    console.log(`data.length ==> ${data.length}`);
    for (let i = 0; i <= data.length; i++) {
      let repacement = data[i];
      if (!(repacement == undefined)) {
        const amad = await Amad.create({
          coldId: "lodhirajcs",
          amadNo: repacement.amadNo,
          date: repacement.DATE,
          party: repacement.PARTY,
          village: repacement.VILL,
          commodity: repacement.COMM,
          kism: repacement.KISM,
          lotNo: repacement.MARK1,
          year: repacement.YR,
          chamberNo: repacement.Room,
          chatta: repacement.chatta,
          gulla: repacement.gulla,
        });
        amad.save();
        console.log(amad);
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}