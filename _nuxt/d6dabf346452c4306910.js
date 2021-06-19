(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{128:function(t,r,e){"use strict"; 
var n=e(688),o=e(719); 
t.exports={packageInit:function(t,r){if(r=Array.prototype.slice.call(r),!t)throw new Error('You need to instantiate using the "new" keyword.'); 
Object.defineProperty(t,"currentProvider",{get:function(){return t._provider},set:function(r){return t.setProvider(r)},enumerable:!0,configurable:!0}),r[0]&&r[0]._requestManager?t._requestManager=new n.Manager(r[0].currentProvider):(t._requestManager=new n.Manager,t._requestManager.setProvider(r[0],r[1])),t.givenProvider=n.Manager.givenProvider,t.providers=n.Manager.providers,t._provider=t._requestManager.provider,t.setProvider||(t.setProvider=function(r,e){return t._requestManager.setProvider(r,e),t._provider=t._requestManager.provider,!0}),t.BatchRequest=n.BatchManager.bind(null,t._requestManager),t.extend=o(t)},addProviders:function(t){t.givenProvider=n.Manager.givenProvider,t.providers=n.Manager.providers}}},129:function(t,r,e){"use strict"; 
var n=e(42),o=e(57).errors,c=e(57).formatters,l=e(5),d=e(213),m=e(214).subscriptions,f=function(t){if(!t.call||!t.name)throw new Error('When creating a method you need to provide at least the "name" and "call" property.'); 
this.name=t.name,this.call=t.call,this.params=t.params||0,this.inputFormatter=t.inputFormatter,this.outputFormatter=t.outputFormatter,this.transformPayload=t.transformPayload,this.extraFormatters=t.extraFormatters,this.abiCoder=t.abiCoder,this.requestManager=t.requestManager,this.accounts=t.accounts,this.defaultBlock=t.defaultBlock||"latest",this.defaultAccount=t.defaultAccount||null,this.transactionBlockTimeout=t.transactionBlockTimeout||50,this.transactionConfirmationBlocks=t.transactionConfirmationBlocks||24,this.transactionPollingTimeout=t.transactionPollingTimeout||750,this.defaultCommon=t.defaultCommon,this.defaultChain=t.defaultChain,this.defaultHardfork=t.defaultHardfork,this.handleRevert=t.handleRevert}; 
f.prototype.setRequestManager=function(t,r){this.requestManager=t,r&&(this.accounts=r)},f.prototype.createFunction=function(t,r){var e=this.buildCall(); 
return e.call=this.call,this.setRequestManager(t||this.requestManager,r||this.accounts),e},f.prototype.attachToObject=function(t){var r=this.buildCall(); 
r.call=this.call; 
var e=this.name.split("."); 
e.length>1?(t[e[0]]=t[e[0]]||{},t[e[0]][e[1]]=r):t[e[0]]=r},f.prototype.getCall=function(t){return n.isFunction(this.call)?this.call(t):this.call},f.prototype.extractCallback=function(t){if(n.isFunction(t[t.length-1]))return t.pop()},f.prototype.validateArgs=function(t){if(t.length!==this.params)throw o.InvalidNumberOfParams(t.length,this.params,this.name)},f.prototype.formatInput=function(t){var r=this; 
return this.inputFormatter?this.inputFormatter.map((function(e,n){return e?e.call(r,t[n]):t[n]})):t},f.prototype.formatOutput=function(t){var r=this; 
return n.isArray(t)?t.map((function(t){return r.outputFormatter&&t?r.outputFormatter(t):t})):this.outputFormatter&&t?this.outputFormatter(t):t},f.prototype.toPayload=function(t){var r=this.getCall(t),e=this.extractCallback(t),n=this.formatInput(t); 
this.validateArgs(n); 
var o={method:r,params:n,callback:e}; 
return this.transformPayload&&(o=this.transformPayload(o)),o},f.prototype._confirmTransaction=function(t,r,e){var h=this,v=!1,y=!0,w=0,k=0,E=null,x=null,T=n.isObject(e.params[0])&&e.params[0].gas?e.params[0].gas:null,P=n.isObject(e.params[0])&&e.params[0].data&&e.params[0].from&&!e.params[0].to,N=P&&e.params[0].data.length>2,F=[new f({name:"getBlockByNumber",call:"eth_getBlockByNumber",params:2,inputFormatter:[c.inputBlockNumberFormatter,function(t){return!!t}],outputFormatter:c.outputBlockFormatter}),new f({name:"getTransactionReceipt",call:"eth_getTransactionReceipt",params:1,inputFormatter:[null],outputFormatter:c.outputTransactionReceiptFormatter}),new f({name:"getCode",call:"eth_getCode",params:2,inputFormatter:[c.inputAddressFormatter,c.inputDefaultBlockNumberFormatter]}),new m({name:"subscribe",type:"eth",subscriptions:{newBlockHeaders:{subscriptionName:"newHeads",params:0,outputFormatter:c.outputBlockFormatter}}})],M={}; 
n.each(F,(function(t){t.attachToObject(M),t.requestManager=h.requestManager})); 
var C=function(n,c,m,f,sub){if(!m)return sub||(sub={unsubscribe:function(){clearInterval(E)}}),(n?d.resolve(n):M.getTransactionReceipt(r)).catch((function(r){sub.unsubscribe(),v=!0,l._fireError({message:"Failed to check for transaction receipt:",data:r},t.eventEmitter,t.reject)})).then((async function(r){if(!r||!r.blockHash)throw new Error("Receipt missing or blockHash null"); 
var e; 
(h.extraFormatters&&h.extraFormatters.receiptFormatter&&(r=h.extraFormatters.receiptFormatter(r)),t.eventEmitter.listeners("confirmation").length>0)&&(void 0!==n&&0===k||(c?x?(e=await M.getBlockByNumber(x.number+1))&&(x=e,t.eventEmitter.emit("confirmation",k,r)):(e=await M.getBlockByNumber(r.blockNumber),x=e,t.eventEmitter.emit("confirmation",k,r)):t.eventEmitter.emit("confirmation",k,r)),(c&&e||!c)&&k++,y=!1,k===h.transactionConfirmationBlocks+1&&(sub.unsubscribe(),t.eventEmitter.removeAllListeners())); 
return r})).then((async function(r){if(P&&!v){if(!r.contractAddress)return y&&(sub.unsubscribe(),v=!0),void l._fireError(o.NoContractAddressFoundError(r),t.eventEmitter,t.reject,null,r); 
var code; 
try{code=await M.getCode(r.contractAddress)}catch(t){}if(!code)return; 
!0===r.status&&N||code.length>2?(t.eventEmitter.emit("receipt",r),h.extraFormatters&&h.extraFormatters.contractDeployFormatter?t.resolve(h.extraFormatters.contractDeployFormatter(r)):t.resolve(r),y&&t.eventEmitter.removeAllListeners()):l._fireError(o.ContractCodeNotStoredError(r),t.eventEmitter,t.reject,null,r),y&&sub.unsubscribe(),v=!0}return r})).then((async function(r){if(!P&&!v){if(r.outOfGas||T&&T===r.gasUsed||!0!==r.status&&"0x1"!==r.status&&void 0!==r.status)if(JSON.stringify(r,null,2),!1===r.status||"0x0"===r.status)try{var n=null; 
if(!h.handleRevert||"eth_sendTransaction"!==h.call)throw!1; 
if(!(n=await h.getRevertReason(e.params[0],r.blockNumber)))throw!1; 
l._fireError(o.TransactionRevertInstructionError(n.reason,n.signature,r),t.eventEmitter,t.reject,null,r)}catch(e){l._fireError(o.TransactionRevertedWithoutReasonError(r),t.eventEmitter,t.reject,null,r)}else l._fireError(o.TransactionOutOfGasError(r),t.eventEmitter,t.reject,null,r); 
else t.eventEmitter.emit("receipt",r),t.resolve(r),y&&t.eventEmitter.removeAllListeners(); 
y&&sub.unsubscribe(),v=!0}})).catch((function(){w++,c?w-1>=h.transactionPollingTimeout&&(sub.unsubscribe(),v=!0,l._fireError(o.TransactionError("Transaction was not mined within "+h.transactionPollingTimeout+" seconds, please make sure your transaction was properly sent. Be aware that it might still be mined!"),t.eventEmitter,t.reject)):w-1>=h.transactionBlockTimeout&&(sub.unsubscribe(),v=!0,l._fireError(o.TransactionError("Transaction was not mined within "+h.transactionBlockTimeout+" blocks, please make sure your transaction was properly sent. Be aware that it might still be mined!"),t.eventEmitter,t.reject))})); 
sub.unsubscribe(),v=!0,l._fireError({message:"Failed to subscribe to new newBlockHeaders to confirm the transaction receipts.",data:m},t.eventEmitter,t.reject)},I=function(t){n.isFunction(this.requestManager.provider.on)?M.subscribe("newBlockHeaders",C.bind(null,t,!1)):E=setInterval(C.bind(null,t,!0),1e3)}.bind(this); 
M.getTransactionReceipt(r).then((function(r){r&&r.blockHash?(t.eventEmitter.listeners("confirmation").length>0&&I(r),C(r,!1)):v||I()})).catch((function(){v||I()}))}; 
var h=function(t,r){return n.isNumber(t)?r.wallet[t]:n.isObject(t)&&t.address&&t.privateKey?t:r.wallet[t.toLowerCase()]}; 
f.prototype.buildCall=function(){var t=this,r="eth_sendTransaction"===t.call||"eth_sendRawTransaction"===t.call,e="eth_call"===t.call,c=function(){var c=d(!r),m=t.toPayload(Array.prototype.slice.call(arguments)),v=function(n,d){if(t.handleRevert&&!n&&e&&t.isRevertReasonString(d)&&t.abiCoder){var f=t.abiCoder.decodeParameter("string","0x"+d.substring(10)); 
l._fireError(o.RevertInstructionError(f,"Error(String)"),c.eventEmitter,c.reject,m.callback,{reason:f,signature:"Error(String)"})}else{try{d=t.formatOutput(d)}catch(t){n=t}if(d instanceof Error&&(n=d),n)return n.error&&(n=n.error),l._fireError(n,c.eventEmitter,c.reject,m.callback); 
m.callback&&m.callback(null,d),r?(c.eventEmitter.emit("transactionHash",d),t._confirmTransaction(c,d,m)):n||c.resolve(d)}},y=function(r){var e=n.extend({},m,{method:"eth_sendRawTransaction",params:[r.rawTransaction]}); 
t.requestManager.send(e,v)},w=function(t,r){var e; 
if(r&&r.accounts&&r.accounts.wallet&&r.accounts.wallet.length)if("eth_sendTransaction"===t.method){var o=t.params[0]; 
if((e=h(n.isObject(o)?o.from:null,r.accounts))&&e.privateKey){var l=n.omit(o,"from"); 
return r.defaultChain&&!l.chain&&(l.chain=r.defaultChain),r.defaultHardfork&&!l.hardfork&&(l.hardfork=r.defaultHardfork),r.defaultCommon&&!l.common&&(l.common=r.defaultCommon),r.accounts.signTransaction(l,e.privateKey).then(y).catch((function(t){n.isFunction(c.eventEmitter.listeners)&&c.eventEmitter.listeners("error").length&&(c.eventEmitter.emit("error",t),c.eventEmitter.removeAllListeners(),c.eventEmitter.catch((function(){}))),c.reject(t)}))}}else if("eth_sign"===t.method){var data=t.params[1]; 
if((e=h(t.params[0],r.accounts))&&e.privateKey){var d=r.accounts.sign(data,e.privateKey); 
return t.callback&&t.callback(null,d.signature),void c.resolve(d.signature)}}return r.requestManager.send(t,v)}; 
if(r&&n.isObject(m.params[0])&&void 0===m.params[0].gasPrice){var k=new f({name:"getGasPrice",call:"eth_gasPrice",params:0}).createFunction(t.requestManager); 
k((function(r,e){e&&(m.params[0].gasPrice=e),w(m,t)}))}else w(m,t); 
return c.eventEmitter}; 
return c.method=t,c.request=this.request.bind(this),c},f.prototype.getRevertReason=function(t,r){var e=this; 
return new Promise((function(n,o){new f({name:"call",call:"eth_call",params:2,abiCoder:e.abiCoder,handleRevert:!0}).createFunction(e.requestManager)(t,l.numberToHex(r)).then((function(){n(!1)})).catch((function(t){t.reason?n({reason:t.reason,signature:t.signature}):o(t)}))}))},f.prototype.isRevertReasonString=function(data){return n.isString(data)&&(data.length-2)/2%32==4&&"0x08c379a0"===data.substring(0,10)},f.prototype.request=function(){var t=this.toPayload(Array.prototype.slice.call(arguments)); 
return t.format=this.formatOutput.bind(this),t},t.exports=f},213:function(t,r,e){"use strict"; 
var n=e(393),o=e(394),c=function(t){var r,e,c=new o((function(){r=arguments[0],e=arguments[1]})); 
if(t)return{resolve:r,reject:e,eventEmitter:c}; 
var l=new n; 
return c._events=l._events,c.emit=l.emit,c.on=l.on,c.once=l.once,c.off=l.off,c.listeners=l.listeners,c.addListener=l.addListener,c.removeListener=l.removeListener,c.removeAllListeners=l.removeAllListeners,{resolve:r,reject:e,eventEmitter:c}}; 
c.resolve=function(t){var r=c(!0); 
return r.resolve(t),r.eventEmitter},t.exports=c},214:function(t,r,e){"use strict"; 
var n=e(722),o=function(t){this.name=t.name,this.type=t.type,this.subscriptions=t.subscriptions||{},this.requestManager=null}; 
o.prototype.setRequestManager=function(t){this.requestManager=t},o.prototype.attachToObject=function(t){var r=this.buildCall(),e=this.name.split("."); 
e.length>1?(t[e[0]]=t[e[0]]||{},t[e[0]][e[1]]=r):t[e[0]]=r},o.prototype.buildCall=function(){var t=this; 
return function(){t.subscriptions[arguments[0]]||console.warn("Subscription "+JSON.stringify(arguments[0])+" doesn't exist. Subscribing anyway."); 
var r=new n({subscription:t.subscriptions[arguments[0]],requestManager:t.requestManager,type:t.type}); 
return r.subscribe.apply(r,arguments)}},t.exports={subscriptions:o,subscription:n}},380:function(t,r,e){"use strict"; 
var n={messageId:0,toPayload:function(t,r){if(!t)throw new Error('JSONRPC method should be specified for params: "'+JSON.stringify(r)+'"!'); 
return n.messageId++,{jsonrpc:"2.0",id:n.messageId,method:t,params:r||[]}},isValidResponse:function(t){return Array.isArray(t)?t.every(r):r(t); 
function r(t){return!(!t||t.error||"2.0"!==t.jsonrpc||"number"!=typeof t.id&&"string"!=typeof t.id||void 0===t.result)}},toBatchPayload:function(t){return t.map((function(t){return n.toPayload(t.method,t.params)}))}}; 
t.exports=n},57:function(t,r,e){"use strict"; 
var n=e(689),o=e(690); 
t.exports={errors:n,formatters:o}},688:function(t,r,e){"use strict"; 
var n=e(42),o=e(57).errors,c=e(380),l=e(691),d=e(692),m=function t(r){this.provider=null,this.providers=t.providers,this.setProvider(r),this.subscriptions={}}; 
m.givenProvider=d,m.providers={WebsocketProvider:e(693),HttpProvider:e(702),IpcProvider:e(717)},m.prototype.setProvider=function(p,t){var r=this; 
if(p&&"string"==typeof p&&this.providers)if(/^http(s)?:\/\//i.test(p))p=new this.providers.HttpProvider(p); 
else if(/^ws(s)?:\/\//i.test(p))p=new this.providers.WebsocketProvider(p); 
else if(p&&"object"==typeof t&&"function"==typeof t.connect)p=new this.providers.IpcProvider(p,t); 
else if(p)throw new Error("Can't autodetect provider for \""+p+'"'); 
this.provider&&this.provider.connected&&this.clearSubscriptions(),this.provider=p||null,this.provider&&this.provider.on&&this.provider.on("data",(function(t,e){(t=t||e).method&&r.subscriptions[t.params.subscription]&&r.subscriptions[t.params.subscription].callback&&r.subscriptions[t.params.subscription].callback(null,t.params.result)}))},m.prototype.send=function(data,t){if(t=t||function(){},!this.provider)return t(o.InvalidProvider()); 
var r=c.toPayload(data.method,data.params); 
this.provider[this.provider.sendAsync?"sendAsync":"send"](r,(function(e,n){return n&&n.id&&r.id!==n.id?t(new Error('Wrong response id "'+n.id+'" (expected: "'+r.id+'") in '+JSON.stringify(r))):e?t(e):n&&n.error?t(o.ErrorResponse(n)):c.isValidResponse(n)?void t(null,n.result):t(o.InvalidResponse(n))}))},m.prototype.sendBatch=function(data,t){if(!this.provider)return t(o.InvalidProvider()); 
var r=c.toBatchPayload(data); 
this.provider[this.provider.sendAsync?"sendAsync":"send"](r,(function(r,e){return r?t(r):n.isArray(e)?void t(null,e):t(o.InvalidResponse(e))}))},m.prototype.addSubscription=function(t,r,e,n){if(!this.provider.on)throw new Error("The provider doesn't support subscriptions: "+this.provider.constructor.name); 
this.subscriptions[t]={callback:n,type:e,name:r}},m.prototype.removeSubscription=function(t,r){this.subscriptions[t]&&(this.send({method:this.subscriptions[t].type+"_unsubscribe",params:[t]},r),delete this.subscriptions[t])},m.prototype.clearSubscriptions=function(t){var r=this; 
this.subscriptions&&Object.keys(this.subscriptions).forEach((function(e){t&&"syncing"===r.subscriptions[e].name||r.removeSubscription(e)})),this.provider.reset&&this.provider.reset()},t.exports={Manager:m,BatchManager:l}},689:function(t,r,e){"use strict"; 
t.exports={ErrorResponse:function(t){var r=t&&t.error&&t.error.message?t.error.message:JSON.stringify(t); 
return new Error("Returned error: "+r)},InvalidNumberOfParams:function(t,r,e){return new Error('Invalid number of parameters for "'+e+'". Got '+t+" expected "+r+"!")},InvalidConnection:function(t){return new Error("CONNECTION ERROR: Couldn't connect to node "+t+".")},InvalidProvider:function(){return new Error("Provider not set or invalid")},InvalidResponse:function(t){var r=t&&t.error&&t.error.message?t.error.message:"Invalid JSON RPC response: "+JSON.stringify(t); 
return new Error(r)},ConnectionTimeout:function(t){return new Error("CONNECTION TIMEOUT: timeout of "+t+" ms achived")},RevertInstructionError:function(t,r){var e=new Error("Your request got reverted with the following reason string: "+t); 
return e.reason=t,e.signature=r,e},TransactionRevertInstructionError:function(t,r,e){var n=new Error("Transaction has been reverted by the EVM:\n"+JSON.stringify(e,null,2)); 
return n.reason=t,n.signature=r,n.receipt=e,n},TransactionError:function(t,r){var e=new Error(t); 
return e.receipt=r,e},NoContractAddressFoundError:function(t){return this.TransactionError("The transaction receipt didn't contain a contract address.",t)},ContractCodeNotStoredError:function(t){return this.TransactionError("The contract code couldn't be stored, please check your gas limit.",t)},TransactionRevertedWithoutReasonError:function(t){return this.TransactionError("Transaction has been reverted by the EVM:\n"+JSON.stringify(t,null,2),t)},TransactionOutOfGasError:function(t){return this.TransactionError("Transaction ran out of gas. Please provide more gas:\n"+JSON.stringify(t,null,2),t)}}},690:function(t,r,e){"use strict"; 
var n=e(42),o=e(5),c=e(379),l=function(t){return o.toBN(t).toString(10)},d=function(t){if(void 0!==t)return function(t){return"latest"===t||"pending"===t||"earliest"===t}(t)?t:"genesis"===t?"0x0":o.isHexStrict(t)?n.isString(t)?t.toLowerCase():t:o.numberToHex(t)},m=function(t){if(t.to&&(t.to=v(t.to)),t.data&&t.input)throw new Error('You can\'t have "data" and "input" as properties of transactions at the same time, please use either "data" or "input" instead.'); 
if(!t.data&&t.input&&(t.data=t.input,delete t.input),t.data&&!o.isHex(t.data))throw new Error("The data field must be HEX encoded data."); 
return(t.gas||t.gasLimit)&&(t.gas=t.gas||t.gasLimit),["gasPrice","gas","value","nonce"].filter((function(r){return void 0!==t[r]})).forEach((function(r){t[r]=o.numberToHex(t[r])})),t},f=function(t){return null!==t.blockNumber&&(t.blockNumber=o.hexToNumber(t.blockNumber)),null!==t.transactionIndex&&(t.transactionIndex=o.hexToNumber(t.transactionIndex)),t.nonce=o.hexToNumber(t.nonce),t.gas=o.hexToNumber(t.gas),t.gasPrice=l(t.gasPrice),t.value=l(t.value),t.to&&o.isAddress(t.to)?t.to=o.toChecksumAddress(t.to):t.to=null,t.from&&(t.from=o.toChecksumAddress(t.from)),t},h=function(t){if("string"==typeof t.blockHash&&"string"==typeof t.transactionHash&&"string"==typeof t.logIndex){var r=o.sha3(t.blockHash.replace("0x","")+t.transactionHash.replace("0x","")+t.logIndex.replace("0x","")); 
t.id="log_"+r.replace("0x","").substr(0,8)}else t.id||(t.id=null); 
return null!==t.blockNumber&&(t.blockNumber=o.hexToNumber(t.blockNumber)),null!==t.transactionIndex&&(t.transactionIndex=o.hexToNumber(t.transactionIndex)),null!==t.logIndex&&(t.logIndex=o.hexToNumber(t.logIndex)),t.address&&(t.address=o.toChecksumAddress(t.address)),t},v=function(address){var t=new c(address); 
if(t.isValid()&&t.isDirect())return t.toAddress().toLowerCase(); 
if(o.isAddress(address))return"0x"+address.toLowerCase().replace("0x",""); 
throw new Error('Provided address "'+address+"\" is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can't be converted.")}; 
t.exports={inputDefaultBlockNumberFormatter:function(t){return d(this&&null==t?this.defaultBlock:t)},inputBlockNumberFormatter:d,inputCallFormatter:function(t){var r=(t=m(t)).from||(this?this.defaultAccount:null); 
return r&&(t.from=v(r)),t},inputTransactionFormatter:function(t){if(t=m(t),!n.isNumber(t.from)&&!n.isObject(t.from)){if(t.from=t.from||(this?this.defaultAccount:null),!t.from&&!n.isNumber(t.from))throw new Error('The send transactions "from" field must be defined!'); 
t.from=v(t.from)}return t},inputAddressFormatter:v,inputPostFormatter:function(t){return t.ttl&&(t.ttl=o.numberToHex(t.ttl)),t.workToProve&&(t.workToProve=o.numberToHex(t.workToProve)),t.priority&&(t.priority=o.numberToHex(t.priority)),n.isArray(t.topics)||(t.topics=t.topics?[t.topics]:[]),t.topics=t.topics.map((function(t){return 0===t.indexOf("0x")?t:o.fromUtf8(t)})),t},inputLogFormatter:function(t){var r=function(t){return null==t?null:0===(t=String(t)).indexOf("0x")?t:o.fromUtf8(t)}; 
return(t.fromBlock||0===t.fromBlock)&&(t.fromBlock=d(t.fromBlock)),(t.toBlock||0===t.toBlock)&&(t.toBlock=d(t.toBlock)),t.topics=t.topics||[],t.topics=t.topics.map((function(t){return n.isArray(t)?t.map(r):r(t)})),r=null,t.address&&(t.address=n.isArray(t.address)?t.address.map((function(t){return v(t)})):v(t.address)),t},inputSignFormatter:function(data){return o.isHexStrict(data)?data:o.utf8ToHex(data)},inputStorageKeysFormatter:function(t){return t.map(o.numberToHex)},outputProofFormatter:function(t){return t.address=o.toChecksumAddress(t.address),t.nonce=o.hexToNumberString(t.nonce),t.balance=o.hexToNumberString(t.balance),t},outputBigNumberFormatter:l,outputTransactionFormatter:f,outputTransactionReceiptFormatter:function(t){if("object"!=typeof t)throw new Error("Received receipt is invalid: "+t); 
return null!==t.blockNumber&&(t.blockNumber=o.hexToNumber(t.blockNumber)),null!==t.transactionIndex&&(t.transactionIndex=o.hexToNumber(t.transactionIndex)),t.cumulativeGasUsed=o.hexToNumber(t.cumulativeGasUsed),t.gasUsed=o.hexToNumber(t.gasUsed),n.isArray(t.logs)&&(t.logs=t.logs.map(h)),t.contractAddress&&(t.contractAddress=o.toChecksumAddress(t.contractAddress)),void 0!==t.status&&null!==t.status&&(t.status=Boolean(parseInt(t.status))),t},outputBlockFormatter:function(t){return t.gasLimit=o.hexToNumber(t.gasLimit),t.gasUsed=o.hexToNumber(t.gasUsed),t.size=o.hexToNumber(t.size),t.timestamp=o.hexToNumber(t.timestamp),null!==t.number&&(t.number=o.hexToNumber(t.number)),t.difficulty&&(t.difficulty=l(t.difficulty)),t.totalDifficulty&&(t.totalDifficulty=l(t.totalDifficulty)),n.isArray(t.transactions)&&t.transactions.forEach((function(t){if(!n.isString(t))return f(t)})),t.miner&&(t.miner=o.toChecksumAddress(t.miner)),t},outputLogFormatter:h,outputPostFormatter:function(t){return t.expiry=o.hexToNumber(t.expiry),t.sent=o.hexToNumber(t.sent),t.ttl=o.hexToNumber(t.ttl),t.workProved=o.hexToNumber(t.workProved),t.topics||(t.topics=[]),t.topics=t.topics.map((function(t){return o.toUtf8(t)})),t},outputSyncingFormatter:function(t){return t.startingBlock=o.hexToNumber(t.startingBlock),t.currentBlock=o.hexToNumber(t.currentBlock),t.highestBlock=o.hexToNumber(t.highestBlock),t.knownStates&&(t.knownStates=o.hexToNumber(t.knownStates),t.pulledStates=o.hexToNumber(t.pulledStates)),t}}},691:function(t,r,e){"use strict"; 
var n=e(380),o=e(57).errors,c=function(t){this.requestManager=t,this.requests=[]}; 
c.prototype.add=function(t){this.requests.push(t)},c.prototype.execute=function(){var t=this.requests; 
this.requestManager.sendBatch(t,(function(r,e){e=e||[],t.map((function(t,r){return e[r]||{}})).forEach((function(r,e){if(t[e].callback){if(r&&r.error)return t[e].callback(o.ErrorResponse(r)); 
if(!n.isValidResponse(r))return t[e].callback(o.InvalidResponse(r)); 
try{t[e].callback(null,t[e].format?t[e].format(r.result):r.result)}catch(r){t[e].callback(r)}}}))}))},t.exports=c},692:function(t,r,e){"use strict"; 
var n,o=null; 
try{n=Function("return this")()}catch(t){n=window}void 0!==n.ethereumProvider?o=n.ethereumProvider:void 0!==n.web3&&n.web3.currentProvider&&(n.web3.currentProvider.sendAsync&&(n.web3.currentProvider.send=n.web3.currentProvider.sendAsync,delete n.web3.currentProvider.sendAsync),!n.web3.currentProvider.on&&n.web3.currentProvider.connection&&"ipcProviderWrapper"===n.web3.currentProvider.connection.constructor.name&&(n.web3.currentProvider.on=function(t,r){if("function"!=typeof r)throw new Error("The second parameter callback must be a function."); 
switch(t){case"data":this.connection.on("data",(function(data){var t=""; 
data=data.toString(); 
try{t=JSON.parse(data)}catch(t){return r(new Error("Couldn't parse response data"+data))}t.id||-1===t.method.indexOf("_subscription")||r(null,t)})); 
break; 
default:this.connection.on(t,r)}}),o=n.web3.currentProvider),t.exports=o},719:function(t,r,e){"use strict"; 
var n=e(57).formatters,o=e(129),c=e(5); 
t.exports=function(t){var r=function(r){var e; 
return r.property?(t[r.property]||(t[r.property]={}),e=t[r.property]):e=t,r.methods&&r.methods.forEach((function(r){r instanceof o||(r=new o(r)),r.attachToObject(e),r.setRequestManager(t._requestManager)})),t}; 
return r.formatters=n,r.utils=c,r.Method=o,r}},722:function(t,r,e){"use strict"; 
var n=e(42),o=e(57).errors,c=e(393); 
function l(t){c.call(this),this.id=null,this.callback=n.identity,this.arguments=null,this._reconnectIntervalId=null,this.options={subscription:t.subscription,type:t.type,requestManager:t.requestManager}}l.prototype=Object.create(c.prototype),l.prototype.constructor=l,l.prototype._extractCallback=function(t){if(n.isFunction(t[t.length-1]))return t.pop()},l.prototype._validateArgs=function(t){var r=this.options.subscription; 
if(r||(r={}),r.params||(r.params=0),t.length!==r.params)throw o.InvalidNumberOfParams(t.length,r.params+1,t[0])},l.prototype._formatInput=function(t){var r=this.options.subscription; 
return r&&r.inputFormatter?r.inputFormatter.map((function(r,e){return r?r(t[e]):t[e]})):t},l.prototype._formatOutput=function(t){var r=this.options.subscription; 
return r&&r.outputFormatter&&t?r.outputFormatter(t):t},l.prototype._toPayload=function(t){var r=[]; 
if(this.callback=this._extractCallback(t)||n.identity,this.subscriptionMethod||(this.subscriptionMethod=t.shift(),this.options.subscription.subscriptionName&&(this.subscriptionMethod=this.options.subscription.subscriptionName)),this.arguments||(this.arguments=this._formatInput(t),this._validateArgs(this.arguments),t=[]),r.push(this.subscriptionMethod),r=r.concat(this.arguments),t.length)throw new Error("Only a callback is allowed as parameter on an already instantiated subscription."); 
return{method:this.options.type+"_subscribe",params:r}},l.prototype.unsubscribe=function(t){this.options.requestManager.removeSubscription(this.id,t),this.id=null,this.removeAllListeners(),clearInterval(this._reconnectIntervalId)},l.prototype.subscribe=function(){var t=this,r=Array.prototype.slice.call(arguments),e=this._toPayload(r); 
if(!e)return this; 
if(!this.options.requestManager.provider){var o=new Error("No provider set."); 
return this.callback(o,null,this),this.emit("error",o),this}if(!this.options.requestManager.provider.on){var c=new Error("The current provider doesn't support subscriptions: "+this.options.requestManager.provider.constructor.name); 
return this.callback(c,null,this),this.emit("error",c),this}return this.id&&this.unsubscribe(),this.options.params=e.params[1],"logs"===e.params[0]&&n.isObject(e.params[1])&&e.params[1].hasOwnProperty("fromBlock")&&isFinite(e.params[1].fromBlock)&&this.options.requestManager.send({method:"eth_getLogs",params:[e.params[1]]},(function(r,e){r?(t.callback(r,null,t),t.emit("error",r)):e.forEach((function(r){var output=t._formatOutput(r); 
t.callback(null,output,t),t.emit("data",output)}))})),"object"==typeof e.params[1]&&delete e.params[1].fromBlock,this.options.requestManager.send(e,(function(r,o){!r&&o?(t.id=o,t.emit("connected",o),t.options.requestManager.addSubscription(t.id,e.params[0],t.options.type,(function(r,e){r?(t.options.requestManager.removeSubscription(t.id),t.options.requestManager.provider.once&&(t._reconnectIntervalId=setInterval((function(){t.options.requestManager.provider.reconnect&&t.options.requestManager.provider.reconnect()}),500),t.options.requestManager.provider.once("connect",(function(){clearInterval(t._reconnectIntervalId),t.subscribe(t.callback)}))),t.emit("error",r),t.callback(r,null,t)):(n.isArray(e)||(e=[e]),e.forEach((function(r){var output=t._formatOutput(r); 
if(n.isFunction(t.options.subscription.subscriptionHandler))return t.options.subscription.subscriptionHandler.call(t,output); 
t.emit("data",output),t.callback(null,output,t)})))}))):(t.callback(r,null,t),t.emit("error",r))})),this},t.exports=l}}]); 
