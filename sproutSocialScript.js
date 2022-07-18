/* ATTENTION: Based on heading position preference, swap `addHeadingToBack` with `addHeadingToFront` in line 45. */

/* Places heading at end of line */
function addHeadingToBack(heading, headingPrefix) {
  headingPrefix.classList.add('github-a11y-heading-prefix', 'github-a11y-heading-prefix-after');
  headingPrefix.textContent = ` ${heading.tagName.toLowerCase()}`;
  heading.classList.add('github-a11y-heading', 'github-a11y-heading-after');
  heading.append(headingPrefix);
}

/* Places heading in front of line */
function addWarning(composeSections) {
  if (composeSections.querySelector('.image-warning')) {
    return;
  }

  const warning = document.createElement('div');
  warning.classList.add('ComposeWarnings', 'image-warning');
  warning.innerHTML = '<div class="styles__Container-sc-ma8yo6-0"><button type="button" data-qa-button="" data-qa-button-isdisabled="false" color="button.secondary.text.base" width="1" aria-controls="Racine-collapsible-3" aria-expanded="true" data-qa-collapse="" class="styles__Container-sc-1juy94s-0 ckUQnS"><div display="flex" height="48px" class="styles__Container-sc-ma8yo6-0 hIYKiZ"><div class="ComposeWarnings-title ComposeCollapse-trigger"><span class="ComposeWarnings-titleText ComposeCollapse-triggerText">1 error</span></div><span data-qa-icon="chevron-down" aria-hidden="true" class="styles__Container-sc-x0vwa5-0 dCMzyz CollapsibleBox__RotatingIcon-s3qxoz-0 dKnJQZ Icon"><svg class="Icon-svg" viewBox="0 0 16 18" focusable="false"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ssiconsvg-chevron-down"></use></svg></span></div></button><div data-qa-collapsible="" data-qa-collapsible-isopen="true" class="styles__Container-sc-ma8yo6-0 cDIJqY styles__CollapsingBox-sc-1xvfbl7-0 dWXvPi CollapsibleBox__CollapsiblePanelWithOptionalScrolling-s3qxoz-1 cXSdEk"><div width="100%" aria-hidden="false" id="Racine-collapsible-3" class="styles__Container-sc-ma8yo6-0 eyEOOR"><div class="styles__Container-sc-ma8yo6-0 cLUIPL"><ul class="ComposeWarnings-list"><li class="ComposeWarning ComposeWarning--error" data-qa-compose-warning="error"><span class="ComposeWarning-icon"><span aria-label="Error" data-qa-icon="error" class="styles__Container-sc-x0vwa5-0 dCMzyz Icon"><svg class="Icon-svg" viewBox="0 0 16 16" focusable="false"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ssiconsvg-error"></use></svg></span></span><span class="ComposeWarning-text">Please add descriptions to all images.</span></li></ul></div></div></div></div>'
  composeSections.append(warning);
}

function checkImages() {
  const elements = document.querySelectorAll('.github-a11y-heading-prefix, .github-a11y-img-caption')
  for (const element of elements) {
    element.remove();
  }

  document.querySelectorAll('.MediaPreview__MediaCardMedia-cwwfse-1').forEach(function(imageCard) {
    alert('Checking image...');
    if (!imageCard.querySelector('span[data-qa-icon="image-caption"]')) {
      const composeSections = document.querySelector('.js-compose-sections');
      addWarning(composeSections);
    }
  });
}

/* Listen for messages from the background script */
chrome.runtime.onMessage.addListener(() => {
  checkImages();
});

/* Debounce to avoid redundant checkImages calls */
let timer;
let observer = new MutationObserver(function(mutationList) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    for (const mutation of mutationList) {
      this.disconnect();
      if (mutation.target.closest('.MediaPreview__MediaCardMedia-cwwfse-1')) {
        alert('observe...');
        checkImages();
      }
      observe();
    }
  }, 100);
})

const observe = ()=> {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

window.addEventListener('load', () => {
  alert('loaded...');
  checkImages();
  observe();
})
