import React, { FocusEventHandler } from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { SearchBoxProvided } from "react-instantsearch-core"
import { Search, SearchProps } from 'semantic-ui-react'


interface Props extends Partial<SearchBoxProvided> {
    onFocus?: (event: React.MouseEvent<HTMLElement>, data: SearchProps) => void
}




export default connectSearchBox<Props>(
    ({ refine, currentRefinement, onFocus }) => (
        <Search
            onSearchChange={(event, data) => refine && refine(data.input)}
            onFocus={onFocus}
            value={currentRefinement}
        />
    )
)