import * as fs from 'fs'
import * as path from 'path'
import * stats from '../stats'

describe('whatsstats core module', () => {
    let content: string
    beforeAll(() => {
        content = fs.readFileSync(path.resolve('./src/lib/__tests__/dummy-chat.txt'), 'utf-8')
    })
    it('should have the correct message count', () => {
        const parsed = stats.parseMessages(content)
        expect(parsed.length).toEqual(190)
    })
})