import router from "../course.router.protected";

describe("course protected router", () => {
    test("has crud routes", () => {
        const routes = [
            { path: "/:school", method: "post" },
            { path: "/:school/:subject", method: "delete" },
            { path: "/:school/:subject/:courseCode", method: "put" },
            { path: "/:school/:subject/:courseCode", method: "delete" }
        ];

        routes.forEach(route => {
            const match = router.stack.find(
                s => s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});
