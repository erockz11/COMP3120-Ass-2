const calcScore = require('../utils/for_testing').calcScore
//calcScore = (participants, accessibility, score)
//score += (accessibility * 10) + participants
//return score

describe('calcScore server function', () => {
    test('Adding to a 0 score with accessibility of 0.0 and 1 participants is 1', () => {
        expect(calcScore(1,0.0,0)).toBe(1)
    })

    test('Adding to a 0 score with accessibility of 0.1 and 0 participants is 1', () => {
        expect(calcScore(0,0.1,0)).toBe(1)
    })

    test('adding to a 0 score with accessibility of 1.0 and 5 participants is 15', () => {
        expect(calcScore(5,1.0,0)).toBe(15)
    })

    test('Adding to a score of 100 with accessibility of 1.0 and 5 participants is 115', () => {
        expect(calcScore(5,1.0,100)).toBe(115)
    })
})