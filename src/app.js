export const dva = {
    config: {
        onError(err) {
            err.preventDefault()
        },
    },
}

export function patchRoutes(routes) {
    window.g_routes = routes
}

export function onRouteChange() {}

export function render(oldRender) {
    oldRender()
}
