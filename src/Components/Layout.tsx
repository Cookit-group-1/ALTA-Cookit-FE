import React, { FC } from 'react'

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className='flex justify-center items-center w-full h-full'>
            {children}
        </div>
    )
}

export default Layout