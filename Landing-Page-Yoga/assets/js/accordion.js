const autoClose = true;

document.querySelectorAll('.acc-item').forEach(el => {
  const summary = el.querySelector('summary');
  const wrapper = el.querySelector('.content-wrapper');

  summary.onclick = (e) => {
    e.preventDefault();
    const isOpen = el.classList.contains('is-open');

	if (isOpen) {
	  el.classList.remove('is-open');
	  wrapper.style.height = '0px';
	  setTimeout(() => el.open = false, 310);
	} else {
	  if (autoClose) {
		document.querySelectorAll('.acc-item.is-open').forEach(openItem => {
		  openItem.classList.remove('is-open');
		  openItem.querySelector('.content-wrapper').style.height = '0px';
		  setTimeout(() => openItem.open = false, 310);
		});
	  }
	  el.open = true;
      el.classList.add('is-open');
      wrapper.style.height = wrapper.querySelector('.content-body').scrollHeight + 'px';
	}
  };
});