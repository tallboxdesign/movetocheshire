import { useState, useMemo } from 'react';

type SortDir = 'asc' | 'desc' | null;
type SortKey = 'area' | 'price' | 'commute' | 'schools' | 'bestFor';

interface AreaRow {
  area: string;
  priceNum: number;
  price: string;
  commute: string;
  commuteNum: number;
  schools: string;
  bestFor: string;
  indirect?: boolean;
  priceCategory: 'budget' | 'mid' | 'premium';
}

const areas: AreaRow[] = [
  { area: 'Wilmslow', priceNum: 490000, price: '£490,000', commute: '17 mins', commuteNum: 17, schools: 'Wilmslow High (Good)', bestFor: 'Families, commuters', priceCategory: 'premium' },
  { area: 'Alderley Edge', priceNum: 700000, price: '£700,000+', commute: '22 mins', commuteNum: 22, schools: 'Alderley Edge School for Girls', bestFor: 'Premium lifestyle', priceCategory: 'premium' },
  { area: 'Knutsford', priceNum: 430000, price: '£430,000', commute: '35 mins', commuteNum: 35, schools: 'Knutsford Academy (Outstanding)', bestFor: 'Families, village feel', priceCategory: 'premium' },
  { area: 'Chester', priceNum: 250000, price: '£250,000', commute: '50 mins', commuteNum: 50, schools: "King's School, Queen's School", bestFor: 'First-time buyers, history', priceCategory: 'mid' },
  { area: 'Macclesfield', priceNum: 280000, price: '£280,000', commute: '25 mins', commuteNum: 25, schools: 'The Macclesfield Academy', bestFor: 'Value, Peak District access', priceCategory: 'mid' },
  { area: 'Tarporley', priceNum: 380000, price: '£380,000', commute: '55 mins*', commuteNum: 55, schools: 'Tarporley High (Outstanding)', bestFor: 'Village life, families', priceCategory: 'mid', indirect: true },
  { area: 'Crewe', priceNum: 175000, price: '£175,000', commute: '55 mins', commuteNum: 55, schools: 'Ruskin Academy', bestFor: 'Budget buyers, investors', priceCategory: 'budget' },
  { area: 'Northwich', priceNum: 220000, price: '£220,000', commute: '40 mins', commuteNum: 40, schools: 'Hartford High School', bestFor: 'Affordable, good links', priceCategory: 'budget' },
  { area: 'Nantwich', priceNum: 295000, price: '£295,000', commute: '60 mins*', commuteNum: 60, schools: 'Malbank School', bestFor: 'Market town, SW Cheshire', priceCategory: 'mid', indirect: true },
  { area: 'Prestbury', priceNum: 650000, price: '£650,000+', commute: '20 mins', commuteNum: 20, schools: 'Nearby independent schools', bestFor: 'Premium village, quiet', priceCategory: 'premium' },
];

const priceColour: Record<AreaRow['priceCategory'], string> = {
  budget: '#3D5A3E',
  mid: '#1A2332',
  premium: '#C4933F',
};

function SortIcon({ dir }: { dir: SortDir }) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontSize: '10px',
        marginLeft: '5px',
        opacity: dir ? 1 : 0.3,
        color: dir ? '#3D5A3E' : 'inherit',
      }}
    >
      {dir === 'desc' ? '' : ''}
    </span>
  );
}

