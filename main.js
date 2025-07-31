import promptCategories from './prompts.js'

const categoryNames = {
    music: "Music",
    video: "Video",
    text: "Text",
    picture: "Picture",
    webapp: "Web Apps",
    game: "Games",
    design: "Design",
    code: "Code",
    storytelling: "Storytelling"
};

const appRecommendations = {
    music: {
        free: [
            { name: "Suno AI", url: "https://suno.com", description: "Prompt-based AI music generation (free tier available)" },
            { name: "Boomy", url: "https://boomy.com", description: "Generate songs using style prompts (free plan)" }
        ],
        paid: [
            { name: "AIVA", url: "https://aiva.ai", description: "Compose music using mood/style prompts ($15/month)" },
            { name: "Soundraw", url: "https://soundraw.io", description: "Prompt AI to create music loops and songs ($16.99/month)" }
        ]
    },
    video: {
        free: [
            { name: "Pika Labs", url: "https://pika.art", description: "Generate videos from text prompts (free tier)" },
            { name: "Leonardo AI", url: "https://leonardo.ai", description: "Prompt-based asset generation for video creation (free tier)" }
        ],
        paid: [
            { name: "Runway ML", url: "https://runwayml.com", description: "Text-to-video generation via prompts ($15/user/month)" },
            { name: "Synthesia", url: "https://synthesia.io", description: "Create AI avatar videos from text input ($30/month)" }
        ]
    },
    text: {
        free: [
            { name: "ChatGPT", url: "https://chat.openai.com", description: "Chat-based prompt AI for writing, code, Q&A (free tier)" },
            { name: "Claude", url: "https://claude.ai", description: "Prompt-based assistant for writing and analysis (free)" }
        ],
        paid: [
            { name: "ChatGPT Plus", url: "https://chat.openai.com", description: "Access GPT-4 with better performance ($20/month)" },
            { name: "Perplexity Pro", url: "https://perplexity.ai", description: "Prompt-powered research and writing tool ($20/month)" }
        ]
    },
    picture: {
        free: [
            { name: "Playground AI", url: "https://playgroundai.com", description: "Prompt-based image generation with styles (free)" },
            { name: "Craiyon", url: "https://www.craiyon.com", description: "Simple AI image generator using prompts (free)" }
        ],
        paid: [
            { name: "Midjourney", url: "https://midjourney.com", description: "High-quality art via prompt input (starts at $10/month)" },
            { name: "Adobe Firefly", url: "https://firefly.adobe.com", description: "Prompt-based design and image tools (Adobe plan)" }
        ]
    },
    webapp: {
        free: [
            { name: "Builder.io", url: "https://www.builder.io", description: "Prompt-based site/app creation using AI (free tier)" },
            { name: "Vercel v0", url: "https://v0.dev", description: "Generate full UIs from prompts (experimental, free)" }
        ],
        paid: [
            { name: "TeleportHQ", url: "https://teleporthq.io", description: "AI-generated UIs from descriptions (paid features)" },
            { name: "Durable", url: "https://durable.co", description: "Build full business websites from one prompt ($12/month+)" }
        ]
    },
    game: {
        free: [
            { name: "Scenario.gg", url: "https://scenario.gg", description: "Generate game assets using text prompts (free tier)" },
            { name: "Leonardo AI", url: "https://leonardo.ai", description: "Prompt-based game art generation (free tier)" }
        ],
        paid: [
            { name: "Ludo.ai", url: "https://ludo.ai", description: "AI game ideation via prompts and analytics ($20/month)" },
            { name: "Promethean AI", url: "https://www.prometheanai.com", description: "Prompt-based environment creation (studio-level tool)" }
        ]
    },
    design: {
        free: [
            { name: "Designify", url: "https://www.designify.com", description: "Prompt-style image enhancement (free basic plan)" },
            { name: "Uizard", url: "https://uizard.io", description: "Generate UI designs from text descriptions (free tier)" }
        ],
        paid: [
            { name: "Visily", url: "https://www.visily.ai", description: "Prompt-based wireframes & UI mockups (paid features)" },
            { name: "Galileo AI", url: "https://www.usegalileo.ai", description: "Design full interfaces from prompts (waitlist or paid)" }
        ]
    },
    code: {
        free: [
            { name: "Codeium", url: "https://codeium.com", description: "Prompt-based code assistant (free for individuals)" },
            { name: "Replit Ghostwriter", url: "https://replit.com", description: "AI prompts to generate/complete code (free tier)" }
        ],
        paid: [
            { name: "GitHub Copilot", url: "https://github.com/features/copilot", description: "AI code completion via prompts ($10/month)" },
            { name: "AskCodi", url: "https://www.askcodi.com", description: "Prompt-based code & documentation generator (paid)" }
        ]
    },
    storytelling: {
        free: [
            { name: "StoryBird AI", url: "https://www.storybird.ai", description: "Generate illustrated stories from prompts (free tier)" },
            { name: "NovelAI", url: "https://novelai.net", description: "Prompt-based story writer (limited free trial)" }
        ],
        paid: [
            { name: "Sudowrite", url: "https://www.sudowrite.com", description: "Creative story generation using prompts ($10+/month)" },
            { name: "Plot Factory", url: "https://www.plotfactory.com", description: "AI-powered novel writing and worldbuilding (paid)" }
        ]
    }
};

