// Arquivo usado para indicar quais usuarios podem fazer o que no aplicativo
// é uma simples exportação de um objeto, cujo na hierarquia, 
// o primeiro é o grupo, exemplo "Usuario", e "Administrador"
// O segundo são os controladores, exemplo "user"
// o terceiro e ultimo na hierarquia são os recursos disponiveis

// um exemplo: Os grupos usuarios podem somente ler o recurso "Read" do controlador "user"

// esse arquivo é usado principalmente pelo midleware que é executado para comparar
// o grupo em que o usuario esta e o recurso da rota requerido. NO momento ele esta no boot.js 
// e deve ser retirado o quanto antes, eu acho que já estava mt cansado esse dia

module.exports = {
    Usuarios:{
        user:[
        'read'
    ]},
    Administradores:{
        user:[
        'read',
        'write',
        'update',
        'delete'
    ]}
}