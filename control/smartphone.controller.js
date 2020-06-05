var Smartphone = require('../model/smartphone.model');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
let urlencodeParser=bodyParser.urlencoded({extended:false});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//Adiciona ao banco de dados
exports.smartphone_create = ('/create',  function (req,res){
    MongoClient.connect(url, function (err, db) {
            res.send( "_ID: " + req.body._id + "Nome: "+ req.body.nome + "Marca: " + req.body.marca);
             var mydocuments = [
               {
               _id: req.body._id,
               nome: req.body.nome,
               marca: req.body.marca}
             ];
            if (err) throw err;
            var dbo = db.db("smartphone");
            dbo.collection("smartphone").insertMany(mydocuments, function  (err, res) {
              if (err) throw err;
              console.log(res.insertedCount+" Documento Inserido ");
              db.close("smartphone");
            });
          });
    });
