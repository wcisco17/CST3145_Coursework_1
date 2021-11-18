function sortLessons() {
  const value = (this.selected)
  const asc = 'Ascending'
  const desc = 'Descending'

  return this.lessons.sort((firstVal, secondVal) => {
    if (firstVal[value] < secondVal[value] && this.order == asc) return -1
    if (secondVal[value] < firstVal[value] && this.order == desc) return -1
    return 0
  })
}

const computed = {
  sortLessons,
}

export default computed
