const fs = require("fs");

fs.rename("mwpagi.json", "mwsore.json", (err) =>{
    if(err) {
        return console.error(err);
    }

    console.log("Berhasil mengganti nama!");
});