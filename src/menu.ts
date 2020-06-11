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
            name: "page-3",
            link: "/demo/page-3/"
        }, {
            name: "page-4",
            link: "/demo/page-4/"
        }, {
            name: "page-5",
            link: "/demo/page-5/"
        }, {
            name: "page-6",
            link: "/demo/page-6/"
        }]
    }, {
        name: "song-demo",
        link: "/songs/asa-whats-goin-on"
    }];

export { MenuConfig, menusConfig }