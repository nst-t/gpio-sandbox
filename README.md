# Nstrumenta Sandbox Example

This repo contains two pieces:

* web based [sandbox](#sandbox) demo app
* node based [sensor reader](#node) app for raspberry pi GPIO

### Prerequisite

We'll have two terminals into the raspberry pi, one for the websocket server, and the other will run the sample node app to set and read gpio pins.

Install [_nstrumenta_](https://nstrumenta.com) cli globally on your raspberry pi:

For the first, ssh into the raspberry pi, and start the webscocket server


```shell
npm i -g nstrumenta
nstrumenta context set-property projectId --value=PROJECT_ID
nstrumenta context set-property wsHost --value=localhost:8088
```

```shell
nstrumenta serve
```

## <a name="cli"></a> Node app

This example will be run on a raspberry pi. If you have a raspberry pi 3 or 4, you can [use vscode to directly edit](https://code.visualstudio.com/docs/remote/ssh) this app. If you have a pi zero w, you'll have to copy the folder over manually, for example:

```shell
scp -r gpio-rpi/ USER@RASPBERRYPI.LOCAL:~/gpio-rpi
```

> Note: If you go the vscode route linked above, you'll be able to use vscode to debug the running node app directly within vscode. You'll also be able to use `localhost` later in the sandbox to connect to the server. If not, you'll enter your raspberry pi's ip address or name on the local network in the sandbox.

Once the files are on the raspberry pi, log in and run the script

```shell
# raspberry pi console 2
cd gpio-rpi
npm i
node index.js
```

The script will try to connect to `ws://localhost:8088`. On a successful connection, 

## <a name="cli"></a> Sandbox

The example sandbox was created with [create react app](https://create-react-app.dev/) with [typescript](https://typescript.org) and [material ui](https://mui.com) for react.

In the top level of the sandbox repo, run

```shell
npm i
npm run start
```

And your browser will load [http://localhost:3000](http://localhost:3000)

Enter the ip address of your raspberry pi running the nstrumenta server. Be sure to keep protocol `ws://` and use port `8088` by default (unless you started the server on a different port). The networking icon in the title bar will turn from gray to purple when the websocket connection is made.

You can set state of any io pins to `in` or `out`, and send a value to a pin via the Pinout diagram.
