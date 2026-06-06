export interface ParsedCommand {
  command: string
  args: string[]
  flags: Record<string, string | boolean>
  redirect?: { type: '>' | '>>' | '<'; target: string }
  pipe?: ParsedCommand
}

export function parseCommand(input: string): ParsedCommand {
  const tokens = tokenize(input)
  const result: ParsedCommand = { command: '', args: [], flags: {} }
  
  let i = 0
  if (tokens.length === 0) return result
  
  result.command = tokens[0]
  i++
  
  while (i < tokens.length) {
    const token = tokens[i]
    if (token.startsWith('--')) {
      result.flags[token.slice(2)] = true
    } else if (token.startsWith('-') && token.length === 2) {
      result.flags[token[1]] = true
    } else if (token === '>' || token === '>>' || token === '<') {
      result.redirect = { type: token, target: tokens[i + 1] }
      i++
    } else if (token === '|') {
      result.pipe = parseCommand(tokens.slice(i + 1).join(' '))
      break
    } else {
      result.args.push(token)
    }
    i++
  }
  
  return result
}

function tokenize(input: string): string[] {
  const tokens: string[] = []
  let current = ''
  let inQuote = false
  let quoteChar = ''
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    if ((char === '"' || char === "'") && !inQuote) {
      inQuote = true
      quoteChar = char
    } else if (char === quoteChar && inQuote) {
      inQuote = false
      quoteChar = ''
    } else if (char === ' ' && !inQuote) {
      if (current) {
        tokens.push(current)
        current = ''
      }
    } else {
      current += char
    }
  }
  if (current) tokens.push(current)
  return tokens
}
