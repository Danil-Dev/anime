export interface INavLink {
    name: string,
    path: string
}

export const navLinks : INavLink[] = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Catalog',
        path: '/anime'
    },
    {
        name: 'Ongoing',
        path: '/ongoing'
    },
    {
        name: 'Manga',
        path: '/manga'
    }

]