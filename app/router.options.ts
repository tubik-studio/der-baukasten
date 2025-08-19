import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig> {
    scrollBehavior(to, _from, _savedPosition) {
        if (to.hash) {
            return { el: to.hash, top: 0, behavior: "auto" }
        } else {
            return { left: 0, top: 0 }
        }
    }
}
