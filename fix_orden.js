var fs = require('fs');
var c = fs.readFileSync('dist-motor/expediente.js', 'utf8');

// Quitar el deslinde de la función pie (actualmente está ahí)
// y moverlo a seccion5, antes del glosario
c = c.replace(
  "    pie(folio, fecha),\n    '</body></html>'",
  "    deslinde(folio, fecha),\n    glosario(),\n    '</body></html>'"
);

// Eliminar deslinde de la función pie, dejar solo el pie de página
c = c.replace(
  "function pie(folio, fecha) {\n  return '<div class=\"deslinde\">' +\n    '<strong>Deslinde de responsabilidad.</strong> ' +\n    'El Centro Multidisciplinario Meriadock Formaci\\u00f3n y Asesor\\u00eda A.C. se responsabiliza de la correcta aplicaci\\u00f3n del M\\u00e9todo Prometeo y de la precisi\\u00f3n matem\\u00e1tica del c\\u00e1lculo. ' +\n    'No se responsabiliza de los par\\u00e1metros aportados por el usuario. ' +\n    'Este expediente no constituye peritaje judicial, diagn\\u00f3stico cl\\u00ednico ni asesor\\u00eda legal.' +\n    '</div>' +\n    '<div class=\"pie-pagina\">Folio ' + folio + ' \\u00b7 Generado el ' + fecha + ' \\u00b7 M\\u00e9todo Prometeo \\u00b7 Centro Multidisciplinario Meriadock</div>\\n';\n}",
  "function deslinde(folio, fecha) {\n  return '<div class=\"deslinde\">' +\n    '<strong>Deslinde de responsabilidad.</strong> ' +\n    'El Centro Multidisciplinario Meriadock Formaci\\u00f3n y Asesor\\u00eda A.C. se responsabiliza de la correcta aplicaci\\u00f3n del M\\u00e9todo Prometeo y de la precisi\\u00f3n matem\\u00e1tica del c\\u00e1lculo. No se responsabiliza de los par\\u00e1metros aportados por el usuario. Este expediente no constituye peritaje judicial, diagn\\u00f3stico cl\\u00ednico ni asesor\\u00eda legal.' +\n    '</div>' +\n    '<div class=\"pie-pagina\">Folio ' + folio + ' \\u00b7 Generado el ' + fecha + ' \\u00b7 M\\u00e9todo Prometeo \\u00b7 Centro Multidisciplinario Meriadock</div>\\n';\n}\n\nfunction pie() { return ''; }"
);

fs.writeFileSync('dist-motor/expediente.js', c);
console.log('Listo');
