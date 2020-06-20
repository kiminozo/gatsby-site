type MenuConfig = {
    name: string;
    link: string;
    sub?: MenuConfig[];
}

const menusConfig: MenuConfig[] =
    [{
        name: "首页",
        link: "/"
    }, {
        name: "bio",
        link: "/biography",
    }, {
        name: "post",
        link: "/blog/my-first-post/"
    }, {
        name: "demos",
        link: "/biography",
        sub: [{
            name: "page-2",
            link: "/demo/page-2/"
        }, {
            name: "tags",
            link: "/tags"
        }, {
            name: "categories",
            link: "/categories"
        }, {
            name: "rain-or-shine-9",
            link: "/rain-or-shine/rain-or-shine-09"
        }, {
            name: "photo-diary-1",
            link: "/photo-diary/photo-01"
        }]
    }, {
        name: "song-demo",
        link: "/songs/asa-whats-goin-on"
    }];

export { MenuConfig, menusConfig }