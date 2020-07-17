const express = require('express');
const helmet = require('helmet');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());

//endpoints

// projects

server.get('/api/projects', (req, res) => {
    db('projects')
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
  });

server.post('/api/projects', (req, res) => {

    db('projects')
    .insert(req.body)
    .then(projectId => {
        db('projects')
            .where({ id: projectId[0]})
                .then(newTask => {
                    res.status(201).json(newTask);
                })
    })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
  });

  // resources

  server.get('/api/resources', (req, res) => {
    db('resources')
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
  });

  server.post('/api/resources', (req, res) => {
    db('resources')
    .insert(req.body)
    .then(resourceId => {
        db('resources')
            .where({ id: resourceId[0]})
                .then(newResource => {
                    res.status(201).json(newResource);
                })
    })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
  });

  // stretch projectTasks

  server.get('/api/tasks/project/:id', (req, res) => {
    const projectId = req.params.id
      db('tasks')
      .join("projects", "tasks.project_id", "projects.id")
      .select("projects.name as projectname", "projects.description as projectdescription", "tasks.description as taskdescription")
      .where({project_id: projectId})
      .then(projectTasks => {
        res.status(200).json(projectTasks);
      })
      .catch(error => {
        res.status(500).json({message: error.message});
      });
  })


  // tasks 

  server.get('/api/tasks', (req, res) => {
    db('tasks')
    .join("projects", "tasks.project_id", "projects.id")
    .select("projects.name as projectname", "projects.description as projectdescription", "tasks.description as taskdescription")
    .then(tasks => {
        console.log(tasks)
      res.status(200).json(tasks);
    })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
  });

  server.post('/api/tasks', (req, res) => {
    db('tasks')
    .insert(req.body)
    .then(taskId => {
        db("tasks")
            .where({ id: taskId[0] })
                .then(newTask => {
                    res.status(201).json(newTask);
                });
        })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
  });


module.exports = server;
