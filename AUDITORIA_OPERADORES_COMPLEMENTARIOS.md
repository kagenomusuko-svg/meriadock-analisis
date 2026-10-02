# Auditoría 4 — IIC, fraude annona, B*, daño y AD

| Ficha, fuente | Contrato actual / dominio / precondiciones | Ausencia e incertidumbre / lecturas permitidas y prohibidas | Código / test / esperado y observado | Estado / severidad / decisión |
|---|---|---|---|---|
| Índice de integridad causal, IIC — instrucciones §17 | coincidencias identificadas / número declarado, [0,1]. Listas declarado/observado y entero ≤ ambas longitudes. Todos los tipos pueden solicitarlo con insumos aplicables | Lista declarada vacía o coincidencias ausentes→null. Cero explícito con observaciones vacías permitido. No empareja ni certifica veracidad; no «institución culpable» | iic.js; operadores.test; declarado x,y / observado x / coincidencia1→.5, producción también .5 | CONFORME con alcance actual; variante corpus distinta, P2 AU-08 / no |
| Fraude annona — instrucciones §18, Metrología I IV·4, Vol II Corolario III | Condición de diseño/prevención/intervención; protocolo canónico versionado requerido. R*(1−α)(1−IIC) existe sólo como función legacy no escogida | Sin contrato→indeterminado explícito. No convertir productoria legacy en acusación ni umbral .2 universal | fraude_annona.js; series; sin protocolo queda indeterminado. HTTP JSON no transporta función de cálculo; UI no produce contrato de intervención. Ni siquiera validar sólo un nombre de versión bastaría | NO_IMPLEMENTADO como operador canónico; interfaz segura parcial. P2 AU-13 / no: falta formalización/calibración, no inventar |
| Distribución de beneficio, B* — instrucciones §19, Prometeo §2.3.2/3.5 | B_i/ΣB_j, mismos nodos y unidad; todos los beneficios netos explícitos. IDs únicos conocidos | Missing≠0. Total0→no_aplicable. Negativos se admiten: [-10,20]→[-1,2]; no interpretar estas cuotas firmadas como probabilidades [0,1]. Suma no finita no se valida | b_estrella.js; operadores.test; 30/10→.75/.25 total40; AUD-04 1e308+1e308→Infinity y cuotas0 calculadas. HTML pierde unidad/total AUD-02 | PARCIAL / P1 AU-04; P2 AU-05/08 / no |
| Daño total, D_total — instrucciones §20 | T_invertido+T_impedido+ΔT_trayectoria, tres componentes no negativos finitos con unidad común; estimación futura explícita admitida | Monto faltante o unidad explícita incompatible→null. Cero explícito legítimo. Etiqueta común no convierte divisas; incertidumbre narrativa conservada dentro componente, no distribución probabilística | danio.js; operadores.test; 100+20+30=150; min100/conservador120. PLD 270+120+130=520 M; Meridiano16.4+5.8+4.3=26.5 M. Suma puede desbordar→Infinity estado calculado | PARCIAL / P1 AU-04; presentación «min/conservador» convención actual, no intervalo estadístico / no |
| Ajuste debitor, AD — instrucciones §21 | AD_i=R*_i D_total, unidad del daño; requiere R* completo y D_total | Falta R* o daño→null. R* bruto, no neta por defecto. No monto de condena certificado ni prescripción jurídica | danio.js; operadores.test; .8×150=120, .2×150=30. Campos min/conservador/central. Sin recálculo UI/HTML | CONFORME_CON_RESERVA / P1 AU-04 si overflow, P2 AU-08 tipado / no |

## IIC y fraude en las fuentes

Vol II protocolo Paso3 define IIC como media de correlaciones c_k∈[-1,1], con [.18,.35,.61]→.38 y modificación w(1+κ(1−IIC)); Metrología I evalúa discrepancias institucionales cualitativas y cifras Altamirano. El contrato actual de conteo no puede representar automáticamente correlaciones negativas o .38 con tres declaraciones. Es una diferencia D/E documentada, resuelta para runtime por instrucciones §17; no se certifica equivalencia cross-domain.

Vol II iguala además R*(1−α)(1−IIC) con Δ(1−IIC), igualdad falsa si Δ se define por resta. Ejemplo .20,.10,.20→.144 **menor**, no mayor que .20 como afirma lectura del texto; .5841×.85×.62=.3070207. Se registran erratas, no se toman como oracle ni escala de acción universal.

El fraude conceptual incluye capacidad de actuar/prevenir y una oportunidad no ejercida; tener α e IIC bajos no acredita por sí solo esa condición. El módulo actual se abstiene correctamente de inventarla, pero no se debe contar como operador completo.

## Beneficios negativos y distinción de objetos

Prometeo describe distribución de beneficios positivos que suma100%; instrucciones actuales dicen beneficio neto dividido por suma, sin prohibición de pérdidas. Se conserva la operación firmada observable y se reserva la interpretación de pérdidas a un protocolo futuro; no se impone una nueva restricción durante auditoría. B* directo de montos no equivale a R*_B obtenido de un grafo de beneficio. RES-DELTAB-001 distingue cuota, monto B_i y reversión β_i; Δ_B no está implementado. No cambiar una fórmula por coincidencia de símbolo.

## AD y daño futuro

El cálculo usa R*_neta en algunos análisis de reparación/priorización; Metrología II usa «ajuste debitor» también para reforma cualitativa de tres componentes. Orden actual adjudica AD monetario con R* bruto. Es variación de objeto/contexto, sin permiso para sustituir AD con neta. Reservas de causalidad de daños futuros y estimaciones no son errores matemáticos si el analista declara su monto, unidad y carácter estimado.

## Resolución adicional obligatoria de IIC

Paradigma/documentacion/resolucion-iic.md, RES-IIC-001, diferencia expresamente IIC_cong∈[0,1] de la correlación estadística signed∈[−1,1]. Esta resolución, junto con instrucciones actuales, impide tratar una correlación negativa histórica como el IIC aplicado. El conteo actual cumple el intervalo; su estimador no es universal por ello. Las composiciones ponderadas/arquitectónicas y el ajuste secuencial de W no están calibrados universalmente. No hay decisión pendiente sobre el intervalo canónico de IIC.
