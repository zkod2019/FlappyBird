let sketch = function (p) {
  var robot;
  var block = [];
  
  let img;
  
  let score = 0;
  
  const scoreEl = document.querySelector("#score");

  p.keyPressed = function(key) {
    if (p.key == " ") {
      robot.up();
    }
  }        

  p.preload = function () {
    img = p.loadImage("./robo.png");
    imgTools = p.loadImage("./tools.png");
  };

  p.setup = function () {
    p.createCanvas(700, 500);
    robot = new Robot(p, img);
    block.push(new Block(p, imgTools));
  };

  p.draw = function () {
    p.background(0);

    for (var i = block.length - 1; i >= 0; i--) {
      block[i].show();
      block[i].update();
  
      if (block[i].hits(robot)) {
        (async () => {
          window.location = "/gameover.html";
        })();
        p.pause();
      }
  
      if (block[i].offscreen()) {
        block.splice(i, 1);
      }
    }
  
    robot.update();
    robot.show();
  
    if (p.frameCount % 75 == 0) {
      score++;
      scoreEl.innerHTML = `Score is: ${score}`;
      block.push(new Block(p, imgTools));
    }
  };
};

let myp5 = new p5(sketch);

myp5.pause();

const magic = new Magic("pk_live_B18C090502523AAF");

/* 3️⃣ Implement Render Function */
const render = async () => {
  let html = "";

  if (window.location.pathname === "/callback.html") {
    try {
      /* Complete the "authentication callback" */
      await magic.auth.loginWithCredential();

      /* Get user metadata including email */
      const userMetadata = await magic.user.getMetadata();

      html = `<h1>Current user: ${userMetadata.email}</h1><button onclick="handleLogout()">Logout</button>`;
    } catch {
      window.location.pathname = "/game.html";
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

      myp5.pause();
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
  const redirectURI = `${window.location.origin}/callback.html`;
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
