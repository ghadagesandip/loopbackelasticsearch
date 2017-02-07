'use strict';
var cleint = require('../elasticsearch');
console.log(cleint);
var indexName = 'devspotcrunch';

module.exports = function(Esmodel) {

    Esmodel.creteIndex = function(data, indexType){
        new Promise(function(resolve, reject){
            cleint.index({
                index : indexName ,
                id : data.id,
                type :indexType,
                body : data
            },function(err, resp, status){
                if(!err){
                    resolve(resp)
                }else{
                    reject(err);
                }
            })
        })

    }
};
