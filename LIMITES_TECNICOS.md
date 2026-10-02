# Verificación y límites técnicos

- PF usa lista sparse y multiplicación O(E+N). Prueba determinista de 1,000 nodos / 2,000 aristas: menos de 30 ms en el entorno de ejecución del 2 de octubre de 2026. No representa un máximo teórico ni un máximo técnico medido.
- Tolerancia numérica de potencia: 1e-10; presupuesto ordinario: 10,000 iteraciones. No convergente devuelve indeterminado, con aproximación, error y residuo. No devuelve una distribución uniforme sustituta.
- Reducibilidad / periodicidad se diagnostican. Convergencia observada no equivale a garantía de unicidad cuando faltan condiciones suficientes; ambas se registran.
- Regularización sólo con ε positivo y K explícita. K constante se aplica implícitamente; también se admite K sparse en el contrato del motor. No hay ε metrológico predeterminado.
- Grafos de hasta 12 nodos conservan las rondas completas; redes mayores conservan el resumen por defecto. La opción de detalle completo exporta rondas a costa de memoria O(iteraciones × (E+N)). Esto cambia la representación, no el operador.
- El hipercubo exige método y presupuesto de vértices explícitos. No hay selección silenciosa ni aleatoriedad.
- En este entorno no hay Chromium disponible y su descarga no produjo un archivo válido. La verificación de interfaz se ejecuta en GitHub Actions con Playwright fijado y Chromium instalado en el runner. No se afirma verificación visual local.
- El protocolo A/B/C/D para líderes empatados no emite una letra; véase RESERVA_PROTOCOLO_EMPATES.md.
- Fraude annona y α taxonómico sin protocolo versionado devuelven indeterminado. La variante antigua de Fraude annona se conserva fuera de la ruta canónica, sin emitir diagnósticos de fraude.
