const promptCategories = {
    music: [
    {
        id: 1,
        title: "Song Lyrics Generator",
        content: "Write original song lyrics for a [genre] song about [theme/topic]. Include:\n- Verse 1, Chorus, Verse 2, Chorus, Bridge, Final Chorus structure\n- Rhyme scheme that fits the genre\n- Emotional depth and storytelling\n- Memorable hook in the chorus\n- Age-appropriate content for [target audience]\n\nMake the lyrics authentic to the genre while being original and engaging."
    },
    {
        id: 2,
        title: "Music Theory Lesson",
        content: "Create a comprehensive music theory lesson on [topic] for [skill level] students. Include:\n- Clear explanations of key concepts\n- Visual diagrams or notation examples\n- Practical exercises and examples\n- Audio references (describe what to listen for)\n- Progressive difficulty levels\n- Real-world applications in popular music\n\nMake it engaging and easy to understand for beginners."
    },
    {
        id: 3,
        title: "Playlist Curator",
        content: "Curate a themed playlist of [number] songs for [occasion/mood/activity]. Provide:\n- Song title and artist for each track\n- Brief explanation of why each song fits the theme\n- Flow and progression notes\n- Total runtime\n- Alternative suggestions for different moods\n\nConsider tempo, energy levels, and emotional journey throughout the playlist."
    }],
    video: [
    {
        id: 4,
        title: "Video Script Writer",
        content: "Write a compelling video script for a [duration] minute [type] video about [topic]. Include:\n- Engaging hook in the first 10 seconds\n- Clear structure with smooth transitions\n- Visual cues and shot suggestions\n- Call-to-action\n- Estimated timestamps for each section\n- Tone that matches [target audience]\n\nOptimize for [platform] with attention-grabbing elements throughout."
    },
    {
        id: 5,
        title: "Educational Video Concept",
        content: "Develop a concept for an educational video series on [subject] for [grade level]. Provide:\n- Episode breakdown and learning objectives\n- Visual storytelling techniques\n- Interactive elements and engagement strategies\n- Assessment integration ideas\n- Production requirements and budget considerations\n- Distribution and accessibility features\n\nAlign with curriculum standards and modern learning preferences."
    },
    {
        id: 6,
        title: "YouTube Channel Strategy",
        content: "Create a comprehensive YouTube channel strategy for [niche/topic]. Include:\n- Channel positioning and unique value proposition\n- Content calendar for first 3 months\n- SEO optimization techniques\n- Thumbnail and title strategies\n- Community engagement plan\n- Monetization timeline and methods\n\nFocus on sustainable growth and authentic audience building."
    }],
    text: [
    {
        id: 7,
        title: "Multiple Choice Questions Generator",
        content: "Generate 10 high-quality multiple choice questions for [subject/topic] at [grade level]. Each question should have:\n- A clear, concise stem\n- 4 plausible answer options (A-D)\n- One correct answer marked with an asterisk\n- A brief explanation for the correct answer\n\nFocus on key concepts and common misconceptions. Format the output in a way that's easy to copy into a quiz platform."
    },
    {
        id: 8,
        title: "Creative Writing Prompt",
        content: "Create an engaging creative writing prompt for [grade level] students that:\n- Sparks imagination and creativity\n- Includes specific character, setting, or conflict elements\n- Offers multiple story direction possibilities\n- Incorporates [literary device/technique]\n- Provides word count guidelines\n- Includes extension questions for deeper thinking\n\nMake it relatable to students' experiences while challenging their creativity."
    },
    {
        id: 9,
        title: "Business Copy Generator",
        content: "Write compelling marketing copy for [product/service] targeting [audience]. Include:\n- Attention-grabbing headline\n- Problem-solution narrative\n- Unique selling propositions\n- Social proof elements\n- Strong call-to-action\n- Emotional triggers that resonate with audience\n\nOptimize for [platform/medium] with appropriate tone and length."
    }],
    picture: [
    {
        id: 10,
        title: "Visual Art Assignment",
        content: "Design a visual art project for [grade level] students exploring [theme/concept]. Include:\n- Clear artistic objectives and techniques to practice\n- Step-by-step creation process\n- Required materials (accessible/affordable options)\n- Inspiration examples and reference images\n- Assessment rubric for creativity and technique\n- Adaptation options for different skill levels\n\nEncourage personal expression while teaching fundamental art principles."
    },
    {
        id: 11,
        title: "Photo Challenge Creator",
        content: "Create a photography challenge focusing on [technique/theme] suitable for [skill level]. Provide:\n- 7-day challenge with daily prompts\n- Technical tips for each shot\n- Composition guidelines\n- Equipment recommendations (budget-friendly options)\n- Hashtag strategy for social sharing\n- Critique and improvement suggestions\n\nBalance technical skill development with creative exploration."
    },
    {
        id: 12,
        title: "Infographic Designer",
        content: "Plan an informative infographic about [topic] for [target audience]. Include:\n- Key data points and statistics to highlight\n- Visual hierarchy and flow design\n- Color scheme and typography suggestions\n- Icon and illustration recommendations\n- Layout structure for optimal readability\n- Call-to-action and source attribution\n\nMake complex information accessible and visually engaging."
    }]
};

