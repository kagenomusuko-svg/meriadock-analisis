var fs = require('fs');
var c = fs.readFileSync('pages/api/chat.js', 'utf8');

// 1. Actualizar la llamada a /api/calcular para pasar insumosAlpha y nodosIIC
c = c.replace(
  "body: JSON.stringify({ grafo: grafoData })",
  "body: JSON.stringify({ grafo: grafoData, insumosAlpha: grafoData.insumosAlpha || [], nodosIIC: grafoData.nodosIIC || [] })"
);

// 2. Agregar instrucción de D_total al system prompt
var instruccionDanio = "\n\nINSTRUCCION SOBRE DAÑO Y AJUSTE DEBITOR:\nCuando el análisis causal esté completo, pregunta en un solo bloque:\n\n'Para completar el expediente con el ajuste debitor necesito los componentes del daño. Responde lo que tengas:\n\n1. Daño directo documentable (T_invertido): ¿Cuánto dinero, capital o ingresos perdió directamente la víctima? (salarios no pagados, capital perdido, gastos médicos, activos perdidos). Monto: ___\n\n2. Lo que dejó de ganar (T_impedido): ¿Cuánto tiempo duró el impacto? ¿Cuál era el ingreso o beneficio que dejó de obtener? Monto estimado: ___\n\n3. Daño permanente a la trayectoria (ΔT_trayectoria): ¿El daño afectó de manera permanente la vida, carrera o desarrollo futuro de la víctima? Sí / No / Parcialmente. Si sí, describe brevemente qué cambió.'\n\nSi el usuario no tiene algún componente, confirma si desea continuar sin él. El expediente declarará ese componente como pendiente de cuantificación.\n\nCuando el usuario responda, incluye en tu respuesta un bloque:\nDANIO_JSON_START\n{\"tInvertido\": {\"monto\": 0, \"descripcion\": \"\", \"tieneDocumentos\": false}, \"tImpedido\": {\"monto\": 0, \"descripcion\": \"\", \"esEstimacion\": true}, \"tTrayectoria\": {\"aplica\": false, \"narrativa\": \"\"}}\nDANIO_JSON_END";

c = c.replace(
  "const SYSTEM = `Eres la Calculadora Prometeo",
  "const INSTRUCCION_DANIO = `" + instruccionDanio + "`;\n\nconst SYSTEM = `Eres la Calculadora Prometeo"
);

c = c.replace(
  "${INSTRUCCION_GRAFO}",
  "${INSTRUCCION_GRAFO}\n\n${INSTRUCCION_DANIO}"
);

fs.writeFileSync('pages/api/chat.js', c);
console.log('Listo');
