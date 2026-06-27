import { useState, useEffect, useMemo } from 'react'
import './App.css'

// This will be populated with actual data from the backend
const PROMPT_DATA = {
  categories: [
    { id: 'anthropic', name: 'Anthropic — Claude', color: '#D97757', icon: '🤖' },
    { id: 'openai', name: 'OpenAI — ChatGPT', color: '#412991', icon: '💬' },
    { id: 'google', name: 'Google — Gemini', color: '#8E75B2', icon: '✨' },
    { id: 'xai', name: 'xAI — Grok', color: '#000000', icon: '🚀' },
    { id: 'microsoft', name: 'Microsoft — Copilot', color: '#00A4EF', icon: '💻' },
    { id: 'perplexity', name: 'Perplexity', color: '#20B2AA', icon: '🔍' },
    { id: 'meta', name: 'Meta AI', color: '#0668E1', icon: '🌐' },
    { id: 'mistral', name: 'Mistral', color: '#FF7000', icon: '🌪️' },
    { id: 'notion', name: 'Notion AI', color: '#000000', icon: '📝' },
    { id: 'qwen', name: 'Qwen', color: '#615CED', icon: '🧠' },
    { id: 'cursor', name: 'Cursor', color: '#FF6B6B', icon: '⚡' },
    { id: 'misc', name: 'Misc', color: '#6C757D', icon: '📦' }
  ],
  prompts: [] // Will be loaded dynamically
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [prompts, setPrompts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [favorites, setFavorites] = useState([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('browse') // 'browse', 'compare', 'extract'
  const [compareList, setCompareList] = useState([])
  const [extractedInsights, setExtractedInsights] = useState([])

  // Load prompts from the repository
  useEffect(() => {
    loadPrompts()
    const savedFavorites = localStorage.getItem('promptFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('promptFavorites', JSON.stringify(favorites))
  }, [favorites])

  const loadPrompts = async () => {
    try {
      // In a real app, this would fetch from an API
      // For now, we'll create a structure that can be populated
      const response = await fetch('/api/prompts')
      if (response.ok) {
        const data = await response.json()
        setPrompts(data)
      } else {
        // Fallback to sample data structure
        setPrompts(generateSamplePrompts())
      }
    } catch (error) {
      console.error('Error loading prompts:', error)
      setPrompts(generateSamplePrompts())
    } finally {
      setLoading(false)
    }
  }

  const generateSamplePrompts = () => {
    // Sample structure - in production this comes from the backend
    return [
      {
        id: 'claude-fable-5',
        name: 'Claude Fable 5',
        category: 'anthropic',
        description: 'Most advanced generally available Claude model with enhanced safety measures',
        tags: ['flagship', 'safe', 'general-purpose'],
        lastUpdated: '2026-06-09',
        wordCount: 45000,
        keySections: ['product_information', 'refusal_handling', 'child_safety', 'tone_and_formatting', 'memory_system']
      },
      {
        id: 'gpt-5.5-codex',
        name: 'GPT-5.5 Codex',
        category: 'openai',
        description: 'Advanced coding agent based on GPT-5.5 for software development',
        tags: ['coding', 'agent', 'development'],
        lastUpdated: '2026-06-18',
        wordCount: 38000,
        keySections: ['engineering_judgment', 'frontend_guidance', 'autonomy', 'formatting_rules']
      },
      {
        id: 'gemini-3.5-flash',
        name: 'Gemini 3.5 Flash',
        category: 'google',
        description: 'Fast and efficient Gemini model with multimodal capabilities',
        tags: ['fast', 'multimodal', 'efficient'],
        lastUpdated: '2026-05-20',
        wordCount: 32000,
        keySections: ['capabilities', 'safety', 'tools']
      },
      {
        id: 'grok-build',
        name: 'Grok Build',
        category: 'xai',
        description: 'CLI Agent for building applications with Grok',
        tags: ['cli', 'agent', 'building'],
        lastUpdated: '2026-05-11',
        wordCount: 28000,
        keySections: ['instructions', 'tools', 'examples']
      },
      {
        id: 'copilot-macos',
        name: 'Copilot for macOS',
        category: 'microsoft',
        description: 'GitHub Copilot desktop app for macOS with terminal integration',
        tags: ['desktop', 'terminal', 'macos'],
        lastUpdated: '2026-06-18',
        wordCount: 25000,
        keySections: ['tone_and_style', 'search_delegation', 'tool_efficiency']
      },
      {
        id: 'claude-code-opus-4.8',
        name: 'Claude Code (Opus 4.8)',
        category: 'anthropic',
        description: 'Agentic coding tool for developers with command line interface',
        tags: ['coding', 'cli', 'agentic'],
        lastUpdated: '2026-05-28',
        wordCount: 52000,
        keySections: ['tools', 'skills', 'workflow']
      },
      {
        id: 'perplexity-computer',
        name: 'Perplexity Computer',
        category: 'perplexity',
        description: 'Advanced research and computation assistant',
        tags: ['research', 'computation', 'analysis'],
        lastUpdated: '2026-05-21',
        wordCount: 30000,
        keySections: ['research', 'computation', 'verification']
      },
      {
        id: 'vscode-copilot-agent',
        name: 'VS Code Copilot Agent',
        category: 'microsoft',
        description: 'Integrated AI assistant for Visual Studio Code',
        tags: ['ide', 'coding', 'integration'],
        lastUpdated: '2026-05-21',
        wordCount: 27000,
        keySections: ['integration', 'features', 'usage']
      }
    ]
  }

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory
      const matchesSearch = searchQuery === '' || 
        prompt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesFavorites = !showFavoritesOnly || favorites.includes(prompt.id)
      return matchesCategory && matchesSearch && matchesFavorites
    })
  }, [prompts, selectedCategory, searchQuery, showFavoritesOnly, favorites])

  const toggleFavorite = (promptId) => {
    setFavorites(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    )
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const addToCompare = (prompt) => {
    if (!compareList.find(p => p.id === prompt.id) && compareList.length < 3) {
      setCompareList([...compareList, prompt])
    }
  }

  const removeFromCompare = (promptId) => {
    setCompareList(compareList.filter(p => p.id !== promptId))
  }

  const extractKeyInsights = (prompt) => {
    // This would be enhanced with actual AI analysis in production
    const insights = [
      {
        category: 'Core Identity',
        items: [`Model: ${prompt.name}`, `Provider: ${PROMPT_DATA.categories.find(c => c.id === prompt.category)?.name}`]
      },
      {
        category: 'Key Capabilities',
        items: prompt.tags.map(tag => tag.replace('-', ' ').toUpperCase())
      },
      {
        category: 'Safety Guidelines',
        items: ['Child safety protocols', 'Content filtering', 'Refusal handling']
      },
      {
        category: 'Interaction Style',
        items: ['Warm and helpful tone', 'Concise responses', 'Clear formatting']
      }
    ]
    return insights
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h2>Loading Prompt Platform...</h2>
        <p>Extracting and organizing system prompts</p>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🎯 Prompt Platform</h1>
            <p className="tagline">Interactive AI System Prompts Explorer & Builder</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search prompts, tags, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <button 
              className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ⊞
            </button>
            <button 
              className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              ☰
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="main-nav">
          <button 
            className={`nav-tab ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            📚 Browse Prompts
          </button>
          <button 
            className={`nav-tab ${activeTab === 'compare' ? 'active' : ''}`}
            onClick={() => setActiveTab('compare')}
          >
            ⚖️ Compare ({compareList.length})
          </button>
          <button 
            className={`nav-tab ${activeTab === 'extract' ? 'active' : ''}`}
            onClick={() => setActiveTab('extract')}
          >
            💡 Extract Insights
          </button>
          <button 
            className={`nav-tab ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            ⭐ Favorites ({favorites.length})
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'browse' && (
          <>
            {/* Category Filter */}
            <aside className="category-sidebar">
              <h3>Categories</h3>
              <button
                className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                📋 All Prompts
              </button>
              {PROMPT_DATA.categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{ borderLeftColor: category.color }}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name.split('—')[0].trim()}
                  <span className="count">
                    {prompts.filter(p => p.category === category.id).length}
                  </span>
                </button>
              ))}
            </aside>

            {/* Prompts Grid/List */}
            <section className="prompts-section">
              <div className="results-info">
                <span>{filteredPrompts.length} prompts found</span>
                {selectedCategory !== 'all' && (
                  <span className="active-filter">
                    Filter: {PROMPT_DATA.categories.find(c => c.id === selectedCategory)?.name}
                  </span>
                )}
              </div>

              <div className={`prompts-grid ${viewMode}`}>
                {filteredPrompts.map(prompt => (
                  <article 
                    key={prompt.id} 
                    className={`prompt-card ${viewMode}`}
                    onClick={() => setSelectedPrompt(prompt)}
                  >
                    <div className="card-header">
                      <div className="prompt-title">
                        <span className="provider-icon">
                          {PROMPT_DATA.categories.find(c => c.id === prompt.category)?.icon}
                        </span>
                        <h3>{prompt.name}</h3>
                      </div>
                      <button
                        className="favorite-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(prompt.id)
                        }}
                      >
                        {favorites.includes(prompt.id) ? '⭐' : '☆'}
                      </button>
                    </div>
                    
                    <p className="prompt-description">{prompt.description}</p>
                    
                    <div className="prompt-tags">
                      {prompt.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    
                    <div className="card-footer">
                      <span className="update-date">
                        Updated: {new Date(prompt.lastUpdated).toLocaleDateString()}
                      </span>
                      <span className="word-count">
                        ~{prompt.wordCount.toLocaleString()} words
                      </span>
                    </div>

                    <div className="card-actions">
                      <button
                        className="action-btn compare"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCompare(prompt)
                        }}
                        disabled={compareList.find(p => p.id === prompt.id)}
                      >
                        {compareList.find(p => p.id === prompt.id) ? '✓ Added' : '+ Compare'}
                      </button>
                      <button
                        className="action-btn view"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedPrompt(prompt)
                        }}
                      >
                        View Details →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'compare' && (
          <section className="compare-section">
            <h2>Compare Prompts</h2>
            {compareList.length === 0 ? (
              <div className="empty-state">
                <p>No prompts selected for comparison</p>
                <button onClick={() => setActiveTab('browse')}>
                  Browse Prompts to Compare
                </button>
              </div>
            ) : (
              <div className="comparison-grid">
                {compareList.map(prompt => (
                  <div key={prompt.id} className="comparison-card">
                    <div className="comparison-header">
                      <h3>{prompt.name}</h3>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCompare(prompt.id)}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="comparison-content">
                      <p><strong>Provider:</strong> {PROMPT_DATA.categories.find(c => c.id === prompt.category)?.name}</p>
                      <p><strong>Description:</strong> {prompt.description}</p>
                      <p><strong>Tags:</strong> {prompt.tags.join(', ')}</p>
                      <p><strong>Size:</strong> ~{prompt.wordCount.toLocaleString()} words</p>
                      <p><strong>Updated:</strong> {new Date(prompt.lastUpdated).toLocaleDateString()}</p>
                      
                      <h4>Key Sections:</h4>
                      <ul>
                        {prompt.keySections.map(section => (
                          <li key={section}>{section.replace(/_/g, ' ').toUpperCase()}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'extract' && (
          <section className="extract-section">
            <h2>Extract Key Insights</h2>
            <p className="section-description">
              Select a prompt to extract and analyze its most important instructions, patterns, and capabilities
            </p>
            
            <div className="extract-selector">
              <select 
                onChange={(e) => {
                  const prompt = prompts.find(p => p.id === e.target.value)
                  if (prompt) {
                    setExtractedInsights(extractKeyInsights(prompt))
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>Select a prompt to analyze...</option>
                {prompts.map(prompt => (
                  <option key={prompt.id} value={prompt.id}>{prompt.name}</option>
                ))}
              </select>
            </div>

            {extractedInsights.length > 0 && (
              <div className="insights-display">
                {extractedInsights.map((insight, idx) => (
                  <div key={idx} className="insight-card">
                    <h3>{insight.category}</h3>
                    <ul>
                      {insight.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <button 
                      className="copy-insights"
                      onClick={() => copyToClipboard(insight.items.join('\n'))}
                    >
                      📋 Copy
                    </button>
                  </div>
                ))}
                
                <div className="build-prompt-section">
                  <h3>🛠️ Build Your Own Prompt</h3>
                  <p>Combine insights from multiple prompts to create a customized system prompt</p>
                  <button className="build-btn">
                    Start Building →
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Prompt Detail Modal */}
      {selectedPrompt && (
        <div className="modal-overlay" onClick={() => setSelectedPrompt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedPrompt(null)}>✕</button>
            
            <div className="modal-header">
              <h2>{selectedPrompt.name}</h2>
              <div className="modal-meta">
                <span className="provider-badge">
                  {PROMPT_DATA.categories.find(c => c.id === selectedPrompt.category)?.icon}
                  {PROMPT_DATA.categories.find(c => c.id === selectedPrompt.category)?.name.split('—')[0]}
                </span>
                <span className="last-updated">
                  Updated: {new Date(selectedPrompt.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="modal-body">
              <section className="detail-section">
                <h3>Description</h3>
                <p>{selectedPrompt.description}</p>
              </section>

              <section className="detail-section">
                <h3>Tags</h3>
                <div className="tags-container">
                  {selectedPrompt.tags.map(tag => (
                    <span key={tag} className="tag large">{tag}</span>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <h3>Key Sections</h3>
                <div className="sections-list">
                  {selectedPrompt.keySections.map(section => (
                    <div key={section} className="section-item">
                      <span className="section-icon">📑</span>
                      {section.replace(/_/g, ' ').toUpperCase()}
                    </div>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <h3>Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">{selectedPrompt.wordCount.toLocaleString()}</span>
                    <span className="stat-label">Words</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{selectedPrompt.keySections.length}</span>
                    <span className="stat-label">Sections</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{selectedPrompt.tags.length}</span>
                    <span className="stat-label">Tags</span>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button 
                    className="action-btn primary"
                    onClick={() => copyToClipboard(`System prompt: ${selectedPrompt.name}`)}
                  >
                    📋 Copy Reference
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => {
                      addToCompare(selectedPrompt)
                      setActiveTab('compare')
                    }}
                  >
                    ⚖️ Add to Compare
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => toggleFavorite(selectedPrompt.id)}
                  >
                    {favorites.includes(selectedPrompt.id) ? '⭐ Remove Favorite' : '☆ Add Favorite'}
                  </button>
                  <button className="action-btn">
                    💡 Extract Insights
                  </button>
                </div>
              </section>
            </div>

            {copySuccess && (
              <div className="toast-notification">
                ✓ Copied to clipboard!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Prompt Platform — Built from <a href="https://github.com/asgeirtj/system_prompts_leaks">System Prompts Leaks</a> repository
        </p>
        <p className="footer-note">
          Explore, compare, and extract insights from AI system prompts to build better interactions
        </p>
      </footer>
    </div>
  )
}

export default App
