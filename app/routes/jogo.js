module.exports = function(application){
  application.get('/jogo',function(req,res){
    application.app.controllers.jogoController.jogo(application,req,res);
  });
}
