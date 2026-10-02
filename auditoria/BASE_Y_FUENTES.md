# Base y alcance reproducible

Auditoría iniciada sobre main `14a5e64e69fab44bdc757900d49f2e7e0f56d9f3`, árbol `1303b7fe8c5773913d69b83a00262a8c4f0a1c55`. Último cambio funcional `621267501e7051c937f9082d19ecf6d6fcf7e4e3`; cierre anterior documental `8829643`. Ningún hallazgo se corrige durante esta orden.

## Autoridad y procedencia

Se aplican ORDEN_WORK_02 §4 e INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL, no se transforma el corpus para hacerlo coincidir con el motor. Se revisaron también orden 01, deudas, estado de implementación, reserva de empates y límites técnicos.

Los repositorios externos se fijan en ideas `8219367f58ddb4a88e803d98a639f154de1fca29` y Paradigma `e7c7b06eebd56e412a8b27f3c58747af2d1e531c`. El manifiesto `evidencia/fuentes.json` identifica ruta, tamaño y SHA256 de cada texto obtenido. Dos integrales de gran tamaño no fueron entregados por el conector: El cálculo y Taxonomía; se sustituyó la vía de lectura por sus 108 archivos desagregados (capítulos, apéndices y preliminares), no por resúmenes externos. Los textos del autor se conservan intactos fuera del runtime.

Se recorren índices, definiciones, fórmulas, ejemplos y correcciones; los operadores ajenos al calculador general quedan clasificados, no implementados. Las cifras publicadas sin aristas/rangos completos se registran como ejemplos no reconstruibles, nunca se inventa su matriz.

## Referencias de ejecución

CI baseline: https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37066860060 — success, SHA base. Referencia anterior: run 37064025902 — success.

Vercel proyecto `prj_VK8Ioh3YhpSskiOnjbX7tnVZFv8s`; deployment `dpl_DqhfDxHqhC4CARr1z9wnQ9vZNc3C`, production READY, SHA base, sin error de alias. Alias público probado: https://meriadock-analisis.vercel.app/constructor. Consulta de errores de producción en ventana de 24 h: sin entradas devueltas; no prueba ausencia universal de errores.

## Revisión runtime

`evidencia/runtime.json` enumera cada archivo relevante y su huella. Incluye motor, adaptador, constructor, rutas API, taxonomía y presentación. `escalas.js`/`espacio.js` son helpers históricos sin importación en el circuito activo; el logo se revisa como recurso sin semántica de cálculo. Tests y scripts de verificación se revisan aparte en MATRIZ_COBERTURA_PRUEBAS.

La publicación de esta auditoría preserva el árbol de producción del commit base y sólo agrega documentación, fixtures y pruebas.
