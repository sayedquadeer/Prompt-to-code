'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutputCode('');
    setCopied(false);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setOutputCode(data.code || 'No code generated.');
      } else {
        setOutputCode(`Error: ${data.error || 'Something went wrong.'}`);
      }
    } catch (err) {
      setOutputCode('Error connecting to the server. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#0b0f19', color: '#fff', minHeight: '100vh' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #1e293b' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
          PromptToCode.ai
        </h2>
        <span style={{ border: '1px solid #334155', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#94a3b8' }}>
          Free AI Code Generator
        </span>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', margin: '60px 0 40px' }}>
        <h1 style={{ fontSize: '44px', fontWeight: '800', lineHeight: '1.2' }}>
          Free AI Code Generator <br />
          <span style={{ color: '#3b82f6' }}>Turn Text Prompts into Production Code</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '650px', margin: '15px auto' }}>
          Instantly generate React, Next.js, HTML/CSS, Tailwind, and Node.js code snippets using simple prompts.
        </p>
      </section>

      {/* Prompt Input Box */}
      <div style={{ background: '#161e2e', padding: '24px', borderRadius: '16px', border: '1px solid #1e293b', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <textarea
          rows="4"
          placeholder="e.g. Create a responsive dark-mode SaaS pricing card with 3 plans using Tailwind CSS..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: '100%', background: '#0b0f19', color: '#fff', border: '1px solid #334155', borderRadius: '10px', padding: '14px', fontSize: '16px', boxSizing: 'border-box', resize: 'vertical' }}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{ width: '100%', marginTop: '16px', padding: '14px', background: loading ? '#475569' : 'linear-gradient(90deg, #2563eb, #7c3aed)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? '⚡ Generating Code...' : '⚡ Generate Code Free'}
        </button>
      </div>

      {/* Output / Code View */}
      {outputCode && (
        <div style={{ marginTop: '35px', background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#e2e8f0' }}>Generated Code</h3>
            <button
              onClick={handleCopy}
              style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
            >
              {copied ? '✓ Copied!' : '📋 Copy Code'}
            </button>
          </div>
          <pre style={{ overflowX: 'auto', background: '#0b0f19', padding: '18px', borderRadius: '10px', color: '#38bdf8', fontSize: '14px', lineHeight: '1.5' }}>
            <code>{outputCode}</code>
          </pre>
        </div>
      )}

      {/* SEO Section */}
      <section style={{ marginTop: '80px', borderTop: '1px solid #1e293b', paddingTop: '40px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>Why Choose PromptToCode?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#161e2e', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <h3 style={{ marginTop: 0, color: '#38bdf8' }}>🚀 High Speed AI</h3>
            <p style={{ color: '#94a3b8', margin: 0 }}>Generates clean, modular code snippets in milliseconds using Gemini AI.</p>
          </div>
          <div style={{ background: '#161e2e', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <h3 style={{ marginTop: 0, color: '#38bdf8' }}>💻 Multiple Languages</h3>
            <p style={{ color: '#94a3b8', margin: 0 }}>Supports React, Tailwind CSS, JavaScript, HTML, Node.js, and Python.</p>
          </div>
          <div style={{ background: '#161e2e', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <h3 style={{ marginTop: 0, color: '#38bdf8' }}>💯 Completely Free</h3>
            <p style={{ color: '#94a3b8', margin: 0 }}>Built for developers, founders, and indie hackers without any subscription fees.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
