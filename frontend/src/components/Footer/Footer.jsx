import classes from './Footer.module.css'

export default function Footer(){
    return (
        <>
        <div className={classes.footer}>
            <p>rentals.</p>
            <div className={classes.footerLinks}>
                <p>Home</p>
                <p>About</p>
                <p>Fleet</p>
                <p>Contact</p>
                <p>Services</p>
            </div>
        </div>
        <div className={classes.copyright}>
            <p>&copy; 2024; Designed and Developed by Md Aman Khan</p>
        </div>
        </>
    )
}