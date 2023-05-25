import * as modulo_db from '../scripts/conecta_bd.js';

function captura_dados(event){
    event.preventDefault();

    const dispositivo = document.getElementById('nome_dispositivo').value;
    const patrimonio = document.getElementById('patrimonio').value;
    const remetente = document.getElementById('remetente').value;
    const data_entrada = document.getElementById('entrada').value;
    const obs = document.getElementById('obs').value;

    const comando = `INSERT INTO equip_externo (dispositivo, patrimonio, remetente, data_entrada, obs) 
    VALUES ('${dispositivo}', '${patrimonio}', '${remetente}', '${data_entrada}', '${obs}')`;

    modulo_db.insert(comando);
}