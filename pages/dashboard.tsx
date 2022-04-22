import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';

export default function Dashboard () {
    return (
        <div className="container1" style={{display: "grid"}}>
            <nav className="navbar">
                <Image src="/logo3.png" alt="logo" width="150px" height="52px" />
                <section>
                    <SettingsIcon fontSize="medium" />
                    <PersonIcon fontSize="medium" />
                    <ShareIcon fontSize="medium" />
                </ section>

                {/* <a className="btn-navbar">Dashboard</a>
                <a className="btn-navbar">Clients</a>
                <a className="btn-navbar">Projects</a> */}
            </nav>
            <nav className="side-navbar">Boczne menu główne, zawsze otwarte kolumna 22222 </nav>
            <div className="content">zawartosc poszczegolnej zakladki 33333</div>
            <section className="statistic-a">dane statystyczne, ilosc wykonanych projektów 44444</section>
            <section className="statistic-b">dane statystyczne, ilosc klientów 5555555</section>
            <section className="statistic-c">dane statystyczne, projekty w trakcie 6666</section>
        </ div>
    )
}