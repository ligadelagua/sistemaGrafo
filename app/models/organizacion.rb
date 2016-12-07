class Organizacion < ActiveRecord::Base
    belongs_to :cooperacion, foreign_key: "id"
    
    has_attached_file :banner, 
        default_url: "missing.png"
        
    has_attached_file :logo, 
        default_url: "missing.png"

    validates_attachment :banner, 
        content_type:{content_type:["image/jpg","image/jpeg","image/png"]},
        size: { in: 0..1000.kilobytes }
    
    validates :descripcion, length: { maximum: 1000,
    too_long: "Se ha excedido el máximo de %{count} caracteres" }
    validates :nombre, length: { maximum: 60,
    too_long: "Se ha excedido el máximo de %{count} caracteres" }
        
    validates_presence_of :nombre, :descripcion, :banner,:logo
    validates :nombre, :uniqueness => true
    
end