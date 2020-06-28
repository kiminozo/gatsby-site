import React, { Component } from "react"
import { Message, Icon } from 'semantic-ui-react'
import "./CC.sass"
import { License } from "./License";

const byncsa = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-Hans"


const CC = ({ license }: { license?: License }) => (
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
                        <> 本文是翻译内容。翻译自<a href={license.reproduced_url}>岡崎律子BOOK</a>, 译者:{license.translator}。</>
                    )
                    :
                    (
                        <> 本文是转载内容。转载自<a href={license.reproduced_url}>{license.reproduced_website}</a>, 原作者:{license.author}。</>
                    )}
        </Message.Content>
    </Message >
);

export { License }
export default CC
