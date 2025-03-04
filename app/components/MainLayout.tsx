'use client'

import { usePathname } from 'next/navigation'
import React from "react";
import Link from "next/link";
import { BoxIcon, CaptionsIcon, HomeIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export function Navbar() {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 w-full">
                    <div className="mx-2 flex-1 px-2">
                        <Image src="vercel.svg"
                               width={ 500 }
                               height={ 500 }
                               alt="logo" className="size-12"/>
                    </div>
                    <div className="flex-none block">
                        <ul className="menu menu-horizontal">
                            <li><Link href="/">Home</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const path = usePathname()
    return (
        <>
            <Navbar/>
            <div className="min-h-screen flex">
                <ul className="menu bg-base-200 rounded-box w-56 hidden sm:block">
                    <li>
                        <h2 className="menu-title">Invoice Menu</h2>
                        <ul className='space-y-2'>
                            <li>
                                <Link href="/" className={ `${ path === '/' ? 'menu-active' : '' } ` }>
                                    <HomeIcon/> Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/customers"
                                      className={ `${ path === '/customers' ? 'menu-active' : '' } ` }>
                                    <UserIcon/> Customers
                                </Link>
                            </li>
                            <li>
                                <Link href="/products"
                                      className={ `${ path === '/products' ? 'menu-active' : '' } ` }>
                                    <BoxIcon/> Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/invoices"
                                      className={ `${ path === '/invoices' ? 'menu-active' : '' } ` }>
                                    <CaptionsIcon/> Invoices
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className="container mx-auto px-4 py-6">
                    { children }
                </div>
                <div className="dock sm:hidden">
                    <Link href="/"
                          className={ `${ path === '/' ? 'dock-active' : '' } ` }>
                        <HomeIcon/>
                        <span className="dock-label">Home</span>
                    </Link>

                    <Link href="/customers"
                       className={ `${ path === '/customers' ? 'dock-active' : '' } ` }>
                        <UserIcon/>
                        <span className="dock-label">Customers</span>
                    </Link>

                    <Link href="/products"
                       className={ `${ path === '/products' ? 'dock-active' : '' } ` }>
                        <BoxIcon/>
                        <span className="dock-label">Products</span>
                    </Link>

                    <Link href="/invoices"
                       className={ `${ path === '/invoices' ? 'dock-active' : '' } ` }>
                        <CaptionsIcon/>
                        <span className="dock-label">Invoices</span>
                    </Link>
                </div>
            </div>
            <Toaster position={'top-right'}/>
        </>
    );
}
