// Initialize Supabase client
const supabaseUrl = "https://srsupgbjukxifyfmdcep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc3VwZ2JqdWt4aWZ5Zm1kY2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg3ODUsImV4cCI6MjA2NzAxNDc4NX0.-yMtzbLPOU_R10ysCz1-sDwl2B4dkvWMU7--R5Zy9Wg";

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // ✨ SIGNUP
  if (path.includes("index.html")) {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = nameInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: "https://example.com/welcome",
        },
      });

      if (error) {
        alert("Signup failed: " + error.message);
      } else {
        alert("Signup successful!");
        console.log("User data:", data);
        window.location.href = "post.html";
      }
    });
  }

  // ✨ LOGIN
  if (path.includes("login.html")) {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = emailInput.value;
      const password = passwordInput.value;

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Login failed: " + error.message);
      } else {
        alert("Login successful!");
        console.log("User info:", data.user);
        window.location.href = "post.html";
      }
    });
  }
  // ✨ GOOGLE SIGN-IN
  const googleBtn = document.getElementById('googleSignUp');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/post.html`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Google Sign-In Error:', error.message);
      } else {
        console.log('Redirecting to Google...');
      }
    });
  }

  // ✨ POST PAGE FUNCTIONALITY
  if (path.includes("post.html")) {
    const postForm = document.getElementById("postForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const charCount = document.getElementById("charCount");

    // Character counter
    if (contentInput && charCount) {
      contentInput.addEventListener("input", () => {
        charCount.textContent = contentInput.value.length;
      });
    }

    if (postForm) {
      postForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const description = contentInput.value.trim();

        if (!title || !description) {
          alert("Please fill in both title and description.");
          return;
        }

        const {
          data: { user },
          error: userError,
        } = await supabaseClient.auth.getUser();

        if (userError || !user) {
          alert("You must be logged in to post.");
          return;
        }

        const { data, error } = await supabaseClient.from("posts").insert([
          {
            user_id: user.id,
            title: title,
            description: description,
          },
        ]);

        if (error) {
          alert("Error posting: " + error.message);
        } else {
          alert("Post created successfully!");
          window.location.href = "blogs.html";
        }
      });
    }
  }
});
