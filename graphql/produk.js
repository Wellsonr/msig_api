module.exports = {
    listProduk: (args, req) => {
        return new Promise((resolve, reject) => {
            const { myconn } = require(`../dbconnectionmid`)();
            myconn.query(`SELECT urut, namaproduk, aktif FROM tblproduk`, (err, res) => {
                if (err) {
                    myconn.end();
                    return reject(err);
                } else {
                    myconn.end();
                    resolve(res);
                }
            });
        });
    },

    addProduk: (args, req) => {
        return new Promise((resolve, reject) => {
            const { myconn } = require(`../dbconnectionmid`)();
            const sql = `
                INSERT INTO tblproduk (namaproduk, aktif) 
                VALUES (?, ?)
            `;
            myconn.query(sql, [args.namaproduk, 1], (err, res) => {
                if (err) {
                    console.error("Error inserting product:", err);
                    myconn.end(); // Close the connection on error
                    return reject(err);
                }
                myconn.end(); // Close the connection after query
                resolve(res.affectedRows > 0);
            });
        });
    },

    simpanForm: (args, req) => {
        const {
            name,
            jenisKelamin,
            tempatLahir,
            tanggalLahir,
            namaibukandung,
            pernikahan,
            agama,
            kewarganegaraan,
            ktpImage,
            nik,
            hobi,
            perusahaan,
            jenisUsaha,
            pekerjaan,
            desckerja,
            email,
            nohp,
            ischkpolis,
            alamat,
            negara,
            alamatKorespondensi,
            npwp,
            iswajibpajak,
            sumberdana,
            perkiraangrossyear,
            reasonasuransi,
            relation,
            jamin // Make sure `jamin` is included if needed, or remove from columns if not required
        } = args.input;

        return new Promise((resolve, reject) => {
            const { myconn } = require(`../dbconnectionmid`)();
            const sql = `
                INSERT INTO tblpendaftaran 
                (
                    nama, jeniskelamin, kotalahir, tanggallahir, namaibukandung, 
                    statuspernikahan, agama, kewarganegaraan, ktpImage, nik, 
                    hobi, namaperusahaan, jenisusaha, pekerjaan, desckerja, 
                    email, nohp, ischkpolis, alamat, negara, 
                    alamatkorespondensi, npwp, iswajibpajak, sumberdana, 
                    perkiraangrossyear, reasonasuransi, relation, jamin
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
            `;

            myconn.query(
                sql,
                [
                    name,
                    jenisKelamin,
                    tempatLahir,
                    tanggalLahir,
                    namaibukandung,
                    pernikahan,
                    agama,
                    kewarganegaraan,
                    ktpImage,
                    nik,
                    hobi,
                    perusahaan,
                    jenisUsaha,
                    pekerjaan,
                    desckerja,
                    email,
                    nohp,
                    ischkpolis,
                    alamat,
                    negara,
                    alamatKorespondensi,
                    npwp,
                    iswajibpajak,
                    sumberdana,
                    perkiraangrossyear,
                    reasonasuransi,
                    relation,
                    jamin // Include `jamin` value here
                ],
                (err, results) => {
                    if (err) return reject(err);
                    if (results && results.affectedRows > 0) {
                        myconn.end();
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                }
            );
        });
    }
};
