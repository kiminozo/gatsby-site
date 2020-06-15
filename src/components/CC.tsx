import React, { Component } from "react"
import { Message, Icon } from 'semantic-ui-react'

const byncsa = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-Hans"

export type ReprintInfo = {
    site: string
    url?: string
    author: string
}

type CCProps = {
    reprint?: ReprintInfo
}

const CC = (props: CCProps) => {
    const { reprint } = props;
    return (
        <Message info>
            <Message.Header>
                <Icon name='cc' size="large" />
                <a href={byncsa}>BY-NC-SA 4.0</a>
            </Message.Header>
            <Message.Content>
                {!reprint ?
                    (
                        <>本文是原创内容。转载请注明转自 <a href="https://forritz.org">For RITZ 岡崎律子的非官方中文资料站</a></>
                    )
                    :
                    (
                        <> 本文是转载内容。转载自<a href={reprint.url}>{reprint.site}</a>, 原作者:{reprint.author}。</>
                    )}
            </Message.Content>
        </Message >
    )
};

export default CC
