'use strict';
function calcularIIC(declarado,observado,coincidencias){
 if(!Array.isArray(declarado)||!declarado.length)return null;
 if(!Array.isArray(observado)||coincidencias===null||coincidencias===undefined)return null;
 if(!Number.isInteger(coincidencias)||coincidencias<0||coincidencias>declarado.length||coincidencias>observado.length)throw new Error('Coincidencias IIC inválidas');
 return coincidencias/declarado.length;
}
module.exports={calcularIIC};
