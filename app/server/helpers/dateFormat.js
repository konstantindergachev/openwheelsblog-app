module.exports = {
  dateFormat: (date) => {
    if (date) {
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(date));
    }
    return null;
  },
  timeFormat: (date) => {
    if (date) {
      return new Intl.DateTimeFormat('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(date));
    }
    return null;
  },
};
