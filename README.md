# Alina's Birthday Quiz

A cute, mobile-friendly Russian rap quiz made for Alina's birthday. It has ten shuffled questions: five about track titles and five that ask players to identify an artist from a short line.

## Add your text questions

Open `scripts/app.js` and replace the five `lyric` placeholder values in `lyricQuestions` with your chosen short lines. The matching artist is already set in each question.

## Run locally

Open `index.html` in a browser. No build process or dependencies are required.

## Add the wrong-answer image

Place a JPEG image called `alina-screamer.jpg` at `assets/images/alina-screamer.jpg`. It will appear after a wrong answer. A colourful built-in fallback is shown if the image is not available.

## Deploy to GitHub Pages

1. Create a new GitHub repository and commit this folder's contents at its root.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
4. Save. GitHub will show the public Pages URL after deployment.

For a project repository named `alina-birthday-quiz`, the address is usually `https://YOUR-USERNAME.github.io/alina-birthday-quiz/`.
