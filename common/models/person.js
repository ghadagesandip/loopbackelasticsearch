'use strict';

module.exports = function(Person) {



    Person.observe('after save', function(ctx, next){
        console.log(ctx);
        var esModel = Person.app.models.esmodel;
        esModel.creteIndex(ctx.instance, 'person');
        next();
    });
};
