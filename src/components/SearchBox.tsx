import _ from 'lodash'
import React, { Component } from 'react'
import { Search, SearchProps, SearchResultData, SearchResultProps, Grid, Header, Segment, Label } from 'semantic-ui-react'
import algoliasearch from "algoliasearch"
import Highlighter from "react-highlight-words";
import { Link } from 'gatsby'

const ALGOLIA_APP_ID = "RDHC5K1DVL"
const ALGOLIA_SEARCH_KEY = "16aa7a01e5797d9213578ddc66613e01"

const searchClient = algoliasearch(
    ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_KEY
)
const searchIndex = searchClient.initIndex("forritz.org");

interface MatchWords {
    value: string
    fullyHighlighted?: boolean
    matchedWords: string[]
}

interface HighlightHit {
    _highlightResult: {
        [key: string]: MatchWords,
    }
}

interface Hit {
    objectID: string;
    summary: string;
    slug: string;
    title: string;
    type?: string;
    tags?: string[];
    categories?: string[];
    discography?: string[];
    singer?: string;
    titlech?: string;
    lyricwriter?: string;
    arranger?: string;
    songwriter?: string;
}
interface ResultProps extends Hit, HighlightHit, SearchResultProps {

}

interface Props {

}

interface State {
    isLoading: boolean;
    results: Hit[];
    value: string;
}

const initialState: State = { isLoading: false, results: [], value: '' }



const ResultRenderer = (props: SearchResultProps) => {
    const { title, slug, summary, _highlightResult: highlight } = props as ResultProps;
    return (
        <Link to={slug}>
            <Header as='h4'>
                {title}
                <Header.Subheader>
                    <Highlighter searchWords={highlight ? highlight.summary.matchedWords : []}
                        autoEscape={true}
                        textToHighlight={summary.substring(0, 32)} />
                </Header.Subheader>
            </Header>
        </Link>
    )
}


class SearchBox extends Component<Props, State>{
    state = initialState;

    handleResultSelect = (event: React.MouseEvent<HTMLElement>, { result }: SearchResultData) => this.setState({ value: result.title })

    handleSearchChange = (event: React.MouseEvent<HTMLElement>, { value }: SearchProps) => {
        const self = this;
        self.setState({ isLoading: true, value: value ?? "" })

        searchIndex.search<Hit>({ query: self.state.value })
            .then(({ hits }) => {
                self.setState({
                    isLoading: false,
                    results: hits,
                })
            });
    }

    render() {
        const { isLoading, value, results } = this.state


        return (
            <Search
                loading={isLoading}
                minCharacters={2}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                resultRenderer={ResultRenderer}
            />
        )
    }
}

export default SearchBox;