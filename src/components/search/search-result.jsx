import { Link } from "gatsby"
import { default as React } from "react"
import {
    connectStateResults,
    Highlight,
    Hits,
    Index,
    Snippet,
    PoweredBy,
} from "react-instantsearch-dom"

const HitCount = connectStateResults(({ searchResults }) => {
    const hitCount = searchResults && searchResults.nbHits
    return hitCount > 0 ? (
        <div className="HitCount">
            {hitCount} result{hitCount !== 1 ? `s` : ``}
        </div>
    ) : null
})
const PageHit = ({ hit }) => (
    <div>
        <Link to={hit.frontmatter.slug}>
            <h4>
                <Highlight attribute="title" hit={hit.frontmatter.title} tagName="mark" />
            </h4>
        </Link>
        <Snippet attribute="excerpt" hit={hit.frontmatter} tagName="mark" />
    </div>
)
const PageHit2 = ({ hit }) => (
    <div>
        <Link to={hit.frontmatter.slug}>
            {hit.frontmatter.title}
        </Link>
    </div>
)
const HitsInIndex = ({ index }) => (
    <Index indexName={index.name}>
        <HitCount />
        <Hits className="Hits" hitComponent={PageHit2} />
    </Index>
)
const SearchResult = ({ indices, className }) => (
    <div className={className}>
        {indices.map(index => (
            <HitsInIndex index={index} key={index.name} />
        ))}
        <PoweredBy />
    </div>
)
export default SearchResult