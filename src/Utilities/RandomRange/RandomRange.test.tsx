import { RandomRange } from '../RandomRange'

test('Random Range', () => {
    expect(RandomRange({ min: 1, max: 5 })).toBeGreaterThanOrEqual(1)
    expect(RandomRange({ min: 1, max: 5 })).toBeLessThanOrEqual(5)
})