import _ from 'lodash'
import React, { Component } from 'react'
import { Search, SearchProps, SearchResultData, SearchResultProps, Grid, Header, Segment, Label } from 'semantic-ui-react'
import algoliasearch from "algoliasearch"
import {
    Highlight,
    Hits,
    Snippet,
    PoweredBy,
} from "react-instantsearch-dom"
import Highlighter from "react-highlight-words";
import { Link } from 'gatsby'

const ALGOLIA_APP_ID = "RDHC5K1DVL"
const ALGOLIA_SEARCH_KEY = "16aa7a01e5797d9213578ddc66613e01"

const searchClient = algoliasearch(
    ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_KEY
)
const searchIndex = searchClient.initIndex("forritz.org");

const source = _.times(5, (): Hit => ({
    objectID: "id2",
    frontmatter: {
        slug: "slug2",
        title: "title2",
    },
    content: "2飯塚雅弓さんのレコーディングで。   サウンドプロデューサーの長谷川さんと、コーラスを決めているところ。   コーラスとなると、つい、はりきる私ですが、この日は少なめにあっさりにして、おとなしく帰りました。   由于和饭冢雅弓的录音。   可以断定合唱的声音制片人是长谷川先生。   当变成合唱的时候、我是充满干劲"
}))


// resultRenderer.propTypes = {
//     title: PropTypes.string,
//     description: PropTypes.string,
// }

// interface ResultRenderer {
//     title: string,
//     description: string,
// }
interface MatchWords {
    value: string
    fullyHighlighted?: boolean
    matchedWords: string[]
}

interface HighlightHit {
    _highlightResult: {
        frontmatter: {
            [key: string]: MatchWords,
        }
        content: MatchWords,
    }
}

interface Hit {
    objectID: string;
    frontmatter: {
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
    content: string;
}
// interface ResultProps extends Hit, HighlightHit, SearchResultProps {

// }

interface Props {

}

interface State {
    isLoading: boolean;
    results: Hit[];
    value: string;
}

const initialState: State = { isLoading: false, results: [], value: '' }



const ResultRenderer = (props: SearchResultProps) => {
    const { frontmatter: { title, slug }, content, _highlightResult: highlight } = props as unknown as (HighlightHit & Hit);
    return (
        <Link to={slug}>
            <Header as='h4'>
                {title}
                <Header.Subheader>
                    <Highlighter searchWords={highlight.content.matchedWords}
                        autoEscape={true}
                        textToHighlight={content.substring(0, 100)} />
                </Header.Subheader>
            </Header>
        </Link>
    )
}

// const ResultRenderer = (props: SearchResultProps) => {
//     let context = props.content;
//     console.log(context)
//     return (
//         <div />
//     )
// }


class SearchBox extends Component<Props, State>{
    state = initialState;

    handleResultSelect = (event: React.MouseEvent<HTMLElement>, { result }: SearchResultData) => this.setState({ value: result.title })

    handleSearchChange = (event: React.MouseEvent<HTMLElement>, { value }: SearchProps) => {
        this.setState({ isLoading: true, value: value ?? "" })

        searchIndex.search<Hit>(this.state.value)
            .then(({ hits }) => {
                this.setState({
                    isLoading: false,
                    results: hits,
                })
            });
    }

    handleSearchChangeFake = (event: React.MouseEvent<HTMLElement>, { value }: SearchProps) => {
        this.setState({ isLoading: true, value: value ?? "" })

        // if (!this.state.value) return this.setState(initialState)

        // if (!this.state.value || this.state.value.length < 1) {
        //     setTimeout(() => {
        //         this.setState(initialState)
        //     }, 300)
        //     return;
        // }

        setTimeout(() => {
            if (!this.state.value || this.state.value.length < 1)
                return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result: Hit) => re.test(result.content)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state


        return (
            <Grid>
                <Grid.Column width={6}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                            leading: true,
                        })}
                        results={results}
                        value={value}
                        resultRenderer={ResultRenderer}
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Segment>
                        <Header>State</Header>
                        <pre style={{ overflowX: 'auto' }}>
                            {JSON.stringify(this.state, null, 2)}
                        </pre>
                        <Header>Options</Header>
                        <pre style={{ overflowX: 'auto' }}>
                            {JSON.stringify(source, null, 2)}
                        </pre>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default class SearchExampleStandard extends Component {


    render() {

        return (
            <SearchBox />
        )
    }
}