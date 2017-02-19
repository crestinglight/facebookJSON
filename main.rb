require 'pry'
require 'sinatra'

get ("/"){
	erb :home
}

get ("/info"){
	erb :info
}