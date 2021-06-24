import controllers from '../school.controllers'
import { isFunction } from 'lodash'

describe('school controllers', () => {
    test('has crud controllers', () => {
        const crudMethods = [
            'getSchool',
            'getAllSchools',
            'createSchool',
            'updateSchool',
            'removeSchool'
        ]

        crudMethods.forEach(name =>
            expect(isFunction(controllers[name])).toBe(true)
        )
    })
})