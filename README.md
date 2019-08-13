# <img src="http://i.imgur.com/RSUlFRa.gif" width="150" alt="HEP">

# HEP MQTT Emitter

This dummy example illustrates a simple HEP pipeline through an [emitter](https://github.com/emitter-io/) instance using MQTT

### Requirements
- Emitter Server
  - License config
  - Generate a Key
- HEPmitter
  - Channel and Key in `config.js`
  
### Quick Start
#### Emitter
The quick way to start an Emitter broker is by using docker run command as shown below.
```
docker run -d --name emitter -p 8080:8080 --restart=unless-stopped emitter/server
```
Both commands above start a new server and if no configuration or environment variables were supplied, it will print out a message similar to the message below once the server has started:
```
[service] unable to find a license, make sure 'license' value is set in the config file or EMITTER_LICENSE environment variable
[service] generated new license: uppD0PFIcNK6VY-7PTo7uWH8EobaOGgRAAAAAAAAAAI
[service] generated new secret key: 4nEeZxflLe4N36i1XDiNgRY2dvbduqYh
```
This message shows that a new security configuration was generated, you can then re-run `EMITTER_LICENSE` set to the specified value. Alternatively, you can set `license` property in the `emitter.conf` configuration file.

Next, open a browser and navigate to `http://127.0.0.1:8080/keygen` in order to generate an access key. Now you can use the secret `key` generated to create channel keys, which allow you to secure individual channels and start using emitter.

![image](https://user-images.githubusercontent.com/1423657/62931666-044bf200-bdbf-11e9-90b0-43705eb81186.png)

###### MARK DOWN YOUR GENERATED KEY!

#### HEPmitter
Clone this git repository and install using `npm`
```
git clone https://github.com/lmangani/HEPmitter
cd HEPmitter
npm install
```

Next, configure your channel and secret `key` using file `config.js`
```
config = {
	server: {
		host: '127.0.0.1',
		port: 8080
	},
	sub: {
		key: "QTD29b_rvDuvHBft794KUu9Z809gwPPU",
		name: "hep"
	}
}
```

Last, start `HEPmitter` and verify you receive back a fully decoded `HEP` message.
```
connected!
output hep { rcinfo: 
   { protocolFamily: 2,
     protocol: 17,
     srcIp: '10.0.0.1',
     dstIp: '10.0.0.2',
     srcPort: 5060,
     dstPort: 5060,
     timeSeconds: 2319774396,
     timeUseconds: 0,
     payloadType: 100,
     captureId: 2001,
     hepNodeName: '2001',
     capturePass: 'myHep' },
  payload: 'hello HEP!' }
  ```




