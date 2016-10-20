class CreateRecursoOs < ActiveRecord::Migration
  def change
    create_table :recurso_os do |t|
      t.string :nombreO
      t.string :titulo
      t.string :recursoUrl
      t.attachment :recursoUpload

      t.timestamps null: false
    end
  end
end
