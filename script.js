// ============================================
// MATEMATIK SINAV ÇALIŞMA SİTESİ - JAVASCRIPT
// ============================================

// ============================================
// THEME SYSTEM - System Theme Detection
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        // Kullanıcı tercihi varsa onu kullan
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (systemPrefersDark) {
        // Sistem temasını kullan
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }
}

function updateThemeIcon(theme) {
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    }
});

// ============================================
// MOBILE NAVIGATION
// ============================================
function toggleMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');

    // Prevent body scroll when mobile nav is open
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
}

// Close mobile nav on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileNav();
    }
});

// Close mobile nav on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileNav();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initQuiz();
});

// ============================================
// SOLUTION TOGGLE
// ============================================
function toggleSolution(questionNum) {
    const solution = document.getElementById(`solution-${questionNum}`);
    const btn = solution.previousElementSibling;

    if (solution.classList.contains('active')) {
        solution.classList.remove('active');
        btn.textContent = 'Çözümü Göster';
    } else {
        solution.classList.add('active');
        btn.textContent = 'Çözümü Gizle';
        // Re-render MathJax for the solution
        if (window.MathJax) {
            MathJax.typesetPromise([solution]);
        }
    }
}

// ============================================
// QUESTION FILTER
// ============================================
function filterQuestions(category) {
    const cards = document.querySelectorAll('.question-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            card.style.display = 'block';
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
}

// ============================================
// TOPIC MODAL
// ============================================
const topicContent = {
    logaritma: `
        <h2>📊 Logaritma Fonksiyonu ve Özellikleri</h2>
        
        <h3>Logaritma Nedir?</h3>
        <p>Logaritma, üstel fonksiyonun tersidir. \\(a^x = b\\) ise \\(\\log_a b = x\\) şeklinde yazılır.</p>
        
        <div class="topic-formula">
            <p>$$\\log_a b = x \\Leftrightarrow a^x = b$$</p>
            <p>Burada \\(a > 0\\), \\(a \\neq 1\\) ve \\(b > 0\\) olmalıdır.</p>
        </div>
        
        <h3>Temel Özellikler</h3>
        <div class="topic-formula">
            <p>$$\\log_a 1 = 0$$ (çünkü \\(a^0 = 1\\))</p>
            <p>$$\\log_a a = 1$$ (çünkü \\(a^1 = a\\))</p>
            <p>$$a^{\\log_a x} = x$$</p>
            <p>$$\\log_a a^x = x$$</p>
        </div>
        
        <h3>Logaritma İşlem Kuralları</h3>
        <div class="topic-formula">
            <p><strong>Çarpım Kuralı:</strong> $$\\log_a (x \\cdot y) = \\log_a x + \\log_a y$$</p>
            <p><strong>Bölüm Kuralı:</strong> $$\\log_a \\frac{x}{y} = \\log_a x - \\log_a y$$</p>
            <p><strong>Üs Kuralı:</strong> $$\\log_a x^n = n \\cdot \\log_a x$$</p>
            <p><strong>Taban Değiştirme:</strong> $$\\log_a x = \\frac{\\log_b x}{\\log_b a}$$</p>
        </div>
        
        <h3>Önemli Formüller</h3>
        <div class="topic-formula">
            <p>$$\\log_a b = \\frac{1}{\\log_b a}$$</p>
            <p>$$\\log_a b \\cdot \\log_b c = \\log_a c$$</p>
            <p>$$a^{\\log_a x} = x$$</p>
        </div>
        
        <div class="topic-example">
            <h4>Örnek:</h4>
            <p>$$\\log_2 8 + \\log_3 27 = ?$$</p>
            <p><strong>Çözüm:</strong></p>
            <p>$$\\log_2 8 = \\log_2 2^3 = 3$$</p>
            <p>$$\\log_3 27 = \\log_3 3^3 = 3$$</p>
            <p>$$\\text{Sonuç} = 3 + 3 = 6$$</p>
        </div>
        
        <div class="topic-tip">
            Sınavda \\(a^{\\log_a x} = x\\) özelliği çok sık kullanılır. Bu formülü ezberle!
        </div>
    `,

    ustel: `
        <h2>🔢 Üstel ve Logaritmik Denklemler</h2>
        
        <h3>Üstel Denklemler</h3>
        <p>Bilinmeyenin üste olduğu denklemlerdir.</p>
        
        <div class="topic-formula">
            <p><strong>Temel Kural:</strong></p>
            <p>$$a^{f(x)} = a^{g(x)} \\Rightarrow f(x) = g(x)$$</p>
            <p>(a > 0 ve a ≠ 1 için)</p>
        </div>
        
        <h3>Logaritmik Denklemler</h3>
        <div class="topic-formula">
            <p><strong>Temel Kural:</strong></p>
            <p>$$\\log_a f(x) = b \\Rightarrow f(x) = a^b$$</p>
            <p>$$\\log_a f(x) = \\log_a g(x) \\Rightarrow f(x) = g(x)$$</p>
        </div>
        
        <h3>Çözüm Stratejileri</h3>
        <ul>
            <li>Tabanları eşitlemeye çalış</li>
            <li>Logaritma al veya üstel forma çevir</li>
            <li>Yerine koyma yöntemi kullan (örn: \\(t = 2^x\\))</li>
            <li>Tanım kümesini kontrol et!</li>
        </ul>
        
        <div class="topic-example">
            <h4>Örnek 1: Üstel Denklem</h4>
            <p>$$2^{x+1} = 8$$</p>
            <p><strong>Çözüm:</strong></p>
            <p>$$2^{x+1} = 2^3$$</p>
            <p>$$x + 1 = 3$$</p>
            <p>$$x = 2$$</p>
        </div>
        
        <div class="topic-example">
            <h4>Örnek 2: Logaritmik Denklem</h4>
            <p>$$\\log_2(x+3) = 4$$</p>
            <p><strong>Çözüm:</strong></p>
            <p>$$x + 3 = 2^4 = 16$$</p>
            <p>$$x = 13$$</p>
            <p>Kontrol: \\(x + 3 = 16 > 0\\) ✓</p>
        </div>
        
        <div class="topic-tip">
            Logaritmik denklemlerde tanım kümesini kontrol etmeyi unutma! Logaritmanın içi pozitif olmalı.
        </div>
    `,

    diziler: `
        <h2>📈 Diziler: Aritmetik ve Geometrik</h2>
        
        <h3>Dizi Nedir?</h3>
        <p>Dizi, doğal sayılar kümesinden reel sayılar kümesine tanımlı bir fonksiyondur.</p>
        <p>$$a: \\mathbb{N} \\rightarrow \\mathbb{R}$$</p>
        
        <h3>Aritmetik Dizi</h3>
        <p>Ardışık terimlerin farkı sabittir.</p>
        
        <div class="topic-formula">
            <p><strong>Ortak Fark:</strong> $$d = a_{n+1} - a_n$$</p>
            <p><strong>Genel Terim:</strong> $$a_n = a_1 + (n-1)d$$</p>
            <p><strong>n. Terim (iki terimle):</strong> $$a_n = \\frac{a_{n-1} + a_{n+1}}{2}$$</p>
            <p><strong>İlk n Terimin Toplamı:</strong> $$S_n = \\frac{n(a_1 + a_n)}{2} = \\frac{n[2a_1 + (n-1)d]}{2}$$</p>
        </div>
        
        <div class="topic-example">
            <h4>Örnek: Aritmetik Dizi</h4>
            <p>\\(a_1 = 3\\), \\(d = 4\\) ise 10. terim?</p>
            <p><strong>Çözüm:</strong></p>
            <p>$$a_{10} = 3 + (10-1) \\cdot 4 = 3 + 36 = 39$$</p>
        </div>
        
        <h3>Geometrik Dizi</h3>
        <p>Ardışık terimlerin oranı sabittir.</p>
        
        <div class="topic-formula">
            <p><strong>Ortak Oran:</strong> $$r = \\frac{a_{n+1}}{a_n}$$</p>
            <p><strong>Genel Terim:</strong> $$a_n = a_1 \\cdot r^{n-1}$$</p>
            <p><strong>n. Terim (iki terimle):</strong> $$a_n^2 = a_{n-1} \\cdot a_{n+1}$$</p>
            <p><strong>İlk n Terimin Toplamı:</strong> $$S_n = a_1 \\cdot \\frac{r^n - 1}{r - 1}$$ (r ≠ 1)</p>
            <p><strong>Sonsuz Terim Toplamı:</strong> $$S_\\infty = \\frac{a_1}{1-r}$$ (|r| < 1)</p>
        </div>
        
        <div class="topic-example">
            <h4>Örnek: Geometrik Dizi</h4>
            <p>\\(a_1 = 2\\), \\(r = 3\\) ise 5. terim?</p>
            <p><strong>Çözüm:</strong></p>
            <p>$$a_5 = 2 \\cdot 3^{5-1} = 2 \\cdot 81 = 162$$</p>
        </div>
        
        <h3>Aritmetik Orta Yerleştirme</h3>
        <p>a ile b arasına n tane aritmetik orta yerleştirilirse:</p>
        <div class="topic-formula">
            <p>Toplam terim sayısı: \\(n + 2\\)</p>
            <p>$$d = \\frac{b - a}{n + 1}$$</p>
        </div>
        
        <div class="topic-tip">
            Zıplayan top problemlerinde geometrik dizi kullan! Her zıplamada yükseklik r katına düşer.
        </div>
    `,

    trigonometri: `
        <h2>📐 Trigonometri: Toplam-Fark ve İki Kat Açı</h2>
        
        <h3>Toplam ve Fark Formülleri</h3>
        <div class="topic-formula">
            <p><strong>Sinüs:</strong></p>
            <p>$$\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$$</p>
            <p>$$\\sin(\\alpha - \\beta) = \\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta$$</p>
            
            <p><strong>Kosinüs:</strong></p>
            <p>$$\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$$</p>
            <p>$$\\cos(\\alpha - \\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta$$</p>
            
            <p><strong>Tanjant:</strong></p>
            <p>$$\\tan(\\alpha + \\beta) = \\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta}$$</p>
            <p>$$\\tan(\\alpha - \\beta) = \\frac{\\tan\\alpha - \\tan\\beta}{1 + \\tan\\alpha\\tan\\beta}$$</p>
        </div>
        
        <h3>İki Kat Açı Formülleri</h3>
        <div class="topic-formula">
            <p>$$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$$</p>
            <p>$$\\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha$$</p>
            <p>$$\\cos 2\\alpha = 2\\cos^2\\alpha - 1$$</p>
            <p>$$\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$$</p>
            <p>$$\\tan 2\\alpha = \\frac{2\\tan\\alpha}{1 - \\tan^2\\alpha}$$</p>
        </div>
        
        <h3>Yarım Açı Formülleri</h3>
        <div class="topic-formula">
            <p>$$\\sin^2\\frac{\\alpha}{2} = \\frac{1 - \\cos\\alpha}{2}$$</p>
            <p>$$\\cos^2\\frac{\\alpha}{2} = \\frac{1 + \\cos\\alpha}{2}$$</p>
        </div>
        
        <h3>Trigonometrik Denklemler</h3>
        <div class="topic-formula">
            <p><strong>sin x = sin α ise:</strong></p>
            <p>$$x = \\alpha + 2\\pi k \\quad \\text{veya} \\quad x = \\pi - \\alpha + 2\\pi k$$</p>
            
            <p><strong>cos x = cos α ise:</strong></p>
            <p>$$x = \\pm\\alpha + 2\\pi k$$</p>
            
            <p><strong>tan x = tan α ise:</strong></p>
            <p>$$x = \\alpha + \\pi k$$</p>
            <p>k ∈ ℤ</p>
        </div>
        
        <div class="topic-example">
            <h4>Örnek: İki Kat Açı</h4>
            <p>$$\\cos^2 30° - \\sin^2 30° = ?$$</p>
            <p><strong>Çözüm:</strong></p>
            <p>$$\\cos^2\\theta - \\sin^2\\theta = \\cos 2\\theta$$</p>
            <p>$$\\cos^2 30° - \\sin^2 30° = \\cos 60° = \\frac{1}{2}$$</p>
        </div>
        
        <div class="topic-tip">
            \\(\\cos^2\\theta - \\sin^2\\theta = \\cos 2\\theta\\) ve \\(2\\sin\\theta\\cos\\theta = \\sin 2\\theta\\) formüllerini hemen tanı!
        </div>
        
        <h3>Tamamlayıcı Açı Özelliği</h3>
        <div class="topic-formula">
            <p>$$\\sin(90° - \\theta) = \\cos\\theta$$</p>
            <p>$$\\cos(90° - \\theta) = \\sin\\theta$$</p>
        </div>
    `
};

function openTopic(topic) {
    const modal = document.getElementById('topic-modal');
    const content = document.getElementById('topic-content');

    content.innerHTML = topicContent[topic] || '<p>İçerik bulunamadı.</p>';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([content]);
    }
}

