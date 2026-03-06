
const searchInput = document.getElementById('searchInput');
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const cards = Array.from(document.querySelectorAll('.summary-card'));
const emptyState = document.getElementById('emptyState');

let activeFilter = 'All';

function applyFilters() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matchesFilter = activeFilter === 'All' || card.dataset.category === activeFilter;
    const haystack = card.dataset.search || '';
    const matchesSearch = !query || haystack.includes(query);
    const show = matchesFilter && matchesSearch;
    card.style.display = show ? '' : 'none';
    if (show) visible += 1;
  });
  if (emptyState) emptyState.style.display = visible ? 'none' : 'block';
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

if (searchInput) searchInput.addEventListener('input', applyFilters);
applyFilters();
