module.exports = function(application){
  application.get('/pergaminho',function(req,res){
    application.app.controllers.pergaminhoController.pergaminho(application,req,res);
  });
}
