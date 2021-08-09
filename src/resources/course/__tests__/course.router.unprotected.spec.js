import router from "../course.router.unprotected";

describe("course unprotected router", () => {
    test("has crud routes", () => {
        const routes = [
            { path: "/:school", method: "get" },
            { path: "/:school/:subject", method: "get" },
            { path: "/:school/:subject/:courseNumber", method: "get" }
        ];

        routes.forEach(route => {
            const match = router.stack.find(
                s => s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});
