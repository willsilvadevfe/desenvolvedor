// Mobile menu toggle
document.getElementById('gen-ham').addEventListener('click', function() {
  var nav = document.getElementById('gen-nav');
  var menu = document.getElementById('gen-menu');
  var isOpen = menu.classList.toggle('open');
  nav.classList.toggle('mobile-open', isOpen);
});
 
// Close menu when clicking outside
document.addEventListener('click', function(e) {
  var nav = document.getElementById('gen-nav');
  var menu = document.getElementById('gen-menu');
  if (!nav.contains(e.target) && menu.classList.contains('open')) {
    menu.classList.remove('open');
    nav.classList.remove('mobile-open');
  }
});
