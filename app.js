// Initialize Supabase client
const supabaseUrl = "https://srsupgbjukxifyfmdcep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc3VwZ2JqdWt4aWZ5Zm1kY2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg3ODUsImV4cCI6MjA2NzAxNDc4NX0.-yMtzbLPOU_R10ysCz1-sDwl2B4dkvWMU7--R5Zy9Wg";
const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

// Listen for form submit event
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault(); // prevent form from reloading the page

  // Get user input values from the form
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  // Call Supabase's signUp function
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name, // optional, you can save name here
      },
      emailRedirectTo: 'https://example.com/welcome', // optional
    },
  });

  // Show result to the user
  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful! Please check your email to confirm.");
    console.log("User data:", data);
  }
});
