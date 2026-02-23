import { useState } from 'react';


const navLinks = [
  { label: 'Where to Live', href: '/where-to-live' },
  { label: 'House Prices', href: '/house-prices' },
  { label: 'Schools', href: '/schools' },
  { label: 'Commuting', href: '/commuting' },
  { label: 'Buying Guide', href: '/buying-guide' },
  { label: 'Is It Worth It?', href: '/lifestyle' },
  { label: 'Investment', href: '/investment', highlight: true },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      style={{
        backgroundColor: '#FAFAF8',
        borderBottom: '1px solid #E5E0D8',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '66px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', flexShrink: 0 }}
          aria-label="movetocheshire.uk  -  home"
        >
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '17px',
              fontWeight: 700,
              color: '#1C1C1E',
              letterSpacing: '-0.02em',
            }}
          >
            movetocheshire
          </span>
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '17px',
              fontWeight: 700,
              color: '#3D5A3E',
              letterSpacing: '-0.02em',
            }}
          >
            .uk
          </span>
        </a>

        <ul
          className="hidden lg:flex"
          style={{
            alignItems: 'center',
            gap: '20px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.highlight ? (
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#C4933F',
                    textDecoration: 'none',
                    border: '1px solid rgba(196,147,63,0.4)',
                    padding: '5px 12px',
                    letterSpacing: '0.01em',
                    transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = '#C4933F';
                    el.style.color = '#FFFFFF';
                    el.style.borderColor = '#C4933F';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'transparent';
                    el.style.color = '#C4933F';
                    el.style.borderColor = 'rgba(196,147,63,0.4)';
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <a href={link.href} className="nav-link" style={{ fontSize: '13px' }}>
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <button
          className="flex lg:!invisible"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
            flexShrink: 0,
          }}
        >
          {open ? (
            <>
              <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#1C1C1E', transform: 'translateY(3.25px) rotate(45deg)', transformOrigin: 'center' }} />
              <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#1C1C1E', transform: 'translateY(-3.25px) rotate(-45deg)', transformOrigin: 'center' }} />
            </>
          ) : (
            <>
              <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#1C1C1E' }} />
              <span style={{ display: 'block', width: '22px', height: '1.5px', backgroundColor: '#1C1C1E' }} />
              <span style={{ display: 'block', width: '14px', height: '1.5px', backgroundColor: '#1C1C1E' }} />
            </>
          )}
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden"
          style={{
            backgroundColor: '#FAFAF8',
            borderTop: '1px solid #E5E0D8',
            padding: '8px 0 16px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'Inter, Arial, sans-serif',
                fontSize: '16px',
                fontWeight: link.highlight ? 600 : 500,
                color: link.highlight ? '#C4933F' : '#1C1C1E',
                textDecoration: 'none',
                padding: '12px 24px',
                borderBottom: '1px solid #F0EDE8',
                transition: 'background-color 0.1s ease, color 0.1s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.backgroundColor = '#F2EFE9';
                el.style.color = link.highlight ? '#A0721F' : '#3D5A3E';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'transparent';
                el.style.color = link.highlight ? '#C4933F' : '#1C1C1E';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
