const fs = require("fs");

fs.appendFile("mw.txt", "Kelas Mobile dan Web!", function (err) {
    if (err) throw err;
    console.log("Berhasil disimpan!");
});