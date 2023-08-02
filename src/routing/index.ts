export interface INavLink {
    name: string,
    path: string
}

export const navLinks : INavLink[] = [
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