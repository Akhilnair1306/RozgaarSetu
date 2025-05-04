import React from "react";
import { Button } from "../ui/button";
import AuthModal from "../ui/AuthModal";
import { cn } from "@/lib/utils";
import { Menu, X, User, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const menuItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Jobs', href: '/jobs' }
    // { name: 'For Employers', href: '/' },
    // { name: 'About', href: '/' },
];

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(false);
    const [showSignup, setShowSignup] = React.useState(false);
    const [showProfileMenu, setShowProfileMenu] = React.useState(false); // To toggle profile menu
    const userEmail = Cookies.get("user_email"); // Get the user email from the cookie
    const navigate = useNavigate();
    // const [showProfileMenu, setShowProfileMenu] = useState(false);
    
    const handleProfileClick = () => {
      setShowProfileMenu(false); // Close the dropdown
      navigate("/profile-page"); // Navigate to profile page
    };
    
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        Cookies.remove("user_email"); // Remove the user email from cookies
        setShowProfileMenu(false); // Close the profile menu
    };

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <a
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                {/* <Logo /> */}
                                RozgaarSetu
                            </a>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState === true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item?.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item?.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {userEmail ? (
                                // If logged in, show profile icon and logout button
                                <div className="relative">
                                    <Button
                                        onClick={handleProfileClick}
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center space-x-2"
                                    >
                                        <User className="size-6" />
                                        <span>Profile</span>
                                    </Button>
                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                                            <ul>
                                                <li>
                                                    <Button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-2 text-sm"
                                                    >
                                                        <LogOut className="mr-2" />
                                                        Logout
                                                    </Button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                    <Button
                                        onClick={() => setShowLogin(true)}
                                        variant="outline"
                                        size="sm"
                                        className={cn(isScrolled && 'lg:hidden')}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        onClick={() => setShowSignup(true)}
                                        size="sm"
                                        className={cn(isScrolled && 'lg:hidden')}
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            )}

                            {/* <Button
                                asChild
                                size="sm"
                                className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                <a href="\link">
                                    <span>Get Started</span>
                                </a>
                            </Button> */}
                        </div>
                    </div>
                </div>
            </nav>
            <AuthModal type="login" open={showLogin} onClose={() => setShowLogin(false)} />
            <AuthModal type="signup" open={showSignup} onClose={() => setShowSignup(false)} />
        </header>
    );
};

export default HeroHeader;
