class RecursoO < ActiveRecord::Base
    has_attached_file :recursoUpload, 
        default_url: "missing.png"
        
    validates_attachment :recursoUpload, 
        content_type:{content_type:["image/jpg","image/jpeg","image/png",
        "video/mp4","video/lfv","video/avi","video/mp4","video/wmv"]},
        size: { in: 0..1000.kilobytes }
        
    validates_presence_of :nombreO,:titulo
    validates :titulo, :uniqueness => true
    validate :check_data
    
    validates :titulo, length: { maximum: 60,
    too_long: "Se ha excedido el máximo de %{count} caracteres" }
    
    def check_data
       errors.add(:recursoUrl, 'Complete al menos una de las referencias URL o Recurso') if recursoUrl.blank? && recursoUpload.blank?
       errors.add(:recursoUpload, 'Complete al menos una de las referencias URL o Recurso') if recursoUrl.blank? && recursoUpload.blank?
    end
    
end