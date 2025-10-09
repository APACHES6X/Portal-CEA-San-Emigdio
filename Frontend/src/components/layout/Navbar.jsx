import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

/* Color palette (matches CSS variables in main.css) */
const COLORS = {
  white: '#FFFFFF',
  primary: '#2E7D32',
  primaryAlt: '#4CAF50',
  primaryHover: '#1B5E20',
  grayDark: '#424242',
  grayMid: '#757575',
  grayLight: '#F5F5F5',
  border: '#E0E0E0',
};

/* ---------- Styled components (organized) ---------- */
const Nav = styled.header`
  width: 100%;
  height: 70px;
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.border};
  /* green accent shadow plus subtle base shadow for depth */
  box-shadow: 0 4px 12px rgba(46,125,50,0.3), 0 2px 10px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const LogoCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${COLORS.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 14px;
`;

const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.grayDark};
`;

const NavCenter = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${COLORS.grayDark};
  font-weight: ${p => (p.active ? 600 : 500)};
  text-decoration: none;
  padding: 8px 6px;
  position: relative;
  transition: all 0.25s ease;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  font-size: 1rem;
  letter-spacing: 0.2px;

  &:hover {
    color: ${COLORS.primary};
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    bottom: -2px;
    width: 60%;
    height: 2px;
    background: ${COLORS.primary};
    transition: transform 0.25s ease;
    transform-origin: center;
  }

  &:hover::after { transform: translateX(-50%) scaleX(1); }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LoginButton = styled(Link)`
  background: transparent;
  border: 1.5px solid ${COLORS.primary};
  color: ${COLORS.primary};
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  /* Match nav link typography */
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  font-size: 1rem;
  letter-spacing: 0.2px;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${COLORS.primary};
    color: ${COLORS.white};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(46,125,50,0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(46,125,50,0.4);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.primaryAlt};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.6rem 1rem;
  }
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

/* Mobile menu */
const Burger = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: inline-flex;
  }

  .bar { width: 22px; height: 2px; background: ${COLORS.grayDark}; display: block; margin: 4px 0; transition: transform 0.25s ease, opacity 0.25s ease; }
  ${p => p.open && css`
    .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }
    .bar:nth-child(2) { opacity: 0; }
    .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
  `}
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.border};
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  display: ${p => (p.open ? 'block' : 'none')};
  padding: 16px 20px;
  z-index: 40;

  @media (min-width: 769px) { display: none; }
`;

const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/* Accessibility helper */
const SrOnly = styled.span`
  position: absolute !important; height: 1px; width: 1px; overflow: hidden; clip: rect(1px,1px,1px,1px); white-space: nowrap; border: 0; padding: 0; margin: -1px;
`;

/* ---------- Component ---------- */
const LINKS = [
  { name: 'Inicio', to: '/' },
  { name: 'Educación', to: '/educacion' },
  { name: 'Multimedia', to: '/multimedia' },
  { name: 'Noticias', to: '/noticias' },
  { name: 'Contacto', to: '/contacto' },
];

const Navbar = ({ isAuthenticated = false, onLogin } = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768 && isMenuOpen) setIsMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const onDoc = (e) => {
      if (!isMenuOpen) return;
      const target = e.target;
      if (menuRef.current && !menuRef.current.contains(target) && burgerRef.current && !burgerRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [isMenuOpen]);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Nav role="navigation" aria-label="Main navigation">
      <Inner>
        <Left>
          <LogoCircle aria-hidden>PS</LogoCircle>
          <LogoText>Parque San Emigdio</LogoText>
        </Left>

        <NavCenter role="menubar" aria-label="Primary navigation">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} active={pathname === l.to} role="menuitem" tabIndex={0}>
              {l.name}
            </NavLink>
          ))}
        </NavCenter>

        <Right>
          <LoginButton to="/login" aria-label="Iniciar Sesión">
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}>
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="currentColor" />
              <path d="M4 20c0-3.313 2.687-6 6-6h4c3.313 0 6 2.687 6 6v1H4v-1z" fill="currentColor" />
            </svg>
            Iniciar Sesión
          </LoginButton>

          <Burger
            ref={burgerRef}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(v => !v)}
            open={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="bar" aria-hidden></span>
            <span className="bar" aria-hidden></span>
            <span className="bar" aria-hidden></span>
            <SrOnly>{isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}</SrOnly>
          </Burger>
        </Right>
      </Inner>

      <MobileMenu id="mobile-menu" ref={menuRef} open={isMenuOpen} role="menu" aria-hidden={!isMenuOpen}>
        <MobileLinks>
          {LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              tabIndex={0}
              style={{color: COLORS.grayDark, textDecoration: 'none', padding: '8px 0'}}
            >
              {l.name}
            </Link>
          ))}

          <LoginButton to="/login" onClick={() => { setIsMenuOpen(false); }} aria-label="Iniciar Sesión">
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}>
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="currentColor" />
              <path d="M4 20c0-3.313 2.687-6 6-6h4c3.313 0 6 2.687 6 6v1H4v-1z" fill="currentColor" />
            </svg>
            Iniciar Sesión
          </LoginButton>
        </MobileLinks>
      </MobileMenu>
    </Nav>
  );
};

    export default Navbar;

