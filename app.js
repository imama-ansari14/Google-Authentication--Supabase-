const supabaseUrl = "https://srsupgbjukxifyfmdcep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc3VwZ2JqdWt4aWZ5Zm1kY2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg3ODUsImV4cCI6MjA2NzAxNDc4NX0.-yMtzbLPOU_R10ysCz1-sDwl2B4dkvWMU7--R5Zy9Wg";
const { createClient } = supabase;

const client = createClient(supabaseUrl, supabaseKey);

// Listen for form submission
const form = document.querySelector("form");
form.addEventListener("submit", async function (e) {
  e.preventDefault(); // stop page reload

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful! Check your email to verify.");
    console.log(data);
  }
});
