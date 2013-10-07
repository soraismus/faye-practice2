# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)
#require 'thin'
require './faye_server'
# set :env, :production
# disable :run, :reload

app = Rack::Builder.new {
  use Rails::Rack::Static
  map "/faye" do
    run faye_server
  end

  map "/" do
    run ActionController::Dispatcher.new
  end
}

Rack::Handler::Thin.run(app)
