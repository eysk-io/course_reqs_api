import router from "../school.router.protected";

describe("school protected router", () => {
    test("has crud routes", () => {
        const routes = [
            { path: "/", method: "post" },
            { path: "/:schoolName", method: "put" },
            { path: "/:schoolName", method: "delete" }
        ];

        routes.forEach(route => {
            const match = router.stack.find(
                s => s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});
