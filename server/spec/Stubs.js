// Methods for stubbing HTTP requests and responses
module.exports = {

  response: function () {
    this._ended = false;
    this._responseCode = null;
    this._headers = null;
    this._data = null;

    this.writeHead = function (responseCode, headers) {
      this._responseCode = responseCode;
      this._headers = headers;
    }.bind(this);

    this.end = function (data) {
      this._ended = true;
      this._data = data;
    }.bind(this);
  },

  request: function (url, method, postdata) {
    this.url = url;
    this.method = method;
    this._postData = postdata;
    //what should setEncoding do?
    this.setEncoding = function () { /* noop */ };
    //what does this.on do?
    //where does type come from? what does it mean?
    // ?? type is an 'event' type: data or end. these indicate whether or not the stream has been consumed (?)
    //'.on' is listening for this event to happen
    //where does callback come from

    this.addListener = this.on = function (type, callback) {
      //(from nodejs.org)the data event happens whenever the "stream is relinquishing ownership of a chunk of data to a consumer" (?)
      if (type === 'data') {
        //pass the stringified new message into the callback
        callback(Buffer(JSON.stringify(this._postData)));
      }
      //(from nodejs.org) The 'end' event is emitted when there is no more data to be consumed from the stream.


      if (type === 'end') {
        //invoke the callback with no parameters
        callback();
      }
      return this;
    }.bind(this);
  }

};
