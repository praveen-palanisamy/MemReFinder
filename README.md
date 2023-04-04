# MemReFinder: Chat with your Data

Memory and Retrieval-Augmented Finder (File Explorer) App to chat with your documents and files to find answers powered by OpenAI GPT models. You can load multiple DOCX, PDF, CSV, Markdown, HTML or other text files and ask questions related to their content, and the app will use embeddings and GPT to generate answers from the most relevant files and sections within your files.

## How does it help you?

* Find answers to your personal or business questions on data that is not public or available to ChatGPT
* Use your personal/organizational/private files locally to find answers to questions
* Build your own knowledge base and ask questions to it
* Empowers you and your files with the power of GPT-3.5+

## Requirements

To use the app, you need an OpenAI API key. You can create a new API key [here](https://beta.openai.com/account/api-keys).


## Development

### Set Up

0. Install NodeJS [https://nodejs.org/en/download/](https://nodejs.org/en/download/). Recommended to use NVM.
1. Clone the repo
2. Install dependencies: `npm install`
3. Copy the .env.local.example file into a .env.local file and fill out the OpenAI API key field.
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see/debug the app.
6. Make your changes and submit a PR!