function closeModal() {
    document.getElementById('topic-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('topic-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// QUIZ SYSTEM
// ============================================
const quizQuestions = [
    {
        question: "$$\\log_2 16$$ işleminin sonucu kaçtır?",
        options: ["2", "3", "4", "8"],
        correct: 2,
        explanation: "$$\\log_2 16 = \\log_2 2^4 = 4$$"
    },
    {
        question: "$$5^{\\log_5 7}$$ işleminin sonucu kaçtır?",
        options: ["5", "7", "35", "12"],
        correct: 1,
        explanation: "$$a^{\\log_a x} = x$$ özelliğinden $$5^{\\log_5 7} = 7$$"
    },
    {
        question: "$$\\log 100 + \\log 10$$ işleminin sonucu kaçtır?",
        options: ["2", "3", "1000", "110"],
        correct: 1,
        explanation: "$$\\log 100 = 2$$, $$\\log 10 = 1$$, Toplam = 3"
    },
    {
        question: "Bir aritmetik dizide $$a_1 = 5$$ ve $$d = 3$$ ise $$a_7$$ kaçtır?",
        options: ["20", "23", "26", "17"],
        correct: 1,
        explanation: "$$a_7 = a_1 + 6d = 5 + 6(3) = 5 + 18 = 23$$"
    },
    {
        question: "Geometrik dizide $$a_1 = 2$$ ve $$r = 3$$ ise $$a_4$$ kaçtır?",
        options: ["18", "27", "54", "162"],
        correct: 2,
        explanation: "$$a_4 = a_1 \\cdot r^3 = 2 \\cdot 3^3 = 2 \\cdot 27 = 54$$"
    },
    {
        question: "$$\\sin 2\\alpha$$ neye eşittir?",
        options: ["$$2\\sin\\alpha$$", "$$\\sin^2\\alpha$$", "$$2\\sin\\alpha\\cos\\alpha$$", "$$\\sin\\alpha + \\cos\\alpha$$"],
        correct: 2,
        explanation: "İki kat açı formülü: $$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$$"
    },
    {
        question: "$$\\cos^2\\theta - \\sin^2\\theta$$ neye eşittir?",
        options: ["$$1$$", "$$\\cos 2\\theta$$", "$$\\sin 2\\theta$$", "$$0$$"],
        correct: 1,
        explanation: "İki kat açı formülü: $$\\cos^2\\theta - \\sin^2\\theta = \\cos 2\\theta$$"
    },
    {
        question: "$$\\cos x = \\cos 30°$$ denkleminin genel çözümü nedir?",
        options: ["$$x = 30° + 360°k$$", "$$x = \\pm 30° + 360°k$$", "$$x = 30° + 180°k$$", "$$x = -30° + 360°k$$"],
        correct: 1,
        explanation: "$$\\cos x = \\cos \\alpha \\Rightarrow x = \\pm\\alpha + 360°k$$"
    },
    {
        question: "$$\\log_a b \\cdot \\log_b a$$ işleminin sonucu kaçtır?",
        options: ["$$0$$", "$$1$$", "$$ab$$", "$$a + b$$"],
        correct: 1,
        explanation: "$$\\log_a b = \\frac{1}{\\log_b a}$$ olduğundan çarpımları 1'dir."
    },
    {
        question: "5 ile 25 arasına 3 aritmetik orta yerleştirilirse ortak fark kaçtır?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation: "$$d = \\frac{25 - 5}{3 + 1} = \\frac{20}{4} = 5$$"
    }
];

let currentQuestion = 0;
let score = 0;
let answers = [];
let quizCompleted = false;

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = new Array(quizQuestions.length).fill(null);
    quizCompleted = false;

    const totalEl = document.getElementById('total-questions');
    const resultEl = document.getElementById('quiz-result');
    const contentEl = document.getElementById('quiz-content');
    const restartBtn = document.getElementById('restart-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (totalEl) totalEl.textContent = quizQuestions.length;
    if (resultEl) resultEl.style.display = 'none';
    if (contentEl) contentEl.style.display = 'block';
    if (restartBtn) restartBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'inline-block';
    if (prevBtn) prevBtn.style.display = 'inline-block';

    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    const currentEl = document.getElementById('current-question');
    const scoreEl = document.getElementById('score');
    const questionText = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (currentEl) currentEl.textContent = currentQuestion + 1;
    if (scoreEl) scoreEl.textContent = score;
    if (questionText) questionText.innerHTML = question.question;

    if (optionsContainer) {
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.innerHTML = option;

            // Check if this question was already answered
            if (answers[currentQuestion] !== null) {
                if (index === question.correct) {
                    optionDiv.classList.add('correct');
                } else if (index === answers[currentQuestion] && index !== question.correct) {
                    optionDiv.classList.add('incorrect');
                }
            } else {
                optionDiv.onclick = () => selectAnswer(index);
            }

            optionsContainer.appendChild(optionDiv);
        });
    }

    // Update navigation buttons
    if (prevBtn) prevBtn.disabled = currentQuestion === 0;

    if (nextBtn) {
        if (currentQuestion === quizQuestions.length - 1) {
            nextBtn.textContent = 'Bitir';
        } else {
            nextBtn.textContent = 'Sonraki ▶';
        }
    }

    // Render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById('quiz-content')]);
    }
}

