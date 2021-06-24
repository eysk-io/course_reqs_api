import router from '../school.router'

describe('school router', () => {
    test('has crud routes', () => {
        const routes = [
            { path: '/', method: 'get' },
            { path: '/', method: 'post' },
            { path: '/:schoolName', method: 'get' },
            { path: '/:schoolName', method: 'put' },
            { path: '/:schoolName', method: 'delete' }
        ]

        routes.forEach(route => {
            const match = router.stack.find(
                s => s.route.path === route.path && s.route.methods[route.method]
            )
            expect(match).toBeTruthy()
        })
    })
})