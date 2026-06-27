# 🎯 Prompt Platform

**Interactive AI System Prompts Explorer & Builder**

A powerful, interactive web application that helps you explore, compare, and extract insights from AI system prompts collected from the [System Prompts Leaks](https://github.com/asgeirtj/system_prompts_leaks) repository.

## ✨ Features

### 📚 Browse Prompts
- **Category Filtering**: Filter prompts by AI provider (Anthropic, OpenAI, Google, xAI, Microsoft, etc.)
- **Search Functionality**: Full-text search across prompt names, descriptions, and tags
- **Grid/List Views**: Toggle between visual card grid and detailed list view
- **Favorites System**: Save your most-used prompts for quick access
- **Detailed Metadata**: View word count, last updated date, key sections, and tags

### ⚖️ Compare Prompts
- **Side-by-Side Comparison**: Compare up to 3 prompts simultaneously
- **Feature Matrix**: See differences in capabilities, sections, and structure
- **Visual Analysis**: Quick overview of prompt sizes and complexity

### 💡 Extract Insights
- **Automated Analysis**: Extract key instructions, patterns, and capabilities from any prompt
- **Categorized Insights**: Organized by Core Identity, Key Capabilities, Safety Guidelines, and Interaction Style
- **Copy & Use**: One-click copy for extracted insights
- **Build Your Own**: Combine insights from multiple prompts to create customized system prompts

### 🎨 Modern UI/UX
- **Dark Theme**: Easy on the eyes with a professional dark mode interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Polished transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the platform directory
cd prompt-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

Once running, open your browser to `http://localhost:5173`

## 📁 Project Structure

```
prompt-platform/
├── src/
│   ├── App.jsx          # Main React component with all features
│   ├── App.css          # Comprehensive styling
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🛠️ Technologies Used

- **React 19** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with CSS variables
- **LocalStorage** - Persistent favorites storage

## 📊 Data Sources

The platform is designed to work with the system prompts from the [System Prompts Leaks](https://github.com/asgeirtj/system_prompts_leaks) repository, which contains:

- **Anthropic Claude** - Fable 5, Opus 4.8, Code, Cowork, and more
- **OpenAI GPT** - GPT-5.5, Codex, o-series models
- **Google Gemini** - Flash, Pro, CLI variants
- **xAI Grok** - Build, Expert, and versioned models
- **Microsoft Copilot** - GitHub, VS Code, macOS app
- **Perplexity** - Computer, Comet, Voice Assistant
- **And many more** - Meta AI, Mistral, Notion, Cursor, etc.

## 🔌 API Integration (Future)

The platform is designed to easily integrate with a backend API:

```javascript
// Replace sample data with real API calls
const loadPrompts = async () => {
  const response = await fetch('/api/prompts');
  const data = await response.json();
  setPrompts(data);
};
```

### Expected API Endpoints

- `GET /api/prompts` - List all prompts with metadata
- `GET /api/prompts/:id` - Get full prompt content
- `GET /api/categories` - List all categories
- `POST /api/analyze` - Analyze prompt for insights

## 🎯 Use Cases

### For Developers
- Understand how different AI models are instructed
- Learn best practices for prompt engineering
- Compare approaches across providers
- Build better custom prompts for your applications

### For Researchers
- Study AI safety guidelines across platforms
- Analyze instruction patterns and structures
- Track evolution of system prompts over time
- Compare model capabilities and restrictions

### For Product Teams
- Extract interaction patterns for your AI products
- Learn from established tone and formatting guidelines
- Understand safety and refusal handling approaches
- Build consistent AI experiences

## 📱 Screenshots

### Browse View
Grid and list views for exploring all available prompts with filtering and search.

### Compare View
Side-by-side comparison of selected prompts showing key differences.

### Extract Insights
Automated analysis extracting the most important instructions and patterns.

### Detail Modal
Comprehensive view of individual prompts with statistics and actions.

## 🔮 Future Enhancements

- [ ] **Full Prompt Content Viewer**: Syntax-highlighted display of complete prompts
- [ ] **Prompt Builder**: Interactive tool to combine insights into custom prompts
- [ ] **Export Options**: Download prompts as JSON, Markdown, or PDF
- [ ] **Version History**: Track changes to prompts over time
- [ ] **Diff Tool**: Visual comparison of prompt versions
- [ ] **Tag Cloud**: Visual representation of common themes
- [ ] **API Documentation**: Complete guide for backend integration
- [ ] **Authentication**: User accounts with cloud-synced favorites
- [ ] **Sharing**: Share prompt collections and comparisons
- [ ] **Analytics**: Usage statistics and popular prompts

## 🤝 Contributing

Contributions are welcome! Areas of focus:

1. **Data Processing**: Scripts to extract and parse prompts from markdown files
2. **Backend API**: Node.js/Python server for serving prompt data
3. **Enhanced Analysis**: NLP-powered insight extraction
4. **UI Improvements**: Additional views, filters, and visualizations
5. **Documentation**: Guides, tutorials, and examples

## 📄 License

ISC License - see LICENSE file for details

## 🙏 Acknowledgments

- Original data from [System Prompts Leaks](https://github.com/asgeirtj/system_prompts_leaks) repository
- Built with modern web technologies for optimal performance

---

**Built with ❤️ for the AI community**

Explore. Compare. Build better AI interactions.
