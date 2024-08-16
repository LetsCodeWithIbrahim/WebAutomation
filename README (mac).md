# Test Automation
## README / Installation Guide (MacOS)
### Pre-Requisites (Installation)
1. Install NodeJS
    - Use Either a [Package Manager](https://nodejs.org/en/download/package-manager) or a [Prebuilt Installer](https://nodejs.org/en/download/prebuilt-installer)
    - Verify The NodeJS Installation...
        - Ensure, using `node --version`, that *NodeJS* is Installed and Running the Latest Version
        - Ensure, using `npm --version`, that The *Node Package Manager* is Installed and Running the Latest Version
2. Install [VS Code](https://code.visualstudio.com/) or [Visual Studio](https://visualstudio.microsoft.com/)
3. Install [Homebrew](https://brew.sh/)
    - Follow The Installation Instructions on The Homepage
    - Ensure, using `brew --version`, that *Homebrew* is Installed and Running the Latest Version
4. Install [Git](https://git-scm.com/download/mac)
    - Follow The *Homebrew* Installation Instructions on The Download Page
    - Ensure, using `git --version`, that *Git* is Installed and Running the Latest Version
5. [Set Up](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) a Public Key, or [Use an Existing One](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys) 
### GitHub Repository Setup
1. Navigate to the [EEL-DataSystems GitHub Repository](https://github.com/EEL-DataSystems) 
2. Click The ["Repositories" Tab](https://github.com/orgs/EEL-DataSystems/repositories)
3. Search For and Click on The ["TestAutomation" Repository](https://github.com/EEL-DataSystems/TestAutomation)
4. Select The "Code" Drop-Down Menu
5. Select the "SSH" Clone Option
6. Copy The Provided SSH Link
7. Back in the Terminal, Type The Following Command
> `git clone <link>`
### Cypress Installation
1. In Your IDE of Choice, Navigate to The Location Where You Cloned the TestAutomation Repository
> You Should Be in The *"TestAutomation"* Folder, **NOT** The Installation Folder
2. Open The Terminal Window
3. Run the Following Commands in the Terminal Window
```
npm init
- note: enter the spacebar, until the very last prompt. When asked to enter "yes", enter "yes"

npm install cypress --save-dev OR sudo npm install -g cypress
- note: if the first command does not work, try the second option
```
### Running Cypress
1. In Your IDE of Choice, Navigate to The Location Where You Cloned the TestAutomation Repository
> You Should Be in The *"TestAutomation"* Folder, **NOT** The Installation Folder
2. To Run Cypress, Enter the `npx cypress open` Command in the Terminal To Run **_Individual Tests_** (in the Cypress GUI)
> Alternatively, Enter the `npx cypress run` Command to Run the **_Entire Test Suite_** (in the terminal window)
3. If The Project Does Not Appear in *Cypress*, Select The `browse manually` Option, Then Select The Location Where You Cloned the *TestAutomation* Repository
> This Should Be The *"TestAutomation"* Folder, **NOT** The Installation Folder
4. Once on The Welcome Screen, Select The `E2E Testing` Type
5. Select The Preferred Browser
    - Options:
        - Chrome
        - Electron
6. Select `Start E2E Testing in Chrome`
> This Should Open a New TestAutomation Window
7. Navigate to the `Specs` Tab in the Left-Hand Side Navigation Bar
8. Ensure That The `E2E specs` Option is Selected, Underneath The Search Bar
9. Search For and Select The Test You Would Like to Run
10. You Will Be Redirected To The Test
### Exiting Cypress
1. First, Select the Close Button on the `Choose a browser` page.
2. Close the *Cypress* Window