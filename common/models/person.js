'use strict';

module.exports = function(Person) {

    var containerName = 'profile_image';

    Person.profileData = function(ctx, cb){
        ctx.req.params.container = containerName;

        Person.app.models.container.upload(ctx.req,ctx.result,function (err,fileObj) {
            if(err){
                console.log('err', err);
            }else{
                console.log('fileObj', fileObj);
            }
        });
    }


    Person.remoteMethod(
        'profileData',
        {
            accepts: [
                {arg: 'ctx', type: 'object', http: { source:'context' }}
            ],
            returns: {arg: 'data', type: 'object', root:true}
        }
    );


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
