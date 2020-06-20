import React, { Component } from "react"
import { Message, Icon } from 'semantic-ui-react'
import "./CC.sass"


const byncsa = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-Hans"

export type License = {
    type: string
    author: string
    reproduced_url: string
    reproduced_website: string
    translator: string
}

type CCProps = {
    license?: License
}

const CC = (props: CCProps) => {
    const { license } = props;
    return (
        <Message info >
            <Message.Header>
                <Icon name='cc' size="large" />
                <a href={byncsa}>BY-NC-SA 4.0</a>
            </Message.Header>
            <Message.Content>
                {!license ?
                    (
                        <>本文是原创内容。转载请注明转自 <a href="https://forritz.org">For RITZ 岡崎律子的非官方中文资料站</a></>
                    )
                    : license.translator ?
                        (
                            <> 本文是翻译内容。翻译自<a href={license.reproduced_url}>岡崎律子BOOK</a>。</>
                        )
                        :
                        (
                            <> 本文是转载内容。转载自<a href={license.reproduced_url}>{license.reproduced_website}</a>, 原作者:{license.author}。</>
                        )}
            </Message.Content>
        </Message >
    )
};

export default CC
