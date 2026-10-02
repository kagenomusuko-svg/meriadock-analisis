# Decisión pendiente: empates en robustez

## Fuente y vacío exacto

INSTRUCCIONES_WORK_IMPLEMENTACION_METROLOGIA_CAUSAL.md §11 define A/B/C/D con “el líder” y “el orden completo”. No prescribe qué hacer cuando dos coordenadas de R* son iguales. La auditoría §4.2 exige una sola autoridad; no aporta un desempate. No hay conflicto entre fuentes: hay una regla incompleta para este caso.

## Implementación segura

Los tres escenarios se calculan por PF y se exportan. Si existe empate exacto de líderes en alguno, robustez devuelve indeterminado, conserva los conjuntos de líderes y los rankings técnicos. No se emite letra ni se elige un líder por posición o nombre. No se bloquean los demás operadores.

## Decisión obligatoria del autor

1. Conservar la declaración indeterminada en empates (aceptar esto como cierre del protocolo).
2. Definir A/B/C/D comparando conjuntos de colíderes y órdenes con empates; especificar el árbol y el tratamiento de la brecha central.

La alternativa 1 restringe las letras a liderazgo único. La 2 amplía el protocolo y requiere una regla del autor. No se introduce tolerancia metrológica de empate; la tolerancia numérica PF se audita separadamente.
