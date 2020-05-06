class Api::SportsController < ApiController
    #GET /sports
    def index
        render json: DB['sports']
    end

    #GET /sports/:id
    def show
        @sport = DB['sports'].find{ |sport| sport['id'] === params[:id].to_i }
        render json: @sport
    end
end