import _ from 'lodash'
import React, { Component } from 'react'
import { Search, SearchProps, SearchResultData, SearchResultProps, Grid, Header, Segment, Label } from 'semantic-ui-react'
import algoliasearch from "algoliasearch"

const ALGOLIA_APP_ID = "RDHC5K1DVL"
const ALGOLIA_SEARCH_KEY = "16aa7a01e5797d9213578ddc66613e01"

const searchClient = algoliasearch(
    ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_KEY
)
const searchIndex = searchClient.initIndex("forritz.org");

const source = _.times(5, (): Hit => ({
    objectID: "id",
    frontmatter: {
        slug: "slug",
        title: "title2",
    },
    content: "content"
}))


// resultRenderer.propTypes = {
//     title: PropTypes.string,
//     description: PropTypes.string,
// }

// interface ResultRenderer {
//     title: string,
//     description: string,
// }

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
interface Props {

}

interface State {
    isLoading: boolean;
    results: Hit[];
    value: string;
}

const initialState: State = { isLoading: false, results: [], value: '' }

const ResultRenderer = ({ frontmatter: { title } }: Hit & SearchResultProps) => (
    <Label content={title} />
)


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
            // if (!this.state.value || this.state.value.length < 1)
            //     return this.setState(initialState)

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