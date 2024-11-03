module.exports = {
    getProduk: (args, req) => {
        const { usia, mpp, perioddana, ispria, danaupto } = args;
        let xmpp;

        if (mpp?.toUpperCase() === "MPP1") {
            xmpp = 5;
        } else if (mpp?.toUpperCase() === "MPP2") {
            xmpp = 10;
        } else if (mpp?.toUpperCase() === "MPP3") {
            xmpp = 15;
        } else {
            xmpp = 20;
        }

        return new Promise((resolve, reject) => {
            const { myconn } = require(`../dbconnectionmid`)();

            myconn.query(
                `SELECT tp.urut, tp.usiasampaidengan, tp.mpp, tp.usiatertanggung,
                    tp.pria, tp.priab, tp.priac, tp.wanitaa, tp.wanitab, tp.wanitac,
                    tprod.kodeproduk, tprod.namaproduk
                FROM tblpremi tp
                JOIN tblproduk tprod
                ON (CASE 
                        WHEN tp.usiasampaidengan = 55 THEN tprod.kodeproduk = 'PD0001'
                        WHEN tp.usiasampaidengan = 60 THEN tprod.kodeproduk = 'PD0002'
                        WHEN tp.usiasampaidengan = 75 THEN tprod.kodeproduk = 'PD0003'
                        WHEN tp.usiasampaidengan = 100 THEN tprod.kodeproduk = 'PD0004'
                    END)
                WHERE tp.usiasampaidengan IN (55, 60, 75, 100) AND usiatertanggung = ? AND mpp = ?`,
                [usia, xmpp],
                (err, res) => {
                    myconn.end();
                    if (err) return reject(err);

                    if (res && res.length > 0) {
                        const xDataKotor = res
                            .filter(item => parseInt(usia) <= item.usiasampaidengan)
                            .sort((a, b) => a.usiasampaidengan - b.usiasampaidengan)[0];

                        let xDataBersih;

                        if (danaupto?.toUpperCase() === "UP1") {
                            xDataBersih = {
                                ...xDataKotor,
                                harga: (ispria ? xDataKotor.pria : xDataKotor.wanitaa) * (perioddana - 2) 
                            };
                        } else if (danaupto?.toUpperCase() === "UP2") {
                            xDataBersih = {
                                ...xDataKotor,
                                harga: (ispria ? xDataKotor.priab : xDataKotor.wanitab) * (perioddana - 2) 
                            };
                        } else {
                            xDataBersih = {
                                ...xDataKotor,
                                harga: (ispria ? xDataKotor.priac : xDataKotor.wanitac) * (perioddana - 2) 
                            };
                        }
                        resolve([xDataBersih]);
                    } else {
                        reject("No matching data found.");
                    }
                }
            );
        });
    },
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
