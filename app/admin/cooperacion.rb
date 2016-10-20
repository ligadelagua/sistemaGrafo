ActiveAdmin.register Cooperacion do
    permit_params :id, :organizacion1, :organizacion2, :descripcion, :banner
    menu label: "Cooperaciones", priority: 3
    config.sort_order = 'id_asc'
    
    index do
      selectable_column
      #column "ID", :id
      column "Organización 1", :organizacion1
      column "Organización 2", :organizacion2
      column "Descripción", :descripcion
    actions
    end

    form multipart: true do |f|
      f.inputs "Cooperación" do
        f.input :organizacion1, :as => :select, :collection =>
            Organizacion.all.collect {|organizacion| [organizacion.nombre] },
            label: "Organización 1"
        f.input :organizacion2,:as => :select, :collection =>
            Organizacion.all.collect {|organizacion| [organizacion.nombre] },
            :label => "Organización 2" 
        f.input :descripcion, :label => "Descripción" 
        f.input :banner, as: :file, hint: image_tag(f.object.banner.url), label: "Banner"
      end
      f.actions
    end

    show do |b|
      attributes_table do
        row :organizacion1, :label => "Organización 2"
        row :organizacion2, :label => "Organización 2"
        row :descripcion, :label => "Descripción" 
        row :banner, :label => "Banner" do
          image_tag(b.banner.url)
        end
        row :urlbanner do
          b.banner.url
        end
      end
    end
end


