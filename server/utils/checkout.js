const cartModel = require("../database/models/cartSchema");
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment')
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const CIPHER_ALGORITHM = 'aes-256-ctr';
const key = '12345678123456781234567812345678'


function encryptCC(cc) {
    if (checkCC(cc)) {
        let sha256 = crypto.createHash('sha256');
        sha256.update(key);
        let iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(CIPHER_ALGORITHM, sha256.digest(), iv);
        let ciphertext = cipher.update(Buffer.from(cc));
        let encrypted = Buffer.concat([iv, ciphertext, cipher.final()]).toString('base64');
        return encrypted;
    }
    return false
}

function decryptCC(encryptedCC) {
    let sha256 = crypto.createHash('sha256');
    sha256.update(key);
    let input = Buffer.from(encryptedCC, 'base64');
    let iv = input.slice(0, 16);
    let decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, sha256.digest(), iv);
    let ciphertext = input.slice(16);
    let plaintext = decipher.update(ciphertext) + decipher.final();
    plaintext = plaintext.replace(/.(?=.{4})/g, '*').toString().slice(-8);
    return plaintext;
}

function checkCC(cc) {
    if (/^4580+[0-9]{12}$|^4557+[0-9]{12}$/.test(cc)) {
        return 'visa'
    }
    if (/^5326(1003)[0-9]{8}$|^5326(1011)[0-9]{8}$|^5326(1012)[0-9]{8}$|^5326(1013)[0-9]{8}$|^5326(1014)[0-9]{8}$|^5326(1103)[0-9]{8}$/.test(cc)) {
        return "master card by isracard"
    }
    if (/^5189(54)+[0-9]{10}$|5189(89)+[0-9]{10}$|5189(46)+[0-9]{10}$|5189(06)+[0-9]{10}$|5189(07)+[0-9]{10}$|5189(83)+[0-9]{10}$/.test(cc)) {
        return "master card by cal"
    }

    if (/^1[0-9]{1,12}$|^2[0-9]{1,12}$|^2[0-9]{1,12}$|^6[0-9]{1,12}$|^7[0-9]{1,12}$|^8[0-9]{1,12}$|^9[0-9]{1,12}$/.test(cc)) {
        return "private 12 digits card"
    }
    if (/^36[0-9]{14}/.test(cc)) {
        return "diners"
    }
    if (/^3755[0-9]{12}/.test(cc)) {
        return "american express"
    }
    return false
}

module.exports = {
    encryptCC,
    decryptCC,
    checkCC
}