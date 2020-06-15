import React, { Component } from "react"
import { Message, Icon } from 'semantic-ui-react'

const byncsa = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-Hans"


type CCProps = {
    original: boolean
    reprint?: {
        site: string
        url: string
        author: string
    }
}

const CC = (props: CCProps) => {
    const { original, reprint } = props;
    return (
        <Message info>
            <Message.Header>
                <Icon name='cc' size="large" />
                <a href={byncsa}>BY-NC-SA 4.0</a>
            </Message.Header>
            <Message.Content>
                {original ?
                    (
                        <>本文是原创内容。转载请注明转自 For RITZ 岡崎律子的非官方中文资料站[https://forritz.org],作者:ココロの雨 。</>
                    )
                    : reprint &&
                    (
                        <> 本文是转载内容。转载自<a href={reprint.url}>{reprint.site}</a>, 原作者:{reprint.author}。</>
                    )}
            </Message.Content>
        </Message >
    )
};

export default CC
