import fs from 'fs'
import path from 'path'
import { LLMBackend } from '../llm/types'

export function selectDeclarationType(motorOutput: any): 'A' | 'B' | 'C' | 'D' {
  let rStarValue: number

  const result = motorOutput?.result
  if (Array.isArray(result)) {
    rStarValue = result[0] as number
  } else if (
    result !== null &&
    typeof result === 'object' &&
    'numerator' in result &&
    'denominator' in result
  ) {
    rStarValue = (result.numerator as number) / (result.denominator as number)
  } else if (typeof result === 'number') {
    rStarValue = result
  } else {
    return 'D'
  }

  const delta: number | undefined = motorOutput?.delta
  const fraccionE0: number | undefined = motorOutput?.fraccion_E0

  if (fraccionE0 !== undefined && fraccionE0 > 0.5) return 'D'

  if (rStarValue > 0.7) {
    if (delta !== undefined && delta >= 0.15) return 'B'
    if (fraccionE0 !== undefined && fraccionE0 >= 0.2) return 'B'
    return 'A'
  }
  if (rStarValue > 0.5) return 'B'
  if (rStarValue > 0.3) return 'C'
  return 'D'
}

export async function generateDeclaration(
  type: 'A' | 'B' | 'C' | 'D',
  motorOutput: any,
  paradigmaContext: string,
  caseData: any,
  decisions: any,
  llm: LLMBackend
): Promise<string> {
  const templatePath = path.join(
    process.cwd(),
    'lib',
    'prompts',
    `declaration-${type.toLowerCase()}.md`
  )
  const raw = fs.readFileSync(templatePath, 'utf-8')

  const filled = raw
    .replace('{{motor_output}}', JSON.stringify(motorOutput, null, 2))
    .replace('{{paradigma_context}}', paradigmaContext)
    .replace('{{case_summary}}', JSON.stringify(caseData, null, 2))
    .replace('{{author_decisions}}', JSON.stringify(decisions, null, 2))

  const firstBlank = filled.indexOf('\n\n')
  const roleSection = firstBlank === -1 ? filled : filled.slice(0, firstBlank)
  const contentSection = firstBlank === -1 ? '' : filled.slice(firstBlank + 2)

  return llm.complete(roleSection, contentSection)
}
