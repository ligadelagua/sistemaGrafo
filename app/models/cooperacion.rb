class Cooperacion < ActiveRecord::Base
    has_one :organizacion
    
    has_attached_file :banner,  
        default_url: "missing.png"
        
    validates_attachment :banner, 
        content_type:{content_type:["image/jpg","image/jpeg","image/png"]},
        size: { in: 0..1000.kilobytes }
    
    validates_presence_of :organizacion1, :organizacion2, :descripcion, :banner
    validates :organizacion1, uniqueness: { scope: :organizacion2 } 
    validate :check_organizaciones
    validates :descripcion, length: { maximum: 1000,
    too_long: "Se ha excedido el máximo de %{count} caracteres" }

    def check_organizaciones
        errors.add(:organizacion1, "Las Organizaciones no pueden ser iguales") if organizacion1 == organizacion2
    end
    
end