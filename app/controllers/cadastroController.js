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

  //Conexao ao banco de dados
  const connection = application.config.dbConnection;

  //Inserir usuarios no MongoDB
  const Usuarios = new application.app.models.Usuario(connection);//Preparar a insercao no Banco de Dados
  Usuarios.inserir(dadosForm);

  //Inserir dados dos Jogo
  const Jogo = new application.app.models.Jogo(connection);
  Jogo.gerarDados(dadosForm.usuario);


  res.render("index",{validacao: {}});
}
