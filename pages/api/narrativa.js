const {generarNarrativa}=require('../../dist-motor/expediente');
export default function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Método no permitido'});
 try{const html=generarNarrativa(req.body.resultado,req.body.metadatos||{});res.setHeader('Content-Type','text/html; charset=utf-8');return res.status(200).send(html);}
 catch(error){return res.status(400).json({error:error.message});}
}
