require 'logger'
logger = Logger.new(STDOUT)

class Api::EventsController < ApiController
    #GET /sports
    def index
        @sport = DB['sports'].find{ |sport| sport['id'] === params[:sport_id].to_i }
        @events = Array.new
        @sport['comp'].each do |comp|
            @events.concat(comp['events'])
        end
        render json: @events
    end

    #GET /sports/:id
    def show
        @sport = DB['sports'].find{ |sport| sport['id'] === params[:sport_id].to_i }
        @events = Array.new
        @sport['comp'].each do |comp|
            @events.concat(comp['events'])
        end
        @event = @events.find{ |event| event['id'] === params[:id].to_i }
        render json: @event
    end
end