let thisModule
module.exports = thisModule = {
    frontend : () => {
        Object.defineProperty(history, "loadPage", {
            get: function() { 
                return (path) => {
                    this.pushState({url:path},"",path)
                    this.shallowLoad(path)
                }
            },
            set: function (newValue) {
                this.shallowLoad = newValue
                // add the listener if it hasnt been added
                if (!this.loadPageListenerIsSet) {
                    this.loadPageListenerIsSet = true
                    window.addEventListener("popstate", (e)=> {
                        this.shallowLoad(e.state.url)
                    })
                }
            }
        })
    },
    generateFrontend : (server) => `(${thisModule.frontend})()`,
}