import React from "react"
import { Link } from "gatsby"
import {
    List
} from 'semantic-ui-react'

export interface StaffInfo {
    songWriter: string[];
    lyricWriter: string[];
    singer: string[];
    arranger: string[];
}


export const StaffLink = ({ type, names }: { type: string, names: string[] }) => (
    <>
        {
            names.map((name, i, { length }) => (
                <>
                    <Link to={`/${type}/${name}`}>{name}</Link>
                    {i != length - 1 ? " " : null}
                </>
            ))
        }
    </>
)

const StaffList = ({ staff }: { staff: StaffInfo }) => (
    <List horizontal >
        <List.Item ><b>作曲</b> <StaffLink type="song-writer" names={staff.songWriter} /> </List.Item>
        <List.Item><b>作词</b> <StaffLink type="lyric-writer" names={staff.lyricWriter} /></List.Item>
        <List.Item><b>演唱</b> <StaffLink type="singer" names={staff.singer} /></List.Item>
        <List.Item><b>编曲</b> <StaffLink type="arranger" names={staff.arranger} /></List.Item>
    </List>
)

export default StaffList;