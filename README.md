# ALTA-Cookit-FE

## Requirements

For development, you will only need Node.js installed on your environment.

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v18.13.0

    $ npm --version
    8.19.3

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/Cookit-group-1/ALTA-Cookit-FE.git
    $ cd ALTA-Cookit-FE
    $ npm install

## Running Build

    $ npm run dev

## Update sources

Some packages usages might change so you should run `npm prune` & `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm prune
    $ npm install

To run those 3 commands you can just do

    $ npm run pull

---

## Languages & tools

- [Typescript](https://www.typescriptlang.org/) to add type safety to projects.
- [React](https://react.dev/) to build component-based user interfaces.
- [Vite](https://vitejs.dev/) for the development environment.
- [Tailwind](https://tailwindcss.com/) for CSS formatting.
- [DaisyUI](https://daisyui.com/) for premade component classes.
- [React Icons](https://react-icons.github.io/react-icons/) for adding icons.
- [Redux Toolkit](https://redux-toolkit.js.org/) for efficient redux development.
- [Axios](https://axios-http.com/) to make http requests.
- [React Router](https://reactrouter.com/en/main) for routing.
