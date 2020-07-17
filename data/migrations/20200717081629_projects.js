

exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
    tbl.increments();
    tbl.string('name').unique().notNullable(); 
    tbl.string('description'); 
    tbl.boolean('completed').defaultTo(false); // might have to change this to 0 
  })
  .createTable("resources", (tbl) => {
    tbl.increments(); 
    tbl.string('name').unique().notNullable(); 
    tbl.string('description'); 

  })
  .createTable("projectsResources", (tbl) => {
    tbl.increments(); 
    tbl.integer("project_id").unsigned().notNullable().references("projects.id");
    tbl.integer("resource_id").unsigned().notNullable().references("resources.id");

  })
  .createTable("tasks", (tbl) => {
    tbl.increments();
    tbl.string('description').unique().notNullable(); 
    tbl.string('notes'); 
    tbl.boolean('completed').defaultTo(false); // might have to change this to 0 
    tbl.integer("project_id").unsigned().notNullable().references("projects.id");

  });
};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("projectsResources")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects")
};
