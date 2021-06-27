import router from "../course.router.protected";

describe("course protected router", () => {
    test("has crud routes", () => {
        const routes = [
            { path: "/:school", method: "post" },
            { path: "/:school/:courseName", method: "delete" },
            { path: "/:school/:courseName/:courseNumber", method: "put" },
            { path: "/:school/:courseName/:courseNumber", method: "delete" }
        ];

        routes.forEach(route => {
            const match = router.stack.find(
                s => s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});
