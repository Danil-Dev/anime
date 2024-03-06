export interface INavLink {
    name: string,
    path: string
}

export const navLinks : INavLink[] = [
    {
        name: 'Каталог',
        path: '/catalog'
    },
    // {
    //     name: 'Ongoing',
    //     path: '/ongoing'
    // },


]


export const settingNav : INavLink[] = [
    {
        name: 'Підписка',
        path: '/profile/settings/membership'
    },
    {
        name: 'Змінити пароль',
        path: '/profile/settings/changePassword'
    }
]