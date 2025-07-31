import promptCategories from './prompts.js'

const categoryNames = {
    music: "Music",
    video: "Video",
    text: "Text",
    picture: "Picture",
    webapp: "Web Apps"
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

console.log(heroHeight)

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
    tabsContainer.className = 'category-tabs';
    
    Object.keys(promptCategories).forEach(category => {
        const tab = document.createElement('button');
        tab.className = `category-tab ${category === activeCategory ? 'active' : ''}`;
        tab.textContent = categoryNames[category];
        tab.setAttribute('data-category', category);
        
        tab.addEventListener('click', () => {
            switchCategory(category);
        });
        
        tabsContainer.appendChild(tab);
    });
    
    return tabsContainer;
}

function switchCategory(category) {
    if (category === activeCategory) return;
    
    currentSearchTerm = '';
    
    activeCategory = category;
    
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-category') === category);
    });
    

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
        visiblePromptsCount[activeCategory] = filteredPrompts.length;  }
    
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
    // Find prompt in all categories
    let prompt = null;
    for (const category of Object.values(promptCategories)) {
        prompt = category.find(p => p.id == id);
        if (prompt) break;
    }
    
    if (!prompt) return;
    
    navigator.clipboard.writeText(prompt.content).then(() => {
        showNotification();
    }).catch(err => {
        console.error('Failed to copy: ', err);
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
        <div class="prompt-content" data-full-content="${prompt.content}">
            <div class="content-text">${truncatedContent}</div>
            ${isLongContent ? '<button class="see-more-btn">See More</button>' : ''}
        </div>
    `;
    
    // Add copy functionality
    card.querySelector('.copy-btn').addEventListener('click', (e) => {
        const promptId = e.currentTarget.getAttribute('data-id');
        copyPrompt(promptId);
    });
    
    // Add see more functionality
    if (isLongContent) {
        const seeMoreBtn = card.querySelector('.see-more-btn');
        const contentText = card.querySelector('.content-text');
        let isExpanded = false;
        
        seeMoreBtn.addEventListener('click', () => {
            if (isExpanded) {
                contentText.textContent = truncatedContent;
                seeMoreBtn.textContent = 'See More';
                isExpanded = false;
            } else {
                contentText.textContent = prompt.content;
                seeMoreBtn.textContent = 'See Less';
                isExpanded = true;
            }
        });
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

