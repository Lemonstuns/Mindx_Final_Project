document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const showLogin = document.getElementById("showLogin");
  const showRegister = document.getElementById("showRegister");

  // Switch to Register
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
  });

  // Switch to Login
  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  });

  // Load accounts from localStorage (or empty array if none)
  function loadAccounts() {
    return JSON.parse(localStorage.getItem("accounts")) || [];
  }

  // Save accounts to localStorage
  function saveAccounts(accounts) {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  // Handle Register
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("regUser").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPass").value.trim();

    if (!username || !email || !password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    let accounts = loadAccounts();

    // Check if username already exists
    if (accounts.some(acc => acc.username === username)) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    // Save new account
    accounts.push({ username, email, password });
    saveAccounts(accounts);

    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
    registerForm.reset();

    // Switch to login automatically
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  });

  // Handle Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value.trim();

    let accounts = loadAccounts();

    // Find account
    const user = accounts.find(acc => acc.username === username && acc.password === password);

    if (user) {
      alert(`Xin chào ${username}, bạn đã đăng nhập thành công!`);
      loginForm.reset();
      // 👉 Bạn có thể chuyển hướng đến trang chính:
      // window.location.href = "home.html";
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  });
});
