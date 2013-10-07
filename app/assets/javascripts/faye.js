$(function () {
  var base = Math.floor(Math.random() * 101);
  var baseChannel = "/channel-" + base;

  $("#base-channel-id").text(baseChannel);

  var faye_url = "http://powerful-waters-1612.herokuapp.com/faye";
  var host = new Faye.Client(faye_url);

  var channel2 = undefined;

  // Event Handlers

  var handleInput1 = function (event) {
    if (channel2) {
      host.unsubscribe(channel2);
    }
    var channelName = $("#input1-id").val();
    host.publish(baseChannel, channelName);
  };

  var handleInput2 = function (event) {
    var message = $("#input2-id").val();
    host.publish(channel2, message);
  }

  // Initial Action

  host.subscribe(baseChannel, function (channelName) {
    channel2 = channelName;
    $("#input1-id").val("");
    $("#h5-id").text(channelName);
    host.subscribe(channelName, function (message) {
      $("#input2-id").val("");
      $("#ul-id").append("<li>" + message + "</li>");
    });
  });

  // Event Bindings

  $("#button1-id").click(function (event) {
    handleInput1(event);
  });

  $("#button2-id").click(function (event) {
    handleInput2(event);
  });

  $("#input1-id").keyup(function (event) {
    if (event.which === 13) {
      handleInput1(event);
    }
  });

  $("#input2-id").keyup(function (event) {
    if (event.which === 13) {
      handleInput2(event);
    }
  });

});
