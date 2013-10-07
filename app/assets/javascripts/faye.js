$(function () {
  var base = Math.floor(Math.random() * 101);
  var baseChannel = "/channel-" + base;

  $("#base-channel-id").text(baseChannel);

  var faye_url = "http://powerful-waters-1612.herokuapp.com/faye";
  var host = new Faye.Client(faye_url);

  var channel2 = undefined;

  host.subscribe(baseChannel, function (channelName) {
    channel2 = channelName;
    $("#input1-id").val("");
    $("#h5-id").text(channelName);
    host.subscribe(channelName, function (message) {
      $("#input2-id").val("");
      $("#ul-id").append("<li>" + message + "</li>");
    });
  });

  $("#button1-id").click(function (event) {
    if (channel2) {
      host.unsubscribe(channel2);
    }
    var channelName = $("#input1-id").val();
    host.publish(baseChannel, channelName);
  });

  $("#button2-id").click(function (event) {
    var message = $("#input2-id").val();
    host.publish(channel2, message);
  });

});
