// Hamburger menu toggle for mobile - Get elements //
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Toggle the menu and hamburger icon
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle the visibility of nav links
    menuToggle.classList.toggle('active'); // Animate the hamburger icon
});

// FAQ (Frequently Asked Questions) | Select all the FAQ (Frequently Asked Questions) question elements //
const faqQuestions = document.querySelectorAll('.faq-question');

// Add event listener to each FAQ question
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;

        // If the answer is already open, close it
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            answer.style.maxHeight = '0'; // Reset max-height to 0 for the animation
        } else {
            // If the answer is closed, open it
            answer.style.display = 'block';
            answer.style.maxHeight = answer.scrollHeight + 'px'; // Set max-height to the scrollHeight of the answer (auto height)
        }
    });
});


// Blog post | auto //

async function fetchPosts(blogId, apiKey) {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=5`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            document.getElementById('posts-container').innerText = `Error: ${data.error.message}`;
            return;
        }

        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';

        data.items.forEach(post => {
            const title = post.title || 'No Title';
            const content = post.content || '';
            const postUrl = post.url;

            // Extract the thumbnail (if any image is present)
            const imgMatch = content.match(/<img.*?src="(.*?)"/);
            const thumbnail = imgMatch ? imgMatch[1] : 'https://via.placeholder.com/150';

            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <img src="${thumbnail}" alt="Post Thumbnail">
                <h3>${title}</h3>
                <a href="${postUrl}" class="read-more" target="_blank" rel="noopener noreferrer">
                    Read More
                </a>
            `;

            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        document.getElementById('posts-container').innerText = `Failed to load posts. Error: ${error.message}`;
    }
}

// Set your Blog ID and API Key here
const blogId = '4949966112793315828'; // Replace with your Blog ID
const apiKey = 'AIzaSyCtFyCcJf7b_nAaCm27szLkUn44gcoJh0g'; // Replace with your API Key

// Fetch and display the posts
fetchPosts(blogId, apiKey);