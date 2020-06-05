var Smartphone = require('../model/smartphone.model');
//require('../route/smartphone.route.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
let urlencodeParser=bodyParser.urlencoded({extended:false});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

exports.testar = function (req, res) {
    res.send('Olá! Seja Bem vindo !');
};



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

// Atualiza o banco de dados
exports.smartphone_update = function () {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("smartphone");
        var myquery = {nome : /alan/ };
        var newdocument = {$set: {marca:"Jaque"}};
        dbo.collection("smartphone").updateMany(myquery,newdocument,function  (err, res) {
            if (err) throw err;
            console.log(res.result.nModified +" Documentos Atualizados ");
            db.close("smartphone");
        });
    });
};
// deleta o banco de dados
exports.smartphone_delete = function () {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("smartphone");
        var myquery = { _id : "5ec09befc974bc63b80fc1a6" };
        dbo.collection("smartphone").drop(myquery,function  (err, res) {
            if (err) throw err;
            console.log(" Documentos Excluidos ");
            db.close("smartphone");
        });
    });
};
/*
exports.smartphone_listar =  function (req,res){
        const fetch = require('node-fetch');
        fetch('https://swapi.dev/api/people/1').then((res)=>{
            return res.json();
            }).then((json) => {
                var x = json;
                //document.getElementById("demo2").innerHTML = (JSON.stringify(x,null,4));
                res.send("Resultado"+ (JSON.stringify(x,null,4)));
                 // res.send("Resultado: " + innerHTML(ajax,null,4));
            });
};
*/

exports.smartphone_listar =  function (req,res){
    MongoClient.connect(url,  function(err, db) {
        if (err) throw err;
                var dbo = db.db("smartphone");
                dbo.collection("smartphone").find({}, {projection: { _id: 0} }).toArray(function(err, result) {
                  if (err) throw err;
                  console.log(result);
                  res.send("Resultado" + (JSON.stringify(result,null,4)));
                 // res.send("Resultado: " + innerHTML(ajax,null,4));
                });
        });
};


