function seccion6(resultado) {
  var dt = resultado.dTotal;
  var ad = resultado.ajusteDebitor;
  if (!dt || dt.pendiente) {
    return "<div class="seccion salto-pagina"><h2>Documento 4 &middot; Ajuste Debitor</h2><div class="nota">No se aportaron componentes del daño. Aporte T_invertido, T_impedido y descripción de daño a la trayectoria para completar este documento.</div></div>
";
  }
  function fmt(n) { return n.toLocaleString("es-MX"); }
  var mD = "<td>" + (dt.tInvertido.tieneDocumentos ? "Documentado" : "Sin documentos") + "</td>";
  var mI = "<td>" + (dt.tImpedido.esEstimacion ? "Estimación" : "Documentado") + "</td>";
  var mT = "<td>" + (dt.tTrayectoria.estimado ? "Estimación - requiere pericia" : "Declarado") + "</td>";
  var montoT = dt.tTrayectoria.aplica ? ("" + fmt(dt.tTrayectoria.monto) + (dt.tTrayectoria.estimado ? " (estimado)" : "")) : "No aplica";
  var filasD =
    "<tr><td>Daño directo (T_invertido)</td><td>" + fmt(dt.tInvertido.monto) + "</td><td>" + dt.tInvertido.nivelEvidencia + "</td>" + mD + "<td>" + (dt.tInvertido.descripcion||"—") + "</td></tr>" +
    "<tr><td>Lucro cesante (T_impedido)</td><td>" + fmt(dt.tImpedido.monto) + "</td><td>" + dt.tImpedido.nivelEvidencia + "</td>" + mI + "<td>" + (dt.tImpedido.descripcion||"—") + "</td></tr>" +
    "<tr><td>Daño a la trayectoria</td><td>" + montoT + "</td><td>" + dt.tTrayectoria.nivelEvidencia + "</td>" + mT + "<td>" + (dt.tTrayectoria.descripcion||"—") + "</td></tr>";
  var filasAD = ad ? ad.map(function(a) {
    return "<tr><td class="highlight">" + a.nodo + "</td><td class="highlight">" + (a.rStar*100).toFixed(2) + "%</td><td>" + fmt(a.adMin) + "</td><td>" + fmt(a.adConservador) + "</td><td>" + fmt(a.adCentral) + "</td></tr>";
  }).join("") : "";
  return "<div class="seccion salto-pagina">" +
    "<h2>Documento 4 · D_total y Ajuste Debitor</h2>" +
    "<div class="nota">AD_i = R*_i x D_total. El ajuste debitor es la estimación causal del daño restaurador. No es la condena — es lo que la causalidad indica antes de cualquier ajuste procesal.</div>" +
    "<h3>Componentes del D_total</h3>" +
    "<table><thead><tr><th>Componente</th><th>Monto</th><th>Evidencia</th><th>Estado</th><th>Descripción</th></tr></thead><tbody>" + filasD + "</tbody></table>" +
    "<div style="margin:12px 0;padding:12px;background:#f0f5f4;border-radius:4px">" +
    "<strong>D_total mínimo:</strong> " + fmt(dt.dTotalMin) + " &middot; " +
    "<strong>D_total conservador:</strong> " + fmt(dt.dTotalConservador) + " &middot; " +
    "<strong>D_total completo:</strong> " + fmt(dt.dTotal) + "</div>" +
    "<h3>Ajuste debitor por nodo</h3>" +
    "<table><thead><tr><th>Nodo</th><th>R*</th><th>AD mínimo</th><th>AD conservador</th><th>AD completo</th></tr></thead><tbody>" + filasAD + "</tbody></table>" +
    "</div>
";
}
