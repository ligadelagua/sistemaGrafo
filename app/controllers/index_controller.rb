class IndexController < ApplicationController
  layout "index"
  def index
    @org = Organizacion.all
    @cop = Cooperacion.all
    @recO = RecursoO.all
    @recC = RecursoC.all
  end
end
