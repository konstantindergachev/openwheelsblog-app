(() => {
  'use strict';

  const photo = document.getElementById('photo');

  let label = photo.nextElementSibling;
  let labelValue = label.textContext;

  photo.addEventListener('change', function(ev) {
    let fileName = '';
    if (this.files && this.files.length > 1) {
      fileName = (this.getAttribute('data-multiple-caption') || '')
        .replace('{count}', this.files.length);
    } else {
      fileName = ev.target.value.split('\\').pop();
    }

    if (fileName) {
      label.querySelector('span').textContent = fileName;
    } else {
      label.textContent = labelValue;
    }
  });
})();
