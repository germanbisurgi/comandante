# Comandante

Comandante is an Electron-based UI that allows you to execute command line commands with ease.

## Installation of Dependencies

To get started, simply run the following command to install the required dependencies using Yarn:

```bash
yarn
```

## Starting for Development

Launch the application in development mode with the following command:

```bash
yarn dev
```

## Building the Application

This project relies on [electron-builder](https://www.electron.build/) to package and create distributable Electron applications for macOS, Windows, and Linux.

You can find the configuration schema for electron-builder in the `package.json` file under the `"build"` key.

To initiate the build processes, utilize the provided scripts in the `package.json` file:

```bash
yarn build-linux
yarn build-mac
yarn build-win
```

**Important Note:** According to the electron-builder documentation, it's crucial to understand that building an app for all platforms on a single platform may not be feasible. If your app relies on native dependencies, it can only be compiled on the target platform where it is intended to run.

### The `build` Folder

This folder is employed as a lookup location for icons used by electron-builder during the build process.

### The `bin` Folder

Inside the `bin` directory, you'll find precompiled binaries. During the distribution build process, these binaries are copied into the native app. This approach streamlines the project's functionality by eliminating the need for users to manually download dependencies. Keep in mind that the paths to each binary may differ between development and production environments.

### The `dist` Folder

The `dist` directory is where electron-builder stores the packaged and compiled versions of the application for distribution.
