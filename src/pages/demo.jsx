import React from "react"
import Search from "../components/search"
const searchIndices = [{ name: `forritz.org`, title: `forritz` }]
const Layout = () => {
    // ...
    return (
        <div
            style={{
                marginLeft: `auto`,
                marginRight: `auto`,
            }}
        >
            <header>
                <Search indices={searchIndices} />
            </header>
            <main>demo page</main>
            <footer>
            </footer>
        </div>
    )
}
export default Layout