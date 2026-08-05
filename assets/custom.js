(function () {
  const TARGET_CLASS = 'loox-v2-carousel-container';
  const NEW_PRODUCT_ID = '5558467657887';

  function fixLooxCarousel(container) {
    if (!container || container.offsetHeight > 0) return;

    const iframe = container.querySelector('iframe');
    if (!iframe || !iframe.src) return;

    // Replace productIds in iframe src
    const url = new URL(iframe.src);
    url.searchParams.set('productIds', NEW_PRODUCT_ID);
    iframe.src = url.toString();

    // Also update container data attribute (Loox reads this sometimes)
    container.setAttribute('data-product-ids', NEW_PRODUCT_ID);

    console.log('Loox carousel fixed → productIds:', NEW_PRODUCT_ID);
  }

  function addPosterRole(poster){
    if(poster){
      poster.setAttribute('role', 'presentation');
    }
  }

  // If already on page
  document.querySelectorAll(`.${TARGET_CLASS}`).forEach(fixLooxCarousel);

  // Watch for async insertion
  const observer = new MutationObserver(() => {
    document.querySelectorAll(`.${TARGET_CLASS}`).forEach(fixLooxCarousel);
    document.querySelectorAll('video img').forEach(addPosterRole)
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();

//waits for certain element to load
function findDeep(selector, root = document) {
  // check current root
  const el = root.querySelector(selector);
  if (el) return el;

  // search shadow roots recursively
  const nodes = root.querySelectorAll('*');
  for (const node of nodes) {
    if (node.shadowRoot) {
      const found = findDeep(selector, node.shadowRoot);
      if (found) return found;
    }
  }
  return null;
}

function waitForElement(selector, callback, interval = 100) {
  const timer = setInterval(() => {
    const el = findDeep(selector);
    if (el) {
      clearInterval(timer);
      callback(el);
    }
  }, interval);
}

// Usage
waitForElement('.leather-limited', (el) => {
  let current = parseInt(el.textContent, 10) || 0;
  const drop = Math.floor(Math.random() * 2) + 3;
  el.textContent = Math.max(0, current - drop);
});
console.log("testv3")