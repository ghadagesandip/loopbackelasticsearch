'use strict';
var elasticsearch = require('elasticsearch');
var config = require('../config.json');

var client = new elasticsearch.Client(config.elasticSearch.es_config);
module.exports = client;

var indexName = config.elasticSearch.indexName;


module.exports = function(Elasticodel) {

    //create or update index
    Elasticodel.creteUpdateIndex = function(data, docType){
        return new Promise(function(resolve, reject){
            client.index({
                index : indexName ,
                type :docType,
                body : data,
                id : data.id
            },function(err, resp, status){
                if(!err){
                    resolve(resp)
                }else{
                    reject(err);
                }
            })
        })
    };

    // reindex doc type it will delete all
    Elasticodel.reIndexDocType = function(docType, data){

        return new Promise(function(resolve, reject){

            Elasticodel.deleteDocType(docType)
                .then(function(value){
                    console.log(value);
                    console.log('started indexing')
                    for(let dataItem of data){

                        Elasticodel.creteUpdateIndex(dataItem,docType)
                            .then(function(newData){
                                console.log('indexed')
                            })
                            .catch(function(reasone){
                                console.log('not indexed')
                            })
                    }
                    console.log('end indexing');
                    console.log('sending response');
                    resolve(true);
                    console.log('send response');

                })
                .catch(function(reason){
                    reject(reason)
                })



        })
    }



    //get a document
    Elasticodel.getDocumentByTypeId = function(docType, typeID){
        return new Promise(function(resolve, reject){
            client.get({
                index : indexName,
                type : docType,
                id : typeID
            },function(err, resp, status){
                if(!err){
                    resolve(resp);
                }else{
                    reject(err);
                }
            })
        })
    };





    //get document count
    Elasticodel.getDocCount = function(docType){
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
    };


    //Delete document
    Elasticodel.deleteDocTypeById  = function(docType, docId){
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
    };


    Elasticodel.deleteDocType = function(docType){

        return new Promise(function(resolve, reject){
            if(docType === undefined){
                reject('please specify document type')
            }else{
                client.deleteByQuery(
                    {
                        index : indexName,
                        type : docType,
                        body : {
                            "query": {
                                "match_all": {}
                            }
                        }
                    },
                    function(err, res, status){
                        if(!err){
                            console.log('delete doc type');
                            resolve(res)
                        }else{
                            console.log('could not delete doc type', err);
                            reject(err);
                        }
                    }
                )
            }
        })

    }

};
