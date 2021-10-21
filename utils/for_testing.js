const calcScore = (participants, accessibility, score) => {
    score += (accessibility * 10) + participants
    return score
}

const sortLB = (newList) => {
    newList.sort((a, b) => b.score - a.score)
    return newList
}
  
  module.exports = {
    calcScore,
    sortLB
  }