import React from 'react'
import { Link } from '@inertiajs/react'

export default function Pagination({links}) {
  return (
        <nav className='text-center mt-4'>
            {links.map(link => (
                <Link dangerouslySetInnerHTML= {{__html: link.label}} className={"inline-block py-2 px-3 rounded-lg text-gray-400 text-xs" + (link.active ? " bg-gray-950 " : " ") + (!link.url ? " text-gray-500 cursor-not-allowed " : " hover-bg-gray-950 ")} key={link.label} href={link.url || " "} preserveScroll ></Link>
            ))}
        </nav>
  )
}
