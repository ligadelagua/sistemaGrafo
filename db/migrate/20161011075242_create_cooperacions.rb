class CreateCooperacions < ActiveRecord::Migration
  def change
    create_table :cooperacions do |t|
      t.string :organizacion1
      t.string :organizacion2
      t.text :descripcion
      t.attachment :banner

      t.timestamps null: false
    end
  end
end
