document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('a[href="https://pancakeswap.finance/?chain=bsc"]');

    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const win = window.open('https://pancakeswap.finance/?chain=bsc', '_blank');
            if (win) {
                win.focus();
            } else {
                alert("Please allow pop-ups for this site to continue.");
            }
        });
    });

    // Function to display loading feedback
    function showLoading() {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.innerText = 'Loading...';
        loader.style.position = 'fixed';
        loader.style.top = '50%';
        loader.style.left = '50%';
        loader.style.transform = 'translate(-50%, -50%)';
        loader.style.padding = '20px';
        loader.style.backgroundColor = '#333';
        loader.style.color = '#fff';
        loader.style.borderRadius = '8px';
        loader.style.zIndex = '1000';
        document.body.appendChild(loader);
    }

    // Function to hide loading feedback
    function hideLoading() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.remove();
        }
    }

    // Function to load content dynamically with error handling
    function loadPageContent(pageId) {
        showLoading(); // Show loader when loading starts
        fetch(`${pageId}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Page not found: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const contentSection = document.querySelector('section#content'); // More specific selector
                if (contentSection) {
                    contentSection.innerHTML = html;
                } else {
                    console.error('Content section not found');
                }
            })
            .catch(error => {
                console.error('Error loading the page:', error);
                alert('Failed to load content. Please try again later.');
            })
            .finally(() => {
                hideLoading(); // Hide loader after loading is complete
            });
    }

    // Implementing navigation with dynamic content loading and URL management
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').replace('.html', ''); // Remove .html for consistency
            loadPageContent(pageId);
            history.pushState({pageId: pageId}, '', `${pageId}.html`); // Update the URL without reloading
        });
    });

    // Handle browser back/forward buttons with popstate
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.pageId) {
            loadPageContent(event.state.pageId);
        }
    });
});
