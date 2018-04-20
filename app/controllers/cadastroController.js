module.exports.cadastro = function(application,req,res){
  res.render('cadastro',{validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application,req,res){
  var dadosForm = req.body;

  req.assert('nome','Nome não pode ser vazio').notEmpty();
  req.assert('usuario','Usuario não pode ser vazio').notEmpty();
  req.assert('senha','Senha não pode ser vazio').notEmpty();
  req.assert('casa','Casa não pode ser vazio').notEmpty();

  var erros = req.validationErrors();

  if(erros){
    res.render('cadastro',{validacao: erros,dadosForm: dadosForm});
    return;
  }

  //Inserir usuarios no MongoDB

  const connection = application.config.dbConnection;//Conectar ao Banco de Dados
  const Usuarios = new application.app.models.Usuario(connection);//Preparar a insercao no Banco de Dados

  Usuarios.inserir(dadosForm);

  res.send('Ok, Podemos cadastrar');
}
