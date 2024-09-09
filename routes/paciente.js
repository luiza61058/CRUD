// routes/alunos.js
const express = require('express');
const router = express.Router();
const sequelize = require('../models/db');
const Paciente = require('../models/paciente');
// Sincroniza o modelo com o banco de dados
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

function validarCPF(cpf) {
 
    // Remove qualquer caracter que não seja número
    cpf = cpf.replace(/[^\d]+/g, '');
  
    // Verifica se o CPF tem 11 dígitos ou é uma sequência de números repetidos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
  
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }
  
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) {
      return false;
    }
  
    return true;
  
  
}


//...

router.get('/', (req, res) => {
   res.render('layout', {title: 'Clínica passei curei ',body: 'paciente'});
    });

 router.get('/paciente', async (req, res) => {
  try {
    const listaPaciente = await Paciente.findAll();//select * from ...
    res.status(200);
    res.render('paciente', {
      title: 'Lista de pacientes',body: 'paciente',pacientes: listaPaciente
    });}
  catch (error) {
    res.status(500);
    return res.render('error',{ title:'Erro',message:error.message,error:error});
  }
});
    

router.get('/paciente/add', (req, res) => {
  res.render('addpaciente', { title: 'Adicionar Paciente' });
});
router.post('/paciente/add', async (req, res) => {
  try {

    let { cpf } = req.body;
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    req.body.cpf = cpf;

    if (!validarCPF(cpf)) {
      res.status(400);
      return res.render('error',{title:'Erro',message:'CPF inválido',error:''});
    }

    console.log(req.body);
    const paciente = await Paciente.create(req.body);
    res.status(201);
    res.redirect('/paciente');
  } catch (error) {
    res.status(400);
    return res.render('error',{title:'Erro',message:error.message,error:error });
  }    
  });

router.get('/paciente/update', async (req, res) => {
  try {
    const listaPaciente = await Paciente.findAll();
    res.render('updatepaciente', { pacientes:listaPaciente, title:'Atualizar Paciente' });
  } catch (error) {
    res.status(500);
    return res.render('error',{title:'Erro',message:error.message,error:error });
  }
  }); 

router.get('/paciente/update/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404);
      return res.render('error',{title:'Erro',message:error.message,error:error });
    }
    res.json(paciente);
  } catch (error) {
    res.status(500);
    return res.render('error',{title:'Erro',message:error.message,error:error });
  }
});
router.post('/paciente/update', async (req, res) => {
  const { cpf, dia_marc, hora_marc, idade, nome_completo } = req.body; //mudar 
  try {
    await Paciente.update({ dia_marc, hora_marc, idade, nome_completo }, {
      where: { cpf }//mudar id: alunoId
    });
    res.status(204);
    res.redirect('/paciente'); // Redireciona para a página inicial ou outra página após a atualização
  } catch (error) {
    res.status(500);
    return res.render('error',{title:'Erro',message:error.message,error:error });
  }
});


router.get('/paciente/update/:cpf', async (req, res) => {
  try {
    const paciente = await Paciente.findOne({ where: { cpf: req.params.cpf } });
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







router.get('/paciente/delete', (req, res) => {
  res.render('deletepaciente', { title: 'Apagar Paciente' });
});


router.post('/paciente/delete', async(req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.body.id);
    if (!paciente) {res.status(404);
      return res.render('error',{ title:'Erro',
        message:"Paciente não encontrado",error:"" });
    }
    await paciente.destroy(); res.status(204); res.redirect('/paciente');
  } catch (error) {res.status(500);
   return res.render('error',{ title:'Erro',message: error.message,error: error});
  }
});
module.exports = router;
