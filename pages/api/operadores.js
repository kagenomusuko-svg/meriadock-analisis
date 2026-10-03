const {listarOperadoresTaxonomicos}=require('../../dist-motor/operadores-taxonomicos');
export default function handler(req,res){if(req.method!=='GET')return res.status(405).json({error:'Método no permitido'});return res.status(200).json({operadores:listarOperadoresTaxonomicos()});}
