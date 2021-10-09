/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var data = {
  results: [
    {
      key: 1,
      hi: 2
    }
  ]
};

var requestHandler = function (request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status. //200 = success code
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  const handleGet = (request) => {
    if (request.url !== '/classes/messages') {
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end();

    } else {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data));
    }

    //** response components to return: header, data, response code
    //**  if request.url is equal to '/classes/message, keep going
    //**      or else send 404
    //**

    //declare a variable of the array/object from request.url, stringify it (pass this to response.end)

  };

  const handlePost = (request) => {
    //access request.url; if it's bad, change statusCode to 404
    if (request.url !== '/classes/messages') {
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end();
      //check that the new item is the correct data type and has the expected properties
    } else if (request.contentType !== 'application/json') {
      statusCode = 407;
      response.writeHead(statusCode, headers);
      response.end();
    } else {
      var requestBody = '';
      request.on('data', (data) => {
        requestBody += data;
        if (requestBody.length > 1e7) {
          response.writeHead(413, 'request entity too large', headers);
          response.end();
        }
      });
      request.on('end', () => {
        response.writeHead(200, headers);
        response.end(requestBody);
      });
    }
    //add the new item to our data set (newItem is passed in at request.data)

  };

  if (request.method === 'GET') {
    // invoke GET handler function
    handleGet(request);
  } else if (request.method === 'POST') {
    // invoke POST handler function
    handlePost(request);
  }



  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  // response.end(JSON.stringify(data));
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


module.exports = requestHandler;

// //Annie's get/post code from groceryList project
// var API = {
//   get: (callback) => {
//     var helper = callback;
//     $.get({
//       url: 'https://hrsf-grocery-list.herokuapp.com/api/groceries',
//       data: 'data???',
//       //callback should be "setStateHelper" from app.jsx
//       success: (data) => {
//         //call the callback
//         //pass "data" back to app
//         helper(data);
//       }
//     })
//   },
//   post: (newItem) => {
//     console.log('post newItem', newItem);
//     var newItem = newItem;
//     // debugger;
//     $.ajax({
//       type: 'POST',
//       url: 'https://hrsf-grocery-list.herokuapp.com/api/groceries',
//       data: newItem,
//       success: ({ data }) => console.log('data posted to API', newItem),
//       error: () => console.log('boooooo! posting error', newItem)
//     })
//   }
// }



// //"Parse" function from chatterbox-client project
// var Parse = {
//   server: `https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/${window.CAMPUS}`,
//   create: function(message, successCB, errorCB = null) {
//     // TODO: send a request to the Parse API to save the message
//     $.ajax({
//       url: Parse.server,
//       type: 'POST',
//       data: JSON.stringify(message),
//       contentType: 'application/json',
//       success: successCB,
//       error: errorCB
//     });
//   },

//   readAll: function(successCB, errorCB = null) {
//     $.ajax({
//       url: Parse.server,
//       type: 'GET',
//       data: { order: '-createdAt' },
//       contentType: 'application/json',
//       success: successCB,
//       error: errorCB || function(error) {
//         console.error('chatterbox: Failed to fetch messages', error);
//       }
//     });
//   }

// };


// //Jake's


//   getGroceries() {
//     $.ajax({
//       url: 'https://hrsf-grocery-list.herokuapp.com/api/groceries',
//       method: 'GET',
//       success: groceries => this.setState({ groceries }),
//       error: err => console.log(err)
//     })
//   }

//   addGrocery(grocery) {
//     $.ajax({
//       url: 'https://hrsf-grocery-list.herokuapp.com/api/groceries',
//       method: 'POST',
//       data: grocery,
//       success: this.getGroceries,
//       error: console.log
//     })
//   }