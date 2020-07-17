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
      res.status(201).json({projectId});
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
      res.status(200).json(resourceId);
    })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
  });


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
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(error => {
      res.status(500).json({message: error.message});
    });
  });


module.exports = server;
