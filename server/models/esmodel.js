'use strict';
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
module.exports = client;
var indexName = 'devspotcrunch';

module.exports = function(Esmodel) {

    //create or update index
    Esmodel.creteUpdateIndex = function(data, docType){
        return new Promise(function(resolve, reject){
            client.index({
                index : indexName ,
                id : data.id,
                type :docType,
                body : data
            },function(err, resp, status){
                if(!err){
                    resolve(resp)
                }else{
                    reject(err);
                }
            })
        })
    };


    //get document count
    Esmodel.getDocCount = function(docType){
        return new Promise(function(resolve, reject){
            client.count(
                {
                    index : indexName,
                    type : docType
                },
                function(err, resp, status){
                    if(!err){
                        resolve(resp)
                    }else{
                        reject(err);
                    }
                }
            )
        })
    }


    //Delete document
    Esmodel.deleteDocument  = function(docType, docId){
        console.log('docId' , docId);
        return new Promise(function(resolve, reject){
            client.delete(
                {
                    index : indexName,
                    type : docType,
                    id : docId
                },
                function(err, resp, status){
                    if(!err){
                        console.log('delete doc type');
                        resolve(resp)
                    }else{
                        console.log('could not delete doc type', err);
                        reject(err);
                    }
                }
            )
        })
    }

    //delete index
};
