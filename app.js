//Initialize Supabase client
const supabaseUrl = "https://srsupgbjukxifyfmdcep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc3VwZ2JqdWt4aWZ5Zm1kY2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg3ODUsImV4cCI6MjA2NzAxNDc4NX0.-yMtzbLPOU_R10ysCz1-sDwl2B4dkvWMU7--R5Zy9Wg";

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  //✨ SIGNUP FUNCTIONALITY
  if (path.includes("index.html")) {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!name || !email || !password) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill all fields before signing up.",
        });
        return;
      }

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          text: "Redirecting to Post page...",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          window.location.href = "post.html";
        });
      }
    });
  }

  // ✨ LOGIN FUNCTIONALITY
  if (path.includes("login.html")) {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please enter both email and password.",
        });
        return;
      }

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Redirecting to Post page...",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          window.location.href = "post.html";
        });
      }
    });
  }

  // ✨ GOOGLE SIGN-IN FUNCTIONALITY
  const googleBtn = document.getElementById("googleSignUp");
  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/post.html`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      }
    });
  }

  // ✨ POST PAGE FUNCTIONALITY
  if (path.includes("post.html")) {
    const postForm = document.getElementById("postForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const charCount = document.getElementById("charCount");

    // Character Counter
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
          Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill in both title and description.",
          });
          return;
        }

        const {
          data: { user },
          error: userError,
        } = await supabaseClient.auth.getUser();

        if (userError || !user) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You must be logged in to post.",
          });
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
          Swal.fire({
            icon: "error",
            title: "Error Posting",
            text: error.message,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Post Created!",
            text: "Your post was successfully added.",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.href = "allblogs.html";
          });
        }
      });
    }
  }
});
