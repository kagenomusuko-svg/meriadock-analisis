const {PARAMETROS, prepararParametros, crearObservacion}=require('../../dist-motor/calibracion');
export default function handler(req,res){
  try{
    if(req.method==='GET') return res.status(200).json({version:PARAMETROS.version,estados:PARAMETROS.estados,clasificaciones:PARAMETROS.clasificaciones,resumen:PARAMETROS.resumenReglas,reglas:PARAMETROS.reglas,operadores:PARAMETROS.operadores});
    if(req.method==='POST'){
      if(req.body?.tipo==='observacion') return res.status(200).json(crearObservacion(req.body));
      return res.status(200).json({parametros:prepararParametros(req.body?.parametrosProvisionales||[]),version:PARAMETROS.version});
    }
    return res.status(405).json({error:'Método no permitido'});
  }catch(error){return res.status(400).json({error:error.message});}
}
