ActiveAdmin.register RecursoO do
    
    permit_params :id, :nombreO, :titulo, 
                  :recursoUrl, :recursoUpload
    menu parent: "Añadir Recursos", label: "Organización", priority: 4
    config.sort_order = 'id_asc'
    
    index do
      selectable_column
      # column "ID", :id
      column "Nombre Organización", :nombreO
      column "Título Recurso", :titulo
      # column "Tipo Recurso", :tipo
    actions
    end
    
    form multipart: true do |f|
      f.inputs "Recursos Organizaciones" do
        f.input :nombreO, :as => :select, :collection =>
            Organizacion.all.collect {|organizacion| [organizacion.nombre] },
            label: "Nombre Organización"
        f.input :titulo, :label => "Título Recurso"
        
        f.input :recursoUrl, :label => "Añadir Url"
        f.input :recursoUpload, :as => :file  , hint: image_tag(f.object.recursoUpload.url),
            label: "Añadir recurso"
        
        # f.input :tipo, :as => :select, :collection => ["Imagen", "Archivo", "Vídeo"],
        #     :label => "Tipo Recurso"
        # f.input :tipoCarga, :as => :select, :collection => ["URL", "Subir Archivo"],
        #     :label => "Subir como"
        # if f.object.tipoCarga == "URL" 
        #   f.input :recursoUrl, :label => "Añadir Url"
        # elsif f.object.tipoCarga == "Subir Archivo" 
        #   f.input :recursoUpload, :as => :file  , hint: image_tag(f.object.recursoUpload.url),
        #     label: "Añadir recurso"
        # end
      end
      f.actions
    end
    
    show do |b|
      attributes_table do
        row :nombreO, :label => "Nombre Organización"
        row :titulo, :label => "Título Recurso" 
        # row :tipo, :label => "Tipo de recurso" 
        # row :tipoCarga, :label => "Subido Como" 
        row :recursoUrl, :label => "URL"
        row :recursoUpload, :label => "Recurso Subido" do
          image_tag(b.recursoUpload.url)
        end
        row :urlRecursoSubido do
          b.recursoUpload.url
        end
      end
    end
end
