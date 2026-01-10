export const solution = (a: Array<number>, b: Array<number>): boolean => {
  const aLen = a.length
  const bLen = b.length
  const nStep = aLen

  /** a, b array check is same array length and length over 1 */
  if (aLen !== bLen || nStep <= 1) return false

  /**
   * @description 依照a loop index對應 b loop index建立所有Map objec(key 為起始點 value 為結束點)節點
   * @param key start point a[key]
   * @param value end point b[key]
   */
  const stepMap = new Map<number, number>()
  const aPointSet = new Set<number>()
  const bPointSet = new Set<number>()

  for (let i = 0; i < a.length; i++) {
    /** 重複enter point */
    if (aPointSet.has(a[i]) || bPointSet.has(b[i])) return false

    aPointSet.add(a[i])
    bPointSet.add(b[i])
    stepMap.set(a[i], b[i])
  }

  /**
   * @description 執行loop 串接確認是否連成圓
   * @param firstPoint 起始步
   * @param endPoint 終點步
   * @param curPosition 當前位置
   * @param curStepIdx 執行while loop 的計步器[index]
   * @param visited 使用Set object 來記錄每段步伐 如果發生重複表示不是一個循環圓
   */
  const firstPoint = a[0]
  const visited = new Set<number>()
  let curPosition = firstPoint
  let curStepIdx = 0
  while (curStepIdx < nStep) {
    // 1. 重複的紀錄點
    if (visited.has(curPosition)) return false
    visited.add(curPosition)
    // 2. 使用起點步伐去看2點一線的終點在哪
    const endPoint = stepMap.get(curPosition)
    // 3. 找無對應的終點 步伐終止
    if (endPoint === undefined) return false
    // 4. 當前步數紀錄點為此次loop 的終點, 下個循環繼續找尋
    curPosition = endPoint
    curStepIdx++
  }

  // 確認所有loop 完畢後 最後停留的位置在起始點 就為一個cycle
  return firstPoint === curPosition
}