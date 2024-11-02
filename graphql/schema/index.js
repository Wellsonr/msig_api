const { GraphQLScalarType, GraphQLEnumType, buildSchema } = require('graphql');
const moment = require('moment-timezone')

const DateType = new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return moment(value).format("DD MMM YYYY")
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value)
        }
        return null
    }
})

const DateTimeType = new GraphQLScalarType({
    name: "DateTime",
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return moment(value).format("DD MMM YYYY hh:mm:ss A")
    },
    parseLiteral(ast) {
        return new Date(ast.value)
    }
})


const genderType = new GraphQLEnumType({
    name: 'GenderType',
    values: {
        MALE: {
            value: 'M'
        },
        FEMALE: {
            value: 'F'
        }
    }
})


const queryString = `

scalar Date

scalar DateTime

enum Gender{
    MALE
    FEMALE
}

type tblProduk {
    urut: Int
    namaproduk: String
    aktif: Boolean
}

input tblForm { 
    name: String
    jenisKelamin: String
    tempatLahir: String
    tanggalLahir: DateTime
    namaibukandung: String
    pernikahan: String
    agama: String
    kewarganegaraan: String
    ktpImage: String
    nik: String
    hobi: String
    perusahaan: String
    jenisUsaha: String
    pekerjaan :String
    desckerja: String
    email: String
    nohp: String
    ischkpolis: Boolean
    alamat: String
    negara: String
    alamatKorespondensi: String
    npwp: String
    iswajibpajak: Boolean
    sumberdana: String
    perkiraangrossyear: String
    reasonasuransi: Boolean
    relation: String
}


type query{
    listProduk: [tblProduk]
}
type mutation{
    addProduk(namaproduk: String!): Boolean
    simpanForm(input: tblForm):Boolean
}


schema{
    query:query
    mutation:mutation
}

`
const query = buildSchema(queryString);

// console.log(queryString);
Object.assign(query._typeMap.Date, DateType);
Object.assign(query._typeMap.DateTime, DateTimeType);
Object.assign(query._typeMap.Gender, genderType);
module.exports = query;
