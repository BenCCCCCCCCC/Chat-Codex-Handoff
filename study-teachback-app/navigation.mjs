const toggle = document.getElementById('navToggle');
toggle.addEventListener('click', () => {
  const compact = document.body.classList.toggle('compact-nav');
  const label = compact ? '展开侧栏' : '收起侧栏';
  toggle.setAttribute('aria-expanded', String(!compact));
  toggle.setAttribute('aria-label', label);
  toggle.title = label;
});