const typingPhrases = [
    "Prompts at your fingertips...",
    "Save hours of work...",
    "Elevate your teaching...",
    "Curriculum-aligned content...",
    "Just one click away..."
];

let activeCategory = 'text';
let showingAllPrompts = {};
let currentSearchTerm = '';
let visiblePromptsCount = {};
let searchTimeout = null;
const PROMPTS_INCREMENT = 3;
const MAX_PROMPT_LENGTH = 200;

Object.keys(promptCategories).forEach(category => {
    showingAllPrompts[category] = false;
    visiblePromptsCount[category] = 1; // Start with 1 prompt visible
});

const promptsContainer = document.getElementById('promptsContainer');
const copyNotification = document.getElementById('copyNotification');
const featuresGrid = document.getElementById('featuresGrid');
const mainHeader = document.getElementById('mainHeader');
const typingText = document.getElementById('typingText');
const heroSection = document.getElementById('hero');
const sections = document.querySelectorAll('section');
const headerTitle = document.querySelector('.header-title');
const headerNav = document.querySelector('.header-nav a');

// Copy icon SVG
const copyIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
        `;

// Search icon SVG
const searchIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        `;

let heroHeight = heroSection.offsetHeight

document.querySelector('.prompts-section').style.marginTop = `${heroHeight}px`

