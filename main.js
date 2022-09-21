import p5 from "p5";
import { Magic } from "magic-sdk";

const magic = new Magic("pk_live_B18C090502523AAF");

/* 3️⃣ Implement Render Function */
const render = async () => {
  let html = "";

  if (window.location.pathname === "/callback") {
    try {
      /* Complete the "authentication callback" */
      await magic.auth.loginWithCredential();

      /* Get user metadata including email */
      const userMetadata = await magic.user.getMetadata();

      html = `<h1>Current user: ${userMetadata.email}</h1><button onclick="handleLogout()">Logout</button>`;
    } catch {
      window.location.href = window.location.origin;
    }
  } else {
    const isLoggedIn = await magic.user.isLoggedIn();

    if (isLoggedIn) {
      /* Get user metadata including email */
      const userMetadata = await magic.user.getMetadata();
      document.getElementById("app").innerHTML = `
          <h1>Current user: ${userMetadata.email}</h1>
          <button id="logout-btn">Logout</button>
        `;

      document
        .querySelector("#logout-btn")
        .addEventListener("click", handleLogout);

      let sketch = function (p) {
        let x = 100;
        let y = 100;

        p.setup = function () {
          p.createCanvas(700, 410);
        };

        p.draw = function () {
          p.background(0);
          p.fill(255);
          p.rect(x, y, 50, 50);
        };
      };

      let myp5 = new p5(sketch);
    } else {
      /* Show login form if user is not logged in */
      document.getElementById("app").innerHTML = `
        <h1>Please sign up or login</h1>
        <form id="sign-in-form">
            <input type="email" name="email" required="required" placeholder="Enter your email" />
            <button type="submit">Send</button>
        </form>
    `;

      document
        .querySelector("#sign-in-form")
        .addEventListener("submit", handleLogin);
    }
  }
};

/* 4️⃣ Implement Login Handler */
const handleLogin = async (e) => {
  e.preventDefault();
  const email = new FormData(e.target).get("email");
  const redirectURI = `${window.location.origin}/callback`;
  if (email) {
    /* One-liner login 🤯 */
    await magic.auth.loginWithMagicLink({ email, redirectURI });
    render();
  }
};

/* 5️⃣ Implement Logout Handler */
const handleLogout = async () => {
  await magic.user.logout();
  render();
};

render();
