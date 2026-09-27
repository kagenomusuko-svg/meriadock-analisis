let mapaMaestroPromise: Promise<any> | null = null

function getMapaMaestro(): Promise<any> {
  if (!mapaMaestroPromise) {
    mapaMaestroPromise = fetch(
      'https://raw.githubusercontent.com/kagenomusuko-svg/Paradigma/main/mapa/mapa-maestro.json',
      {
        headers: {
          Authorization: `token ${process.env.PARADIGMA_TOKEN}`,
        },
      }
    ).then((res) => res.json())
  }
  return mapaMaestroPromise
}

export { getMapaMaestro }

export function loadConceptContext(nodeIds: string[], mapaMaestro: any): string {
  const nodes: any[] = mapaMaestro?.nodes ?? []
  const edges: any[] = mapaMaestro?.edges ?? []

  const lines: string[] = []
  for (const id of nodeIds) {
    const node = nodes.find((n: any) => n.id === id)
    if (!node) continue

    lines.push(`Nodo: ${node.label ?? id}`)
    if (node.summary) lines.push(`  Resumen: ${node.summary}`)
    if (node.evidence_status) lines.push(`  Estado de evidencia: ${node.evidence_status}`)

    const relaciones = edges.filter(
      (e: any) => e.source === id || e.target === id
    )
    if (relaciones.length > 0) {
      lines.push(`  Relaciones:`)
      for (const rel of relaciones) {
        lines.push(`    - ${rel.type ?? 'relacion'}: ${rel.source} -> ${rel.target}`)
      }
    }
    lines.push('')
  }
  return lines.join('\n')
}

export function loadRouteContext(query: string, mapaMaestro: any): string {
  const routes: any[] = mapaMaestro?.routes ?? []
  if (routes.length === 0) return ''

  const lowerQuery = query.toLowerCase()
  const matchingSteps: string[] = []

  for (const route of routes) {
    const triggers: string[] = route.triggers ?? []
    const matches = triggers.some((t: string) =>
      t.toLowerCase().includes(lowerQuery)
    )
    if (matches) {
      const steps: string[] = route.steps ?? []
      matchingSteps.push(...steps)
    }
  }

  return matchingSteps.join('\n')
}
