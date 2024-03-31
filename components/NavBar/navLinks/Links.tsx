import ActiveLink from "./ActiveLink/ActiveLink"

const Links = ({locale}: {locale: string}) => {

    const links = [
        {
            title: 'About',
            path: '/about'
        },
        {
            title: 'Users',
            path: '/users'
        },
        {
            title: 'Combos',
            path: '/combos'
        },
        {
            title: 'YourCombos',
            path: '/your-combos'
        }
    ]

  return (

    <div>
      <div className="flex gap-[10px]">
        {links.map((link => (
          <ActiveLink key={link.title} item={link} locale={locale} />
        )))}
      </div>
    </div>
  )
}

export default Links
