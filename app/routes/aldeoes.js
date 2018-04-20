module.exports = function(application){
  application.get('/aldeoes',function(req,res){
    application.app.controllers.aldeoesController.aldeoes(application,req,res);
  });
}
