'use strict';

module.exports = function(Person) {




    Person.observe('after save', function(ctx, next){
        console.log(ctx);
        var esModel = Person.app.models.esmodel;
        esModel.creteUpdateIndex(ctx.instance, 'person')
            .then(function(val){
                console.log('done',val)
            })
            .catch(function(reason){
                console.log(reason);
            })
        next();
    });


    Person.observe('after delete', function(ctx, next){
        var esModel = Person.app.models.esmodel;
        esModel.deleteDocument('person', ctx.where.id)
            .then(function(data){
                console.log(data);
            })
            .catch(function (err) {
                console.log('could not delete', err);
            })
        next();
    });
};
