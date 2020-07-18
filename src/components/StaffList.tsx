import React from "react"
import { Link } from "gatsby"
import {
    List
} from 'semantic-ui-react'

interface StaffInfo {
    songWriter: string[];
    lyricWriter: string[];
    singer: string[];
    arranger: string[];
}

const StaffList = ({ staff: { songWriter, lyricWriter, singer, arranger } }: { staff: StaffInfo }) => (
    <List horizontal >
        {songWriter.length > 0 && <List.Item><b>作曲</b> <StaffLink type="song-writer" names={songWriter} /> </List.Item>}
        {lyricWriter.length > 0 && <List.Item><b>作词</b> <StaffLink type="lyric-writer" names={lyricWriter} /></List.Item>}
        {singer.length > 0 && <List.Item><b>演唱</b> <StaffLink type="singer" names={singer} /></List.Item>}
        {arranger.length > 0 && <List.Item><b>编曲</b> <StaffLink type="arranger" names={arranger} /></List.Item>}
    </List>
)

const StaffLink = ({ type, names }: { type: string, names: string[] }) => (
    <>
        {
            names.map((name, i, { length }) => {
                const path = `/${type}/${name}`;
                return (
                    <React.Fragment key={path}>
                        <Link to={path}>{name}</Link>
                        {i != length - 1 ? " " : null}
                    </React.Fragment>
                )
            })
        }
    </>
)

export { StaffInfo, StaffLink }
export default StaffList;