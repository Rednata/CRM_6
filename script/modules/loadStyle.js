const styles = new Set();

const loadStyle = (url) => {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.addEventListener('load', () => resolve());
    document.head.append(link);
  })
};


export {loadStyle};