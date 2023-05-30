define(['./conecta_bd'], function(insert){
    function captura_dados(){
        var dispositivo = document.getElementById('nome_dispositivo').value;
        var patrimonio = document.getElementById('patrimonio').value;
        var remetente = document.getElementById('remetente').value;
        var data_entrada = document.getElementById('entrada').value;
        var obs = document.getElementById('obs').value;

        var comando = "INSERT INTO equip_externo (dispositivo, patrimonio, remetente, data_entrada, obs) VALUES ('"+dispositivo+"', '"+patrimonio+"', '"+remetente+"', '"+data_entrada+"', '"+obs+"');";

        insert(comando);
    }

    document.addEventListener('DOMContentLoaded', function() {
        var form = document.querySelector('form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            captura_dados();
        });
    });
});
