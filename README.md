# Comandante

Execute command line commands through an Electron based UI.

## Install dependencies

```
yarn
```

## Start for development

```
yarn dev
```

## Build

This project uses [electron-builder](https://www.electron.build/) to package and build a ready for distribution Electron app for macOS, Windows and Linux.

The configuration schema can be found in the package.json under the `"build"` key.

Scrips were added to the package.json file to trigger the build processes:

```
yarn build-linux
yarn build-mac
yarn build-win
```

*Important*: As electron-builder documentation says: Don’t expect that you can build app for all platforms on one platform. If your app has native dependency, it can be compiled only on the target platform.

### The `build` folder

Used as a look up folder for icons by electron-builder.

### The `bin` folder

Precompiled binaries lives in the `bin` directory. It's contents will be copied at runtime into the native app when building for distribution. This is how this project works without out of the box without leaving to the user the task of downloading dependencies. The paths to each binary will change from development and production.

### The `dist` folder

Where electron-builder packaged and compiled apps are stored.
