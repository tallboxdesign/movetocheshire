import { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success';

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const errors: Record<string, string> = {};
  if (!fields.name.trim()) errors.name = 'Please enter your name.';
  if (!fields.email.trim()) errors.email = 'Please enter your email.';
  else if (!isEmailValid(fields.email)) errors.email = 'Please enter a valid email address.';
  if (!fields.subject) errors.subject = 'Please select a subject.';
  if (!fields.message.trim()) errors.message = 'Please write a message.';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errors).length > 0) return;
    if (fields.honeypot) return;
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 800);
  }

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '11px 14px',
    fontSize: '15px',
    fontFamily: 'Inter, Arial, sans-serif',
    color: '#1a2332',
    backgroundColor: '#ffffff',
    border: `1px solid ${touched[name] && errors[name] ? '#c0392b' : touched[name] && !errors[name] ? '#2d7a4f' : '#d4cfc8'}`,
    borderRadius: '4px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease',
  });

  function fieldError(name: string) {
    return touched[name] && errors[name] ? errors[name] : null;
  }

  return (
    <>
      {formState === 'success' ? (
        <div style={{ borderLeft: '4px solid #2d7a4f', backgroundColor: '#f0f8f3', padding: '32px', borderRadius: '0 6px 6px 0' }}>
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#1a2332', margin: '0 0 8px 0' }}>Message sent</p>
          <p style={{ fontSize: '15px', color: '#3d4c5c', margin: '0 0 20px 0', lineHeight: 1.7 }}>
            Thanks for getting in touch. We read every message and will aim to reply within 3 working days.
          </p>
          <button
            onClick={() => { setFormState('idle'); setFields({ name: '', email: '', subject: '', message: '', honeypot: '' }); setTouched({}); }}
            style={{ fontSize: '13px', fontWeight: 600, color: '#2d7a4f', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot */}
          <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
            <label htmlFor="contact_url">Website</label>
            <input id="contact_url" name="honeypot" type="text" value={fields.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div>
              <label htmlFor="name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2332', marginBottom: '6px' }}>Name</label>
              <input id="name" name="name" type="text" autoComplete="name" value={fields.name} onChange={handleChange} onBlur={handleBlur} placeholder="Your name" style={inputStyle('name')} />
              {fieldError('name') && <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#c0392b' }}>{fieldError('name')}</p>}
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2332', marginBottom: '6px' }}>Email</label>
              <input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={handleChange} onBlur={handleBlur} placeholder="you@example.com" style={inputStyle('email')} />
              {fieldError('email') && <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#c0392b' }}>{fieldError('email')}</p>}
            </div>

            <div>
              <label htmlFor="subject" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2332', marginBottom: '6px' }}>Subject</label>
              <div style={{ position: 'relative' }}>
                <select
                  id="subject"
                  name="subject"
                  value={fields.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ ...inputStyle('subject'), appearance: 'none', paddingRight: '36px', color: fields.subject ? '#1a2332' : '#999' }}
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="data-correction">Data correction</option>
                  <option value="area-question">Area question</option>
                  <option value="press-partnerships">Press &amp; partnerships</option>
                  <option value="other">Other</option>
                </select>
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
              {fieldError('subject') && <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#c0392b' }}>{fieldError('subject')}</p>}
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a2332', marginBottom: '6px' }}>Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={fields.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="What would you like to say?"
                style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }}
              />
              {fieldError('message') && <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#c0392b' }}>{fieldError('message')}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={formState === 'submitting'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 28px',
                  backgroundColor: formState === 'submitting' ? '#4a9a6e' : '#2d7a4f',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'Inter, Arial, sans-serif',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.15s ease',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { if (formState !== 'submitting') (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#235f3d'; }}
                onMouseLeave={e => { if (formState !== 'submitting') (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2d7a4f'; }}
              >
                {formState === 'submitting' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Sending...
                  </>
                ) : 'Send message'}
              </button>
              <p style={{ fontSize: '12px', color: '#aaa', margin: '10px 0 0', lineHeight: 1.6 }}>
                We read every message and aim to reply within 3 working days.
              </p>
            </div>

          </div>
        </form>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
