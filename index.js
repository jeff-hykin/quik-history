let thisModule
module.exports = thisModule = {
    frontend : () => {
        Object.defineProperty(history, "loadPage", {
            get: function() { 
                return (path,...args) => {
                    if (path == null) {
                        // removes the slash at the front
                        path = window.location.pathname.replace(/^\//,"")
                    }
                    this.pushState({url:path, args},"",path)
                    this.loadWithoutAddingToHistory(path, ...args)
                }
            },
            set: function (newValue) {
                this.loadWithoutAddingToHistory = newValue
                // add the listener if it hasnt been added
                if (!this.loadPageListenerIsSet) {
                    this.loadPageListenerIsSet = true
                    window.addEventListener("popstate", (e)=> {
                        if (e.state != null) {
                            this.loadWithoutAddingToHistory(e.state.url, ...e.state.args)
                        }
                    })
                }
            }
        })
    },
    generateFrontend : (server) => `(${thisModule.frontend})()`,
}