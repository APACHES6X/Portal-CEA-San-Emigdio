import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';

/* ---------- Types ---------- */
type NavLinkDef = { 
  name: string; 
  to?: string;
  submenu?: { name: string; to: string }[];
};

const LINKS: NavLinkDef[] = [
  { name: 'Inicio', to: '/' },
  { 
    name: 'Educación',
    submenu: [
      { name: 'Actividades', to: '/educacion/actividades' },
      { name: 'Material Académico', to: '/educacion/material-academico' },
      { name: 'Artículos Científicos', to: '/educacion/articulos-cientificos' },
      { name: 'Capacitaciones', to: '/educacion/capacitaciones' },
    ]
  },
  { name: 'Multimedia', to: '/multimedia' },
  { name: 'Noticias', to: '/noticias' },
  { name: 'Contacto', to: '/contacto' },
];

type Props = {
  isAuthenticated?: boolean;
  onLogin?: () => void;
};

const Navbar = ({ isAuthenticated = false, onLogin }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current pathname for active link detection
  const pathname = location.pathname;

  // Handle login button click
  const handleLoginClick = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigate('/login');
    }
  };

  // Close menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMenuOpen]);

  // Click outside to close
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!isMenuOpen) return;
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        burgerRef.current &&
        !burgerRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [isMenuOpen]);

  // Close on ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!openDropdown) return;
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [openDropdown]);

  return (
    <header
      role="navigation"
      aria-label="Main navigation"
      className="w-full h-[70px] bg-white border-b border-gray-200 shadow-sm flex items-center justify-center transition-all duration-300 ease-in-out"
    >
      <div className="w-full max-w-[1200px] px-5 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-3.5">
          <div
            className="w-10 h-10 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-bold text-sm"
            aria-hidden="true"
          >
            PS
          </div>
          <span className="text-xl font-semibold text-gray-800">
            Parque San Emigdio
          </span>
        </div>

        {/* Center - Desktop Navigation */}
        <nav
          role="menubar"
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6"
        >
          {LINKS.map((link) => {
            const isActive = link.to ? pathname === link.to : link.submenu?.some(sub => pathname === sub.to);
            
            if (link.submenu) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  ref={openDropdown === link.name ? dropdownRef : null}
                >
                  <button
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === link.name}
                    onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                    className={`
                      relative px-1.5 py-2 font-medium text-base tracking-wide
                      transition-all duration-250 ease-in-out flex items-center gap-1
                      hover:text-[#2E7D32] hover:-translate-y-px
                      after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
                      after:bottom-[-2px] after:w-[60%] after:h-0.5 after:bg-[#2E7D32]
                      after:transition-transform after:duration-250 after:ease-in-out
                      after:origin-center after:scale-x-0
                      hover:after:scale-x-100
                      ${isActive ? 'text-gray-800 font-semibold' : 'text-gray-800'}
                    `}
                    style={{ fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
                  >
                    {link.name}
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {openDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.to}
                          to={sublink.to}
                          onClick={() => setOpenDropdown(null)}
                          className={`
                            block px-4 py-2.5 text-sm transition-colors duration-200
                            hover:bg-green-50 hover:text-[#2E7D32]
                            ${pathname === sublink.to ? 'bg-green-50 text-[#2E7D32] font-medium' : 'text-gray-700'}
                          `}
                          style={{ fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.to}
                to={link.to!}
                role="menuitem"
                tabIndex={0}
                className={`
                  relative px-1.5 py-2 font-medium text-base tracking-wide
                  transition-all duration-250 ease-in-out
                  hover:text-[#2E7D32] hover:-translate-y-px
                  after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
                  after:bottom-[-2px] after:w-[60%] after:h-0.5 after:bg-[#2E7D32]
                  after:transition-transform after:duration-250 after:ease-in-out
                  after:origin-center after:scale-x-0
                  hover:after:scale-x-100
                  ${isActive ? 'text-gray-800 font-semibold' : 'text-gray-800'}
                `}
                style={{ fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right - Login Button & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Login Button - Desktop */}
          <button
            aria-label="Iniciar Sesión"
            onClick={handleLoginClick}
            className="hidden md:inline-flex items-center gap-2 bg-transparent border-[1.5px] border-[#2E7D32] text-[#2E7D32] px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out font-medium text-base tracking-wide hover:bg-[#2E7D32] hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2E7D3250] active:translate-y-0 active:shadow-md active:shadow-[#2E7D3266] focus-visible:outline-2 focus-visible:outline-[#4CAF50] focus-visible:outline-offset-2 group"
            style={{ fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
          >
            <User size={18} className="transition-colors duration-300 group-hover:text-white" />
            Iniciar Sesión
          </button>

          {/* Mobile Menu Button */}
          <button
            ref={burgerRef}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden bg-transparent border-none cursor-pointer p-2"
          >
            <div className="flex flex-col gap-1">
              <span
                className={`block w-[22px] h-0.5 bg-gray-800 transition-all duration-250 ease-in-out ${
                  isMenuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
                aria-hidden="true"
              />
              <span
                className={`block w-[22px] h-0.5 bg-gray-800 transition-all duration-250 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
                aria-hidden="true"
              />
              <span
                className={`block w-[22px] h-0.5 bg-gray-800 transition-all duration-250 ease-in-out ${
                  isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
                aria-hidden="true"
              />
            </div>
            <span className="absolute w-px h-px overflow-hidden whitespace-nowrap border-0 p-0 -m-px clip-[rect(1px,1px,1px,1px)]">
              {isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="menu"
        aria-hidden={!isMenuOpen}
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-gray-200 shadow-md p-4 z-40`}
      >
        <div className="flex flex-col gap-2">
          {LINKS.map((link) => {
            if (link.submenu) {
              return (
                <div key={link.name} className="flex flex-col">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                    className="text-gray-800 no-underline py-2 hover:text-[#2E7D32] transition-colors flex items-center justify-between"
                  >
                    {link.name}
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openDropdown === link.name && (
                    <div className="pl-4 flex flex-col gap-1 mt-1">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.to}
                          to={sublink.to}
                          role="menuitem"
                          tabIndex={0}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                          className={`text-sm py-2 transition-colors ${
                            pathname === sublink.to 
                              ? 'text-[#2E7D32] font-medium' 
                              : 'text-gray-600 hover:text-[#2E7D32]'
                          }`}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.to}
                to={link.to!}
                role="menuitem"
                tabIndex={0}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 no-underline py-2 hover:text-[#2E7D32] transition-colors"
              >
                {link.name}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLoginClick();
            }}
            aria-label="Iniciar Sesión"
            className="w-full inline-flex items-center justify-center gap-2 bg-transparent border-[1.5px] border-[#2E7D32] text-[#2E7D32] px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-300 ease-in-out font-medium text-base hover:bg-[#2E7D32] hover:text-white group"
          >
            <User size={18} className="transition-colors duration-300 group-hover:text-white" />
            Iniciar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;