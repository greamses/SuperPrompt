const prompts = [
{
    id: 1,
    title: "Multiple Choice Questions Generator",
    content: "Generate 10 high-quality multiple choice questions for [subject/topic] at [grade level]. Each question should have:\n- A clear, concise stem\n- 4 plausible answer options (A-D)\n- One correct answer marked with an asterisk\n- A brief explanation for the correct answer\n\nFocus on key concepts and common misconceptions. Format the output in a way that's easy to copy into a quiz platform."
},
{
    id: 2,
    title: "Critical Thinking Questions",
    content: "Create 5 theory-based critical thinking questions about [topic] for [grade level] students. Each question should:\n- Require analysis, evaluation, or synthesis of information\n- Be open-ended to encourage discussion\n- Connect to real-world applications\n- Include suggested assessment criteria\n\nStructure the questions to progressively build cognitive complexity from basic understanding to advanced application."
},
{
    id: 3,
    title: "Scheme of Work (Nigeria TKT)",
    content: "Develop a comprehensive scheme of work for [subject] following the Nigerian TKT curriculum for [class/grade level] covering [duration, e.g., one term]. Include:\n- Weekly topics and subtopics\n- Learning objectives\n- Teaching methods and resources\n- Assessment strategies\n- Links to national educational standards\n\nOrganize it in a clear table format with columns for easy reference and adaptation."
},
{
    id: 4,
    title: "Classroom Management Techniques",
    content: "Suggest 7 effective classroom management strategies for [grade level] that:\n- Promote positive behavior\n- Minimize disruptions\n- Encourage student engagement\n- Are culturally appropriate for Nigerian classrooms\n\nFor each technique, provide:\n1. A clear description\n2. Implementation steps\n3. Expected outcomes\n4. Potential challenges and solutions"
},
{
    id: 5,
    title: "Creative Learning Activity",
    content: "Design an innovative learning activity for [subject/topic] that:\n- Incorporates hands-on, experiential learning\n- Appeals to diverse learning styles\n- Uses locally available materials\n- Can be adapted for different class sizes\n\nInclude:\n- Clear step-by-step instructions\n- Learning objectives\n- Assessment rubric\n- Extension ideas for advanced students\n- Safety considerations if applicable"
},
{
    id: 6,
    title: "Lesson Plan Generator",
    content: "Create a detailed lesson plan for [subject/topic] for [grade level] students that includes:\n1. Clear learning objectives\n2. Engaging starter activity\n3. Main instructional content\n4. Student practice activities\n5. Assessment methods\n6. Differentiation strategies\n7. Homework assignment\n\nAlign with [curriculum standard] and include estimated timings for each section."
},
{
    id: 7,
    title: "Educational App Concept",
    content: "Propose an innovative educational app concept for [subject/grade level] that:\n- Solves a specific learning challenge\n- Incorporates gamification elements\n- Includes progress tracking\n- Works offline for low-connectivity areas\n\nProvide:\n1. Target user persona\n2. Core features\n3. Unique value proposition\n4. Monetization strategy\n5. Technical requirements"
},
{
    id: 8,
    title: "Parent Engagement Strategies",
    content: "Develop 5 effective strategies to engage parents in their child's learning for [grade level/subject] that:\n- Are culturally sensitive\n- Require minimal technology access\n- Provide measurable impact\n- Can be implemented with limited resources\n\nFor each strategy include:\n- Implementation steps\n- Required materials\n- Expected outcomes\n- Potential barriers and solutions"
}];

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

let showingAllPrompts = false;

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

function handleScrollAnimations() {
    const cards = document.querySelectorAll('.prompt-card, .feature-card');
    
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('visible');
        }
    });
}

function renderPrompts() {
    promptsContainer.innerHTML = '';
    
    // Always show first prompt
    const firstPrompt = prompts[0];
    const firstCard = createPromptCard(firstPrompt);
    promptsContainer.appendChild(firstCard);
    
    // Add "Show More" button if there are more prompts
    if (prompts.length > 1 && !showingAllPrompts) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn';
        showMoreBtn.textContent = 'Show More Prompts';
        
        showMoreBtn.addEventListener('click', () => {
            showingAllPrompts = true;
            showMoreBtn.remove();
            
            // Render all remaining prompts
            prompts.slice(1).forEach(prompt => {
                const card = createPromptCard(prompt);
                promptsContainer.appendChild(card);
                
                // Trigger animation
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
            });
        });
        
        promptsContainer.appendChild(showMoreBtn);
    } else if (showingAllPrompts) {
        // Show all prompts if already expanded
        prompts.forEach(prompt => {
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
    const prompt = prompts.find(p => p.id == id);
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
