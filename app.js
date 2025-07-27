// Initialize Supabase client
const supabaseUrl = "https://srsupgbjukxifyfmdcep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc3VwZ2JqdWt4aWZ5Zm1kY2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg3ODUsImV4cCI6MjA2NzAxNDc4NX0.-yMtzbLPOU_R10ysCz1-sDwl2B4dkvWMU7--R5Zy9Wg";

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // ✨ If we're on signup.html
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
        alert("Signup successful! Please check your email to confirm.");
        console.log("User data:", data);
      }
    });
  }

  // ✨ If we're on login.html
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
        // Optional: redirect to dashboard
        // window.location.href = "dashboard.html";
      }
    });
  }
});

