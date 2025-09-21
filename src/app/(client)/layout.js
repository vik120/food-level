'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from '../page.module.css';
export default function RootLayout({ children }) {
    const pathName = usePathname()
  return (<> 
         <header className={classes.header}>
        <div className={classes.slideshow}></div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community" className='{pathName.startsWith("/community"} ? "active": ""'>Join the Community</Link>
            <Link href="/meals" className='{pathName.startsWith("/meals"} ? "active": ""'>Explore Meals</Link>
          </div>
        </div>
        
      </header>
      {children}
        
 
</>  );
}
