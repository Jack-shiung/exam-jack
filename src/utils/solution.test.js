import { describe, it, expect } from 'vitest'
import { solution } from './solution'

describe('solution - function test', () => {
  it('return [false]: 兩個陣列長度不同', () => {
    expect(solution([1, 2], [2])).toBe(false)
  })

  it('return [false]: 陣列長度只有一', () => {
    expect(solution([1], [1])).toBe(false)
  })

  it('return [true]: Examples 1', () => {
    expect(solution([3, 1, 2], [2, 3, 1])).toBe(true)
  })

  it('return [false]: Examples 2', () => {
    expect(solution([1, 2, 1], [2, 3, 3])).toBe(false)
  })

  it('return [false]: Examples 3', () => {
    expect(solution([1, 2, 3, 4], [2, 1, 4, 4])).toBe(false)
  })

  it('return [false]: Examples 4', () => {
    expect(solution([1, 2, 3, 4], [2, 1, 4, 3])).toBe(false)
  })

  it('return [false]: Examples 5', () => {
    expect(solution([1, 2, 2, 3, 3], [2, 3, 3, 4, 5])).toBe(false)
  })
})