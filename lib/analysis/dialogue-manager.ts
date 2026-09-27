export class DialogueManager {
  static hasEnoughData(mapaOutput: any): { sufficient: boolean; missing: string[] } {
    const missing: string[] = []
    const nodes: any[] = mapaOutput?.nodes ?? []

    const conceptNodes = nodes.filter((n: any) => n.kind === 'concept')
    if (nodes.length === 0 || conceptNodes.length === 0) {
      missing.push('actores')
    }

    const formulationNodes = nodes.filter((n: any) => n.kind === 'formulation')
    if (formulationNodes.length === 0) {
      missing.push('actos')
    }

    if (formulationNodes.every((n: any) => (n.evidenceLevel ?? 0) >= 6)) {
      missing.push('colapso observable')
    }

    const evidences: any[] = mapaOutput?.evidences ?? []
    if (evidences.length > 0) {
      const nullCount = evidences.filter(
        (e: any) => e.level === 0 || e.evidence_status === 'E0'
      ).length
      if (nullCount / evidences.length > 0.7) {
        missing.push('evidencia suficiente')
      }
    }

    return { sufficient: missing.length === 0, missing }
  }
}
