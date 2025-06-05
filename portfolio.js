document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const status = document.getElementById("form-status");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Submit the form using Fetch
        const data = new FormData(form);
        try {
            const res = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (res.ok) {
                status.textContent = "Thanks for your message!";
                status.style.color = "green";
                form.reset();
            } else {
                const err = await res.json();
                status.textContent = err.message || "Oops! Something went wrong.";
                status.style.color = "red";
            }
        } catch (err) {
            status.textContent = "Oops! There was a network error.";
            status.style.color = "red";
        }
    });
});

