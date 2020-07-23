import _ from 'lodash'
import React, { Component } from 'react'
import { Search, SearchProps, SearchResultProps, Grid, Header, Segment, Label } from 'semantic-ui-react'
import algoliasearch from "algoliasearch"

const ALGOLIA_APP_ID = "RDHC5K1DVL"
const ALGOLIA_SEARCH_KEY = "16aa7a01e5797d9213578ddc66613e01"

const searchClient = algoliasearch(
    ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_KEY
)
const searchIndex = searchClient.initIndex("forritz.org");


const source = _.times(5, () => ({
    title: "faker.company.companyName()",
    description: "faker.company.catchPhrase()",
    image: "faker.internet.avatar()",
    price: "faker.finance.amount(0, 100, 2, '$')",
}))

const resultRenderer = ({ title }: SearchResultProps) => <Label content={title} />

// resultRenderer.propTypes = {
//     title: PropTypes.string,
//     description: PropTypes.string,
// }

interface ResultRenderer {
    title: string,
    description: string,
}

const initialState = { isLoading: false, results: [], value: '' }

export default class SearchExampleStandard extends Component {
    state = initialState

    handleResultSelect = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => this.setState({ value: result.title })


    handleSearchChange = (event: React.MouseEvent<HTMLElement>, data: SearchProps) => {
        this.setState({ isLoading: true, value: data.value })

        //searchIndex.search(data.value)
        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result: SearchResultProps) => re.test(result.title)

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
                        resultRenderer={resultRenderer}
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