const images = Array.from(document.querySelectorAll('.gallery-item img'));
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
let current = 0;

function openLightbox(index) {
  current = index;
  const img = images[current];
  lbImg.src = img.dataset.full || img.src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showNext() {
  current = (current + 1) % images.length;
  const img = images[current];
  lbImg.src = img.dataset.full || img.src;
}

function showPrev() {
  current = (current - 1 + images.length) % images.length;
  const img = images[current];
  lbImg.src = img.dataset.full || img.src;
}

images.forEach((img, i) => {
  img.parentElement.addEventListener('click', () => openLightbox(i));
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-next').addEventListener('click', showNext);
document.getElementById('lightbox-prev').addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});
