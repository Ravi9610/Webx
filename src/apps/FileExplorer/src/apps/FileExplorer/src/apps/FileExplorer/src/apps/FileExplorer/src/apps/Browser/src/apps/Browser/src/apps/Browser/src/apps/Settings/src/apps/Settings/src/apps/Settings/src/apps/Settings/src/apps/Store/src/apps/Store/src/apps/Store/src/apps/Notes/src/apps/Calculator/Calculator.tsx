import React, { useState } from 'react'

const Calculator: React.FC<{ windowId: string }> = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display)
    if (previousValue !== null && operator) {
      const result = calculate(previousValue, inputValue, operator)
      setDisplay(String(result))
      setPreviousValue(result)
    } else {
      setPreviousValue(inputValue)
    }
    setOperator(nextOperator)
    setWaitingForOperand(true)
  }

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second
      case '-': return first - second
      case '*': return first * second
      case '/': return first / second
      default: return second
    }
  }

  const equals = () => {
    if (previousValue !== null && operator) {
      const inputValue = parseFloat(display)
      const result = calculate(previousValue, inputValue, operator)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperator(null)
      setWaitingForOperand(true)
    }
  }

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ]

  return (
    <div className="p-4 max-w-xs mx-auto">
      <div className="bg-black/30 rounded-lg p-4 mb-4 text-right text-3xl font-mono overflow-x-auto">{display}</div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="col-span-4 bg-red-500/80 p-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors">C</button>
        {buttons.map(row => (
          row.map(btn => (
            <button
              key={btn}
              onClick={() => {
                if (btn === '=') equals()
                else if (btn === '.') inputDecimal()
                else if (['+', '-', '*', '/'].includes(btn)) performOperation(btn)
                else inputDigit(btn)
              }}
              className="bg-white/10 p-3 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              {btn}
            </button>
          ))
        ))}
      </div>
    </div>
  )
}

export default Calculator
