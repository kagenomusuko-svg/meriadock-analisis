const {calcularSolicitud}=require('../../dist-motor/entrada');
export default function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Método no permitido'});
 try{return res.status(200).json(calcularSolicitud(req.body));}
 catch(error){return res.status(400).json({error:error.message});}
}