function selectAnswer(index) {
    if (answers[currentQuestion] !== null) return;

    const question = quizQuestions[currentQuestion];
    answers[currentQuestion] = index;

    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        opt.onclick = null;
        if (i === question.correct) {
            opt.classList.add('correct');
        } else if (i === index && i !== question.correct) {
            opt.classList.add('incorrect');
        }
    });

    if (index === question.correct) {
        score++;
        document.getElementById('score').textContent = score;
    }
}

function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishQuiz();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function finishQuiz() {
    quizCompleted = true;

    const contentEl = document.getElementById('quiz-content');
    const resultEl = document.getElementById('quiz-result');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const restartBtn = document.getElementById('restart-btn');

    if (contentEl) contentEl.style.display = 'none';
    if (resultEl) resultEl.style.display = 'block';
    if (nextBtn) nextBtn.style.display = 'none';
    if (prevBtn) prevBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'inline-block';

    const percentage = Math.round((score / quizQuestions.length) * 100);
    const finalScoreEl = document.getElementById('final-score');
    if (finalScoreEl) {
        finalScoreEl.textContent = `${score} / ${quizQuestions.length} (${percentage}%)`;
    }

    let message = '';
    if (percentage >= 90) {
        message = '🎉 Mükemmel! Sınava çok hazırsın! Full çekersin!';
    } else if (percentage >= 70) {
        message = '👍 Güzel! Biraz daha pratik yapabilirsin.';
    } else if (percentage >= 50) {
        message = '📚 İdare eder. Konuları tekrar gözden geçir.';
    } else {
        message = '💪 Daha çok çalışman gerekiyor. Pes etme!';
    }

    const messageEl = document.getElementById('result-message');
    if (messageEl) messageEl.textContent = message;

    // Confetti for perfect score
    if (percentage === 100) {
        createConfetti();
    }
}

function restartQuiz() {
    initQuiz();
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        }
    });
}, observerOptions);

// Observe elements after DOM load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.question-card, .topic-card, .formula-card').forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    const quizSection = document.querySelector('#quiz');
    if (quizSection && quizSection.getBoundingClientRect().top < window.innerHeight) {
        if (e.key === 'ArrowRight') {
            nextQuestion();
        } else if (e.key === 'ArrowLeft') {
            prevQuestion();
        }
    }

    // Number keys for quiz answers (1-4)
    if (!quizCompleted && answers[currentQuestion] === null) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4) {
            selectAnswer(num - 1);
        }
    }
});

// ============================================
// CONFETTI EFFECT FOR PERFECT SCORE
// ============================================
function createConfetti() {
    const colors = ['#4f46e5', '#059669', '#f59e0b', '#dc2626', '#7c3aed', '#06b6d4'];
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            opacity: ${Math.random() * 0.7 + 0.3};
            transform: rotate(${Math.random() * 360}deg);
            animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
            z-index: 9999;
            pointer-events: none;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

console.log('📚 Matematik Sınav Çalışma Sitesi yüklendi! Sınavda 100 alacaksın! 🍀💯');