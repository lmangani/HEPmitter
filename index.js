// connect to emitter.io and get the client
var emitter = require('emitter-io');
var config = require('./config.js').config;

const HEPjs = require('hep-js');
const rcinfo = { type: 'HEP',
  version: 3,
  payload_type: 'JSON',
  captureId: '2001',
  capturePass: 'myHep',
  ip_family: 2,
  time_sec: new Date().getTime(),
  time_usec: 000,
  protocol: 17,
  proto_type: 100,
  srcIp: '10.0.0.1',
  dstIp: '10.0.0.2',
  srcPort: 5060,
  dstPort: 5060
}


var client = emitter.connect({ host: config.server.host || '127.0.0.1', port: config.server.port });

client.on('connect', function(){
  console.log('connected!');

  // once we're connected, subscribe to the 'chat' channel
  client.subscribe({
	key: config.sub.key || "hep",
	channel: config.sub.name || "hep"
  });

  // on every message, print it out
  client.on('message', function(msg){
	var output = HEPjs.decapsulate(msg.asBinary() );
	if(output){
	  console.log('output hep', output);
	} else {
	  console.log('output raw', msg.asString() );
	}
  });

  // publish a message to the chat channel
  client.publish({
	key: config.sub.key,
	channel: config.sub.name,
	message: HEPjs.encapsulate("hello HEP!",rcinfo)
  });

});


