import Link from "next/link"

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "Cars",
    href: "/cars",
    submenu: [
      { name: "All Cars", href: "/cars" },
      { name: "Luxury Cars", href: "/cars?type=luxury" },
      { name: "SUVs", href: "/cars?type=suv" },
      { name: "Sedans", href: "/cars?type=sedan" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-bold">
          Car Rental
        </Link>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <div key={item.name}>
              <Link href={item.href} className="text-gray-300 hover:text-white">
                {item.name}
              </Link>
              {item.submenu && (
                <div className="absolute bg-white shadow-md rounded-md hidden group-hover:block">
                  <ul className="py-2">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name} className="px-4 py-2 hover:bg-gray-100">
                        <Link href={subItem.href} className="block text-gray-800">
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
