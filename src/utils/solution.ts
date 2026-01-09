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
  const stepMap = new Map()
  const aPointSet = new Set()
  const bPointSet = new Set()

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
   */
  const firstPoint = a[0]
  let curPositon = firstPoint
  for (let i = 0; i < nStep; i++) {
    // 使用起點步伐去看2點一線的終點在哪
    const endPoint = stepMap.get(curPositon)
    // 找無對應的終點 步伐終止
    if (endPoint === undefined) return false
    // 當前步數紀錄點為此次loop 的終點, 下個循環繼續找尋
    curPositon = endPoint
  }

  // 確認所有loop 完畢後 最後停留的位置在起始點 就為一個cycle
  return firstPoint === curPositon
}