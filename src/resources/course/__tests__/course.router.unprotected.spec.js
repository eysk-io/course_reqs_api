import router from "../course.router.unprotected";

describe("course unprotected router", () => {
    test("has crud routes", () => {
        const routes = [
            { path: "/:school", method: "get" },
            { path: "/:school/:courseDepartment", method: "get" },
            { path: "/:school/:courseDepartment/:courseNumber", method: "get" }
        ];

        routes.forEach(route => {
            const match = router.stack.find(
                s => s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});
