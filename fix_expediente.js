var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

// ── CAMBIO 1: reordenar secciones ───────────────────────────────────────────
// Orden actual:  s1, s2, s3, s4, s5, s6, deslinde, glosario
// Orden nuevo:   s5 (narrativa), s1, s2, s3, s4, s6, deslinde, glosario
c = c.replace(
  'cabecera(titulo, folio, fecha),\n    seccion1(grafoCausal, resultado),\n    seccion2(resultado, grafoCausal),\n    seccion3(resultado, grafoCausal),\n    seccion4(resultado),\n    seccion5(resultado, grafoCausal, metadatos),\n    seccion6(resultado),\n    deslinde(folio, fecha),\n    glosario(),',
  'cabecera(titulo, folio, fecha),\n    seccion5(resultado, grafoCausal, metadatos),\n    seccion1(grafoCausal, resultado),\n    seccion2(resultado, grafoCausal),\n    seccion3(resultado, grafoCausal),\n    seccion4(resultado),\n    seccion6(resultado),\n    deslinde(folio, fecha),\n    glosario(),'
);

// ── CAMBIO 2: titular el mapa de sensibilidad y hacerlo visible en C y D ────
// Buscar el fragmento donde empieza la tabla de sensibilidad en seccion2
var viejo = "'<table><thead><tr><th>Arista</th><th>Rango</th><th>Amplitud</th><th>Impacto en inestabilidad</th><th>Estado</th></tr></thead><tbody>' + filasS + '</tbody></table>'";
var nuevo  = "(decl.nivel === 'C' || decl.nivel === 'D' ? '<h3 style=\"color:#e67e22;margin-top:16px\">Mapa de sensibilidad \u2014 aristas que requieren mayor evidencia</h3><div class=\"nota\">Las aristas marcadas como cr\u00edticas son las que generan inestabilidad en el ranking. Reducir su amplitud [a, b] mediante evidencia adicional eleva la Declaraci\u00f3n.</div>' : '') +\n    '<table><thead><tr><th>Arista</th><th>Rango</th><th>Amplitud</th><th>Impacto en inestabilidad</th><th>Estado</th></tr></thead><tbody>' + filasS + '</tbody></table>'";

c = c.replace(viejo, nuevo);

fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo.');
