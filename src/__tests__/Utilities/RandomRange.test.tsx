import { RandomRange } from '../../Utilities/RandomRange'

describe('Generate Random Number within a range', () => {
    it('Generates Properly', () => {
        expect(RandomRange({ min: 1, max: 5 })).toBeGreaterThanOrEqual(1)
        expect(RandomRange({ min: 1, max: 5 })).toBeLessThanOrEqual(5)
    })
})