import React, { FC } from 'react'

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className='flex justify-center items-start w-full h-full min-h-screen'>
            <div className='relative min-h-screen flex flex-col w-full sm:w-2/3 lg:w-1/2 max-w-xl items-center justify-start'>
                {children}
            </div>
        </div>
    )
}

export default Layout