type MenuConfig = {
    name: string;
    link: string;
    sub?: MenuConfig[];
}

const menusConfig: MenuConfig[] =
    [{
        name: "home",
        link: "/"
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
            link: "/demo/page-5/"
        },
        {
            name: "page-5",
            link: "/demo/page-5/"
        }]
    }, {
        name: "bio",
        link: "/biography",
    }, {
        name: "post",
        link: "/blog/my-first-post/"
    }];

export { MenuConfig, menusConfig }
    // [{
    //     "name": "title",
    //     "link": "/"
    // }, {
    //     "name": "bio",
    //     "link": "/biography",
    //     "sub": {
    //         "name": "hello",
    //         "link": "/blog/my-first-post"
    //     }
    // }, {
    //     "name": "photos",
    //     "link": "/page-2"
    // }]