export default function AreaTable() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else if (sortDir === 'desc') { setSortKey(null); setSortDir(null); }
      else setSortDir('asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return areas;
    return [...areas].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;
      if (sortKey === 'price') { aVal = a.priceNum; bVal = b.priceNum; }
      else if (sortKey === 'commute') { aVal = a.commuteNum; bVal = b.commuteNum; }
      else if (sortKey === 'area') { aVal = a.area; bVal = b.area; }
      else if (sortKey === 'schools') { aVal = a.schools; bVal = b.schools; }
      else { aVal = a.bestFor; bVal = b.bestFor; }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [sortKey, sortDir]);

  const thBase: React.CSSProperties = {
    padding: '14px 16px',
    textAlign: 'left',
    fontSize: '11px',
    fontFamily: 'Inter, Arial, sans-serif',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#777777',
    backgroundColor: '#F5F2EE',
    borderBottom: '2px solid #E5E0D8',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s ease',
  };

  const tdBase: React.CSSProperties = {
    padding: '14px 16px',
    fontFamily: 'Inter, Arial, sans-serif',
    fontSize: '14.5px',
    color: '#1C1C1E',
    borderBottom: '1px solid #EEEAE5',
    verticalAlign: 'top',
    lineHeight: 1.4,
  };

  const sortableTh = (key: SortKey): React.CSSProperties => ({
    ...thBase,
    cursor: 'pointer',
    userSelect: 'none',
    color: sortKey === key ? '#3D5A3E' : '#777777',
  });

  return (
    <section
      id="area-table-section"
      aria-labelledby="area-table-heading"
      className="section-pad"
      style={{
        backgroundColor: '#F9F7F4',
        borderTop: '1px solid #E5E0D8',
      }}
    >
      <div className="section-inner">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="section-label">Area comparison</span>
            <h2
              id="area-table-heading"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(24px, 3.5vw, 34px)',
                fontWeight: 700,
                color: '#1C1C1E',
                lineHeight: 1.2,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Cheshire areas compared
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'Inter, Arial, sans-serif',
              fontSize: '13px',
              color: '#888888',
              margin: 0,
            }}
          >
            Click column headings to sort
          </p>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid #E5E0D8', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', WebkitOverflowScrolling: 'touch' }}>
          <table
            style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}
            aria-label="Cheshire area comparison  -  house prices, commute times, schools"
          >
            <thead>
              <tr>
                <th style={sortableTh('area')} onClick={() => handleSort('area')} aria-sort={sortKey === 'area' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                  Area <SortIcon dir={sortKey === 'area' ? sortDir : null} />
                </th>
                <th style={sortableTh('price')} onClick={() => handleSort('price')} aria-sort={sortKey === 'price' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                  Avg. Price <SortIcon dir={sortKey === 'price' ? sortDir : null} />
                </th>
                <th style={sortableTh('commute')} onClick={() => handleSort('commute')} aria-sort={sortKey === 'commute' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                  Train to Mcr <SortIcon dir={sortKey === 'commute' ? sortDir : null} />
                </th>
                <th style={{ ...thBase, cursor: 'default' }}>Notable Schools</th>
                <th style={{ ...thBase, cursor: 'default' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr
                  key={row.area}
                  style={{
                    backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAFAF8',
                    transition: 'background-color 0.1s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F0EDE8')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#FFFFFF' : '#FAFAF8')}
                >
                  <td style={{ ...tdBase, fontWeight: 600 }}>
                    {row.area}
                  </td>
                  <td style={tdBase}>
                    <span
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: priceColour[row.priceCategory],
                      }}
                    >
                      {row.price}
                    </span>
                  </td>
                  <td style={{ ...tdBase, fontVariantNumeric: 'tabular-nums' }}>
                    {row.commute}
                  </td>
                  <td style={{ ...tdBase, color: '#555555' }}>{row.schools}</td>
                  <td style={{ ...tdBase, color: '#555555' }}>{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            {(['budget', 'mid', 'premium'] as const).map((cat) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'block', width: '10px', height: '10px', backgroundColor: priceColour[cat], borderRadius: '2px' }} />
                <span style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '12px', color: '#888888', textTransform: 'capitalize' }}>
                  {cat === 'budget' ? 'Under £250k' : cat === 'mid' ? '£250k - £499k' : '£500k+'}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '12px', color: '#AAAAAA', margin: 0 }}>
            * Car journey or indirect rail. Sources: National Rail (2025), Rightmove Q4 2025.
          </p>
        </div>
      </div>
    </section>
  );
}
