import router from "../course.router.protected";

describe("course protected router", () => {
    test("has crud routes", () => {
        const routes = [
            { path: "/:school", method: "post" },
            { path: "/:school/:courseDepartment", method: "delete" },
            { path: "/:school/:courseDepartment/:courseNumber", method: "put" },
            { path: "/:school/:courseDepartment/:courseNumber", method: "delete" }
        ];

        routes.forEach(route => {
            const match = router.stack.find(
                s => s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});
