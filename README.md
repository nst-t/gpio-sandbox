# Nstrumenta Sandbox Example

This repo contains two pieces:

* web based [sandbox](#sandbox) demo app
* node based [sensor reader](#node) app for raspberry pi GPIO

### Prerequisite

Install [_nstrumenta_](https://nstrumenta.com) cli globally on your raspberry pi:

```shell
npm i -g nstrumenta
nstrumenta context set-property projectId --value=PROJECT_ID
nstrumenta context set-property wsHost --value=localhost:8088
```

ssh into the raspberry pi, and start the webscocket host

```shell
nstrumenta serve
```
## <a name="cli"></a> Sandbox

The example app was created with [create react app](https://create-react-app.dev/) with [typescript](https://typescript.org). 

[more here...]

```shell
npm run start
```

## <a name="cli"></a> Node app

This example will be run on a raspberry pi. If you have a raspberry pi 3 or 4, you can [use vscode to directly edit](https://code.visualstudio.com/docs/remote/ssh) this app, or if you have a pi zero w, for example:

```shell
scp -r gpio-rpi/ USER@RASPBERRYPI.LOCAL:~/gpio-rpi
```

Once the files are on the raspberry pi, log in and run the script

```shell
# raspberry pi console 2
cd gpio-rpi
npm i
node index.js
```

The script will try to connect to `ws://localhost:8088`. On a successful connection, 

