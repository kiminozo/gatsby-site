import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(
    ({ refine, currentRefinement, className, onFocus }) => (
        <form>
            <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={e => refine(e.target.value)}
                value={currentRefinement}
                onFocus={onFocus}
            />
        </form>
    )
)