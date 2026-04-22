// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        const isActive = parent.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        
        if (!isActive) {
            parent.classList.add('active');
            item.querySelector('i').classList.replace('fa-plus', 'fa-minus');
        } else {
            item.querySelector('i').classList.replace('fa-minus', 'fa-plus');
        }
        
        // Reset icons for others
        document.querySelectorAll('.faq-item:not(.active) i').forEach(icon => {
            icon.classList.replace('fa-minus', 'fa-plus');
        });
    });
});

// Countdown Timer for Sticky Footer
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = () => {
    const timerDisplay = document.querySelector('#timer');
    if (timerDisplay) {
        startTimer(30 * 60, timerDisplay);
        document.querySelector('#timer-box').style.display = 'block';
    }
};

// Smooth Scroll for CTA
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.trans-card, .method-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