function handleParallax() {
    const scrollPosition = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-img');
    
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed'));
        const yPos = -(scrollPosition * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${Math.random() * 20 - 10}deg)`;
    });
}

function setupSectionTransitions() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Speed up scroll when entering section
                document.documentElement.style.scrollBehavior = 'smooth';
                document.documentElement.style.scrollSnapType = 'none';
                
                // Show section content
                entry.target.classList.add('active');
                
                setTimeout(() => {
                    document.documentElement.style.scrollBehavior = 'auto';
                }, 1000);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function updateHeaderContrast(section) {
    if (section.classList.contains('hero') || section.classList.contains('cta-section')) {
        headerTitle.style.mixBlendMode = 'difference';
        headerTitle.style.color = 'var(--white)';
        headerNav.style.mixBlendMode = 'difference';
        headerNav.style.color = 'var(--white)';
    } else if (section.classList.contains('features-section')) {
        headerTitle.style.mixBlendMode = 'normal';
        headerTitle.style.color = 'var(--black)';
        headerNav.style.mixBlendMode = 'normal';
        headerNav.style.color = 'var(--black)';
    } else {
        headerTitle.style.mixBlendMode = 'difference';
        headerTitle.style.color = 'var(--white)';
        headerNav.style.mixBlendMode = 'difference';
        headerNav.style.color = 'var(--white)';
    }
}

function typeWriter(text, element, baseSpeed = 80, callback) {
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            const naturalDelay = baseSpeed + Math.random() * 60;
            setTimeout(typeChar, naturalDelay);
        } else if (callback) {
            callback();
        }
    }
    
    element.textContent = '';
    typeChar();
}

function backspaceText(element, baseSpeed = 50, callback) {
    const text = element.textContent;
    let i = text.length;
    
    function eraseChar() {
        if (i > 0) {
            element.textContent = text.slice(0, --i);
            const naturalDelay = baseSpeed + Math.random() * 60;
            setTimeout(eraseChar, naturalDelay);
        } else if (callback) {
            callback();
        }
    }
    
    eraseChar();
}

function cycleTypingPhrases() {
    let currentIndex = 0;
    
    function typeNextPhrase() {
        typeWriter(typingPhrases[currentIndex], typingText, 80, () => {
            setTimeout(() => {
                backspaceText(typingText, 50, () => {
                    currentIndex = (currentIndex + 1) % typingPhrases.length;
                    typeNextPhrase();
                });
            }, 2000);
        });
    }
    
    typeNextPhrase();
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
    );
}

function createCategoryTabs() {
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'category-dropdown-container';
    
    // Create the dropdown button
    const dropdownBtn = document.createElement('button');
    dropdownBtn.className = 'category-dropdown-btn';
    dropdownBtn.innerHTML = `
        ${categoryNames[activeCategory]}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    `;
    
    // Create the dropdown content
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'category-dropdown-content';
    
    Object.keys(promptCategories).forEach(category => {
        const tab = document.createElement('button');
        tab.className = `category-tab ${category === activeCategory ? 'active' : ''}`;
        tab.textContent = categoryNames[category];
        tab.setAttribute('data-category', category);
        
        tab.addEventListener('click', () => {
            switchCategory(category);
            // Start closing animation
            dropdownContent.classList.remove('show');
            dropdownBtn.classList.remove('active');
        });
        
        dropdownContent.appendChild(tab);
    });
    
    // Toggle dropdown on button click
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpening = !dropdownContent.classList.contains('show');
        
        if (isOpening) {
            dropdownBtn.classList.add('active');
            dropdownContent.classList.add('show');
        } else {
            dropdownBtn.classList.remove('active');
            dropdownContent.classList.remove('show');
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!tabsContainer.contains(e.target)) {
            dropdownBtn.classList.remove('active');
            dropdownContent.classList.remove('show');
        }
    });
    
    // Handle transition end to reset overflow
    dropdownContent.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'max-height' && !dropdownContent.classList.contains('show')) {
            dropdownContent.style.overflow = 'hidden';
        }
    });
    
    tabsContainer.appendChild(dropdownBtn);
    tabsContainer.appendChild(dropdownContent);
    
    return tabsContainer;
}

function switchCategory(category) {
    if (category === activeCategory) return;
    
    currentSearchTerm = '';
    activeCategory = category;
    
    // Update dropdown button text
    const dropdownBtn = document.querySelector('.category-dropdown-btn');
    if (dropdownBtn) {
        dropdownBtn.innerHTML = `
            ${categoryNames[category]}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        `;
    }
    
    // Update active state in dropdown items
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-category') === category);
    });
    
    // Reset visible prompts count for the new category
    visiblePromptsCount[activeCategory] = PROMPTS_INCREMENT;
    
    renderPrompts();
}

function renderPrompts() {
    promptsContainer.innerHTML = '';
    
    const searchBar = createSearchBar();
    promptsContainer.appendChild(searchBar);
    
    const tabsContainer = createCategoryTabs();
    promptsContainer.appendChild(tabsContainer);
    
    const filteredPrompts = filterPrompts();
    
    if (filteredPrompts.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No prompts found matching your search.';
        promptsContainer.appendChild(noResults);
        return;
    }
    
    if (currentSearchTerm) {
        visiblePromptsCount[activeCategory] = filteredPrompts.length;
    }
    
    const promptsToShow = filteredPrompts.slice(0, visiblePromptsCount[activeCategory]);
    
    promptsToShow.forEach((prompt, index) => {
        const card = createPromptCard(prompt);
        promptsContainer.appendChild(card);
        
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
    
    if (!currentSearchTerm && visiblePromptsCount[activeCategory] < filteredPrompts.length) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn';
        const remainingCount = filteredPrompts.length - visiblePromptsCount[activeCategory];
        const showCount = Math.min(PROMPTS_INCREMENT, remainingCount);
        showMoreBtn.textContent = `Show ${showCount} More Prompt${showCount !== 1 ? 's' : ''}`;
        
        showMoreBtn.addEventListener('click', () => {
            visiblePromptsCount[activeCategory] += PROMPTS_INCREMENT;
            renderPrompts();
            
            
            setTimeout(() => {
                showMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
        
        promptsContainer.appendChild(showMoreBtn);
    }
}

function copyPrompt(id) {
    // Find prompt in the active category
    const prompt = promptCategories[activeCategory].find(p => p.id == id);
    
    if (!prompt) return;
    
    navigator.clipboard.writeText(prompt.content).then(() => {
        showNotification();
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for browsers that don't support clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = prompt.content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification();
    });
}

function showNotification() {
    copyNotification.classList.add('active');
    setTimeout(() => {
        copyNotification.classList.remove('active');
    }, 2000);
}

function formatPromptContent(content) {
    return content.split('\n').map(line =>
        `<span class="prompt-content-line">${line || '<br>'}</span>`
    ).join('');
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

function buildThresholdList() {
    const thresholds = [];
    for (let i = 0; i <= 100; i++) {
        thresholds.push(i / 100);
    }
    return thresholds;
}

function createPromptCard(prompt) {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.setAttribute('data-id', prompt.id);
    
    const isLongContent = prompt.content.length > MAX_PROMPT_LENGTH;
    const truncatedContent = isLongContent ? truncateText(prompt.content, MAX_PROMPT_LENGTH) : prompt.content;
    
    card.innerHTML = `
        <div class="prompt-title">
            ${prompt.title}
            <button class="copy-btn" aria-label="Copy prompt" data-id="${prompt.id}">
                ${copyIcon}
            </button>
        </div>
        <div class="prompt-content">
            <div class="content-text">${formatPromptContent(truncatedContent)}</div>
            ${isLongContent ? '<button class="see-more-btn">See More</button>' : ''}
        </div>
    `;
    
    card.querySelector('.copy-btn').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        const promptId = e.currentTarget.getAttribute('data-id');
        copyPrompt(promptId);
    });
    
    if (isLongContent) {
        const seeMoreBtn = card.querySelector('.see-more-btn');
        const contentText = card.querySelector('.content-text');
        let isExpanded = false;
        
        seeMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            if (isExpanded) {
                contentText.innerHTML = formatPromptContent(truncatedContent);
                seeMoreBtn.textContent = 'See More';
            } else {
                contentText.innerHTML = formatPromptContent(prompt.content);
                seeMoreBtn.textContent = 'See Less';
            }
            isExpanded = !isExpanded;
        });
    }
    const recommendations = appRecommendations[activeCategory];
    if (recommendations) {
        const appsHTML = `
            <div class="app-recommendations">
                <div class="app-tier app-tier-free">
                    <div class="app-tier-header">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>Free Options</span>
                    </div>
                    <div class="app-list">
                        ${recommendations.free.map(app => `
                            <div class="app-card">
                                <div class="app-name">
                                    <a href="${app.url}" target="_blank">${app.name}</a>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </div>
                                <div class="app-description">${app.description}</div>
                                <div class="app-meta">
                                    <span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 8v4l3 3"></path>
                                        </svg>
                                        Free Plan
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="app-tier app-tier-paid">
                    <div class="app-tier-header">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span>Premium Options</span>
                    </div>
                    <div class="app-list">
                        ${recommendations.paid.map(app => `
                            <div class="app-card">
                                <div class="app-name">
                                    <a href="${app.url}" target="_blank">${app.name}</a>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </div>
                                <div class="app-description">${app.description}</div>
                                <div class="app-meta">
                                    <span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                            <path d="M2 10h20M7 14h1m4 0h1m4 0h1"></path>
                                        </svg>
                                        Paid Service
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        const appsWrapper = document.createElement('div');
        appsWrapper.innerHTML = appsHTML;
        promptsContainer.appendChild(appsWrapper);
    }
    
    return card;
}

function handleScrollAnimations() {
    const cards = document.querySelectorAll('.prompt-card, .feature-card');
    
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('visible');
        }
    });
}

