const sortLB = require('../utils/for_testing').sortLB
//const sortLB = (newList) => {
//    newList.sort((a, b) => b.score - a.score)
//    return newList
//}

describe('sortLB server function', () => {
    const list = [
        {
            "score": 0
        },
        {
            "score": 1
        },
        {
            "score": 2
        },
        {
            "score": 3
        },
        {
            "score": 4
        },
    ]

    const ansList = [
        {
            "score": 4
        },
        {
            "score": 3
        },
        {
            "score": 2
        },
        {
            "score": 1
        },
        {
            "score": 0
        },
    ]

    test('sorts a list of scores in 0-4 order into 4-0 order', () => {
        expect(sortLB(list)).toStrictEqual(ansList)
    })

    const list2 = [
        {
            "score": 2
        },
        {
            "score": 1
        },
        {
            "score": 0
        },
        {
            "score": 4
        },
        {
            "score": 3
        },
    ]

    test('sorts a list that is in random order to descending order', () => {
        expect(sortLB(list2)).toStrictEqual(ansList)
    })

    const list3 = [
        {
            "score": 4
        },
        {
            "score": 3
        },
        {
            "score": 2
        },
        {
            "score": 1
        },
        {
            "score": 0
        },
    ]

    test('no change to a list already sorted in descending order', () => {
        expect(sortLB(list3)).toStrictEqual(ansList)
    })
})