const hamburger = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');

function toggleMenu(e) {
    // Prevent double-firing on mobile touch
    if (e.type === 'touchstart') e.preventDefault();

    // Toggle the active class (slides down/up)
    navLinks.classList.toggle('active');

    // Handle the glow flicker fix
    hamburger.classList.add('is-tapped');
    setTimeout(() => {
        hamburger.classList.remove('is-tapped');
    }, 300);
}

// Listen for clicks on the hamburger button
hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('touchstart', toggleMenu, { passive: false });

// Close menu and slide up when any link is clicked
document.querySelectorAll('.headerLinks li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Close menu if clicking anywhere outside the header
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});