function createSearchBar() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search prompts...';
    searchInput.className = 'search-input';
    searchInput.value = currentSearchTerm;
    
    const searchIconElement = document.createElement('button');
    searchIconElement.className = 'search-icon';
    searchIconElement.innerHTML = searchIcon;
    searchIconElement.setAttribute('aria-label', 'Search');
    
    searchContainer.appendChild(searchIconElement);
    searchContainer.appendChild(searchInput);
    
    const performSearch = () => {
        const newSearchTerm = searchInput.value.trim();
        if (newSearchTerm !== currentSearchTerm) {
            currentSearchTerm = newSearchTerm.toLowerCase();
            if (!currentSearchTerm) {
                visiblePromptsCount[activeCategory] = PROMPTS_INCREMENT;
            }
            renderPrompts();
        }
    };
    
    searchIconElement.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchInput.addEventListener('blur', performSearch);
    
    return searchContainer;
}

function filterPrompts() {
    if (!currentSearchTerm) {
        return promptCategories[activeCategory];
    }
    
    const searchTerm = currentSearchTerm.toLowerCase();
    return promptCategories[activeCategory].filter(prompt => {
        return prompt.title.toLowerCase().includes(searchTerm) ||
            prompt.content.toLowerCase().includes(searchTerm);
    });
}

function init() {
    renderPrompts();
    cycleTypingPhrases();
    setupSectionTransitions();
    window.addEventListener('scroll', () => {
        handleParallax();
        handleScrollAnimations();
    });
    
    handleScrollAnimations();
    
    setTimeout(handleScrollAnimations, 500);
    
    document.querySelector('section').classList.add('active');
}

init()