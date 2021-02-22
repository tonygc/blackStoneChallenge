const Task = require('../models/task-model')

createTask = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a task',
        })
    }

    const task = new Task(body)

    if (!task) {
        return res.status(400).json({ success: false, error: err })
    }

    task
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: task._id,
                message: 'Task created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Task not created!',
            })
        })
}

getTasks = async (req, res) => {
    if(req.params.id_user){
        // await Task.find({ id_user: req.params.id_user }).sort({due_date:-1})
        // .exec((err, task) => {
        await Task.find({ id_user: req.params.id_user }, null, {sort: {done: 1,due_date: -1}}, (err, task) => { 
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!task) {
                return res
                    .status(404)
                    .json({ success: false, error: `Tasks not found` })
            }
            return res.status(200).json({ success: true, data: task })
        
        }).catch(err => console.log(err))
    }else{
        await Task.find({}, (err, tasks) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!tasks.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Tasks not found` })
            }
            return res.status(200).json({ success: true, data: tasks })
        }).catch(err => console.log(err))
    }
}
updateTask = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a task to update',
        })
    }

    Task.findOne({ _id: body._id }, (err, task) => {
        if (err) {
            return res.status(404).json({
                error: err,
                message: 'Task not found!',
            })
        }
        // task.name = body.name
        // task.description = body.description
        // task.due_date = body.due_date
        task.done = body.done
        task.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: task._id,
                    message: 'Task updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error: error,
                    message: 'Task not updated!',
                })
            })
    })
}

module.exports = {
    createTask,
    updateTask,
    getTasks
}