const categoryNames = {
    music: "Music",
    video: "Video",
    text: "Text",
    picture: "Picture"
};

const typingPhrases = [
    "Prompts at your fingertips...",
    "Save hours of work...",
    "Elevate your teaching...",
    "Curriculum-aligned content...",
    "Just one click away..."
];

const parallaxImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500"
];

let activeCategory = 'text';
let showingAllPrompts = {};

// Initialize showing state for each category
Object.keys(promptCategories).forEach(category => {
    showingAllPrompts[category] = false;
});

// DOM elements
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
    
    // Update active category
    activeCategory = category;
    
    // Update tab states
    document.querySelectorAll('.category-tab').forEach(tab => {
        if (tab.getAttribute('data-category') === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Re-render prompts
    renderPrompts();
}

function renderPrompts() {
    promptsContainer.innerHTML = '';
    
    // Add category tabs
    const tabsContainer = createCategoryTabs();
    promptsContainer.appendChild(tabsContainer);
    
    // Get current category prompts
    const currentPrompts = promptCategories[activeCategory];
    
    // Always show first prompt
    const firstPrompt = currentPrompts[0];
    const firstCard = createPromptCard(firstPrompt);
    promptsContainer.appendChild(firstCard);
    
    // Add "Show More" button if there are more prompts
    if (currentPrompts.length > 1 && !showingAllPrompts[activeCategory]) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn';
        showMoreBtn.textContent = 'Show More Prompts';
        
        showMoreBtn.addEventListener('click', () => {
            showingAllPrompts[activeCategory] = true;
            showMoreBtn.remove();
            
            // Render all remaining prompts
            currentPrompts.slice(1).forEach(prompt => {
                const card = createPromptCard(prompt);
                promptsContainer.appendChild(card);
                
                // Trigger animation
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
            });
        });
        
        promptsContainer.appendChild(showMoreBtn);
    } else if (showingAllPrompts[activeCategory]) {
        // Show all prompts if already expanded
        currentPrompts.slice(1).forEach(prompt => {
            const card = createPromptCard(prompt);
            promptsContainer.appendChild(card);
            card.classList.add('visible');
        });
    }
    
    // Initialize animations for visible cards
    setTimeout(() => {
        document.querySelector('.prompt-card')?.classList.add('visible');
    }, 100);
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
    card.innerHTML = `
        <div class="prompt-title">
            ${prompt.title}
            <button class="copy-btn" aria-label="Copy prompt" data-id="${prompt.id}">
                ${copyIcon}
            </button>
        </div>
        <div class="prompt-content">${prompt.content}</div>
    `;
    
    // Add copy functionality
    card.querySelector('.copy-btn').addEventListener('click', (e) => {
        const promptId = e.currentTarget.getAttribute('data-id');
        copyPrompt(promptId);
    });
    
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