import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { menuLinks, profileLinks, sportsIcons } from "./MenuData";
import Button from "@/conponents/Reuseable/Button";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  profileOpen: boolean;
  setProfileOpen: (val: boolean) => void;
  handleLogout: () => void;
  profileRef: React.RefObject<HTMLLIElement>;
}

export default function DesktopNavbar({
  user,
  profileOpen,
  setProfileOpen,
  handleLogout,
  profileRef,
}: Props) {
  const router = useRouter();

  return (
    <div className="hidden md:flex justify-between items-center px-6 h-18">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/pplogo.png"
          alt="Logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <span className="text-xl font-bold uppercase">
          Play Picker
        </span>
      </Link>

      {/* Menu */}
      <ul className="flex gap-6 items-center uppercase text-sm font-medium">
        {menuLinks.map((link) => (
          <li key={link.name} className="relative group">
            <Link
              href={link.href}
              className="hover:text-orange-500 transition"
            >
              {link.name}
            </Link>

            {/* Sports Dropdown */}
            {link.sports && (
              <ul className="absolute top-full left-0 mt-3 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                {link.sports.map((sport) => (
                  <li key={sport.name}>
                    <Link
                      href={sport.href}
                      className="flex items-center px-4 py-2 hover:bg-orange-100"
                    >
                      {sportsIcons[sport.name]} {sport.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        {/* Profile */}
        {user ? (
          <li className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="hover:text-orange-400"
            >
              <FaUserCircle size={26} />
            </button>

            {profileOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40">
                {profileLinks.map((link) => (
                  <li key={link.name}>
                    {link.name === "Logout" ? (
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-orange-100"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-4 py-2 hover:bg-orange-100"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ) : (
          <Button onClick={() => router.push("/signin")}>
            Sign In
          </Button>
        )}
      </ul>
    </div>
  );
}